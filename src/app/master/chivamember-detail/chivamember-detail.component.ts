import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, mixinDisabled } from '@angular/material/core';
import { Chivamember } from '../../interfaces/sysrecord';
import { MatSnackBar, MatDialog } from '@angular/material';


@Component({
  selector: 'app-chivamember-detail',
  templateUrl: './chivamember-detail.component.html',
  styleUrls: ['./chivamember-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChivamemberDetailComponent implements OnInit {
  selectedValue;
  strVarlidate: string = '';
  disabled: boolean = true;
  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};
  private UrlAPI_GetSingleRow: string = "ChivaMember/Get/";
  private UrlAPI_Update: string = "ChivaMember/Update";
  private UrlAPI_Create: string = "ChivaMember/Create";
  private Url_Listing: string = "/auth/master/chivamember-listing";

  constructor(
    private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      console.log(params.get('id'));
      this.RowID = params.get('id')
      if (this.RowID == "new") {
        this.disabled = false;
      }
      else {
        this.brokerAPIService.get(this.UrlAPI_GetSingleRow + this.RowID).subscribe(
          data => {
            this.objRow = <Chivamember>data;
            console.log(this.objRow);
          }
        );
      }
    }

  }

  btnSaveClick() {
    if (this.validate()) {
      this.save();
    }
  }

  btnCloseClick() {
    this.router.navigate(['/auth/master/chivamember-listing']);
  }



  validate() {
    console.log(this.objRow.bloodGroup);
    let strValidate: string = "";
    if (this.objRow.bloodGroup == undefined || this.objRow.bloodGroup == "") {
      strValidate = "bloodGroup";
    }
    if (strValidate != "") {
     return false;
    } else {
      return true;
    }
  }

  save() {
    if (this.RowID == "new") {
      //Create
      this.objRow.createBy = localStorage.getItem('firstName');
      this.objRow.updateBy = localStorage.getItem('firstName');
      this.objRow.inActivated = false;
      this.brokerAPIService.post(this.UrlAPI_Create, this.objRow).subscribe(
        data => {
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.router.navigate([this.Url_Listing]);
          }
          else {
            console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
          }
        },
        err => {
          // กรณี error
          console.log('Something went wrong!');
        });
    }
    else {
      //Update
      this.objRow.createBy = localStorage.getItem('firstName');
      this.objRow.updateBy = localStorage.getItem('firstName');
      this.brokerAPIService.post(this.UrlAPI_Update, this.objRow).subscribe(
        data => {
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
           this.router.navigate([this.Url_Listing]);

          }
          else {
            console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
          }
        },
        err => {
          // กรณี error
          console.log('Something went wrong!');
        });
    }
  }



}