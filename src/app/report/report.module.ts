
import { NgModule } from '@angular/core';
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
    MatSnackBarModule,
    MatRadioModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    


    
} from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '../core/core.module';
import { WebDataRocksPivot } from "./webdatarocks/webdatarocks.angular4";
import { ReportRouterModule } from './report.routes';
import { IndividualGiftReportComponent } from './individual-gift-report/individual-gift-report.component';
import { DailyGiftReportComponent } from './daily-gift-report/daily-gift-report.component';
import { MemberlistGiftReportComponent } from './memberlist-gift-report/memberlist-gift-report.component';
import { IndividualPromotionReportComponent } from './individual-promotion-report/individual-promotion-report.component';
import { DailyPromotionReportComponent } from './daily-promotion-report/daily-promotion-report.component';
import { MemberlistPromotionReportComponent } from './memberlist-promotion-report/memberlist-promotion-report.component';
import { RegistrantReportComponent } from './registrant-report/registrant-report.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MemberlistGiftReportDetailComponent } from './memberlist-gift-report-detail/memberlist-gift-report-detail.component';
import { MemberlistPromotionReportDetailComponent } from './memberlist-promotion-report-detail/memberlist-promotion-report-detail.component';
import { IndividualGiftReportDetailComponent } from './individual-gift-report-detail/individual-gift-report-detail.component';
import { IndividualPromotionReportDetailComponent } from './individual-promotion-report-detail/individual-promotion-report-detail.component';
import { DailyGiftReportDetailComponent } from './daily-gift-report-detail/daily-gift-report-detail.component';
import { DailyPromotionReportDetailComponent } from './daily-promotion-report-detail/daily-promotion-report-detail.component';
import { RegistrantReportDetailComponent } from './registrant-report-detail/registrant-report-detail.component';


@NgModule({

  declarations: [
  WebDataRocksPivot,
  IndividualGiftReportComponent,
  DailyGiftReportComponent,
  MemberlistGiftReportComponent,
  IndividualPromotionReportComponent,
  DailyPromotionReportComponent,
  MemberlistPromotionReportComponent,
  RegistrantReportComponent,
  MemberlistGiftReportDetailComponent,
  MemberlistPromotionReportDetailComponent,
  IndividualGiftReportDetailComponent,
  IndividualPromotionReportDetailComponent,
  DailyGiftReportDetailComponent,
  DailyPromotionReportDetailComponent,
  RegistrantReportDetailComponent,
  
],

  imports: [
    MatCardModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    CoreModule,
    ReportRouterModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    TextMaskModule
    
   
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule
],

  providers: [],
 
})


export class ReportModule { }
