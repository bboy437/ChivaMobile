import { Component, ViewChild } from '@angular/core';
import { WebDataRocksPivot } from "../webdatarocks/webdatarocks.angular4";
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NewsFeed } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { GlobalsValue } from '../../globals.value';

@Component({
  selector: 'app-report-newfeed',
  templateUrl: './report-newfeed.component.html',
  styleUrls: ['./report-newfeed.component.scss']
})
export class ReportNewfeedComponent {

  objRow: any = {};
  objNewfeed: any = [];
  private UrlAPI_GetAll: string = "Newsfeed/GetAll";
  private Url_listing: string = "/auth/master/newsfeed-listing";
  @ViewChild('pivot1') child: WebDataRocksPivot;

  constructor(private brokerAPIService: BrokerAPIService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private globalsvalue: GlobalsValue) {

  }
  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.objNewfeed = JSON.parse(params.get('data'))

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

    this.objNewfeed.unshift(
      {
        newsfeedCode: { "type": "string", "caption": "Newsfeed Code" },
        topic: { "type": "string", "caption": "Topic" },
        inActivated: { "type": "string", "caption": "Active Status", "inActivated": "true" ? 'Inactive' : 'Active' },
        effectiveDate: { "type": "date string", "caption": "Start Date" },
        expireDate: { "type": "date string", "caption": "End Date" },

      });

    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({

      "dataSource": {
        "dataSourceType": "json",
        "data": this.objNewfeed

      },

      "slice": {
        "rows": [
          {
            "uniqueName": "newsfeedCode"
          },
          {
            "uniqueName": "topic"
          },
          {
            "uniqueName": "effectiveDate"
          },
          {
            "uniqueName": "expireDate"
          },
          {
            "uniqueName": "inActivated"
          }
        ],
      },

      "tableSizes": {
        "columns": [{
          "idx": 0,
          "width": 200
        },
        {
          "idx": 1,
          "width": 450
        },
       
       ],
        

      },


      "options": {
        "grid": {
          "type": "flat",
          "showHeaders": false,
          "showGrandTotals": "off"
        },
        configuratorActive: false,
        datePattern: "UTC:dd/MM/yyyy"
      }

    });

  }



  btnCloseClick() {
    this.router.navigate([this.Url_listing]);
  }


}

