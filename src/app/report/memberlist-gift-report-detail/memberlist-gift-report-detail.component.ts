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
import { Hospital, Gift, SysEnum } from '../../interfaces/sysrecord';


@Component({
  selector: 'app-memberlist-gift-report-detail',
  templateUrl: './memberlist-gift-report-detail.component.html',
  styleUrls: ['./memberlist-gift-report-detail.component.scss']
})
export class MemberlistGiftReportDetailComponent implements OnInit {

  arrobjMemberGetGift: any = [];
  private Url_listing: string = "/auth/report/memberlist-gift-report";
  @ViewChild('pivot1') child: WebDataRocksPivot;
  arrobjgift: String;
  arrobjsysEnum: String;
  objgift: any = [];
  objEnum: any = [];

  private UrlAPI_GetMemberGotGift: string =
    "Report/GetMemberGotGift/";
  private UrlAPI_GetGift: string = "Gift/Get/";
  private UrlAPI_GetEnum: string = "SysEnum/Get/";

  constructor(private brokerAPIService: BrokerAPIService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private globalsvalue: GlobalsValue) {

  }
  ngOnInit() {
    let params = this.route.snapshot.paramMap;

    this.arrobjgift = params.get('arrobjgift');
    this.arrobjsysEnum = params.get('arrobjsysEnum');
    this.GetGift();
    this.GetProject();
    
    // this.brokerAPIService
    // .get(this.UrlAPI_GetMemberGotGift + this.arrobjgift + "," + this.arrobjsysEnum).subscribe(
    //   data => {
    //     this.arrobjMemberGetGift = data;
    //     console.log("data", data);


    //   });
   
      this.arrobjMemberGetGift = JSON.parse(params.get('data'));
      console.log("data", this.arrobjMemberGetGift);
  
  }

  GetGift(){

    this.brokerAPIService.get(this.UrlAPI_GetGift + this.arrobjgift).subscribe(
      data => {
        this.objgift = <Gift>data;
        console.log("gift", this.objgift);
      }
    );
  }

  GetProject(){
    this.brokerAPIService.get(this.UrlAPI_GetEnum + this.arrobjsysEnum).subscribe(
      data => {
        this.objEnum = <SysEnum>data;
        console.log("gift", this.objEnum);
      }
    );

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
    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({

      "dataSource": {
        "dataSourceType": "json",
        "data": this.arrobjMemberGetGift,
      },
      "options": {
        "grid": {
          "type": "flat",
          "showGrandTotals": "off",
          // "title": 'รายงานการใช้ Gift รายวัน  Test second line',
        },

      },

      "localization": {
        "grid": {
          "blankMember": "",
        },

      }

    });

  }



  btnCloseClick() {
    this.router.navigate([this.Url_listing]);
  }


}