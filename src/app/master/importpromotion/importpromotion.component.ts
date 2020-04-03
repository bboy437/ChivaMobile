import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import 'rxjs/add/operator/map'
import { DataSource } from '@angular/cdk/collections';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Uploadpromotion } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import {
  MatSort,
  MatPaginator,
  MatTableModule,
  MatTableDataSource
} from '@angular/material';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ImportpromotionDialogComponent } from './dialog/importpromotion-dialog/importpromotion-dialog.component';
import {
  MatSnackBar, MatDialog, MatDialogRef, VERSION,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as moment from "moment";
import { Moment } from "moment";
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
  selector: 'app-importpromotion',
  templateUrl: './importpromotion.component.html',
  styleUrls: ['./importpromotion.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class ImportpromotionComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['processDate', 'promotionName', 'enumDesc', 'uploadQty'];
  objRowSelected: Uploadpromotion;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  objRow: any = {};
  arrobjimportpromotion: any = {};
  frDate: any;
  toDate: any;
  private UrlAPI_GetImport: string = "Promotion/GetPromotionForMemberList/";
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
  logType1: Moment = moment();
  logType2: Moment = moment();
  numlogtypeSelected: number = 0;
  isLoadingResults = true;
  objarrProductionOrderListing: any = {};
  objarrYear: any = [];
  objAPIResponse: any = {};
  private Url_Listing: string = "/auth/master/additionalprivilege-listing";
  private UrlAPI_Delete: string = "AdditionalPrivilege/Delete";
  private Url_Detail: string = "/auth/master/importpromotion-detail";

  constructor(
    private brokerAPIService: BrokerAPIService,
    private router: Router,
    private datePipe: DatePipe,
    private dialog: MatDialog,

  ) { }


  ngOnInit() {
    this.frDate = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    this.toDate = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    this.dataSource.filterPredicate = function (data: Uploadpromotion, filter): boolean {
      return data.processDate.toString().includes(filter)
        || data.promotion.promotionName.toLowerCase().includes(filter)
        || data.project.enumDesc.toLowerCase().includes(filter)
        || data.uploadQty.toString().includes(filter);
    };
    this.getProductionOrderList();
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

  StartonChange(event) {
    this.frDate = this.datePipe.transform(event.value, "MM-dd-yyyy");
    console.log(this.UrlAPI_GetImport + this.frDate + "," + this.toDate);
    this.getProductionOrderList();
  }

  EndonChange(event) {
    this.toDate = this.datePipe.transform(event.value, "MM-dd-yyyy");
    console.log(this.UrlAPI_GetImport + this.frDate + "," + this.toDate);
    this.getProductionOrderList();
  }

  private getProductionOrderList() {
    this.isLoadingResults = true;
    this.brokerAPIService
      .get(this.UrlAPI_GetImport + this.frDate + "," + this.toDate)
      .subscribe(data => {
        console.log('data');
        console.log(data);
        if (this.numlogtypeSelected == 0) {
          this.arrobjimportpromotion = data;
        }
        else {
          this.arrobjimportpromotion = data.filter(row => row.logType == this.numlogtypeSelected);
        }
        this.dataSource.data = this.arrobjimportpromotion;
      });
  }

  deleteItem(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let objdelete = this.arrobjimportpromotion.find(
          x => x.id === id
        );
        this.brokerAPIService.post(this.UrlAPI_Delete, objdelete).subscribe(
          data => {
            this.objAPIResponse = <IAPIResponse>data;
            if (this.objAPIResponse.success) {
              this.router.navigate([this.Url_Listing]);
              this.getProductionOrderList();
            }
            else {
              console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
            }
          });
      }
    });
  }


  rowClicked(row: any): void {
    console.log(row);
    this.objRowSelected = <Uploadpromotion>row;
    this.router.navigate([this.Url_Detail, { objRowSelectedName: JSON.stringify(this.objRowSelected), objRowSelected: JSON.stringify(this.objRowSelected.chivaMembers) }]);
    // console.log("this.objRowSelected.id,", this.objRowSelected.id)
    // console.log("objRowSelected", this.objRowSelected.chivaMembers)
  }

  btnNewClick() {
    this.router.navigate(['/auth/master/systemlog-detail', "new"]);
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //   rowClicked(row: any): void {
  //     console.log(row);
  //     this.objRowSelected = <Gift>row;
  //     this.router.navigate([this.Url_Detail, { id: this.objRowSelected.id, filter: this.filter }]);
  // }

  ImportClick() {
    const dialogRef = this.dialog.open(ImportpromotionDialogComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProductionOrderList();
      if (result != undefined) {
        if (result.process != undefined) {
        }
      }
    });
  }


}

