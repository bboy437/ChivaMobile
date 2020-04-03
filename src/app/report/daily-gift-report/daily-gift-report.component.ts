
import { FormControl } from '@angular/forms'
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';
import { Hospital, Gift, SysEnum, Chivamember } from '../../interfaces/sysrecord';
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
import { startWith, map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { values } from 'd3';
import { stringify } from '@angular/core/src/util';

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
  selector: 'app-daily-gift-report',
  templateUrl: './daily-gift-report.component.html',
  styleUrls: ['./daily-gift-report.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class DailyGiftReportComponent implements OnInit {
  date = new FormControl(new Date());
  myControl = new FormControl();
  dialogRef: MatDialogRef<MessageDialogComponent>;
  filterMember: Observable<any[]>;
  objhospital: any = [];
  objhospitalTo: any = [];
  objhospitalFrom: any = [];
  arrobjDailyUsedGift: any = [];
  objAPIResponse: any = {};
  objRowHotpitalto: any = [];
  objRowHotpitalfrom: String;
  objRowHotpitalname: String;
  frDate: any;
  toDate: any;
  hospitalShortName: String;

  private UrlAPI_GetAllHotpital: string = "Chiva/AllHospital";
  private UrlAPI_GetAIDHotpital: string = "Chiva/GetHospital/";
  private Url_Detail: string = "/auth/report/daily-gift-report-detail";
  private UrlAPI_GetDailyUsedGift: string = "Report/GetDailyUsedGift/";

  constructor(
    private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private dialog: MatDialog,

  ) { }


  ngOnInit() {

    this.HospitalNameTo();
    this.hospitalShortName = "Y"
    if (this.hospitalShortName == "Y") {
      this.HospitalNameTo();
      this.HospitalNameFrom();
    }
    
    this.frDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.toDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }

  HospitalNameTo() {
    this.brokerAPIService.get(this.UrlAPI_GetAllHotpital).subscribe(
      data => {
        this.objhospitalTo = <Hospital[]>data.sort((a, b) => {
          if (a.hospitalShortName < b.hospitalShortName) return -1;
          else if (a.hospitalShortName > b.hospitalShortName) return 1;
          else return 0;
        });

        if (this.objhospitalTo.length != (0)) {
          this.objRowHotpitalto = this.objhospitalTo[0].hospitalShortName;
        }
      }
    );
  }

  HospitalNameFrom() {
    this.brokerAPIService.get(this.UrlAPI_GetAllHotpital).subscribe(
      data => {
        this.objhospitalFrom = <Hospital[]>data.sort((a, b) => {
          if (a.hospitalShortName < b.hospitalShortName) return -1;
          else if (a.hospitalShortName > b.hospitalShortName) return 1;
          else return 0;
        });

        if (this.objhospitalFrom.length != (0)) {
          this.objRowHotpitalfrom = this.objhospitalFrom[this.objhospitalFrom.length - 1].hospitalShortName;
          console.log("this.objRowHotpitalfrom", this.objRowHotpitalfrom)
        }

      }
    );
  }

  HospitalName() {
    this.brokerAPIService.get(this.UrlAPI_GetAllHotpital).subscribe(
      data => {
        this.objhospitalTo = <Hospital[]>data.sort((a, b) => {
          if (a.hospitalShortName < b.hospitalShortName) return -1;
          else if (a.hospitalShortName > b.hospitalShortName) return 1;
          else return 0;
        });

        if (this.objhospitalTo.length != (0)) {
          this.objRowHotpitalname = this.objhospitalTo[0].hospitalShortName;
        }
      }
    );
  }


  StartonChange(event) {
    this.frDate = this.datePipe.transform(event.value, "yyyy-MM-dd");
    console.log("frDate", this.frDate)

  }

  EndonChange(event) {
    this.toDate = this.datePipe.transform(event.value, "yyyy-MM-dd");
    console.log("toDate", this.toDate)
  }



  btnHotpitalNameFromClick() {
    this.objRowHotpitalname = undefined;
    this.HospitalNameTo();
    this.HospitalNameFrom();

  }

  btnHotpitalNameClick() {
    this.objRowHotpitalto = undefined;
    this.objRowHotpitalfrom = undefined;
    this.HospitalName();
  }


  btnClear() {
    this.objRowHotpitalto = "";
    this.objRowHotpitalfrom = "";
    this.objRowHotpitalname = "";
    this.frDate = new Date().toISOString().substring(0, 10);
    this.toDate = new Date().toISOString().substring(0, 10);
  }



  btnPrintClick() {
    this.print()
  }

  print() {
    if (this.objRowHotpitalname == undefined) {
      this.brokerAPIService.get(this.UrlAPI_GetDailyUsedGift + this.objRowHotpitalto + "," + this.objRowHotpitalfrom + "," + this.frDate + "," + this.toDate).subscribe(
        data => {
          this.arrobjDailyUsedGift = data;
          let strValidate: string = "";
          if (this.frDate > this.toDate) {
            strValidate = "Error Date";
          }
          if (strValidate != "") {
            this.showDialog("error", "Error", strValidate);
            return false;
          } if (data == (0)) {
            strValidate = "No data";
          }

          if (strValidate != "") {
            this.showDialog("error", "Error", strValidate);
            return false;
          } else {
            this.brokerAPIService.get(this.UrlAPI_GetDailyUsedGift + this.objRowHotpitalto + "," + this.objRowHotpitalfrom + "," + this.frDate + "," + this.toDate).subscribe(
              data => {
                this.router.navigate([this.Url_Detail, {
                  data: JSON.stringify(data),
                  objRowHotpitalto: this.objRowHotpitalto,
                  objRowHotpitalfrom: this.objRowHotpitalfrom,
                  objRowHotpitalname: this.objRowHotpitalname,
                  frDate: this.frDate,
                  toDate: this.toDate
                }]);

              });
          }
        });
    }

    else if (this.objRowHotpitalto == undefined) {
      this.brokerAPIService.get(this.UrlAPI_GetDailyUsedGift + this.objRowHotpitalname + "," + this.objRowHotpitalname + "," + this.frDate + "," + this.toDate).subscribe(
        data => {
          this.arrobjDailyUsedGift = data;
          let strValidate: string = "";
          if (this.frDate > this.toDate) {
            strValidate = "Error Date";
          }
          if (strValidate != "") {
            this.showDialog("error", "Error", strValidate);
            return false;
          } if (data == (0)) {
            strValidate = "No data";
          }
          if (strValidate != "") {
            this.showDialog("error", "Error", strValidate);
            return false;
          } else {
            this.brokerAPIService.get(this.UrlAPI_GetDailyUsedGift + this.objRowHotpitalname + "," + this.objRowHotpitalname + "," + this.frDate + "," + this.toDate).subscribe(
              data => {
                this.router.navigate([this.Url_Detail, {
                  data: JSON.stringify(data),
                  objRowHotpitalto: this.objRowHotpitalto,
                  objRowHotpitalfrom: this.objRowHotpitalfrom,
                  objRowHotpitalname: this.objRowHotpitalname,
                  frDate: this.frDate,
                  toDate: this.toDate
                }]);
              });
          }

        });
    }

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
