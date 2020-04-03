import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import 'rxjs/add/operator/map'
import { DataSource } from '@angular/cdk/collections';
import { Gift } from '../../interfaces/sysrecord';
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
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-gift-listing',
    templateUrl: './gift-listing.component.html',
    styleUrls: ['./gift-listing.component.scss']
})
export class GiftListingComponent implements OnInit, AfterViewInit {

    dataSource = new MatTableDataSource();
    displayedColumns = ['giftNo', 'giftName', 'giftStartDate', 'giftEndDate', 'hospitalList', 'giftApproveStatus', 'inActivated'];
    objRowSelected: Gift;
    filter: string = "";
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    private UrlAPI_GetAll: string = "Gift/GetAll";
    private Url_Detail: string = "/auth/master/gift-detail";
    isLoadingResults = false;
    dialogRef: MatDialogRef<MessageDialogComponent>;
    pipe: DatePipe;

    constructor(
        private brokerAPIService: BrokerAPIService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog, ) {
    }

    ngOnInit() {
        this.isLoadingResults = true;
        // this.dataSource.filterPredicate = function (data: Gift, filter): boolean {
        //     return data.giftNo.toLowerCase().includes(filter)
        //         || data.giftName.toLowerCase().includes(filter)
        //         // || data.hospitalList.toLowerCase().includes(filter)
        //         || data.giftStartDate.toString().includes(filter)
        //         || data.giftEndDate.toString().includes(filter)
        //     // || data.giftApproveStatus.toLowerCase().includes(filter);
        // };
        this.pipe = new DatePipe('en');
        this.dataSource.filterPredicate = (data: Gift, filter) => {
            const formatted = this.pipe.transform(data.giftStartDate, "MM/dd/yyyy");
            // formatted >= this.frDate && formatted <= this.toDate;
            return formatted.indexOf(filter) >= 0
                || data.giftNo.toLowerCase().includes(filter.toLowerCase())
                || data.giftName.toLowerCase().includes(filter.toLowerCase())
                // || data.hospitalList.toLowerCase().toString().includes(filter.toLowerCase())
        };

        let params = this.route.snapshot.paramMap;
        this.brokerAPIService.get(this.UrlAPI_GetAll).subscribe(
            data => {
                this.dataSource.data = data;
                if (params.get("filter") != null) {
                    this.filter = params.get("filter");
                }
                this.dataSource.filter = this.filter;
                this.isLoadingResults = false;
            }
        );

    }

    // customFilterPredicate() {
    //     const myFilterPredicate = function (data: Gift, filter: string): boolean {
    //         let searchString = JSON.parse(filter);
    //         // console.log("customFilterPredicate", this.pipe.transform(data.jobOrderDate, "yyyy-MM-dd"));
    //         // console.log("customFilterPredicate", searchString.jobOrderDateto);

    //         return data.giftNo.toString().trim().toLowerCase().indexOf(searchString.giftNo.toLowerCase()) !== -1 &&
    //             data.giftName.toString().trim().toLowerCase().indexOf(searchString.giftName.toLowerCase()) !== -1 &&
    //             data.hospitalList.toString().trim().toLowerCase().indexOf(searchString.lastStatus.toLowerCase()) !== -1;
    //     }
    //     return myFilterPredicate;
    // }


    btnNewClick() {
        this.router.navigate([this.Url_Detail, { id: "new", filter: this.filter }]);
    }

    rowClicked(row: any): void {
        console.log(row);
        this.objRowSelected = <Gift>row;
        this.router.navigate([this.Url_Detail, { id: this.objRowSelected.id, filter: this.filter }]);
    }

    btnPrintClick() {
        let filteredData: any;
        filteredData = this.dataSource.filteredData;
        console.log("aaa",this.dataSource.filteredData);
        filteredData.forEach(element => {
            if (element.giftApproveStatus == "Y") {
                element.giftApproveStatus = "อนุมัติ"
            } else {
                element.giftApproveStatus = "ไม่อนุมัติ"
            }

            if (element.inActivated == true) {
                element.inActivated = "Inactive"
            } else {
                element.inActivated = "Active"
            }
        });

        if (filteredData == (0)) {
            let strValidate: string = "No data";
            this.showDialog("error", "Error", strValidate);
            return false;
        } else {
            this.router.navigate(['/auth/master/report-gift', { data: JSON.stringify(filteredData) }]);
        }
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
