import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import 'rxjs/add/operator/map'
import { DataSource } from '@angular/cdk/collections';
import { GetAllChivaUser } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import { IAPIResponse } from '../../interfaces/apiResponse';
import {
    MatSort,
    MatPaginator,
    MatTableModule,
    MatTableDataSource,
    MatDialog
} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDeleteDialogComponent } from "../../dialogs/confirm-delete-dialog/confirm-delete-dialog.component";
import { MessageDialogComponent } from "../../dialogs/message-dialog/message-dialog.component";

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("fileInput") fileInput;

  dataSource = new MatTableDataSource();
  displayedColumns = ['userName', 'employeeCode', 'firstName', 'inActivated'];
  objRowSelected: any;
  filter:string="";

  isExpansionDetailRow = (i: number, row: Object) =>
      row.hasOwnProperty("detailRow");
  expandedElement: any;

  private UrlAPI_GetAll: string = "Account/GetAllChivaUser";
  private Url_Detail: string = "/auth/master/user-detail";
  private UrlAPI_Delete: string = "SysEnum/Delete";

  objRow: any = {};
  objoperationInstruction: any = {};
  objAPIResponse: any = {};
  arrobjPrivilege: any = [];

  public isLoadingResults = false;

  constructor(
      private brokerAPIService: BrokerAPIService,
      private route: ActivatedRoute,
      private router: Router,
      private dialog: MatDialog,
  ) { }


  ngOnInit() {

      // this.isLoadingResults = true;
      this.showdata();

  }

  private showdata() {
      
      // this.isLoadingResults = true;

      this.dataSource.filterPredicate = function (data: GetAllChivaUser, filter): boolean {
          return data.userName.toLowerCase().includes(filter)
              || data.employeeCode.toLowerCase().includes(filter)
              || data.firstName.toLowerCase().includes(filter);
            //    || data.isAdmin.to().includes(filter);

      };
      
      let params = this.route.snapshot.paramMap;

      this.brokerAPIService.get(this.UrlAPI_GetAll).subscribe(data => {
          this.arrobjPrivilege = data;
          this.dataSource.data = data;

        //   if(params.get("filter") != null ){
        //       this.filter = params.get("filter");
        //     }
            this.dataSource.filter = this.filter;
  
      });

    
  }

  btnNewClick() {
      this.router.navigate([this.Url_Detail, { id: "new"}]);
  }

  rowClicked(row: any): void {
    //  console.log(row);
      this.objRowSelected = row;
      this.router.navigate([this.Url_Detail, {id: this.objRowSelected.userName,objRowSelected: JSON.stringify(this.objRowSelected) } ]);
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


}
