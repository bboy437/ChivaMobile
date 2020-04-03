import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import 'rxjs/add/operator/map'
import { DataSource } from '@angular/cdk/collections';
import { AdditionalPrivilege } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import { IAPIResponse } from '../../interfaces/apiResponse';
import {
    MatSort,
    MatPaginator,
    MatTableModule,
    MatTableDataSource,

} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDeleteDialogComponent } from "../../dialogs/confirm-delete-dialog/confirm-delete-dialog.component";
import { MessageDialogComponent } from "../../dialogs/message-dialog/message-dialog.component";
import { MatSnackBar, MatDialog, MatDialogRef, VERSION } from "@angular/material";

@Component({
    selector: 'app-additionalprivilege-listing',
    templateUrl: './additionalprivilege-listing.component.html',
    styleUrls: ['./additionalprivilege-listing.component.scss']
})
export class AdditionalprivilegeListingComponent implements OnInit, AfterViewInit {

    version = VERSION;
    dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild("fileInput") fileInput;
    filter: string = "";
    dataSource = new MatTableDataSource();
    displayedColumns = [, 'uploadDate', 'hospitalCode', 'privilegeGroupCode', "actions"];
    objRowSelected: AdditionalPrivilege;
    private UrlAPI_GetAll: string = "AdditionalPrivilege/GetAll";
    private Url_Detail: string = "/auth/master/additionalprivilege-detail";
    private Url_Listing: string = "/auth/master/additionalprivilege-listing";
    private UrlAPI_Delete: string = "AdditionalPrivilege/Delete";
    objRow: any = {};
    objoperationInstruction: any = {};
    objAPIResponse: any = {};
    arrobjPrivilege: any = [];
    isLoadingResults = false;

    constructor(
        private brokerAPIService: BrokerAPIService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) { }


    ngOnInit() {
        this.isLoadingResults = true;
        this.dataSource.filterPredicate = function (data: AdditionalPrivilege, filter): boolean {
            return data.uploadDate.toString().includes(filter)
                || data.hospitalCode.toLowerCase().includes(filter)
                || data.privilegeGroupCode.toLowerCase().includes(filter);
        };
        this.showdata();
    }

    private showdata() {
        this.isLoadingResults = true;
        let params = this.route.snapshot.paramMap;
        this.brokerAPIService.get(this.UrlAPI_GetAll).subscribe(data => {
            this.arrobjPrivilege = data;
            this.dataSource.data = data;
            if (params.get("filter") != null) {
                this.filter = params.get("filter");
            }
            this.dataSource.filter = this.filter;
            this.isLoadingResults = false;
        });

    }

    btnPrintClick() {
        let filteredData: any;
        filteredData = this.dataSource.filteredData;
        this.router.navigate(['/auth/master/report-additionalprivilege', { data: JSON.stringify(filteredData)}]);
    }

    btnNewClick() {
        this.router.navigate([this.Url_Detail, { id: "new", filter: this.filter }]);
    }

    rowClicked(row: any): void {
        console.log(row);
        this.objRowSelected = <AdditionalPrivilege>row;
        this.router.navigate([this.Url_Detail, { id: this.objRowSelected.id, filter: this.filter }]);
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }


    deleteItem(id: number) {
        const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let objdelete = this.arrobjPrivilege.find(
                    x => x.id === id
                );
                this.brokerAPIService.post(this.UrlAPI_Delete, objdelete).subscribe(
                    data => {
                        this.objAPIResponse = <IAPIResponse>data;
                        if (this.objAPIResponse.success) {
                            this.router.navigate([this.Url_Listing]);
                            this.showdata();
                        }
                        else {
                            console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
                        }
                    });
            }
        });
    }

    ngAfterViewInit() {
        console.log(this.paginator);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (obj, property) =>
            this.getProperty(obj, property);
        this.dataSource.sort = this.sort;
    }
    getProperty = (obj, path) => path.split(".").reduce((o, p) => o && o[p], obj);



}