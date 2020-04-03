import { Component, OnInit } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../interfaces/apiResponse';
import { MatSnackBar, MatDialog, MatDialogRef, VERSION,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE  } from "@angular/material";
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { ConfirmDeleteDialogComponent } from "../../dialogs/confirm-delete-dialog/confirm-delete-dialog.component";

@Component({
  selector: 'app-sysenum-detail',
  templateUrl: './sysenum-detail.component.html',
  styleUrls: ['./sysenum-detail.component.scss']
})
export class SysenumDetailComponent implements OnInit {

  version = VERSION;
  dialogRef: MatDialogRef<MessageDialogComponent>;
  
  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};
  private UrlAPI_GetSingleRow : string = "SysEnum/Get/";
  private UrlAPI_Update : string = "SysEnum/Update";
  private UrlAPI_Create : string = "SysEnum/Create";
  private UrlAPI_Delete : string = "SysEnum/Delete";
  filter:string;
  private Url_Listing : string = "/auth/master/sysenum-listing";
  disabled: boolean;
  arrobjSyseum: any = [];
  

  constructor(private brokerAPIService: BrokerAPIService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute, 
    private router: Router) {
  }

   ngOnInit() {
    
    this.showdata();
  }

  private showdata() {
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      console.log(params.get('id'));
      this.RowID = params.get('id')
      this.filter = params.get("filter");
      if (this.RowID == "new") {  }
      else {
        this.brokerAPIService.get(this.UrlAPI_GetSingleRow + this.RowID).subscribe(
          data => {
            this.objRow = <IAPIResponse>data;
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
    this.router.navigate([this.Url_Listing,{ filter: this.filter }]);
  }
  
  deleteItem(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        // data: {id: id, title: title, state: state, url: url}
    
        disableClose: true
    });
    this.router.navigate([this.Url_Listing]);
    dialogRef.afterClosed().subscribe(result => {
        if (result) {

            console.log("this.arrobjPrivilege");
            console.log(this.arrobjSyseum);
            console.log(id);

            let objdelete = this.arrobjSyseum.find(
                x => x.id === id
            );
            console.log("objdelete");
            console.log(objdelete);

            this.brokerAPIService.post(this.UrlAPI_Delete, objdelete).subscribe(
                data => {
                    this.objAPIResponse = <IAPIResponse>data;
                    if (this.objAPIResponse.success) {
                        this.router.navigate([this.Url_Listing]);
                        //   alert('ลบข้อมูลเรียบร้อยแล้ว');
                        this.showdata();
                    }
                    else {
                        console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
                    }
                });

        }
    });
}


  validate() {
    console.log(this.objRow.enumName);
    let strValidate: string = "";

    if (this.objRow.enumName == undefined || this.objRow.enumName == "") {
        strValidate = "Enum Name";
    
    }

    if (strValidate != "") {
       this.showDialog("error", "Error", strValidate);
      return false;

    }  if (this.objRow.enumOrder == undefined || this.objRow.enumOrder == "") {
      strValidate = "Enum Order";
  
  }

  if (strValidate != "") {
     this.showDialog("error", "Error", strValidate);
    return false;
      

    } else {
      return true;
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
      this.objRow.createBy = localStorage.getItem('firstName');
      this.objRow.updateBy = localStorage.getItem('firstName');
      this.brokerAPIService.post(this.UrlAPI_Update, this.objRow).subscribe(
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
        }
      );
    }  
  }
}
