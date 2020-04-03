import { Component, OnInit, ViewChild } from "@angular/core";

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatTableDataSource,
  MatPaginator,
  MatSort
} from "@angular/material";
import { Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Redeem } from '../../../../interfaces/sysrecord';
import { BrokerAPIService } from "../../../../services/brokerapi.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-redeem-listing',
  templateUrl: './redeem-listing.component.html',
  styleUrls: ['./redeem-listing.component.scss']
})
export class RedeemListingComponent implements OnInit {

  public isLoadingResults = false;

  dataSource = new MatTableDataSource();
  displayedColumns = 
  [
   'index', 
   'redeemDate',
   'redeemNo',
   'promotionDetail',
   'hospitalName',
   'hospitalClaim',
   'redeemCreateby',
   'memoName',
   ];
   
  objRowSelected: Redeem;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private UrlAPI_GetAll : string = "Promotion/GetRedeemList/";
  private Url_Detail : string = "/auth/master/promotion-detail";
  private UrlAPI_GetRedeem: string = "Promotion/GetRedeemList/";

  constructor(
    public dialogRef: MatDialogRef<RedeemListingComponent>,
    @Inject(MAT_DIALOG_DATA) public RowID: any,
    private brokerAPIService: BrokerAPIService,
    private router: Router,
    route: ActivatedRoute,
  ) {}

  ngOnInit() {

    console.log("this.dataRedeem");
    console.log(this.RowID);

    this.isLoadingResults = true;
    this.brokerAPIService.get(this.UrlAPI_GetRedeem + this.RowID).subscribe(
      data => {
      this.isLoadingResults = false;
      this.dataSource.data =<Redeem[]>data;
      console.log("Redeem",data)
      }
    );
    

    this.isLoadingResults = false;
}

applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
}


onNoClick(): void {

  this.dialogRef.close();
}

ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}


// rowClicked(row: any): void {
//   console.log(this.Url_Detail+row.id);
//   this.router.navigate([this.Url_Detail,row.productionOrderId]);
//   this.dialogRef.close();
// }


}
