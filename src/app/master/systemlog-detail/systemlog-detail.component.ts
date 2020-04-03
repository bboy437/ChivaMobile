import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';

import { Hospital } from '../../interfaces/sysrecord';
import { Privilegeroup } from '../../interfaces/sysrecord';
import { AdditionalPrivilege, SystemLog } from '../../interfaces/sysrecord';

import { FormControl } from '../../../../node_modules/@angular/forms';
import { id } from '../../../../node_modules/@swimlane/ngx-charts/release/utils';
import {
  MatSnackBar, MatDialog, MatDialogRef, VERSION,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from "@angular/material";
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
  selector: 'app-systemlog-detail',
  templateUrl: './systemlog-detail.component.html',
  styleUrls: ['./systemlog-detail.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class SystemlogDetailComponent implements OnInit {

  date = new FormControl((new Date()).toISOString())
  logDateTime: string;
  logType: string;
  errorMessage: string;
  targetSite: string;
  objRow: any = {};
  objAPIResponse: any = [];
  private UrlAPI_GetSingleRow: string = "Utility/GetSystemLog/";
  logDateTime1: Moment = moment();
  id: string;


  // test1: string = 'Error';
  // test2: string = 'Debug';
  // test3: string = 'Entity Error';
  // test4: string = 'Network Error';
  // test5: string = 'Altor Log';

  constructor(private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  

    let params = this.route.snapshot.paramMap;
    if (params.has('logDateTime')) {
      this.logDateTime = params.get('logDateTime')
      this.logDateTime1 = moment(this.logDateTime);
      console.log("logDateTime",moment(this.logDateTime))

    } if (params.has('logType')) {

      this.logType = params.get('logType')

      if(this.logType == '69'){
        this.logType = 'Error';
      }
      else if(this.logType == '68'){
        this.logType = 'Debug';
      }
      else if(this.logType == '84'){
        this.logType = 'Entity Error';
      }
      else if(this.logType == '78'){
        this.logType = 'Network Error';
      }
      else if (this.logType = '76'){
        this.logType == 'Altor Log';
      }


    }
    if (params.has('errorMessage')) {
      this.errorMessage = params.get('errorMessage')

    } if (params.has('targetSite')) {
      this.targetSite = params.get('targetSite')

    }

  }

  btnCloseClick() {
    this.router.navigate(['/auth/master/systemlog',{ logDateTime: this.logDateTime }]);
    // this.router.navigate([this.Url_Listing, { filter: this.filter }]);
    console.log("this.logDateTime1",this.logDateTime )
  }
}
