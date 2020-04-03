import { Component, OnInit } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';
import {
  MatSnackBar, MatDialog, MatDialogRef, VERSION,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from "@angular/material";
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { ConfirmDeleteDialogComponent } from "../../dialogs/confirm-delete-dialog/confirm-delete-dialog.component";


@Component({
  selector: 'app-user-changpassword',
  templateUrl: './user-changpassword.component.html',
  styleUrls: ['./user-changpassword.component.scss']
})
export class UserChangpasswordComponent implements OnInit {
  version = VERSION;
  dialogRef: MatDialogRef<MessageDialogComponent>;

  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};

  private UrlAPI_UserChangePassword: string = "Account/IdentityUserChangePassword";

  filter: string;
  private Url_Listing: string = "/auth/pages/index";
  disabled: boolean;
  arrobjSyseum: any = [];
  NewPassword: string;
  password: string;

  constructor(private brokerAPIService: BrokerAPIService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    this.RowID = "new";
    console.log(localStorage.getItem('password'));
    this.password = localStorage.getItem('password');
  }
  btnCloseClick() {
    this.router.navigate([this.Url_Listing]);
  }



  // KeyemployeeCode(filterValue: string) {
  //   if (filterValue.length >= 6) {

  //     this.save();
  //   }
  //   else {
  //     // this.validate();
  //   }
  // }


  btnSaveClick() {
      this.save()
  }


  save() {

    let strValidate: string = "";
    if (this.objRow.newPassword  != this.NewPassword) {
      strValidate = "Password ไม่ตรงกัน";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    }

    if (this.objRow.newPassword  < 6 ) {
      strValidate = "Password 6 หลักขึ้นไป";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    }

    // if (this.objRow.oldPassword == "" || this.objRow.oldPassword == null) {
    //   strValidate = "Password เดิมไม่ถูกต้อง";
    // }
    // if (strValidate != "") {
    //   this.showDialog("error", "Error", strValidate);
    //   return false;
    // }



    if (this.RowID == "new") {
      
      //Create
      this.brokerAPIService.post(this.UrlAPI_UserChangePassword, this.objRow).subscribe(
        data => {
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.showSnackBar("Save Complete");
            this.router.navigate([this.Url_Listing]);

          }
          else {
  
            this.dialogRef = this.dialog.open(MessageDialogComponent, {
              width:'300px',height:'200px',
              data: {
                Messagetype: "error",
                Messagetitle: "Error",
                Messagebody: "ข้อมูลไม่ถูกต้อง"
              },
              disableClose: true
            });
     
          }
        },
        err => {
          // กรณี error
          console.log('Something went wrong!');
        });
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
