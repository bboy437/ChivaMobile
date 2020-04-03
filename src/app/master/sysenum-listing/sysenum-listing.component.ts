import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import 'rxjs/add/operator/map'
import { DataSource } from '@angular/cdk/collections';
import { SysEnum } from '../../interfaces/sysrecord';
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
    selector: 'app-sysenum-listing',
    templateUrl: './sysenum-listing.component.html',
    styleUrls: ['./sysenum-listing.component.scss']
})
export class SysenumListingComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild("fileInput") fileInput;

    dataSource = new MatTableDataSource();
    displayedColumns = ['enumName', 'enumOrder', 'enumDesc', 'enumValue', 'actions'];
    objRowSelected: SysEnum;
    filter:string="";

    isExpansionDetailRow = (i: number, row: Object) =>
        row.hasOwnProperty("detailRow");
    expandedElement: any;

    private UrlAPI_GetAll: string = "SysEnum/GetAll";
    private Url_Detail: string = "/auth/master/sysenum-detail";
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

        this.isLoadingResults = true;
        this.showdata();

    }

    private showdata() {
        
        this.isLoadingResults = true;

        this.dataSource.filterPredicate = function (data: SysEnum, filter): boolean {
            return data.enumOrder.toString().includes(filter)
                || data.enumName.toLowerCase().includes(filter)
                || data.enumDesc.toLowerCase().includes(filter)
                 || data.enumValue.toLowerCase().includes(filter);

        };
        
        let params = this.route.snapshot.paramMap;
        this.isLoadingResults = true;
        this.brokerAPIService.get(this.UrlAPI_GetAll).subscribe(data => {
            this.arrobjPrivilege = data;
            this.dataSource.data = data;

            if(params.get("filter") != null ){
                this.filter = params.get("filter");
              }
              this.dataSource.filter = this.filter;
              this.isLoadingResults = false;
        });

      
    }

    btnNewClick() {
        this.router.navigate([this.Url_Detail, { id: "new", filter: this.filter }]);
    }

    rowClicked(row: any): void {
        console.log(row);
        this.objRowSelected = <SysEnum>row;
        this.router.navigate([this.Url_Detail, { id: this.objRowSelected.id, filter: this.filter } ]);
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

    deleteItem(id: number) {
        const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
            // data: {id: id, title: title, state: state, url: url}
            disableClose: true

        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {

                console.log("this.arrobjPrivilege");
                console.log(this.arrobjPrivilege);
                console.log(id);

                let objdelete = this.arrobjPrivilege.find(
                    x => x.id === id
                );
                console.log("objdelete");
                console.log(objdelete);
                this.router.navigate(['/auth/master/sysenum-listing']);
                this.brokerAPIService.post(this.UrlAPI_Delete, objdelete).subscribe(
                    data => {
                        this.objAPIResponse = <IAPIResponse>data;
                        if (this.objAPIResponse.success) {
                            this.router.navigate(['/auth/master/sysenum-listing']);
                            this.showdata();
                        }
                        else {
                            console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);

                        }
                    });
            }
        });
    }


}