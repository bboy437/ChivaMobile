import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, forwardRef, EventEmitter } from '@angular/core';

import { ToolbarHelpers } from './toolbar.helpers';
import 'rxjs/add/operator/map'

import {
  MatSort,
  MatPaginator,
  MatTableModule,
  MatTableDataSource
} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';


import { BrokerAPIService } from '../../services/brokerapi.service';
import { Hospital } from '../../interfaces/sysrecord';

@Component({
  selector: 'cdk-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
	
  @Input() sidenav;
	@Input() sidebar;
	@Input() drawer;
	@Input() matDrawerShow;
  

		toolbarHelpers = ToolbarHelpers;
	
    selectDisabled = true;
    defaultHospitalCode: string;
    isAdmin: string;
    arrobjhospital: any = [];
    arrobjhospitalID: any = [];
    // objrow : any = {};
    hospitalName: string;
    select: string;
    private UrlAPI_GetAllHotpitalID: string = "Chiva/GetHospital/";
    private UrlAPI_GetAllHotpital: string = "Chiva/AllHospital";
    constructor(private brokerAPIService: BrokerAPIService,
      private route: ActivatedRoute,
      private router: Router,
    ) {
    }

  	ngOnInit() {

      this.isAdmin = localStorage.getItem('isAdmin');
      this.defaultHospitalCode = localStorage.getItem('defaultHospitalCode');

      console.log(this.isAdmin);

      if (this.isAdmin == "true"){ 
        this.brokerAPIService.get(this.UrlAPI_GetAllHotpital).subscribe(
          data => {
            this.arrobjhospital = <Hospital>data;
            console.log(this.arrobjhospital);
    
          });

      }

      if (this.isAdmin == "false") {
        console.log(this.UrlAPI_GetAllHotpitalID + this.defaultHospitalCode);
        this.brokerAPIService.get(this.UrlAPI_GetAllHotpitalID + this.defaultHospitalCode).subscribe(
          data => {
            this.arrobjhospitalID = <Hospital>data;
    
            console.log(this.arrobjhospital);
    
          }); 
      } 
    }
    
  

}
