import { WebDataRocksPivot } from "../webdatarocks/webdatarocks.angular4";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Chivamember } from '../../interfaces/sysrecord';
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
// import { } from '../../interfaces/sysrecord';
import { Observable } from "rxjs/Observable";
import { ConfirmDeleteDialogComponent } from "../../dialogs/confirm-delete-dialog/confirm-delete-dialog.component";
import { MessageDialogComponent } from "../../dialogs/message-dialog/message-dialog.component";
import { Hospital, Promotion, SysEnum } from '../../interfaces/sysrecord';

@Component({
  selector: 'app-memberlist-promotion-report-detail',
  templateUrl: './memberlist-promotion-report-detail.component.html',
  styleUrls: ['./memberlist-promotion-report-detail.component.scss']
})
export class MemberlistPromotionReportDetailComponent implements OnInit {
  cobjRow: any = {};
  arrobjMemberGotPromotion: any = [];
  private Url_listing: string = "/auth/report/memberlist-promotion-report";
  @ViewChild('pivot1') child: WebDataRocksPivot;
  arrobjpromotion: String;
  arrobjsysEnum: String;
  objgpromotion: any = [];
  objEnum: any = [];

  private UrlAPI_GetMemberPromotion: string =
    "Report/GetMemberGotPromotion/";
    private UrlAPI_GetPromotion: string = "Promotion/Get/";
    private UrlAPI_GetEnum: string = "SysEnum/Get/";

  constructor(private brokerAPIService: BrokerAPIService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private globalsvalue: GlobalsValue) {

  }
  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.arrobjpromotion = params.get('arrobjpromotion')
    this.arrobjsysEnum = params.get('arrobjsysEnum')
    this.GetPromotion();
    this.GetProject();

    // this.brokerAPIService
    // .get(this.UrlAPI_GetMemberPromotion + this.arrobjpromotion + "," + this.arrobjsysEnum).subscribe(
    //   data => {
    //     this.arrobjMemberGotPromotion = data;
    //     console.log("data", data);


    //   });
    this.arrobjMemberGotPromotion = JSON.parse(params.get('data'));

  }

  GetPromotion() {

    this.brokerAPIService.get(this.UrlAPI_GetPromotion+ this.arrobjpromotion).subscribe(
      data => {
        this.objgpromotion = <Promotion>data;
        console.log("objgpromotion", this.objgpromotion);
      }
    );
  }

  GetProject() {
    this.brokerAPIService.get(this.UrlAPI_GetEnum + this.arrobjsysEnum).subscribe(
      data => {
        this.objEnum = <SysEnum>data;
        console.log("objEnum", this.objEnum);
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
        "data": this.arrobjMemberGotPromotion,
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