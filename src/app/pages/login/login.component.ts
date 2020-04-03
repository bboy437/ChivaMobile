import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
// import { AuthService } from '../../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/map'
import { BrokerAPIService } from '../../services/brokerapi.service';
import {
  MatSnackBar, MatDialog, MatDialogRef, VERSION,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from "@angular/material";
import { MessageDialogLoginComponent } from '../../dialogs/message-dialog-login/message-dialog-login.component';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  private loading = false;
  public userForm: FormGroup;
  private UrlAPI_GetCurrentChivaUser: string = "Account/GetCurrentChivaUser";
  version = VERSION;
  dialogRef: MatDialogRef<MessageDialogLoginComponent>;
  model: any = {};

  formErrors = {
    'username': '',
    'password': ''
  };
  validationMessages = {
    'username': {
      'required': 'Please enter your username',
      'username': 'please enter your vaild username'
    },
    'password': {
      'required': 'please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 4 characters',
      'maxlength': 'Please enter less than 25 characters',
    }
  };

  constructor(private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar, private authService: AuthService, private fb: FormBuilder, private brokerAPIService: BrokerAPIService) {

  }
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }



  clear() {
    this.model.username = "";
    this.model.password = "";
    this.click();
  }

  click() {

    this.model.username.nativeElement.focus();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }


  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000
    });
  }

  showDialog(type: string, title: string, body: string) {
    this.dialogRef = this.dialog.open(MessageDialogLoginComponent, {
      width: '300px', height: '200px',
      data: {
        Messagetype: type,
        Messagetitle: title,
        Messagebody: body
      },
      disableClose: true
    });
  }

  validat() {

    let strValidate: string = "";
    if (this.model.password == "" || this.model.password == undefined || this.model.username == "" || this.model.username == undefined) {
      strValidate = "Invalid data";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    }
  }

  btnLoginClick() {
    if (this.validat()) {
      this.login();
    }
  }

  login() {

    if (this.model.username != "" && this.model.password != "") {
      this.loading = true;
      this.authService.login(this.model.username, this.model.password)
        .subscribe(
          data => {
            if (data) {
              // localStorage.setItem("password", data: this.model.password);
              this.getCurrentUser();

              console.log("data " + data);
              // this.router.navigate(["auth/pages/index"]);
            }
            else {
              console.log("message " + data);
              console.log("message " + this.authService.responseLogin.message);

              let strValidate: string = "";
               if (this.authService.responseLogin.message == "Login failed, Invalid username or passowrd") {
                strValidate = "Invalid username or passoword";
              }

              if (strValidate != "") {
                this.showDialog("error", "Error", strValidate);
                return false;
              } else {
                return true;
              }
            }


          },

          error => {
            this.loading = false;

          });
    } {
      return false;


    }
  }


  private getCurrentUser() {

    this.brokerAPIService.get(this.UrlAPI_GetCurrentChivaUser).subscribe(data => {
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("defaultHospitalCode", data.defaultHospitalCode);
      localStorage.setItem("isAdmin", data.isAdmin);


      this.router.navigate(["auth/pages/index"]);
      console.log("isAdmin", data.isAdmin);

    });
  }

}

