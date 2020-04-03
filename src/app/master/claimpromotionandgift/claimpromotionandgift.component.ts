import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';
import { FormControl, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ClaimGift, ClaimPromotion } from '../../interfaces/sysrecord';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { DatePipe } from '@angular/common';
import {
  MatSnackBar, MatDialog, MatDialogRef, VERSION,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from "@angular/material";


@Component({
  selector: 'app-claimpromotionandgift',
  templateUrl: './claimpromotionandgift.component.html',
  styleUrls: ['./claimpromotionandgift.component.scss']
})
export class ClaimpromotionandgiftComponent implements OnInit {
  objClaim: any = {};
  version = VERSION;
  objRowClaimPromotion: any = {};
  objRowClaimGif: any = {};
  objAPIResponse: any = {};
  DialogRef: MatDialogRef<MessageDialogComponent>;
  private UrlAPI_CreateClaimPromotion: string = "Promotion/MemberGetClaim";
  private UrlAPI_CreateClaimGift: string = "Gift/MemberGetClaim";

  constructor(
    private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute, private router: Router,
    private dialogRef: MatDialog,
    private dialog: MatDialog,
    private snackBar: MatSnackBar, ) {

  }

  ngOnInit() {
    this.objClaim = "CP";
    console.log(this.objClaim);

  }

  btnSaveClick() {
    this.save();

  }

  save() {
    console.log("save");
    if (this.objClaim == "CP") {
      console.log("objClaim");
      console.log(this.objClaim);
      this.brokerAPIService.post(this.UrlAPI_CreateClaimPromotion, this.objRowClaimPromotion).subscribe(
        data => {
          console.log(this.UrlAPI_CreateClaimPromotion, this.objRowClaimPromotion);
          this.objAPIResponse = <IAPIResponse>data;
          console.log(data);
          if (this.objAPIResponse.success) {
            this.showSnackBar("Save Complete");
          }
          else {
            this.DialogRef = this.dialog.open(MessageDialogComponent, {
              width: '300px', height: '200px',
              data: {
                Messagetype: "error",
                Messagetitle: "Error",
                Messagebody: "Redeem No"
              },
              disableClose: true
            });
          }
        },
        err => {
          // กรณี error
          this.showSnackBar("Redeem number not found");
          console.log('Something went wrong!');

        });
    }
    else if (this.objClaim == "CG") {
      console.log("objClaim");
      console.log(this.objClaim);
      this.brokerAPIService.post(this.UrlAPI_CreateClaimGift, this.objRowClaimGif).subscribe(
        data => {
          console.log(this.UrlAPI_CreateClaimGift, this.objRowClaimGif);
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.showSnackBar("Save Complete");
          }
          else {
            this.DialogRef = this.dialog.open(MessageDialogComponent, {
              width: '300px', height: '200px',
              data: {
                Messagetype: "error",
                Messagetitle: "Error",
                Messagebody: "Redeem No"
              },
              disableClose: true
            });
          }
        },
        err => {
          // กรณี error
          this.showSnackBar("Redeem number not found");
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
    this.DialogRef = this.dialog.open(MessageDialogComponent, {
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