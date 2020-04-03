import { FormControl } from '@angular/forms'
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';
import { Hospital, Gift, SysEnum } from '../../interfaces/sysrecord';
import {
  MatSnackBar, MatDialog, MatDialogRef, VERSION,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from "@angular/material";
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
import * as moment from "moment";
import { Moment } from "moment";

@Component({
  selector: 'app-memberlist-gift-report',
  templateUrl: './memberlist-gift-report.component.html',
  styleUrls: ['./memberlist-gift-report.component.scss']
})
export class MemberlistGiftReportComponent implements OnInit {

  date = new FormControl(new Date());
  hospital: Hospital;
  arrobjhospital: any = [];
  objRow: any = {};
  objAPIResponse: any = {};
  private UrlAPI_GetAllHotpital: string = "Chiva/AllHospital";
  private UrlAPI_GetAllGift: string = "Gift/GetAll";
  private UrlAPI_Getsysenumname: string = "/SysEnum/GetListByEnumName/ProjectForGift";
  private UrlAPI_GetGift: string = "Gift/Get/";
  private UrlAPI_GetEnum: string = "SysEnum/Get/";
  private UrlAPI_GetMemberGetGift: string =
    "Report/GetMemberGotGift/";
  private Url_Detail: string = "/auth/report/memberlist-gift-report-detail";
  arrobjHospital1: string;
  arrobjHospital2: string;

  gift: Gift;
  arrobjgift: any = [];
  arrobjgiftShortName: String;
  sysEnum: SysEnum;
  arrobjsysEnum: any = [];
  arrobjsysEnumShortName: String;
  objgift: any = [];
  objEnum: any = [];
  arrobjMemberGetGift: any = [];

  dialogRef: MatDialogRef<MessageDialogComponent>;

  constructor(private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.giftClick();
    this.Privilegeroupclick();
  }

  giftClick() {
    this.brokerAPIService.get(this.UrlAPI_GetAllGift).subscribe(
      data => {
        this.arrobjgift = <Gift>data;
        console.log(this.arrobjgift);
      }
    );
  }
  Privilegeroupclick() {
    this.brokerAPIService.get(this.UrlAPI_Getsysenumname).subscribe(
      data => {
        this.arrobjsysEnum = <SysEnum>data;
        console.log(this.arrobjsysEnum);

      }
    );
  }

  btnClearCiick() {
    this.arrobjgift.id = "";
    this.arrobjsysEnum.id = "";
  }

  btnCheckData() {


  }

  btnPrintClick() {

    this.brokerAPIService
      .get(this.UrlAPI_GetMemberGetGift + this.arrobjgift.id + "," + this.arrobjsysEnum.id).subscribe(
        data => {
          this.arrobjMemberGetGift = data;
          console.log("data", data);

          this.arrobjMemberGetGift.forEach(element => {
            if (element.usedDate <= ('1900-01-01T00:00:00')) {
              element.usedDate = undefined
            } else {
              element.usedDate = moment(element.usedDate).format("DD/MM/YYYY");
            }
            if (element.processDate <= ('1900-01-01T00:00:00')) {
              element.processDate = undefined
            } else {
              element.processDate = moment(element.processDate).format("DD/MM/YYYY");
            }
          });

          let strValidate: string = "";
          if (data == (0)) {
            strValidate = "No data";
          }

          if (strValidate != "") {
            this.showDialog("error", "Error", strValidate);
            return false;


          } else {
            // this.router.navigate([this.Url_Detail, {
            //   arrobjgift: this.arrobjgift.id,
            //   arrobjsysEnum: this.arrobjsysEnum.id

            // }]);

            this.arrobjMemberGetGift.unshift(
              {
                chivaCode: { "type": "string", "caption": "Chiva Code" },
                memberName: { "type": "string", "caption": "ชื่อ-นามสกุล" },
                processDate: { "type": "string", "caption": "วันที่นำเข้า" },
                hospitalName: { "type": "string", "caption": "สังกัด รพ." },
                usedDate: { "type": "string", "caption": "วันที่ใช้สิทธิ์" },

              }

            );

            this.router.navigate([this.Url_Detail, {
              data: JSON.stringify(this.arrobjMemberGetGift),
              arrobjgift: this.arrobjgift.id,
              arrobjsysEnum: this.arrobjsysEnum.id

            }]);


          }

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
