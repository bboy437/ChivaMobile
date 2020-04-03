import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import 'rxjs/add/operator/map'
import { DataSource } from '@angular/cdk/collections';
import { NewsFeed } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import {
    MatSort,
    MatPaginator,
    MatTableModule,
    MatTableDataSource,
    MatDialogRef,
    MatDialog
} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';

@Component({
    selector: 'app-newsfeed-listing',
    templateUrl: './newsfeed-listing.component.html',
    styleUrls: ['./newsfeed-listing.component.scss']
})
export class NewsfeedListingComponent implements OnInit, AfterViewInit {
    dataSource = new MatTableDataSource();
    displayedColumns = ['newsfeedCode', 'topic', 'effectiveDate', 'expireDate', 'inActivated'];
    objRowSelected: NewsFeed;
    filter: string = "";
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    private UrlAPI_GetAll: string = "Newsfeed/GetAll";
    private Url_Detail: string = "/auth/master/newsfeed-detail";
    public isLoadingResults = false;
    dialogRef: MatDialogRef<MessageDialogComponent>;
    
    constructor(
        private brokerAPIService: BrokerAPIService,
        private router: Router,
        private route: ActivatedRoute, 
        private dialog: MatDialog,) {
    }

    ngOnInit() {
        this.isLoadingResults = true;
        this.dataSource.filterPredicate = function (data: NewsFeed, filter): boolean {
            return data.newsfeedCode.toLowerCase().includes(filter)
                || data.topic.toLowerCase().includes(filter)
                || data.effectiveDate.toString().includes(filter)
                || data.expireDate.toString().includes(filter)
                || data.inActivated.toString().includes(filter);

        };
        let params = this.route.snapshot.paramMap;
        this.brokerAPIService.get(this.UrlAPI_GetAll).subscribe(
            data => {
                console.log("UrlAPI_GetAll");
                console.log(data);
                this.dataSource.data = data;
                if (params.get("filter") != null) {
                    this.filter = params.get("filter");
                }
                this.dataSource.filter = this.filter;
                this.isLoadingResults = false;
            }
        );
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
        this.router.navigate(['/auth/master/report-newfeed', { data: JSON.stringify(filteredData)}]);
        }
    }

    btnNewClick() {
        this.router.navigate([this.Url_Detail, { id: "new", filter: this.filter }]);
    }

    rowClicked(row: any): void {
        console.log(row);
        this.objRowSelected = <NewsFeed>row;
        this.router.navigate([this.Url_Detail, { id: this.objRowSelected.id, filter: this.filter }]);
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