import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';
import { FormControl, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Promotion, Hospital, MemberCardType, Redeem } from '../../interfaces/sysrecord';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { RedeemListingComponent } from './dialog/redeem-listing/redeem-listing.component';
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
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class PromotionDetailComponent implements OnInit {
  objRowSelected: Redeem;
  version = VERSION;
  dialogRef: MatDialogRef<MessageDialogComponent>;
  public isLoadingResults = false;
  objAPIUpload: any = {};
  filter: string;
  strVarlidate: string = '';
  isReadOnly = true;
  readonly: boolean = true;
  date = new FormControl((new Date()).toISOString())
  serializedDate = new FormControl((new Date()).toISOString())
  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};
  objReedeem: any = [];
  private UrlAPI_GetSingleRow: string = "Promotion/Get/";
  private UrlAPI_Update: string = "Promotion/Update";
  private UrlAPI_Create: string = "Promotion/Create";
  private UrlAPI_Upload: string = "Utility/UploadFile";
  private Url_Listing: string = "/auth/master/promotion-listing";
  private UrlAPI_DownloadFile: string = "Utility/DownloadFile/";
  arrobjhospital: any = [];
  private UrlAPI_GetAllHotpital: string = "Chiva/AllHospital";
  memberCardtype: MemberCardType;
  arrobjmemberCardtype: any = [];
  private UrlAPI_GetAllMemberCardType: string = "Chiva/AllMemberCardType";
  private UrlAPI_GetAllHotpitalID: string = "Chiva/GetHospital/";
  ispromotionTypeBrochure: boolean = false;
  ispromotionTypeRedeem: boolean = false;
  ismemberNotRenewStatus: boolean = false;
  @ViewChild("fileInputcoverImage") fileInputcoverImage;
  @ViewChild("fileInputdetailImage") fileInputdetailImage;
  arrPromotionGroupForHospital: any = [];
  monthOfBirth: string; // : number = 0;
  isAdmin: string;
  arrobjhospitalID: any = [];
  paStartDate: Moment = moment();
  paEndDate: Moment = moment(new Date()).add(1,'days');
  defaultHospitalCode: string;

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

    this.isLoadingResults = true;
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

    this.objRow.age = "N";
    this.objRow.showByLocation = "N";

    this.MemberCardTypeClick();

    if (this.ispromotionTypeRedeem === false) {
      this.exampleFlag = true;
    }
    else if (this.ispromotionTypeRedeem === true) {
      this.exampleFlag = true;
    }

    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      console.log(params.get('id'));
      this.RowID = params.get('id');
      this.filter = params.get("filter");
      if (this.RowID == "new") {
        this.localcoverImage = "assets/Untitled-2.jpg";
        this.localdetailImage = "assets/Untitled-1.jpg";
        this.isReadOnly = false;
        this.objRow.promotionNo = "<Auto Gen.>";
        this.objRow.coverImageLocation = "No file chosen";
        this.objRow.detailImageLocation = "No file chosen";
      }
      else {
        this.isLoadingResults = true;
        this.brokerAPIService.get(this.UrlAPI_GetSingleRow + this.RowID).subscribe(
          data => {
            this.objRow = <Promotion>data;
            this.objReedeem = <Redeem[]>data;
            this.getfilecoverImageUrl();
            this.getfiledetailImageUrl();
            this.paStartDate = moment(this.objRow.paStartDate);
            this.paEndDate = moment(this.objRow.paEndDate);
            this.isReadOnly = false;
            console.log(this.objRow);
            console.log(this.objReedeem);
            if (this.objRow.promotionTypeRedeem === "Y") {
              this.ispromotionTypeRedeem = true;
              this.exampleFlag = false;
            } if (this.objRow.promotionTypeRedeem === "N") {
              this.ispromotionTypeRedeem = false;
              this.exampleFlag = true;
            }
            if (this.objRow.promotionTypeRedeem === "N") {
              this.ispromotionTypeBrochure = true;
            } if (this.objRow.promotionTypeRedeem === "Y") {
              this.ispromotionTypeBrochure = false;
            }
            if (this.objRow.memberNotRenewStatus === "Y") {
              this.ismemberNotRenewStatus = true;
            } else if (this.objRow.memberNotRenewStatus === "N") {
              this.ismemberNotRenewStatus = false;
            }
            if (this.objRow.hospitalList = false) {
              this.exampleFlag1 = true;
            }
            else {
              this.exampleFlag1 = false;
            }
            this.monthOfBirth = String(this.objRow.monthOfBirth);
            this.isLoadingResults = false;
          }
        );
      }
    }
    this.isLoadingResults = false;
  }


  btnRedeemClick(id: any): void {
    const dialogRef = this.dialog.open(RedeemListingComponent, {
      // data:this.objReedeem = <Promotion>id,
      data: this.RowID,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.process != undefined) {
        }
      }
    });
  }



  MemberCardTypeClick() {
    this.brokerAPIService.get(this.UrlAPI_GetAllMemberCardType).subscribe(
      data => {
        this.arrobjmemberCardtype = <MemberCardType[]>data;
      }
    );
  }

  hotpitalClick() {
    this.brokerAPIService.get(this.UrlAPI_GetAllHotpital).subscribe(
      data => {
        this.arrobjhospital = <Hospital[]>data;
      }
    );
  }


  CheckBoxpromotionTypeRedeem() {
    if (this.ispromotionTypeRedeem === true) {
      this.objRow.promotionTypeRedeem = "Y";
      this.exampleFlag = false;

    } if (this.ispromotionTypeRedeem === false) {
      this.objRow.promotionTypeRedeem = "N";
      this.exampleFlag = true;
    }

    if (this.ispromotionTypeRedeem === true) {
      this.objRow.promotionTypeBrochure = "N";

    } if (this.ispromotionTypeRedeem === false) {
      this.objRow.promotionTypeRedeem = "Y";
    }
  }

  CheckBoxmemberNotRenewStatus() {
    if (this.ismemberNotRenewStatus === true) {
      this.objRow.memberNotRenewStatus = "Y";

    } else if (this.ismemberNotRenewStatus === false) {
      this.objRow.memberNotRenewStatus = "N";
    }
  }

  radiodisble = false;
  radiodisbleClick(x) {
    if (x == 1) {
      this.radiodisble = true;
      this.objRow.ageFrom = '';
      this.objRow.ageTo = '';
    }
    else {
      this.radiodisble = false;
    }
  }


  exampleFlag1 = false;
  radio1disbleClick(x) {

    if (x == 1) {
      this.exampleFlag1 = true;
      this.objRow.hospitalName = '';
      this.objRow.hospitalList = '';
    }
    else {

      this.exampleFlag1 = false;
    }
  }
  exampleFlag = false;


  getfilecoverImageUrl() {
    this.isLoadingResults = true;
    this.brokerAPIService.downloadImage(this.UrlAPI_DownloadFile + this.objRow.coverImageUrl)
      .subscribe(data => {
        this.DownloadshowPreviewlocalcoverImage(data);
        console.log((data.toString()));
        this.isLoadingResults = false;
      });
    // }

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
    this.isLoadingResults = true;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.localcoverImage = reader.result;
      console.log('this.localcoverImage = reader.result');
    }, false);
    if (image) {
      reader.readAsDataURL(image);
      this.isLoadingResults = false;
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
    if (fileInput.target.files && fileInput.target.files[0]) {
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
            //  this.save();
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

  ageform: String;

  validate() {

    let strValidate: string = "";
    if (this.objRow.promotionName == undefined || this.objRow.promotionName == "") {
      strValidate = "Promotion Name";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    } if (this.objRow.promotionGroup == undefined || this.objRow.promotionGroup == "") {
      strValidate = "Promotion Group";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    } if (this.objRow.showByLocation == undefined || this.objRow.showByLocation == "") {
      strValidate = "Show By Location";
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


  btnSaveClick() {
    this.uploadCoverImage();
  }

  btnCloseClick() {
    this.router.navigate([this.Url_Listing, { filter: this.filter }]);
  }

  redeemQty: string;
  save() {

    if (this.ispromotionTypeRedeem === true) {
      this.objRow.promotionTypeRedeem = "Y";
      this.exampleFlag = false;
    } else if (this.ispromotionTypeRedeem === false) {
      this.objRow.promotionTypeRedeem = "N";
      this.exampleFlag = false;
    }

    if (this.ispromotionTypeRedeem === true) {
      this.objRow.promotionTypeBrochure = "N";
    } else if (this.ispromotionTypeRedeem === false) {
      this.objRow.promotionTypeBrochure = "Y";
    }

    if (this.ismemberNotRenewStatus === true) {
      this.objRow.memberNotRenewStatus = "Y";

    } else if (this.ismemberNotRenewStatus === false) {
      this.objRow.memberNotRenewStatus = "N";
    }
    this.objRow.monthOfBirth = Number(this.monthOfBirth);
    this.objRow.paStartDate = this.paStartDate.format("YYYY-MM-DDTHH:mm:ss");
    this.objRow.paEndDate = this.paEndDate.format("YYYY-MM-DDTHH:mm:ss");
    this.objRow.promotionGroupForHospital = this.arrPromotionGroupForHospital;

    if (this.RowID == "new") {
      this.objRow.createBy = localStorage.getItem('firstName');
      this.objRow.updateBy = localStorage.getItem('firstName');
      this.objRow.promotionNo = "";

      let strValidate: string = "";
      if (this.objRow.paStartDate > this.objRow.paEndDate || this.objRow.paStartDate < new Date().toISOString().substring(0, 10)) {
        strValidate = "Error Date";
      }
      if (strValidate != "") {
        this.showDialog("error", "Error", strValidate);
        return false;
      }
      if (this.objRow.paEndDate < this.objRow.paStartDate) {
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
      if (this.objRow.paEndDate < this.objRow.paStartDate) {
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
}


