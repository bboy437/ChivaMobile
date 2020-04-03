import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Uploadpromotion, PromotionForMemberDetailList } from '../../interfaces/sysrecord';
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

import { Observable } from 'rxjs/Observable';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmDeleteDialogComponent } from '../../dialogs/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-importpromotion-detail',
  templateUrl: './importpromotion-detail.component.html',
  styleUrls: ['./importpromotion-detail.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class ImportpromotionDetailComponent implements OnInit {

  displayedColumns = ['select', 'chivaCode'];
  objRowSelected: Uploadpromotion;
  arrobjimportpromotion: any = {};
  arrobjimportpromotionName: any = {};
  arrobjPromotionForMemberDetailList: any = [];
  isLoadingResults = true;;
  objAPIResponse: any = {};
  promotionForMemberId: String;
  processDate: Moment = moment();
  arrobjdelete: any = [];
  private UrlAPI_GetPromotionForMemberDetailList: string = "Promotion/GetPromotionForMemberDetailList/";
  private Url_Listing: string = "/auth/master/importpromotion";
  private UrlAPI_Delete: string = "Promotion/DeletePromotionForMember";
  @ViewChild(MatSort) sortForDataSource: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Uploadpromotion>(this.arrobjPromotionForMemberDetailList);
  selection = new SelectionModel<Uploadpromotion>(true, []);

  constructor(
    private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.isAllSelected();
    let params = this.route.snapshot.paramMap;

    if (params.has('objRowSelectedName')) {
      this.arrobjimportpromotionName = JSON.parse(params.get('objRowSelectedName'))
      this.processDate = moment(this.arrobjimportpromotionName.processDate);
      console.log("arrobjimportpromotionName", this.arrobjimportpromotionName);
    }

    if (params.has('objRowSelected')) {
      this.arrobjimportpromotion = JSON.parse(params.get('objRowSelected'));
      this.promotionForMemberId = this.arrobjimportpromotion[0].promotionForMemberId
      this.GetromotionForMemberDetailList();
      console.log("arrobjimportpromotion", this.arrobjimportpromotion[0].promotionForMemberId);
    }


  }

  GetromotionForMemberDetailList() {
    this.brokerAPIService.get(this.UrlAPI_GetPromotionForMemberDetailList + this.promotionForMemberId).subscribe(
      data => {
        this.arrobjPromotionForMemberDetailList = data;
        this.dataSource.data = data;
        console.log("data", this.arrobjPromotionForMemberDetailList)

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
