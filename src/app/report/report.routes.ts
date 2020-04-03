import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyGiftReportComponent } from './daily-gift-report/daily-gift-report.component';
import { DailyPromotionReportComponent } from './daily-promotion-report/daily-promotion-report.component';
import { IndividualGiftReportComponent } from './individual-gift-report/individual-gift-report.component';
import { IndividualPromotionReportComponent } from './individual-promotion-report/individual-promotion-report.component';
import { MemberlistGiftReportComponent } from './memberlist-gift-report/memberlist-gift-report.component';
import { MemberlistPromotionReportComponent } from './memberlist-promotion-report/memberlist-promotion-report.component';
import { RegistrantReportComponent } from './registrant-report/registrant-report.component';
import { MemberlistGiftReportDetailComponent } from './memberlist-gift-report-detail/memberlist-gift-report-detail.component';
import { MemberlistPromotionReportDetailComponent } from './memberlist-promotion-report-detail/memberlist-promotion-report-detail.component';
import { IndividualGiftReportDetailComponent } from './individual-gift-report-detail/individual-gift-report-detail.component';
import { IndividualPromotionReportDetailComponent } from './individual-promotion-report-detail/individual-promotion-report-detail.component';
import { DailyGiftReportDetailComponent } from './daily-gift-report-detail/daily-gift-report-detail.component';
import { DailyPromotionReportDetailComponent } from './daily-promotion-report-detail/daily-promotion-report-detail.component';
import { RegistrantReportDetailComponent } from './registrant-report-detail/registrant-report-detail.component';


const pagesRoutes: Routes = [
   { path: 'daily-gift-report', component: DailyGiftReportComponent ,data: { animation: 'daily-gift-report' }},
   { path: 'daily-promotion-report', component: DailyPromotionReportComponent ,data: { animation: 'daily-promotion-report' }},
   { path: 'individual-gift-report', component: IndividualGiftReportComponent ,data: { animation: 'individual-gift-report' }},
   { path: 'individual-promotion-report', component: IndividualPromotionReportComponent ,data: { animation: 'individual-promotion-report' }},
   { path: 'memberlist-gift-report', component: MemberlistGiftReportComponent ,data: { animation: 'memberlist-gift-report' }},
   { path: 'memberlist-promotion-report', component: MemberlistPromotionReportComponent ,data: { animation: 'memberlist-promotion-report' }},
   { path: 'registrant-report', component: RegistrantReportComponent ,data: { animation: 'registrant-report' }},
   { path: 'memberlist-gift-report-detail', component: MemberlistGiftReportDetailComponent ,data: { animation: 'memberlist-gift-report-detail' }},
   { path: 'memberlist-promotion-report-detail', component: MemberlistPromotionReportDetailComponent ,data: { animation: 'memberlist-promotion-report-detail' }},
   { path: 'individual-gift-report-detail', component: IndividualGiftReportDetailComponent ,data: { animation: 'individual-gift-report-detail' }},
   { path: 'individual-promotion-report-detail', component: IndividualPromotionReportDetailComponent ,data: { animation: 'individual-promotion-report-detail' }},
   { path: 'daily-gift-report-detail', component: DailyGiftReportDetailComponent ,data: { animation: 'daily-gift-report-detail' }},
   { path: 'daily-promotion-report-detail', component: DailyPromotionReportDetailComponent ,data: { animation: 'daily-promotion-report-detail' }},
   { path: 'registrant-report-detail', component: RegistrantReportDetailComponent ,data: { animation: 'registrant-report-detail' }},
 
  ];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class ReportRouterModule {}