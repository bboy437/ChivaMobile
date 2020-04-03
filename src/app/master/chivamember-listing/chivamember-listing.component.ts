import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import 'rxjs/add/operator/map'
import { DataSource } from '@angular/cdk/collections';
import { Chivamember } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import {
    MatSort,
    MatPaginator,
    MatTableModule,
    MatTableDataSource,
    MatDialog,
    MatDialogRef
} from '@angular/material';
import { Router } from '@angular/router';
import { ChivamemberListingDialogComponent } from './dialog/chivamember-listing-dialog/chivamember-listing-dialog.component';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';


@Component({
    selector: 'app-chivamember-listing',
    templateUrl: './chivamember-listing.component.html',
    styleUrls: ['./chivamember-listing.component.scss']
})
export class ChivamemberListingComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource = new MatTableDataSource();
    displayedColumns = ['chivaCode', 'prefixName', 'bloodGroup', 'inActivated'];
    objRowSelected: Chivamember;
    private UrlAPI_GetAll: string = "ChivaMember/GetAll";
    private Url_Detail: string = "/auth/master/chivamember-detail";
    dialogRef: MatDialogRef<MessageDialogComponent>;

    constructor(
        private brokerAPIService: BrokerAPIService,
        private router: Router,
        private dialog: MatDialog, ) {

    }

    ngOnInit() {
        this.brokerAPIService.get(this.UrlAPI_GetAll).subscribe(
            data => {
                this.dataSource.data = data;
            }
        );
    }

    btnNewClick() {
        this.router.navigate(['/auth/master/chivamember-detail', "new"]);
    }


    btnPrintClick() {
        let filteredData: any;
        filteredData = this.dataSource.filteredData;
        filteredData.forEach(element => {
            if (element.inActivated == true) {
                element.inActivated = "Inactive";
            } else {
                element.inActivated = "Active"
            }
        });

        if (filteredData == (0)) {
            let strValidate: string = "No data";
            this.showDialog("error", "Error", strValidate);
            return false;
        } else {
        this.router.navigate(['/auth/master/report-member', { data: JSON.stringify(filteredData)}]);
        }

    }

    rowClicked(row: any): void {
        console.log(row);
        this.objRowSelected = <Chivamember>row;
        this.router.navigate([this.Url_Detail, { id: this.objRowSelected.id }]);
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

    ImportClick() {
        const dialogRef = this.dialog.open(ChivamemberListingDialogComponent, {
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
            this.brokerAPIService.get(this.UrlAPI_GetAll).subscribe(
                data => {
                    this.dataSource.data = data;
                }
            );
            if (result != undefined) {
                if (result.process != undefined) {
                }
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
