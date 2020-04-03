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
import { Hospital, Gift, SysEnum, Chivamember } from '../../interfaces/sysrecord';

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
  selector: 'app-daily-promotion-report-detail',
  templateUrl: './daily-promotion-report-detail.component.html',
  styleUrls: ['./daily-promotion-report-detail.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class DailyPromotionReportDetailComponent implements OnInit {

  arrobjDailyUsedPromotion: any = [];
  @ViewChild('pivot1') child: WebDataRocksPivot;

  objRowHotpitalto: String;
  objRowHotpitalfrom: String;
  objRowHotpitalname: String;
  frDate: Moment = moment();
  toDate: Moment = moment();
  Frdate: string;
  Todate: string;
  objHotpitalNameTo: any = [];
  objHotpitalNameTohospitalShortName: String;
  objHotpitalNameFrom: any = [];
  objHotpitalNameFromhospitalShortName: String;
  objHotpitalName: any = [];
  objHotpitalNamehospitalShortName: String;
  objRow: any = {};

  private UrlAPI_GetDailyUsedPromotion: string = "Report/GetDailyUsedPromotion/";
  private Url_listing: string = "/auth/report/daily-promotion-report";
  private UrlAPI_GetHospital: string = "Chiva/GetHospital/";
  private UrlAPI_GetAllHotpital: string = "Chiva/AllHospital";

  constructor(private brokerAPIService: BrokerAPIService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private globalsvalue: GlobalsValue) {

  }

  ngOnInit() {

    let params = this.route.snapshot.paramMap;
    this.arrobjDailyUsedPromotion = JSON.parse(params.get('data'));
    this.objRowHotpitalto = params.get('objRowHotpitalto')
    this.objRowHotpitalfrom = params.get('objRowHotpitalfrom')
    this.objRowHotpitalname = params.get('objRowHotpitalname')
    this.frDate = moment(params.get('frDate'));
      this.toDate = moment(params.get('toDate'));
    if (this.objRowHotpitalname == "undefined") {
      this.GetHotpitalNameTo();
    }
    if (this.objRowHotpitalto == "undefined") {
      this.GetHotpitalName();
    }

  }

  GetHotpitalNameTo() {
    this.brokerAPIService.get(this.UrlAPI_GetAllHotpital).subscribe(
      data => {
        this.objHotpitalNameTo = <Hospital>data;
        if (this.objHotpitalNameTo.length > 0) {
          for (let i = 0; i < this.objHotpitalNameTo.length; i++) {
            if (this.objHotpitalNameTo[i].hospitalShortName == this.objRowHotpitalto) {
              this.objHotpitalNameTohospitalShortName = this.objHotpitalNameTo[i].hospitalName;
              this.GetHotpitalNameFrom();
            }
          }
        }

      });

  }

  GetHotpitalNameFrom() {
    this.brokerAPIService.get(this.UrlAPI_GetAllHotpital).subscribe(
      data => {
        this.objHotpitalNameFrom = <Hospital>data;
        if (this.objHotpitalNameFrom.length > 0) {
          for (let i = 0; i < this.objHotpitalNameFrom.length; i++) {
            if (this.objHotpitalNameFrom[i].hospitalShortName == this.objRowHotpitalfrom) {
              this.objHotpitalNameFromhospitalShortName = this.objHotpitalNameFrom[i].hospitalName;            
            }}
        }

      });

  }

  GetHotpitalName() {
    this.brokerAPIService.get(this.UrlAPI_GetAllHotpital).subscribe(
      data => {
        this.objHotpitalName = <Hospital>data;
        if (this.objHotpitalName.length > 0) {
          for (let i = 0; i < this.objHotpitalName.length; i++) {
            if (this.objHotpitalName[i].hospitalShortName == this.objRowHotpitalname) {
              this.objHotpitalNamehospitalShortName = this.objHotpitalName[i].hospitalName;   
            }
          }
        }

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

    this.arrobjDailyUsedPromotion.unshift(
      {
        usedGiftDate: { "type": "date string", "caption": "วันที่ใช้ Promotion" },
        chivaCode: { "type": "string", "caption": "Chiva Code" },
        memberName: { "type": "string", "caption": "ชื่อ-นามสกุล" },
        cardType: { "type": "string", "caption": "ประเภทบัตร" },
        usedNo: { "type": "string", "caption": "รหัส Promotion" },
        usedName: { "type": "string", "caption": "ชื่อ Promotion" },
        usedDetail: { "type": "string", "caption": "รายละเอียด Promotion" },
        claimAmont: { "type": "string", "caption": "มูลค่าเคลม" },
        memeberHospitalName: { "type": "string", "caption": "สังกัด รพ." },

      }

    );
    console.log(this.arrobjDailyUsedPromotion);

    this.child.webDataRocks.off("reportcomplete");

    this.child.webDataRocks.setReport({


      "dataSource": {
        "dataSourceType": "json",
        "data": this.arrobjDailyUsedPromotion,
      },
      "slice": {
        "rows": [
          {
            "uniqueName": "usedGiftDate",
          },
          {
            "uniqueName": "chivaCode"
          },
          {
            "uniqueName": "memberName"
          },
          {
            "uniqueName": "cardType"
          },
          {
            "uniqueName": "usedNo"
          },
          {
            "uniqueName": "usedName"
          },
          {
            "uniqueName": "usedDetail"
          },
          {
            "uniqueName": "claimAmont"
          },
          {
            "uniqueName": "memeberHospitalName"
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
          "showGrandTotals": "off",
          // "title": 'รายงานการใช้ Promotion รายวัน',


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