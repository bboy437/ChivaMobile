import { FormControl } from '@angular/forms'
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';
import { Hospital, Gift, SysEnum, Promotion } from '../../interfaces/sysrecord';
import {
  MatSnackBar, MatDialog, MatDialogRef, VERSION,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from "@angular/material";
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import * as moment from "moment";

@Component({
  selector: 'app-memberlist-promotion-report',
  templateUrl: './memberlist-promotion-report.component.html',
  styleUrls: ['./memberlist-promotion-report.component.scss']
})
export class MemberlistPromotionReportComponent implements OnInit {

  date = new FormControl(new Date());
  hospital: Hospital;
  arrobjhospital: any = [];
  objRow: any = {};
  objAPIResponse: any = {};
  private UrlAPI_GetAllHotpital: string = "Chiva/AllHospital";
  private UrlAPI_GetAllGift: string = "Gift/GetAll";
  private UrlAPI_Getsysenumname: string = "/SysEnum/GetListByEnumName/ProjectForPromotion";
  arrobjHospital1: string;
  arrobjHospital2: string;
  arrobjpromotion: any = [];
  private UrlAPI_Getpromation: string = "Promotion/GetAll";
  gift: Gift;
  arrobjgift: any = [];
  private Url_Detail: string = "/auth/report/memberlist-promotion-report-detail";
  private UrlAPI_GetMemberPromotion: string =
    "Report/GetMemberGotPromotion/";
  sysEnum: SysEnum;
  arrobjsysEnum: any = [];
  arrobjMemberGotPromotion: any = [];

  dialogRef: MatDialogRef<MessageDialogComponent>;

  constructor(private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.PromptionClick();
    this.Privilegeroupclick();
  }

  PromptionClick() {
    this.brokerAPIService.get(this.UrlAPI_Getpromation).subscribe(
      data => {
        this.arrobjpromotion = <Promotion>data;

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
    this.arrobjpromotion.id = "";
    this.arrobjsysEnum.id = "";
  }


  btnPrintClick() {

    this.brokerAPIService
      .get(this.UrlAPI_GetMemberPromotion + this.arrobjpromotion.id + "," + this.arrobjsysEnum.id).subscribe(
        data => {
          this.arrobjMemberGotPromotion = data;
         
          this.arrobjMemberGotPromotion.forEach(element => {
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
            return false

          } else {

            this.arrobjMemberGotPromotion.unshift(
              {
                chivaCode: { "type": "string", "caption": "Chiva Code" },
                memberName: { "type": "string", "caption": "ชื่อ-นามสกุล" },
                processDate: { "type": "string", "caption": "วันที่นำเข้า" },
                hospitalName: { "type": "string", "caption": "สังกัด รพ." },
                usedDate: { "type": "string", "caption": "วันที่ใช้สิทธิ์" },
              }
            );
            this.router.navigate([this.Url_Detail, {
              arrobjpromotion: this.arrobjpromotion.id,
              arrobjsysEnum: this.arrobjsysEnum.id,
              data: JSON.stringify(this.arrobjMemberGotPromotion),
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
