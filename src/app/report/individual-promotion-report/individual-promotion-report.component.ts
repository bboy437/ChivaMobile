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
  selector: 'app-individual-promotion-report',
  templateUrl: './individual-promotion-report.component.html',
  styleUrls: ['./individual-promotion-report.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class IndividualPromotionReportComponent implements OnInit {
  myControl = new FormControl();
  date = new FormControl(new Date());
  arrobjMember: any = [];
  arrobjchivacode: any = [];
  objRow: any = {};
  objAPIResponse: any = {};
  dialogRef: MatDialogRef<MessageDialogComponent>;
  filterMember: Observable<any[]>;
  frDate: any;
  toDate: any;
  FromDate: Moment = moment();
  ToDate: Moment = moment();
  arrobjPersonalUsedPromotion: any = [];
  public masksd = [/[0-9]/, /[0-9]/, "-", /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  private UrlAPI_GetAllChivaMember: string = "ChivaMember/GetAll";
  private UrlAPI_GetChivaMember: string = "ChivaMember/Get/";
  private Url_Detail: string = "/auth/report/individual-promotion-report-detail";
  private UrlAPI_GetPersonalUsedPromotion: string = "Report/GetPersonalUsedPromotion/";

  constructor(
    private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {

    this.GetChivaMember();
    this.frDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.toDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");


  }

  keyChivaMember(filterValues: string) {
    console.log("filterValue",filterValues)
    const filterValue = filterValues.toLowerCase();
    let objmember = this.arrobjMember.filter(option =>
      option.chivaCode.toLowerCase().includes(filterValue)
    );
    if (objmember.length == 1) {
      
      console.log(objmember[0].id);
      this.setchivacode(objmember[0].id);
    } else {
      this.arrobjchivacode = [];
    }
    return this.arrobjMember.filter(option =>
      option.chivaCode.toLowerCase().includes(filterValue)

    );
  }

  GetChivaMember() {
    this.brokerAPIService.get(this.UrlAPI_GetAllChivaMember).subscribe(
      data => {
        this.arrobjMember = <Chivamember>data;
        console.log(this.arrobjMember)
        this.filterMember = this.myControl.valueChanges.pipe(
          startWith(""),
          map(value => this._filter(value))
        );
      }
    );
  }


  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    let objmember = this.arrobjMember.filter(option =>
      option.chivaCode.toLowerCase().includes(filterValue)
    );
    if (objmember.length == 1) {
      console.log(objmember[0].id);
      this.setchivacode(objmember[0].id);
    } else {
      this.arrobjchivacode = [];
    }
    return this.arrobjMember.filter(option =>
      option.chivaCode.toLowerCase().includes(filterValue)

    );

  }

  setchivacode(id: number) {
    this.brokerAPIService
      .get(this.UrlAPI_GetChivaMember + String(id))
      .subscribe(data => {
        this.arrobjchivacode = <Chivamember>data;
        console.log("arrobjMember1", this.arrobjchivacode);
      });
  }

  StartonChange(event) {
    this.frDate = this.datePipe.transform(event.value, "yyyy-MM-dd");
    console.log("frDate", this.frDate)

  }

  EndonChange(event) {
    this.toDate = this.datePipe.transform(event.value, "yyyy-MM-dd");
    console.log("toDate", this.toDate)
  }


  btnClearCiick() {
    this.arrobjchivacode = [];
    this.arrobjMember = this.GetChivaMember();
    this.frDate = new Date().toISOString().substring(0, 10);
    this.toDate = new Date().toISOString().substring(0, 10);
  }

  btnPrintClick() {
    this.print();
  }

  print() {

    this.brokerAPIService
      .get(this.UrlAPI_GetPersonalUsedPromotion + this.arrobjMember.chivaCode + "," + this.frDate + "," + this.toDate).subscribe(
        data => {
          this.arrobjPersonalUsedPromotion = data;
          console.log("data", data);
          let strValidate: string = "";
          if (this.frDate > this.toDate) {
            strValidate = "Error Date";
          }
          if (strValidate != "") {
            this.showDialog("error", "Error", strValidate);
            return false;
          } if (data == (0) || this.arrobjMember == "") {
            strValidate = "No data";
          }
          if (strValidate != "") {
            this.showDialog("error", "Error", strValidate);
            return false;

          } else {
            this.brokerAPIService
              .get(this.UrlAPI_GetPersonalUsedPromotion + this.arrobjMember.chivaCode + "," + this.frDate + "," + this.toDate).subscribe(
                data => {
                  this.router.navigate([this.Url_Detail, {
                    data: JSON.stringify(data),
                    chivaCode: this.arrobjMember.chivaCode,
                    firstName: this.arrobjchivacode.firstName,
                    lastName: this.arrobjchivacode.lastName,
                    frDate: this.frDate,
                    toDate: this.toDate
                  }]);
                });
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
