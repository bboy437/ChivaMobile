import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';
import { FormControl, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, mixinDisabled } from '@angular/material/core';
import { NewsFeed } from '../../interfaces/sysrecord';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { retry } from 'rxjs/operators';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { database } from '../../../../node_modules/firebase';
import { HttpClient, HttpErrorResponse, HttpClientJsonpModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {
  MatSnackBar, MatDialog, MatDialogRef, VERSION,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as moment from "moment";
import { Moment } from "moment";
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';

export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY"
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-newsfeed-detail',
  templateUrl: './newsfeed-detail.component.html',
  styleUrls: ['./newsfeed-detail.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]

})
export class NewsfeedDetailComponent implements OnInit {
  version = VERSION;
  dialogRef: MatDialogRef<MessageDialogComponent>;
  objAPIUpload: any = {};
  selectedValue;
  strVarlidate: string = '';
  disabled: boolean = true;
  isReadOnly = true;
  startDate = new Date(1990, 0, 1);
  date = new FormControl((new Date()).toISOString())
  serializedDate = new FormControl((new Date()).toISOString())
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  events: string[] = [];
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};
  private UrlAPI_GetSingleRow: string = "Newsfeed/Get/";
  private UrlAPI_Update: string = "Newsfeed/Update";
  private UrlAPI_Create: string = "Newsfeed/Create";
  private UrlAPI_Upload: string = "Utility/UploadFile";
  private Url_Listing: string = "/auth/master/newsfeed-listing";
  private UrlAPI_DownloadFile: string = "Utility/DownloadFile/";
  @ViewChild("fileInputcoverImage") fileInputcoverImage;
  @ViewChild("fileInputdetailImage") fileInputdetailImage;
  effectiveDate: Moment = moment();
  expireDate: Moment = moment(new Date()).add(1, 'days');
  filter: string;
  readonly: boolean = true;
  constructor(
    private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe) {

  }

  ngOnInit() {
    // this.objRow.effectiveDate = this.datePipe.transform(new Date(),"MM-dd-yyyy");
    this.objRow.effectiveDate = new Date().toISOString().substring(0, 10);
    this.objRow.expireDate = new Date().toISOString().substring(0, 10);
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      console.log(params.get('id'));
      this.RowID = params.get('id')
      this.filter = params.get("filter");
      if (this.RowID == "new") {
        //ไม่ให้บันทึก
        // this.disabled = false;
        this.readonly = true
        this.objRow.newsfeedCode = "<Auto Gen.>";
        this.localcoverImage = "assets/Untitled-2.jpg";
        this.localdetailImage = "assets/Untitled-1.jpg";
        this.objRow.coverImageLocation = "No file chosen";
        this.objRow.detailImageLocation = "No file chosen";
        this.isReadOnly = false;
      }
      else {
        this.brokerAPIService.get(this.UrlAPI_GetSingleRow + this.RowID).subscribe(
          data => {
            this.objRow = <NewsFeed>data;
            this.getfilecoverImageUrl();
            this.getfiledetailImageUrl();
            this.effectiveDate = moment(this.objRow.effectiveDate);
            this.expireDate = moment(this.objRow.expireDate);
            this.isReadOnly = false;
          }
        );
      }
    }
  }


  getfilecoverImageUrl() {
    this.brokerAPIService.downloadImage(this.UrlAPI_DownloadFile + this.objRow.coverImageUrl)
      .subscribe(data => {
        this.DownloadshowPreviewlocalcoverImage(data);
        console.log((data.toString()));
      });
  }


  //โชว์รูปตอนอัฟโหลด
  localcoverImage: any = [];
  showPreviewcoverImage(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {
      let strValidate: string = "";
      this.objRow.coverImageLocation = document.querySelector("#fUpload");
      if (/\.(jpe?g|png|gif)$/i.test(fileInput.target.files[0].name) === false) {
        strValidate = "not an image file !";
      } if (strValidate != "") {
        this.ngOnInit()
        // this.objRow.coverImageLocation  = '';
        fileInput.target.value = null;
        this.showDialog("error", "Error", strValidate);
        return false;
      }
      this.objRow.coverImageLocation = fileInput.target.files[0].name
      var reader = new FileReader();
      reader.onload = (fileInput: any) => {
        this.localcoverImage = fileInput.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }


  //upload รูปภาพ
  DownloadshowPreviewlocalcoverImage(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.localcoverImage = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  //--------------------------------------------------------------------------

  getfiledetailImageUrl() {

    this.brokerAPIService.downloadImage(this.UrlAPI_DownloadFile + this.objRow.detailImageUrl)
      .subscribe(data => {
        this.DownloadshowPreviewdetailImageUrl(data);
        console.log((data.toString()));
      });
  }
  //โชว์รูปตอนอัฟโหลด
  localdetailImage: any = [];
  showPreviewlocaldetailImage(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {
      let strValidate: string = "";
      this.objRow.detailImageLocation = document.querySelector("#fUpload");
      if (/\.(jpe?g|png|gif)$/i.test(fileInput.target.files[0].name) === false) {
        strValidate = "not an image file !";
      } if (strValidate != "") {
        this.ngOnInit()
        // this.objRow.coverImageLocation  = '';
        fileInput.target.value = null;
        this.showDialog("error", "Error", strValidate);
        return false;

      }
      this.objRow.detailImageLocation = fileInput.target.files[0].name
      var reader = new FileReader();
      reader.onload = (fileInput: any) => {
        this.localdetailImage = fileInput.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);

    }
  }
  //upload รูปภาพ
  DownloadshowPreviewdetailImageUrl(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.localdetailImage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


  validate() {
    console.log(this.objRow.newsfeedCode);
    let strValidate: string = "";
     if (this.objRow.coverImageUrl == undefined || this.objRow.coverImageUrl == "") {
      strValidate = "Upload CoverImage File ";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    } if (this.objRow.detailImageUrl == undefined || this.objRow.covedetailImageUrlrImageUrl == "") {
      strValidate = "Upload DetailImage File ";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    } else {
      return true;
    }
  }


  btnSaveClick() {
    this.uploadCoverImage();
  }

  //uploadรูปภาพ
  uploadCoverImage() {
    let ficoverImage: any = this.fileInputcoverImage.nativeElement
    if (ficoverImage.files && ficoverImage.files[0]) {
      let fileToUpload = ficoverImage.files[0];
      this.brokerAPIService.upload(this.UrlAPI_Upload, fileToUpload).subscribe(
        data => {
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.objRow.coverImageUrl = this.objAPIResponse.data;
            // this.save();
            this.uploadDetailImage();
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
      // this.objnewsfeed.coverImageUrl = null;
      this.uploadDetailImage();
    }
  }

  //uploadรูปภาพ
  uploadDetailImage() {
    let fidetailImage: any = this.fileInputdetailImage.nativeElement
    if (fidetailImage.files && fidetailImage.files[0]) {
      let fileToUpload = fidetailImage.files[0];
      this.brokerAPIService.upload(this.UrlAPI_Upload, fileToUpload).subscribe(
        data => {
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.objRow.detailImageUrl = this.objAPIResponse.data;
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
      //  this.objnewsfeed.detailImageUrl = null;

      if (this.validate()) {
        this.save();
      }
    }

  }



  btnCloseClick() {
    this.router.navigate([this.Url_Listing, { filter: this.filter }]);
  }


  save() {

    this.objRow.effectiveDate = this.effectiveDate.format("YYYY-MM-DDTHH:mm:ss");
    this.objRow.expireDate = this.expireDate.format("YYYY-MM-DDTHH:mm:ss");
    // this.objRow.coverImageLocation = document.getElementById("file-name").innerHTML
    // this.objRow.detailImageLocation = document.getElementById("fileInputdetailImage-name").innerHTML
    if (this.RowID == "new") {
      //Create
      this.objRow.createBy = localStorage.getItem('firstName');
      this.objRow.updateBy = localStorage.getItem('firstName');
      this.objRow.inActivated = false;
      let strValidate: string = "";
      if (this.objRow.effectiveDate > this.objRow.expireDate || this.objRow.effectiveDate < new Date().toISOString().substring(0, 10)) {
        strValidate = "Error Date";
      }
      if (strValidate != "") {
        this.showDialog("error", "Error", strValidate);
        return false;
      }
      else if (this.objRow.expireDate < this.objRow.effectiveDate) {
        strValidate = "Error Date";
      }
      if (strValidate != "") {
        this.showDialog("error", "Error", strValidate);
        return false;
      }
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
      let strValidate: string = "";
      if (this.objRow.expireDate < this.objRow.effectiveDate) {
        strValidate = "Error Date";
      }
      if (strValidate != "") {
        this.showDialog("error", "Error", strValidate);
        return false;
      }
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