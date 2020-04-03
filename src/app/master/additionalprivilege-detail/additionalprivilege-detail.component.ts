import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';
import { Hospital } from '../../interfaces/sysrecord';
import { Privilegeroup } from '../../interfaces/sysrecord';
import { AdditionalPrivilege } from '../../interfaces/sysrecord';
import { MatSnackBar, MatDialog, MatDialogRef, VERSION } from "@angular/material";
import { DatePipe } from '../../../../node_modules/@angular/common';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-additionalprivilege-detail',
  templateUrl: './additionalprivilege-detail.component.html',
  styleUrls: ['./additionalprivilege-detail.component.scss']
})
export class AdditionalprivilegeDetailComponent implements OnInit {
  version = VERSION;
  dialogRef: MatDialogRef<MessageDialogComponent>;
  hospital: Hospital;
  arrobjhospital: any = [];
  privilegeroup: Privilegeroup;
  arrobjprivilegegroup: any = [];
  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};
  filter: string;
  private UrlAPI_GetSingleRow: string = "AdditionalPrivilege/Get/";
  private UrlAPI_Update: string = "AdditionalPrivilege/Update";
  private UrlAPI_Create: string = "AdditionalPrivilege/Create";
  private UrlAPI_Delete: string = "AdditionalPrivilege/Delete";
  private UrlAPI_GetAllAllPrivilegeGroup: string = "Chiva/AllPrivilegeGroup";
  private Url_Listing: string = "/auth/master/additionalprivilege-listing";
  private UrlAPI_Upload: string = "Utility/UploadFile";
  private UrlAPI_GetAllHotpitalID: string = "Chiva/GetHospital/";
  private UrlAPI_GetAllHotpital: string = "Chiva/AllHospital";
  @ViewChild("fileuploadpdfUri") fileuploadpdfUri;
  defaultHospitalCode: string;
  isAdmin: string;
  arrobjhospitalID: any = [];
  hospitalCode: string;
  Remark: string;

  countDown;
  counter = 6300
  tick = 1000;

  constructor(private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.countDown = Observable.timer(0, this.tick)
    .take(this.counter)
    .map(() => --this.counter)


    this.isAdmin = localStorage.getItem('isAdmin');
    this.defaultHospitalCode = localStorage.getItem('defaultHospitalCode');
    console.log(this.isAdmin);
    if (this.isAdmin == "true") {
      this.brokerAPIService.get(this.UrlAPI_GetAllHotpital).subscribe(
        data => {
          this.arrobjhospital = <Hospital>data;
          console.log(this.arrobjhospital);
        });
    }
    if (this.isAdmin == "false") {
      console.log(this.UrlAPI_GetAllHotpitalID + this.defaultHospitalCode);
      this.brokerAPIService.get(this.UrlAPI_GetAllHotpitalID + this.defaultHospitalCode).subscribe(
        data => {
          this.arrobjhospitalID = <Hospital>data;
          console.log(this.arrobjhospital);
        });
    }

    this.Privilegeroupclick();
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      console.log(params.get('id'));
      this.RowID = params.get('id');
      this.filter = params.get("filter");
      if (this.RowID == "new") {
        this.objRow.pdfLocation = "No file chosen";
      }
      else {
        this.brokerAPIService.get(this.UrlAPI_GetSingleRow + this.RowID).subscribe(
          data => {
            this.objRow = <AdditionalPrivilege>data;
            this.arrobjhospital.hospitalName = this.objRow.hospitalCode;
            this.arrobjhospitalID.hospitalName = this.objRow.hospitalCode;
            console.log(this.objRow);
          }
        );
      }
    }

  }


  hotpitalClick() {
    this.brokerAPIService.get(this.UrlAPI_GetAllHotpital).subscribe(
      data => {
        this.arrobjhospital = <Hospital>data;
      }
    );
  }

  Privilegeroupclick() {
    this.brokerAPIService.get(this.UrlAPI_GetAllAllPrivilegeGroup).subscribe(
      data => {
        this.arrobjprivilegegroup = <Privilegeroup>data;
      }
    );
  }

  btnSaveClick() {
    this.uploadpdfUri()
  }

  validate() {
    console.log(this.objRow.hospitalCode);
    let strValidate: string = "";
    if (this.objRow.hospitalCode == undefined || this.objRow.hospitalCode == "") {
      strValidate = "Hospital Name";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    } if (this.objRow.privilegeGroupCode == undefined || this.objRow.privilegeGroupCode == "") {
      strValidate = "Privilege Group Name";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    } if (this.objRow.pdfUri == undefined || this.objRow.pdfUri == "") {
      strValidate = "Upload PDF File ";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    } if (this.objRow.pdfLocation == undefined || this.objRow.pdfLocation == "") {
      strValidate = "Upload PDF File ";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    } else {
      return true;
    }
  }

  btnCloseClick() {
    this.router.navigate([this.Url_Listing, { filter: this.filter }]);
  }

  deleteClick() {
    this.brokerAPIService.post(this.UrlAPI_Delete, this.objRow).subscribe(
      data => {
        this.objAPIResponse = <IAPIResponse>data;
        if (this.objAPIResponse.success) {
          this.router.navigate(['/auth/master/additionalprivilege-listing']);
        }
        else {
          console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
        }
      },
      err => {
        // กรณี error
        console.log('Something went wrong!');
      });
  }


  uploadpdfUri() {

    let fipdfUri: any = this.fileuploadpdfUri.nativeElement
    if (fipdfUri.files && fipdfUri.files[0]) {
      let fileToUpload = fipdfUri.files[0];
      this.brokerAPIService.upload(this.UrlAPI_Upload, fileToUpload).subscribe(
        data => {
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.objRow.pdfUri = this.objAPIResponse.data;
            this.objRow.uploadDate = new Date().toISOString().substring(0, 10);
            if (this.validate()) {
              this.save();
            }
          }
          else {
            console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
          }
        },
        err => {
          console.log('Something went wrong!');
        });
    }
    else {
      if (this.validate()) {
        this.save();
      }
    }
  }

  localcoverImage: any = [];
  showPreviewcoverImage(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      let strValidate: string = "";
      this.objRow.pdfLocation = document.querySelector("#fUpload");
      if (/\.(pdf)$/i.test(fileInput.target.files[0].name) === false) {
        strValidate = "not an image file !";
      } if (strValidate != "") {
        this.ngOnInit()
        fileInput.target.value = null;
        this.showDialog("error", "Error", strValidate);
        return false;
      }
      this.objRow.pdfLocation = fileInput.target.files[0].name
      var reader = new FileReader();
      reader.onload = (fileInput: any) => {
        this.localcoverImage = fileInput.target.result;
        console.log(this.localcoverImage = fileInput.target.result);
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }


  save() {

    if (this.RowID == "new") {
      //Create
      this.objRow.createBy = localStorage.getItem('firstName');
      this.objRow.updateBy = localStorage.getItem('firstName');
      this.objRow.uploadDate = new Date().toISOString().substring(0, 10);
      this.brokerAPIService.post(this.UrlAPI_Create, this.objRow).subscribe(
        data => {
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.showSnackBar("Save Complete");
            this.router.navigate([this.Url_Listing]);
          }
          else {
            console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
          }
        },
        err => {
          // กรณี error
          console.log('Something went wrong!');
        });
    }
    else {
      //Update
      this.objRow.createBy = localStorage.getItem('firstName');
      this.objRow.updateBy = localStorage.getItem('firstName');
      this.brokerAPIService.post(this.UrlAPI_Update, this.objRow).subscribe(
        data => {
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.showSnackBar("Save Complete");
            this.router.navigate([this.Url_Listing]);
          }
          else {
            console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
          }
        },
        err => {
          // กรณี error
          console.log('Something went wrong!');
        });
    }

  }


  showSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000
    });
  }

  showDialog(type: string, title: string, body: string) {
    this.dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '300px', height: '200px',
      data: {
        Messagetype: type,
        Messagetitle: title,
        Messagebody: body
      },
      disableClose: true
    });
  }

}



@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    return ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
  }

}