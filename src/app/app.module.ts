import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AuthGuardService } from './auth/service/auth-guard.service';
import { AuthService } from './auth/service/auth.service';
import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { GlobalsValue } from '../app/globals.value';
import { BrokerAPIService } from './services/brokerapi.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteDialogComponent } from './dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { DatePipe } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormatTimePipe } from './master/additionalprivilege-detail/additionalprivilege-detail.component';
import { TextMaskModule } from 'angular2-text-mask';
import {
  MatCardModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatCheckboxModule,
  MatListModule,
  MatSortModule,
  MatPaginatorModule,
  MatTableModule,
  MatSelectModule,
  MatDialogModule,
  MatGridListModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter,
  MatRadioModule

} from '@angular/material';

import { MomentUtcDateAdapter } from './moment-utc-date-adapter';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { AppConfig } from './app.config';
import { MessageDialogLoginComponent } from './dialogs/message-dialog-login/message-dialog-login.component';


export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}


@NgModule({
  declarations: [
    AppComponent,
    ConfirmDeleteDialogComponent,
    MessageDialogComponent,
    MessageDialogLoginComponent,
    FormatTimePipe
  
   
  ],
  imports: [
    BrowserModule,
    LazyLoadModule,
    CoreModule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatRadioModule,
    HttpModule,
    TextMaskModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    GlobalsValue,
    BrokerAPIService,
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    AppConfig,
    { provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true }

  ],
  entryComponents: [
    ConfirmDeleteDialogComponent,
    MessageDialogComponent,
    MessageDialogLoginComponent
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
