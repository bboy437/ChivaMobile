import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import 'rxjs/add/operator/map'
import { DataSource } from '@angular/cdk/collections';
import { Promotion, Redeem } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import {
    MatSort,
    MatPaginator,
    MatTableModule,
    MatTableDataSource,
    MatDialog,
    MatDialogRef
} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RedeemListingComponent } from '../promotion-detail/dialog/redeem-listing/redeem-listing.component';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';


@Component({
    selector: 'app-promotion-listing',
    templateUrl: './promotion-listing.component.html',
    styleUrls: ['./promotion-listing.component.scss']
})
export class PromotionListingComponent implements OnInit, AfterViewInit {

    dataSource = new MatTableDataSource();
    displayedColumns = ['promotionNo', 'promotionName', 'promotionGroup', 'promotionTypeRedeem', 'paStartDate', 'paEndDate'];
    objRowSelected: Promotion;
    objRowSelected1: Redeem;
    filter: string = "";
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    private UrlAPI_GetAll: string = "Promotion/GetAll";
    private Url_Detail: string = "/auth/master/promotion-detail";
    public isLoadingResults = false;
    dialogRef: MatDialogRef<MessageDialogComponent>;

    constructor(
        private brokerAPIService: BrokerAPIService, 
        private router: Router, 
        private route: ActivatedRoute,
        private dialog: MatDialog, ) {
    }


    ngOnInit() {
        this.isLoadingResults = true;
        this.dataSource.filterPredicate = function (data: Promotion, filter): boolean {
            return data.promotionNo.toLowerCase().includes(filter)
                || data.promotionName.toLowerCase().includes(filter)
                || data.promotionGroup.toLowerCase().includes(filter)
                || data.promotionTypeBrochure.toLowerCase().includes(filter)
                || data.paStartDate.toString().includes(filter)
                || data.paEndDate.toString().includes(filter);
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

    btnNewClick() {
        this.router.navigate([this.Url_Detail, { id: "new", filter: this.filter }]);
    }

    rowClicked(row: any): void {
        console.log(row);
        this.objRowSelected = <Promotion>row;
        this.router.navigate([this.Url_Detail, { id: this.objRowSelected.id, filter: this.filter }]);      
    }

    btnPrintClick(){
        let filteredData: any;
        filteredData = this.dataSource.filteredData;
        filteredData.forEach(element => {
            if (element.promotionGroup == "Y") {
                element.promotionGroup = "โรงพยาบาลทั้งหมด";
            } else {
                element.promotionGroup = element.hospitalName;
            }
            if (element.promotionTypeRedeem == "Y") {
                element.promotionTypeRedeem = "ได้";
            } else {
                element.promotionTypeRedeem = "ไม่ได้";
            }
        });

        if (filteredData == (0)) {
            let strValidate: string = "No data";
            this.showDialog("error", "Error", strValidate);
            return false;
        } else {
        this.router.navigate(['/auth/master/report-promotion', { data: JSON.stringify(filteredData) }]);
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
