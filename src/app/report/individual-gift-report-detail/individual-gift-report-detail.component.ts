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
import { FormControl } from "@angular/forms";
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as moment from "moment";
import { Moment } from "moment";
import { DatePipe } from '@angular/common';

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
  selector: 'app-individual-gift-report-detail',
  templateUrl: './individual-gift-report-detail.component.html',
  styleUrls: ['./individual-gift-report-detail.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class IndividualGiftReportDetailComponent implements OnInit {
  date = new FormControl(new Date());
  arrobjPersonalUsedGift: any = [];
  private Url_listing: string = "/auth/report/individual-gift-report";
  @ViewChild('pivot1') child: WebDataRocksPivot;
  chivaCode: String;
  firstName: String;
  lastName: String;
  FrDate: String;
  ToDate: String;
  frDate: Moment = moment();
  toDate: Moment = moment();


  private UrlAPI_GetMemberGotGift: string = "Report/GetPersonalUsedGift/";


  constructor(private brokerAPIService: BrokerAPIService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private globalsvalue: GlobalsValue,
    private datePipe: DatePipe, ) {

  }
  ngOnInit() {
    let params = this.route.snapshot.paramMap;

    this.arrobjPersonalUsedGift = JSON.parse(params.get('data'));
    this.chivaCode = params.get('chivaCode');
    this.firstName = params.get('firstName');
    this.lastName = params.get('lastName');
    this.frDate = moment(params.get('frDate'));
    this.toDate = moment(params.get('toDate'));

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

    this.arrobjPersonalUsedGift.unshift(
      {
        usedGiftDate: { "type": "date string", "caption": "วันที่ใช้ Gift" },
        cardType: { "type": "string", "caption": "ประเภทบัตร" },
        usedNo: { "type": "string", "caption": "รหัส Gift" },
        usedName: { "type": "string", "caption": "ชื่อ Gift" },
        usedDetail: { "type": "string", "caption": "รายละเอียด Gift" },
        claimAmont: { "type": "string", "caption": "มูลค่าเคลม" },
        useHospitalName: { "type": "string", "caption": "รพ.ที่ใช้สิทธิ์" },
        memeberHospitalName: { "type": "string", "caption": "สังกัด รพ." },
      }

    );
    console.log(this.arrobjPersonalUsedGift);

    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({


      "dataSource": {
        "dataSourceType": "json",
        "data": this.arrobjPersonalUsedGift,
      },
      "slice": {
        "rows": [
          {
            "uniqueName": "usedGiftDate",
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
            "uniqueName": "useHospitalName"
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
          // "title": 'รายงานการใช้ของขวัญจากเรา (Gift) รายบุคคล',


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
            "idx": 3,
            "width": 150
          },
          {
            "idx": 4,
            "width": 160
          },
          {
            "idx": 6,
            "width": 150
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
          "blankMember": ""
        },

      }

    });

  }



  btnCloseClick() {
    this.router.navigate([this.Url_listing]);
  }


}
