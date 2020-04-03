import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DATEPICKER_HELPERS } from './helpers.data';
import { BrokerAPIService } from '../../services/brokerapi.service';
import 'rxjs/add/operator/map'
import { DataSource } from '@angular/cdk/collections';
import { Giftimport } from '../../interfaces/sysrecord';
import { Gift } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import { PopupComponent } from './popup/popup.component';
import {
  MatSort,
  MatPaginator, MatSnackBar, MatTableDataSource, MatDialog, MatDialogRef, VERSION,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as moment from "moment";
import { Moment } from "moment";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmDeleteDialogComponent } from '../../dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { IAPIResponse } from '../../interfaces/apiResponse';
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
  selector: 'app-importgif',
  templateUrl: './importgif.component.html',
  styleUrls: ['./importgif.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class ImportgifComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['processDate', 'giftName', 'enumDesc', 'uploadQty'];
  objRowSelected: Giftimport;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  objRow: any = {};
  arrobjSyslog: any = {};
  frDate: any;
  toDate: any;
  private UrlAPI_GetSyslog: string = "Gift/GetGiftForMemberList/";
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
  isLoadingResults = true;
  objarrProductionOrderListing: any = {};
  objarrYear: any = [];
  logType1: Moment = moment();
  logType2: Moment = moment();
  reload = false;
  objAPIResponse: any = {};
  private Url_Listing: string = "/auth/master/additionalprivilege-listing";
  private UrlAPI_Delete: string = "AdditionalPrivilege/Delete";
  private Url_Detail: string = "/auth/master/importgif-detail";

  constructor(
    private brokerAPIService: BrokerAPIService,
    private router: Router,
    private datePipe: DatePipe,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.isLoadingResults = true;
    this.showdata();
  }

  pageRefresh() {
    location.reload();
    this.showdata();
  }

  private showdata() {
    this.isLoadingResults = true;
    this.frDate = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    this.toDate = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    this.dataSource.filterPredicate = function (data: Giftimport, filter): boolean {
      return data.processDate.toString().includes(filter)
        || data.gift.giftName.toLowerCase().includes(filter)
        || data.project.enumDesc.toLowerCase().includes(filter)
        || data.uploadQty.toString().includes(filter);
    };
    this.getProductionOrderList();
    this.isLoadingResults = false;
  }

  btnNewClick() {
    this.router.navigate(['/auth/master/systemlog-detail', "new"]);
  }

  rowClicked(row: any): void {
    console.log(row);
    this.objRowSelected = <Giftimport>row;
    this.router.navigate([this.Url_Detail, { objRowSelectedName: JSON.stringify(this.objRowSelected), objRowSelected: JSON.stringify(this.objRowSelected.chivaMembers) }]);
  }

  // rowClicked(row: any): void {
  //   console.log(row);
  //   this.objRowSelected = <Uploadpromotion>row;
  //   this.router.navigate([this.Url_Detail, { objRowSelectedName: JSON.stringify(this.objRowSelected), objRowSelected: JSON.stringify(this.objRowSelected.chivaMembers) }]);
  //   // console.log("this.objRowSelected.id,", this.objRowSelected.id)
  //   // console.log("objRowSelected", this.objRowSelected.chivaMembers)
  // }

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
    this.objRowSelected.processDate = event;
    this.brokerAPIService.get(this.objRow.processDate);
  }

  SystemlogChange(logType) {
    console.log(logType)
    this.numlogtypeSelected = logType;
    this.getProductionOrderList();
  }

  StartonChange(event) {
    this.frDate = this.datePipe.transform(event.value, "MM-dd-yyyy");
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
    this.brokerAPIService
      .get(this.UrlAPI_GetSyslog + this.frDate + "," + this.toDate)
      .subscribe(data => {
        console.log('data');
        console.log(data);
        if (this.numlogtypeSelected == 0) {
          this.arrobjSyslog = data;
        }
        else {
          this.arrobjSyslog = data.filter(row => row.logType == this.numlogtypeSelected);
        }
        this.dataSource.data = this.arrobjSyslog;
      });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ImportClick() {
    const dialogRef = this.dialog.open(PopupComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getProductionOrderList();
    });
  }

}

