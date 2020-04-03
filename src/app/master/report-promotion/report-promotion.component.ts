import { Component, ViewChild } from '@angular/core';
import { WebDataRocksPivot } from "../webdatarocks/webdatarocks.angular4";
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Promotion } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { GlobalsValue } from '../../globals.value';

@Component({
  selector: 'app-report-promotion',
  templateUrl: './report-promotion.component.html',
  styleUrls: ['./report-promotion.component.scss']
})
export class ReportPromotionComponent {

  objRow: any = {};
  objPromotion: any = [];
  private UrlAPI_GetAll: string = "Promotion/GetAll";
  private Url_listing: string = "/auth/master/promotion-listing";
  @ViewChild('pivot1') child: WebDataRocksPivot;

  constructor(private brokerAPIService: BrokerAPIService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private globalsvalue: GlobalsValue) {

  }
  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.objPromotion = JSON.parse(params.get('data'))
  }



  onPivotReady(pivot: WebDataRocks.Pivot): void {
    console.log("[ready] WebDataRocksPivot", this.child);
  }

  onCustomizeCell(cell: WebDataRocks.CellBuilder, data: WebDataRocks.Cell): void {
    console.log("[customizeCell] WebDataRocksPivot");
    if (data.isClassicTotalRow) cell.addClass("fm-total-classic-r");
    if (data.isGrandTotalRow) cell.addClass("fm-grand-total-r");
    if (data.isGrandTotalColumn) cell.addClass("fm-grand-total-c");
  }

  customizeToolbar(toolbar) {

    var tabs = toolbar.getTabs();
    toolbar.getTabs = function () {
      delete tabs[0];
      delete tabs[1];
      delete tabs[2];

      return tabs;
    }

  }

  onReportComplete(): void {

    this.objPromotion.unshift(
      {
        promotionNo: { "type": "string" , "caption": "Promotion No" },
        promotionName: { "type": "string" , "caption": "Promotion Name" },
        promotionGroup: { "type": "string", "caption": "Promotion Group" },
        promotionTypeRedeem: { "type": "string", "caption": "Promotion Type" },
        paStartDate: { "type": "date string" , "caption": "Start Date" },
        paEndDate: { "type": "date string", "caption": "End Date" },
  
      });
    console.log(this.objPromotion);

    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({
      "dataSource": {
        "dataSourceType": "json",
        "data": this.objPromotion
      },

      // "slice": {
      //   "rows": [
      //     {
      //       "uniqueName": "promotionNo"
      //     },
      //     {
      //       "uniqueName": "promotionName"
      //     },
      //     {
      //       "uniqueName": "promotionGroup"
      //     },
      //     {
      //       "uniqueName": "promotionGroupForHospital"
      //     },
      //     {
      //       "uniqueName": "coverImageLocation"
      //     },
      //     {
      //       "uniqueName": "coverImageUrl"
      //     },
      //     {
      //       "uniqueName": "detailImageLocation"
      //     },
      //     {
      //       "uniqueName": "detailImageUrl"
      //     },
      //     {
      //       "uniqueName": "paStartDate"
      //     },
      //     {
      //       "uniqueName": "paEndDate"
      //     },
      //     {
      //       "uniqueName": "promotionTypeBrochure"
      //     },
      //     {
      //       "uniqueName": "promotionTypeRedeem"
      //     },
      //     {
      //       "uniqueName": "showByLocation"
      //     },
      //     {
      //       "uniqueName": "gender"
      //     },
      //     {
      //       "uniqueName": "nationalityCode"
      //     },
      //     {
      //       "uniqueName": "monthOfBirth"
      //     },
      //     {
      //       "uniqueName": "age"
      //     },
      //     {
      //       "uniqueName": "provinceCode"
      //     },
      //     {
      //       "uniqueName": "memberType"
      //     },
      //     {
      //       "uniqueName": "memberNotRenewStatus"
      //     },
      //     {
      //       "uniqueName": "createBy"
      //     },
      //     {
      //       "uniqueName": "createDate"
      //     },
      //     {
      //       "uniqueName": "updateBy"
      //     },
      //     {
      //       "uniqueName": "updateDate"
      //     }, ,

      //   ],
      // },

      "options": {
        "grid": {
          "type": "flat",
          "showGrandTotals": "Do not show grand totals",
        },
        "datePattern": "UTC:dd/MM/yyyy"
      },

      "localization": {
        "grid": {
          "blankMember": ""
        },

      }

    });
  }



  btnCloseClick() {
    this.router.navigate([this.Url_listing]);
  }


}