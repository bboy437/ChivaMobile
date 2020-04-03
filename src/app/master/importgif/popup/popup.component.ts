import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BrokerAPIService } from '../../../services/brokerapi.service';
import { IAPIResponse } from '../../../interfaces/apiResponse';
import { FormControl, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, mixinDisabled } from '@angular/material/core';
import { Gift } from '../../../interfaces/sysrecord';
import { Giftimport } from '../../../interfaces/sysrecord';
import { SysEnum } from '../../../interfaces/sysrecord';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { retry } from 'rxjs/operators';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar, MatDialog, MatDialogRef, VERSION } from "@angular/material";
import { MessageDialogComponent } from '../../../dialogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  version = VERSION;
  dialogRef1: MatDialogRef<MessageDialogComponent>;
  objAPIUpload: any = {};
  selectedValue;
  strVarlidate: string = '';
  disabled: boolean = true;
  date = new FormControl((new Date()).toISOString())
  serializedDate = new FormControl((new Date()).toISOString())
  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};
  gift: Gift;
  arrobjgift: any = [];
  sysEnum: SysEnum;
  arrobjsysEnum: any = [];
  uploadqty: number;
  importstatus: boolean = false;
  arrchivaMembers: any = [];
  private UrlAPI_Create: string = "Gift/CreateGiftForMember";
  namecsv: string;
  private UrlAPI_GetAllGift: string = "Gift/GetAll";
  private UrlAPI_Getsysenumname: string = "/SysEnum/GetListByEnumName/ProjectForGift";
  @ViewChild("fileuploadpdfUri") fileuploadpdfUri;

  constructor(
    private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialog,
    private dialog: MatDialog,
    private snackBar: MatSnackBar, ) {

  }

  ngOnInit() {
    this.RowID = "new";
    this.namecsv = "No file chosen";
    this.giftClick();
    this.Privilegeroupclick();

  }

  giftClick() {
    this.brokerAPIService.get(this.UrlAPI_GetAllGift).subscribe(
      data => {
        this.arrobjgift = <Gift>data;
      }
    );
  }

  Privilegeroupclick() {
    this.brokerAPIService.get(this.UrlAPI_Getsysenumname).subscribe(
      data => {
        this.arrobjsysEnum = <SysEnum>data;
        console.log(this.arrobjsysEnum);
      }
    );
  }

  onNoClick() {
    this.dialogRef.closeAll();
  }

  public changeListener(files: FileList) {

    console.log(files);
    if (files && files.length > 0) {

      let file: File = files.item(0);
      this.namecsv = file.name;
      console.log(file.name);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        console.log("reader.result");
        console.log(reader.result);
        let allTextLines = (reader.result as string).match(/[^\r\n]+/g);
        console.log(allTextLines);
        let headers = allTextLines[0].split(',');
        let lines = [];
        console.log("headers");
        console.log(headers);
        console.log(lines);
        for (let i = 0; i < allTextLines.length; i++) {
          // split content based on comma
          let data = allTextLines[i].split(',');
          if (data.length == headers.length) {
            let tarr = [];
            for (let j = 0; j < headers.length; j++) {
              tarr.push(data[j]);
              if (i > 0) // Data Only
              {
                let index: number;
                index = this.arrchivaMembers.length;
                console.log("trim", data[0].trim());
                if (data[0].trim() != "") {
                  this.arrchivaMembers[index] = {};
                  this.arrchivaMembers[index].giftForMemberId = this.objRow.giftId;
                  this.arrchivaMembers[index].chivaCode = data[0];
                  this.arrchivaMembers[index].createBy = localStorage.getItem('firstName');
                  this.arrchivaMembers[index].updateBy = localStorage.getItem('firstName');
                  console.log("chivaCode ", this.arrchivaMembers[index].chivaCode);
                  console.log(this.uploadqty);
                }
              }
            }
            lines.push(tarr);
          }
        }
        console.log("this.arrchivaMembers");
        console.log(this.arrchivaMembers);
      }
    }
  }


  validate() {
    let strValidate: string = "";
    if (this.objRow.giftId == undefined || this.objRow.giftId == "") {
      strValidate = "Gift Name";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    } if (this.objRow.projectId == undefined || this.objRow.projectId == "") {
      strValidate = "Project Name";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    } if (this.objRow.uploadQty == 0) {
      strValidate = "Upload(ไฟล์ .CSV)";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    } else {
      return true;
    }
  }


  btnSaveClick() {
    if (this.validate()) {
      this.save();
    }
  }

  giftChange() {
    if (this.arrchivaMembers.length > 0) {
      for (let i = 0; i < this.arrchivaMembers.length; i++) {
        this.arrchivaMembers[i] = this.objRow.giftId;
      }
    }
  }

  btnCloseClick() {
    this.router.navigate(['/auth/master/importgif']);
  }

  save() {

    console.log("save");
    console.log(this.objRow);
    if (this.RowID == "new") {
      //Create
      this.objRow.createBy = localStorage.getItem('firstName');
      this.objRow.updateBy = localStorage.getItem('firstName');
      this.objRow.processDate = new Date().toISOString();
      let strValidate: string = "";
      if (this.arrchivaMembers.length == 0) {
        strValidate = "Upload(ไฟล์ .CSV)";
      }
      if (strValidate != "") {
        this.showDialog("error", "Error", strValidate);
        return false;
      }
      this.objRow.uploadQty = this.arrchivaMembers.length;
      this.objRow.chivaMembers = this.arrchivaMembers;
      console.log("save");
      console.log(this.objRow);
      this.brokerAPIService.post(this.UrlAPI_Create, this.objRow).subscribe(
        data => {
          console.log(this.UrlAPI_Create, this.objRow);
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.importstatus = true;
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