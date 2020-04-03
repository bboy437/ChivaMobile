import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';
import { FormControl, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Gift, Hospital, MemberCardType } from '../../interfaces/sysrecord';
import {
  MatSnackBar, MatDialog, MatDialogRef, VERSION,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from "@angular/material";
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as moment from "moment";
import { Moment } from "moment";


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
  selector: 'app-gift-detail',
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class GiftDetailComponent implements OnInit {

  version = VERSION;
  dialogRef: MatDialogRef<MessageDialogComponent>;
  public isLoadingResults = false;
  objAPIUpload: any = {};
  selectedValue;
  strVarlidate: string = '';
  disabled: boolean = true;
  isReadOnly = true;
  readonly: boolean = true;
  filter: string;
  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};
  hospital: Hospital;
  arrobjhospital: any = [];
  private UrlAPI_GetSingleRow: string = "Gift/Get/";
  private UrlAPI_Update: string = "Gift/Update";
  private UrlAPI_Create: string = "Gift/Create";
  private UrlAPI_Upload: string = "Utility/UploadFile";
  private Url_Listing: string = "/auth/master/gift-listing";
  private UrlAPI_DownloadFile: string = "Utility/DownloadFile/";
  private UrlAPI_GetAllHotpital: string = "Chiva/AllHospital";
  private UrlAPI_GetAllHotpitalID: string = "Chiva/GetHospital/";
  frDate: any;
  toDate: any;
  @ViewChild("fileInputcoverImage") fileInputcoverImage;
  @ViewChild("fileInputdetailImage") fileInputdetailImage;
  isInActive: boolean = false;
  date = new FormControl((new Date()).toISOString())
  serializedDate = new FormControl((new Date()).toISOString())
  giftStartDate: Moment = moment();
  giftEndDate: Moment = moment(new Date()).add(1, 'days');
  defaultHospitalCode: string;
  isAdmin: string;
  arrobjhospitalID: any = [];
  // public masksd = [/[0-2]/, /[0-9]/, "-", /[0-5]/, /[0-9]/];

  constructor(
    private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {

  }
  ngOnInit() {

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

    this.objRow.giftStartDate = new Date().toISOString().substring(0, 10);
    this.objRow.giftEndDate = new Date().toISOString().substring(0, 10);
    this.objRow.claimStatus = "Y";
    this.objRow.giftApproveStatus = "Y";
    this.objRow.claimAmount = 0;
    this.isLoadingResults = true;
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      console.log(params.get('id'));
      this.RowID = params.get('id');
      this.filter = params.get("filter");
      if (this.RowID == "new") {
        this.readonly = true;
        this.localcoverImage = "assets/Untitled-2.jpg";
        this.localdetailImage = "assets/Untitled-1.jpg";
        this.isReadOnly = false;
        this.objRow.giftNo = "<Auto Gen.>";
        this.objRow.coverImageLocation = "No file chosen";
        this.objRow.detailImageLocation = "No file chosen";
        this.objRow.hospitalList = this.arrobjhospital.hospitalName;
        this.objRow.hospitalList = this.arrobjhospitalID.hospitalName;
      }
      else {
        this.brokerAPIService.get(this.UrlAPI_GetSingleRow + this.RowID).subscribe(
          data => {
            this.objRow = <Gift>data;
            this.readonly = false;
            this.getfilecoverImageUrl();
            this.getfiledetailImageUrl();
            this.giftStartDate = moment(this.objRow.giftStartDate);
            this.giftEndDate = moment(this.objRow.giftEndDate);
            this.arrobjhospital.hospitalName = this.objRow.hospitalList
            this.arrobjhospitalID.hospitalName = this.objRow.hospitalList
            this.isReadOnly = false;
            console.log(this.objRow);
          }
        );
      }
    }
    this.isLoadingResults = false;
  }

  removeCommas(){
    this.objRow.claimAmount  = this.objRow.claimAmount .replace(',', '');
  }

  hotpitalClick() {
    this.brokerAPIService.get(this.UrlAPI_GetAllHotpital).subscribe(
      data => {
        this.arrobjhospital = <Hospital>data;
      }
    );
  }

  getfilecoverImageUrl() {
    this.brokerAPIService.downloadImage(this.UrlAPI_DownloadFile + this.objRow.coverImageUrl)
      .subscribe(data => {
        this.DownloadshowPreviewlocalcoverImage(data);
        console.log((data.toString()));
      });
  }


  radiodisble: boolean = false;
  radiodisbleClick1() {
    this.radiodisble = false;

  }

  radiodisbleClick2() {
    this.radiodisble = true;
    this.objRow.claimAmount = 0;

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
    console.log(this.objRow.giftName);
    let strValidate: string = "";

    if (this.objRow.giftName == undefined || this.objRow.giftName == "") {
      strValidate = "Gift Name";

    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;


    } if (this.objRow.claimStatus == undefined || this.objRow.claimStatus == "") {
      strValidate = "Claim Status";

    }

    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;

    } if (this.objRow.giftApproveStatus == undefined || this.objRow.giftApproveStatus == "") {
      strValidate = "Gift Approve Status";

    }

    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;

    } if (this.objRow.coverImageUrl == undefined || this.objRow.coverImageUrl == "") {
      strValidate = "Upload CoverImage File ";

    }

    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);

      return false;

    } if (this.objRow.detailImageUrl == undefined || this.objRow.detailImageUrl == "") {
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

    // let ficoverImage: any = this.fileInputcoverImage.nativeElement
    // console.log(ficoverImage.files)
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


    this.objRow.giftStartDate = this.giftStartDate.format("YYYY-MM-DDTHH:mm:ss");
    this.objRow.giftEndDate = this.giftEndDate.format("YYYY-MM-DDTHH:mm:ss");



    //  this.objRow.coverImageLocation =  this.showPreviewcoverImage('fileInput');
    // this.objRow.coverImageLocation = document.getElementById("file-name").innerHTML 
    if (this.RowID == "new") {
      //Create
      this.objRow.createBy = localStorage.getItem('firstName');
      this.objRow.updateBy = localStorage.getItem('firstName');
      // this.objRow.giftStartDate = this.readonly
      this.objRow.giftNo = "<Auto Gen.>";

      let strValidate: string = "";
      if (this.objRow.giftStartDate > this.objRow.giftEndDate || this.objRow.giftStartDate < new Date().toISOString().substring(0, 10)) {
        strValidate = "Error Date";
      }

      if (strValidate != "") {
        this.showDialog("error", "Error", strValidate);
        return false;
      }

      else if (this.objRow.giftEndDate < this.objRow.giftStartDate) {
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

      let strValidate: string = "";

      if (this.objRow.giftEndDate < this.objRow.giftStartDate) {
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