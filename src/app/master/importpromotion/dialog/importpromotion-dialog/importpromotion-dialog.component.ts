import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BrokerAPIService } from '../../../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../../../interfaces/apiResponse';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Promotion, SysEnum } from '../../../../interfaces/sysrecord';
import { MatSnackBar, MatDialog, MatDialogRef, VERSION, } from "@angular/material";
import { MessageDialogComponent } from '../../../../dialogs/message-dialog/message-dialog.component';


@Component({
  selector: 'app-importpromotion-dialog',
  templateUrl: './importpromotion-dialog.component.html',
  styleUrls: ['./importpromotion-dialog.component.scss']
})
export class ImportpromotionDialogComponent implements OnInit {
  version = VERSION;
  dialogRef1: MatDialogRef<MessageDialogComponent>;
  arrobjpromotion: any = [];
  private UrlAPI_Getpromation: string = "Promotion/GetAll";
  arrobjsysenum: any = [];
  private UrlAPI_Getsysenumname: string = "/SysEnum/GetListByEnumName/ProjectForPromotion";
  arrchivaMembers: any = [];
  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};
  private UrlAPI_Create: string = "Promotion/CreatePromotionForMember";
  @ViewChild("fileuploadpdfUri") fileuploadpdfUri;
  namecsv: string;

  constructor(
    private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute, private router: Router,
    private dialogRef: MatDialog,
    private dialog: MatDialog,
    private snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.RowID = "new";
    this.namecsv  = "No file chosen";
    this.promotionClick();
    this.sysenumClick();

  }

  formControl = new FormControl('', [Validators.required]);
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }


  sysenumClick() {
    this.brokerAPIService.get(this.UrlAPI_Getsysenumname).subscribe(
      data => {
        this.arrobjsysenum = data;
      }
    );
  }

  promotionClick() {
    this.brokerAPIService.get(this.UrlAPI_Getpromation).subscribe(
      data => {
        this.arrobjpromotion = <Promotion>data;
      }
    );
  }

  public changeListener(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      this.namecsv = file.name;
      //  document.getElementById("file-name").innerText = FileList[0].name;
      console.log(file.name);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        console.log("reader.result");
        console.log(reader.result);
        // let csvData = reader.result;  
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
                // if (this.arrchivaMembers[index].chivaCode != undefined) {
                // console.log("data[0]");
                console.log("trim", data[0].trim());
                if (data[0].trim() != "") {
                  this.arrchivaMembers[index] = {};
                  this.arrchivaMembers[index].giftForMemberId = this.objRow.giftId;
                  this.arrchivaMembers[index].chivaCode = data[0];
                  this.arrchivaMembers[index].createBy = localStorage.getItem('firstName');
                  this.arrchivaMembers[index].updateBy = localStorage.getItem('firstName');
                  console.log("chivaCode ", this.arrchivaMembers[index].chivaCode);
                  // this.uploadqty++;
                  // console.log(this.uploadqty);
                }
                // }
              }
            }
            lines.push(tarr);
          }
        }
        // this.csvData = lines;
        console.log("this.arrchivaMembers");
        console.log(this.arrchivaMembers);
      }
    }
  }


  onNoClick() {
    this.dialogRef.closeAll();
  }

  btnSaveClick() {
    if (this.validate()) {
      this.save();
    }
    // this.readCsvData('fileName');
  }

  promotionChange() {
    if (this.arrchivaMembers.length > 0) {
      for (let i = 0; i < this.arrchivaMembers.length; i++) {
        this.arrchivaMembers[i] = this.objRow.promotionId;
      }
    }
  }

  validate() {
    let strValidate: string = "";
    if (this.objRow.promotionId == undefined || this.objRow.promotionId == "") {
      strValidate = "Promotion Name";
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

  save() {

    console.log("save");
    console.log(this.objRow);
    if (this.RowID == "new") {
      //Create
      this.objRow.createBy = localStorage.getItem('firstName');
      this.objRow.updateBy = localStorage.getItem('firstName');
      this.objRow.processDate = new Date().toISOString();
      // this.objRow.inActivated = false;
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