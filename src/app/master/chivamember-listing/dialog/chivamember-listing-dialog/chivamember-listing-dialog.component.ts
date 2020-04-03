import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BrokerAPIService } from '../../../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../../../interfaces/apiResponse';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UploadChiva } from '../../../../interfaces/sysrecord';
import { MatSnackBar, MatDialog, MatDialogRef, VERSION, } from "@angular/material";
import { MessageDialogComponent } from '../../../../dialogs/message-dialog/message-dialog.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-chivamember-listing-dialog',
  templateUrl: './chivamember-listing-dialog.component.html',
  styleUrls: ['./chivamember-listing-dialog.component.scss']
})
export class ChivamemberListingDialogComponent implements OnInit {
  version = VERSION;
  dialogRef1: MatDialogRef<MessageDialogComponent>;
  arrobjUploadChiva: any = [];
  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};
  namecsv: string;
  private UrlAPI_Create: string = "ChivaMember/UploadChivaInfo";
  @ViewChild("fileuploadpdfUri") fileuploadpdfUri;

  constructor(
    private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute, private router: Router,
    private dialogRef: MatDialog,
    private dialog: MatDialog,
    private snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.RowID = "new";
    this.namecsv  = "No file chosen";
  }


  arrayBuffer: any;
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
    let strValidate: string = "";
    this.objRow.detailImageLocation = document.querySelector("#fUpload");

    if (/\.(xlsx)$/i.test(event.target.files[0].name) === false) {
      strValidate = "not an xlsx file !";

    } if (strValidate != "") {
      this.ngOnInit()
      event.target.value = null;
      this.showDialog("error", "Error", strValidate);
      return false;

    }
    this.namecsv = this.file.name;
    console.log("namecsv", this.namecsv);
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];

      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.arrobjUploadChiva = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log("arrobjUploadChiva", this.arrobjUploadChiva);
      this.save();
    }
    fileReader.readAsArrayBuffer(this.file);
  }



  onNoClick() {
    this.dialogRef.closeAll();
  }


  save() {

    console.log("save");
    if (this.RowID == "new") {
      this.objRow = this.arrobjUploadChiva;
      console.log(this.objRow);
      this.brokerAPIService.post(this.UrlAPI_Create, this.objRow).subscribe(
        data => {
          console.log(this.UrlAPI_Create, this.objRow);
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.showSnackBar("Save Complete");
            this.dialogRef.closeAll();
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
    }

  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000
    });
  }

  showDialog(type: string, title: string, body: string) {
    this.dialogRef1 = this.dialog.open(MessageDialogComponent, {
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


