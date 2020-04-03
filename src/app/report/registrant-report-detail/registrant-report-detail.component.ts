import { WebDataRocksPivot } from "../webdatarocks/webdatarocks.angular4";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalsValue } from '../../globals.value';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { BrokerAPIService } from "../../services/brokerapi.service";
import "rxjs/add/operator/map";
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as moment from "moment";
import { Moment } from "moment";


export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY"
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-registrant-report-detail',
  templateUrl: './registrant-report-detail.component.html',
  styleUrls: ['./registrant-report-detail.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class RegistrantReportDetailComponent implements OnInit {

  arrobjChivaMemberRegistered: any = [];
  private Url_listing: string = "/auth/report/registrant-report";
  @ViewChild('pivot1') child: WebDataRocksPivot;
  chivaCode: String;
  frDate: Moment = moment();
  toDate: Moment = moment();
  Frdate: string;
  Todate: string;
  private UrlAPI_GetChivaMemberRegistered: string = "Report/GetChivaMemberRegistered/";


  constructor(private brokerAPIService: BrokerAPIService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private globalsvalue: GlobalsValue) {

  }
  ngOnInit() {
    let params = this.route.snapshot.paramMap;
      this.chivaCode = params.get('chivaCode');
      this.Frdate = params.get('frDate');
      this.Todate = params.get('toDate');
      this.frDate = moment(params.get('frDate'));
      this.toDate = moment(params.get('toDate'));

      console.log("Registered",this.UrlAPI_GetChivaMemberRegistered + this.chivaCode + "," + this.Frdate + "," + this.Todate)

      this.brokerAPIService
      .get(this.UrlAPI_GetChivaMemberRegistered + this.chivaCode + "," + this.Frdate + "," + this.Todate).subscribe(
        data => {
          this.arrobjChivaMemberRegistered = data;
          console.log("data", data);
  
  
        });

  }


  onPivotReady(pivot: WebDataRocks.Pivot): void {
    // console.log("[ready] WebDataRocksPivot", this.child);
  }

  onCustomizeCell(cell: WebDataRocks.CellBuilder, data: WebDataRocks.Cell): void {
    // console.log("[customizeCell] WebDataRocksPivot");
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

    this.arrobjChivaMemberRegistered.unshift(
      {
        chivaCode: { "type": "string", "caption": "Chiva Code" },
        memberName: { "type": "string", "caption": "ชื่อ-นามสกุล" },
        registerDate: { "type": "date string", "caption": "วันที่ลงทะเบียน" },
        relativeChivaCode: { "type": "string ", "caption": "Chiva Code" },
        relativeMemberName: { "type": "string", "caption": "ชื่อ-นามสกุล" },
        // relativeRegisterDate: { "type": "date string", "caption": "วันที่ลงทะเบียน" },
      }

    );
    console.log(this.arrobjChivaMemberRegistered);

    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({


      "dataSource": {
        "dataSourceType": "json",
        "data": this.arrobjChivaMemberRegistered,
      },
      "slice": {
        "rows": [
          {
            "uniqueName": "chivaCode",
          },
          {
            "uniqueName": "memberName"
          },
          {
            "uniqueName": "registerDate"
          },
          {
            "uniqueName": "relativeChivaCode"
          },
          {
            "uniqueName": "relativeMemberName"
          },
          {
            "uniqueName": "relativeRegisterDate"
          },
       
        ],
        "columns": [
          {
            "uniqueName": "Measures",
          },

        ]
      },

      // "ExportOptions":{

      // },

      "options": {
        "grid": {
          "type": "flat",
          "showGrandTotals": "off",
          // "title": 'รายงานผู้ลงทะเบียน',


        },

        "datePattern": "dd/MM/yyyy",
        "dateTimePattern": "dd/MM/yyyy HH:mm:ss",

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

      "formats": [
        {
          // "textAlign": "right",
        },
        
      ],

      "tableSizes": {
        "columns": [
          {
            "idx": 0,
            "width": 130
          },
          {
            "idx": 1,
            "width": 280
          },
          {
            "idx": 2,
            "width": 130
          },
          {
            "idx": 3,
            "width": 130
          },
          {
            "idx": 4,
            "width": 280
          },
        
        ],
        //   "rows": [{
        //     "idx": 0,
        //     "height": 40,
        //   }
        // ]

      },

      "localization": {
        "grid": {
          "blankMember": "",
          "dateTimePatternMember":"1900-01-01T00:00:00"
        },
        
      }

    });

  }



  btnCloseClick() {
    this.router.navigate([this.Url_listing]);
  }

}