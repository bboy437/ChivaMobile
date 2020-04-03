import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import 'rxjs/add/operator/map'
import { DataSource } from '@angular/cdk/collections';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SystemLog } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import {
  MatSort,
  MatPaginator,
  MatTableModule,
  MatTableDataSource
} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-systemlog',
  templateUrl: './systemlog.component.html',
  styleUrls: ['./systemlog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class SystemlogComponent implements OnInit {

  // aa :any = {};
  dataSource = new MatTableDataSource();
  displayedColumns = ['logDateTime', 'logType', 'errorMessage'];

  // displayedColumns1 = [{}];
  objRowSelected: SystemLog;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  objRow: any = {};
  arrobjSyslog: any = {};
  frDate: any;
  toDate: any;
  private UrlAPI_GetSyslog: string = "Utility/GetSystemLog/";
  private Url_Detail: string = "/auth/master/systemlog-detail";
  startDate = new Date(1990, 0, 1);
  date = new FormControl(new Date());
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


  numlogtypeSelected: number = 0;
  isLoadingResults = false;
  objarrProductionOrderListing: any = {};
  objarrYear: any = [];

  logType1: Moment = moment();
  logType2: Moment = moment();
  logDateTime1: string;

  constructor(private brokerAPIService: BrokerAPIService, private router: Router
    , private datePipe: DatePipe, private route: ActivatedRoute, ) {


  }



  ngOnInit() {
    this.isLoadingResults = true;
    this.frDate = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    this.toDate = this.datePipe.transform(new Date(), "MM-dd-yyyy");


    this.getProductionOrderList();
    this.isLoadingResults = false;

  }

  btnNewClick() {
    this.router.navigate(['/auth/master/systemlog-detail', "new"]);
  }


  rowClicked(row: any): void {
    console.log(row);
    this.objRowSelected = <SystemLog>row;
    this.router.navigate([this.Url_Detail, {
      logDateTime: this.objRowSelected.logDateTime,
      logType: this.objRowSelected.logType,
      errorMessage: this.objRowSelected.errorMessage,
      targetSite: this.objRowSelected.targetSite,
    }]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  eventss: string[] = [];

  addEvents(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public onDate(event): void {
    this.objRowSelected.logDateTime = event;
    this.brokerAPIService.get(this.objRow.logDateTime);
  }

  SystemlogChange(logType) {
    console.log(logType)
    this.numlogtypeSelected = logType;
    this.getProductionOrderList();
  }



  StartonChange(event) {
    this.frDate = this.datePipe.transform(event.value, "MM-dd-yyyy");
    console.log("frDate", this.frDate)
    console.log(this.UrlAPI_GetSyslog + this.frDate + "," + this.toDate);
    this.getProductionOrderList();
  }

  EndonChange(event) {
    this.toDate = this.datePipe.transform(event.value, "MM-dd-yyyy");
    console.log(this.UrlAPI_GetSyslog + this.frDate + "," + this.toDate);
    this.getProductionOrderList();
  }


  private getProductionOrderList() {
    this.isLoadingResults = true;
    let params = this.route.snapshot.paramMap;

    this.brokerAPIService
      .get(this.UrlAPI_GetSyslog + this.frDate + "," + this.toDate)
      .subscribe(data => {

        if (this.numlogtypeSelected == 0) {
          this.arrobjSyslog = data;
        }
        else {
          this.arrobjSyslog = data.filter(row => row.logType == this.numlogtypeSelected);
        }
        this.dataSource.data = this.arrobjSyslog;

        // if (params.get("logDateTime") != null) {
        //   this.logDateTime1 = params.get('logDateTime')

        // }
        // this.logType1 = moment(this.logDateTime1)
        // console.log("logytype1", moment(this.logDateTime1))
     

      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
