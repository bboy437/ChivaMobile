import { Component, ViewChild } from '@angular/core';
import { WebDataRocksPivot } from "../webdatarocks/webdatarocks.angular4";
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Gift } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { GlobalsValue } from '../../globals.value';

@Component({
  selector: 'app-report-gift',
  templateUrl: './report-gift.component.html',
  styleUrls: ['./report-gift.component.scss']
})
export class ReportGiftComponent {
  objRow: any = {};
  objGift: any = [];
  private UrlAPI_GetAll: string = "Gift/GetAll";
  private Url_listing: string = "/auth/master/gift-listing";
  @ViewChild('pivot1') child: WebDataRocksPivot;

  constructor(private brokerAPIService: BrokerAPIService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private globalsvalue: GlobalsValue) {

  }
  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.objGift = JSON.parse(params.get('data'));

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

    this.objGift.unshift(
      {
        giftNo: { "type": "string" , "caption": "Gift No" },
        giftName: { "type": "string", "caption": "Gift Name" },
        hospitalList: { "type": "string" , "caption": "hospital Name" },
        inActivated:   { "type": "string" , "caption": "Active Status" },
        giftApproveStatus: { "type": "string" , "caption": "Approve Status"},
        giftStartDate: { "type": "date string" , "caption": "Start Date" },
        giftEndDate: { "type": "date string", "caption": "End Date" },
      });
    console.log(this.objGift);

    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({
      "dataSource": {
        "dataSourceType": "json",
        "data": this.objGift
      },

      "slice": {
        "rows": [
          {
            "uniqueName": "giftNo"
          },
          {
            "uniqueName": "giftName"
          },
  
          {
            "uniqueName": "giftStartDate"
          },
        
          {
            "uniqueName": "giftEndDate"
          },
         
          {
            "uniqueName": "hospitalList"
          },
          {
            "uniqueName": "claimStatus"
          },
          {
            "uniqueName": "giftApproveStatus"
          },
          {
            "uniqueName": "inActivated"
          },
  
    
        ],

      },

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
