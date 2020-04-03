import { Component, ViewChild } from '@angular/core';
import { WebDataRocksPivot } from "../webdatarocks/webdatarocks.angular4";
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdditionalPrivilege } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { GlobalsValue } from '../../globals.value';

@Component({
  selector: 'app-report-additionalprivilege',
  templateUrl: './report-additionalprivilege.component.html',
  styleUrls: ['./report-additionalprivilege.component.scss']
})
export class ReportAdditionalprivilegeComponent {

  objRow: any = {};
  objAdditionalPrivilege: any = [];
  private UrlAPI_GetAll: string = "AdditionalPrivilege/GetAll";
  private Url_listing: string = "/auth/master/additionalprivilege-listing";
  @ViewChild('pivot1') child: WebDataRocksPivot;

  constructor(private brokerAPIService: BrokerAPIService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private globalsvalue: GlobalsValue) {

  }
  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.objAdditionalPrivilege = JSON.parse(params.get('data'));

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

    this.objAdditionalPrivilege.unshift(
      {
        hospitalCode: { "type": "string" , "caption": "Hospital Name" },
        privilegeGroupCode: { "type": "string" , "caption": "Privilege Group Name" },
        // remark: { "type": "string" },
        // createDate: { "type": "date string" },
        uploadDate: { "type": "date string" , "caption": "Upload Date" },
        // updateDate: { "type": "date string" },
      });
    console.log(this.objAdditionalPrivilege);

    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({

      "dataSource": {
        "dataSourceType": "json",
        "data": this.objAdditionalPrivilege

      },

      "slice": {
        "rows": [
          {
            "uniqueName": "uploadDate"
          },

          {
            "uniqueName": "hospitalCode"
          },
          {
            "uniqueName": "privilegeGroupCode"
          },
          {
            "uniqueName": "remark"
          },
        
          {
            "uniqueName": "createDate"
          },
          {
            "uniqueName": "updateDate"
          }

        ],
        "columns": [
          {
            "uniqueName": "Measures"
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
          "width": 300
        },
        {
          "idx": 2,
          "width": 450
        },
       
       ],
        

      },


      "options": {
        "grid": {
          "type": "flat",
          "showGrandTotals": "Do not show grand totals",
        },

        "datePattern": "UTC:dd/MM/yyyy"
      }


    });
  }



  btnCloseClick() {
    this.router.navigate([this.Url_listing]);
  }


}