import { Component, ViewChild } from '@angular/core';
import { WebDataRocksPivot } from "../webdatarocks/webdatarocks.angular4";
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Chivamember } from '../../interfaces/sysrecord';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { GlobalsValue } from '../../globals.value';


@Component({
  selector: 'app-report-member',
  templateUrl: './report-member.component.html',
  styleUrls: ['./report-member.component.scss']
})
export class ReportMemberComponent {

  objRow: any = {};
  objChivaMember: any = [];
  private UrlAPI_GetAll: string = "ChivaMember/GetAll";
  private Url_listing: string = "/auth/master/chivamember-listing";
  @ViewChild('pivot1') child: WebDataRocksPivot;

  constructor(private brokerAPIService: BrokerAPIService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private globalsvalue: GlobalsValue) {

  }
  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.objChivaMember = JSON.parse(params.get('data'))
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
    this.objChivaMember.unshift(
      {
        chivaCode: { "type": "string", "caption": "Chiva Code" },
        prefixName: { "type": "string", "caption": "Prefix Name" },
        firstName: { "type": "string", "caption": "First Name" },
        lastName: { "type": "string", "caption": "Last Name" },
        bloodGroup: { "type": "string", "caption": "Blood Group" },
        inActivated: { "type": "string", "caption": "Active Status" }
      }

    );
    console.log(this.objChivaMember);

    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({


      "dataSource": {
        "dataSourceType": "json",
        "data": this.objChivaMember,
      },

      "slice": {
        "rows": [
          {
            "uniqueName": "chivaCode"
          },
          {
            "uniqueName": "prefixName"
          },
          {
            "uniqueName": "firstName"
          },
          {
            "uniqueName": "lastName"
          },
          {
            "uniqueName": "bloodGroup"
          },
          {
            "uniqueName": "beAllergic"
          },
          {
            "uniqueName": "inActivated"
          },

        ],
        "columns": [
          {
            "uniqueName": "Measures",
          },

        ]
      },


      "options": {
        "grid": {
          "type": "flat",
          "showHeaders": true,
          "showGrandTotals": "off",
          "showFilter": true,
          "showTotals": false,
          "showHierarchies": true,
          "showHierarchyCaptions": true,
          "showReportFiltersArea": true

        },
        "configuratorActive": false,
        "configuratorButton": true,
        "showAggregations": true,
        "showCalculatedValuesButton": true,
        "editing": false,
        "drillThrough": true,
        "sorting": "on",
        "datePattern": "dd/MM/yyyy",
        "dateTimePattern": "dd/MM/yyyy HH:mm:ss",
        "showDefaultSlice": true,
        "selectEmptyCells": true,


      },

      "conditions": [
        {
          "format": {
            "backgroundColor": "#FFCCFF",
            "fontFamily": "Arial",
            "fontSize": "5px",

          }
        }
      ],



      "tableSizes": {
        "columns": [
          {
          // "tuple": [],
          // "measure": "[chivaCode].[prefixName]",
          "idx": 0,
          "width": 190
        },
        {
          "idx": 1,
          "width": 100
        },
        {
          "idx": 2,
          "width": 200
        },
        {
          "idx": 3,
          "width": 200
        },


        ],
      
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
