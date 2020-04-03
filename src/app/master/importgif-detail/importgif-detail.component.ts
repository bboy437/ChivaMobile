import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Giftimport, PromotionForMemberDetailList } from '../../interfaces/sysrecord';
import {
  MatSort,
  MatPaginator,
  MatTableModule,
  MatTableDataSource
} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';
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

import { ConfirmDeleteDialogComponent } from '../../dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-importgif-detail',
  templateUrl: './importgif-detail.component.html',
  styleUrls: ['./importgif-detail.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class ImportgifDetailComponent implements OnInit {

  displayedColumns = ['select', 'chivaCode'];
  objRowSelected: Giftimport;
  arrobjimportGift: any = {};
  arrobjimportGiftName: any = {};
  arrobjGiftForMemberDetailList: any = [];
  isLoadingResults = true;;
  objAPIResponse: any = {};
  giftForMemberId: String;
  processDate: Moment = moment();
  arrobjdelete: any = [];
  private UrlAPI_GetGiftForMemberDetailList: string = "Gift/GetGiftForMemberDetailList/";
  private Url_Listing: string = "/auth/master/importgif";
  private UrlAPI_Delete: string = "Gift/DeleteGiftForMember";
  @ViewChild(MatSort) sortForDataSource: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Giftimport>(this.arrobjGiftForMemberDetailList);
  selection = new SelectionModel<Giftimport>(true, []);

  constructor(
    private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {

    let params = this.route.snapshot.paramMap;
    if (params.has('objRowSelectedName')) {
      this.arrobjimportGiftName = JSON.parse(params.get('objRowSelectedName'))
      this.processDate = moment(this.arrobjimportGiftName.processDate);
      console.log("arrobjimportGiftName", this.arrobjimportGiftName);
    }
    if (params.has('objRowSelected')) {
      this.arrobjimportGift = JSON.parse(params.get('objRowSelected'));
      this.giftForMemberId = this.arrobjimportGift[0].giftForMemberId
      this.GetromotionForMemberDetailList();
      console.log("arrobjimportpromotion", this.arrobjimportGift[0].giftForMemberId);
    }

  }

  GetromotionForMemberDetailList() {
    this.brokerAPIService.get(this.UrlAPI_GetGiftForMemberDetailList + this.giftForMemberId).subscribe(
      data => {
        this.arrobjGiftForMemberDetailList = data;
        this.dataSource.data = data;
        console.log("data", this.arrobjGiftForMemberDetailList)

      }
    );
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

  btnCloseClick() {
    this.router.navigate([this.Url_Listing]);
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }



  removeSelectedRows() {
    this.arrobjdelete = [];
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selection.selected.forEach(item => {
          console.log("item", item)
          this.arrobjdelete.push(item);
        });

        console.log("arrobjdelete", this.arrobjdelete)
        this.brokerAPIService.post(this.UrlAPI_Delete, this.arrobjdelete).subscribe(
          data => {
            this.objAPIResponse = <IAPIResponse>data;
            if (this.objAPIResponse.success) {
              this.selection.clear();
              this.GetromotionForMemberDetailList()
            }
            else {
              console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
            }
          });

      }

    });
  }



}
