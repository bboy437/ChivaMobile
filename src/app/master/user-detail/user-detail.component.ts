import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';

import { Hospital, Register, GetHospitalListByEmp, GetEmployeeProfile } from '../../interfaces/sysrecord';

import { MatSnackBar, MatDialog, MatDialogRef, VERSION } from "@angular/material";


import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  version = VERSION;
  dialogRef: MatDialogRef<MessageDialogComponent>;

  arrhospitalCode: any = [];
  arrobjhospital: any = [];
  arrobjEmployeeProfile: any = [];
  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};
  hospitalCode: string;
  filter: string;
  EmployeeCode: string;
  username: string;

  objRowSelected: any = [];
  isisAdmin: boolean = false;
  inActivated: boolean = false;
  isReadOnly: boolean = false;
  

  private UrlAPI_Create: string = "Account/Register";
  private UrlAPI_GetHospitalListByEmp: string = "Account/GetHospitalListByEmp/";
  private UrlAPI_GetEmployeeProfile: string = "/Account/GetEmployeeProfile/";
  private UrlAPI_GetAllHotpital: string = "Chiva/AllHospital";
  private UrlAPI_Update: string = "Account/UpdateWebUser";
  private Url_Listing: string = "/auth/master/user-listing";



  constructor(private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {


    // this.brokerAPIService.get(this.UrlAPI_GetHospitalListByEmp).subscribe(
    //   data => {
    //     this.arrobjhospital = <GetHospitalListByEmp>data;
    //     console.log(this.arrobjhospital)
    //   }
    // );

    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.RowID = params.get('id')
      console.log("RowID ", this.RowID);
    }

    if (params.has('objRowSelected')) {
      this.objRow = JSON.parse(params.get('objRowSelected'));
      this.isReadOnly = this.objRow;
       this.objRow.userName = this.objRow.userName;
      this.arrobjEmployeeProfile.prefixName = this.objRow.prefixName;
      this.arrobjEmployeeProfile.firstName = this.objRow.firstName;
      this.arrobjEmployeeProfile.lastName = this.objRow.lastName;
      this.inActivated = this.objRow.inActivated;
      this.isisAdmin = this.objRow.isAdmin;

      this.brokerAPIService.get(this.UrlAPI_GetHospitalListByEmp + this.objRow.employeeCode).subscribe(
        data => {
          this.arrobjhospital = <GetHospitalListByEmp>data;
          console.log(this.arrobjhospital)

        }
      );

      if (this.RowID == "undefined") {
      }
  
       if (this.objRow == "undefined") {
      }


      if (this.isisAdmin === true) {
        this.objRow.isAdmin = "True";
      } else if (this.isisAdmin === false) {
        this.objRow.isAdmin = "False";
      }

      if (this.inActivated === true) {
        this.objRow.inActivated = "True";
      } else if (this.inActivated === false) {
        this.objRow.inActivated = "False";
      }

      console.log(this.objRow);

    }

  }


  btnCloseClick() {
    this.router.navigate([this.Url_Listing]);
  }


  KeyemployeeCode(filterValue: string) {
    if (filterValue.length >= 5) {

      this.brokerAPIService.get(this.UrlAPI_GetHospitalListByEmp + filterValue).subscribe(
        data => {
          this.arrobjhospital = <GetHospitalListByEmp>data;
          console.log(this.arrobjhospital)


        }
      );

    }
    else {
      this.arrobjhospital = [];
      this.arrobjEmployeeProfile = [];
    }
  }


  hospitalSelected() {
    console.log(this.UrlAPI_GetEmployeeProfile + this.objRow.employeeCode + "," + this.hospitalCode);
    this.brokerAPIService.get(this.UrlAPI_GetEmployeeProfile + this.objRow.employeeCode + "," + this.hospitalCode).subscribe(
      data => {
        this.arrobjEmployeeProfile = <GetEmployeeProfile>data;
        console.log("data",this.arrobjEmployeeProfile);
      }
    );

  }

  validate() {
    console.log(this.objRow.employeeCode);
    let strValidate: string = "";


    if (this.objRow.userName == undefined || this.objRow.userName == "") {
      strValidate = "User Name";

    }

    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;


    } if (this.objRow.employeeCode == undefined || this.objRow.employeeCode == "") {
      strValidate = "User Name";

    }

    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;

    } if (this.objRow.hospitalCode == undefined || this.objRow.hospitalCode == "") {
      strValidate = "Hospital Name";

    }

    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;

    // } if (this.objRow.firstName == undefined || this.objRow.firstName == "") {
    //   strValidate = "First Name";
    // }

    // if (strValidate != "") {
    //   this.showDialog("error", "Error", strValidate);
    //   return false;

    // } if (this.objRow.prefixName == undefined || this.objRow.prefixName == "") {
    //   strValidate = "Prefix Name";

    // }

    // if (strValidate != "") {
    //   this.showDialog("error", "Error", strValidate);
    //   return false;

    } if (this.objRow.email == undefined || this.objRow.email == "") {
      strValidate = "Email";

    }

    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    // } if (this.objRow.lastName == undefined || this.objRow.lastName == "") {
    //   strValidate = "Last Name";

    // }


    // if (strValidate != "") {
    //   this.showDialog("error", "Error", strValidate);
    //   return false;


    } else {
      return true;
    }
  }


  btnSaveClick() {
    if (this.validate()) {
      this.save();
    }

  }

  save() {

    if (this.isisAdmin === true) {
      this.objRow.isAdmin = "True";
    } else if (this.isisAdmin === false) {
      this.objRow.isAdmin = "False";
    }

    if (this.inActivated === true) {
      this.objRow.inActivated = "True";
    } else if (this.inActivated === false) {
      this.objRow.inActivated = "False";
    }
    if (this.RowID == "new") {
      //Create
      // this.objRow.email = "test@soldev.co.th";
      this.objRow.password = "P@ssw0rd";
      this.objRow.prefixName = this.arrobjEmployeeProfile.prefixName;
      this.objRow.firstName = this.arrobjEmployeeProfile.firstName;
      this.objRow.lastName = this.arrobjEmployeeProfile.lastName;
      // this.objRow.isAdmin = false;
      // this.objRow.inActivated = false;
      this.objRow.createBy = localStorage.getItem('firstName');
   

      this.brokerAPIService.post(this.UrlAPI_Create, this.objRow).subscribe(
        data => {
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.showSnackBar("Save Complete");
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
      // this.objRow.isAdmin = false;
      // this.objRow.inActivated = false;
      this.objRow.createBy = localStorage.getItem('firstName');
      
      this.brokerAPIService.post(this.UrlAPI_Update, this.objRow).subscribe(
        data => {
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.showSnackBar("Save Complete");
            this.router.navigate([this.Url_Listing]);
          }
          else {
            this.showSnackBar("error, Can't create new user");
            console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
          }
        },
        err => {
          // กรณี error

          console.log('Something went wrong!');
        }
      );
    }
  }



  showSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000
    });
  }

  showDialog(type: string, title: string, body: string) {
    this.dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '300px', height: '200px',
      data: {
        Messagetype: type,
        Messagetitle: title,
        Messagebody: body
      },
      disableClose: true
    });
  }

}