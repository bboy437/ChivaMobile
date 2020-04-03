import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChivamemberListingComponent } from './chivamember-listing/chivamember-listing.component';
import { ChivamemberDetailComponent } from './chivamember-detail/chivamember-detail.component';
import { NewsfeedListingComponent } from './newsfeed-listing/newsfeed-listing.component';
import { NewsfeedDetailComponent } from './newsfeed-detail/newsfeed-detail.component';
import { AdditionalprivilegeDetailComponent } from './additionalprivilege-detail/additionalprivilege-detail.component';
import { AdditionalprivilegeListingComponent } from './additionalprivilege-listing/additionalprivilege-listing.component';
import { GiftListingComponent } from './gift-listing/gift-listing.component';
import { GiftDetailComponent } from './gift-detail/gift-detail.component';
import { PromotionListingComponent } from './promotion-listing/promotion-listing.component';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { SysenumListingComponent } from './sysenum-listing/sysenum-listing.component';
import { SysenumDetailComponent } from './sysenum-detail/sysenum-detail.component';
import { SystemlogComponent } from './systemlog/systemlog.component';
import { ImportpromotionComponent } from './importpromotion/importpromotion.component';
import { ImportgifComponent } from './importgif/importgif.component';
import { SystemlogDetailComponent } from './systemlog-detail/systemlog-detail.component';
import { ClaimpromotionandgiftComponent } from './claimpromotionandgift/claimpromotionandgift.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserChangpasswordComponent } from './user-changpassword/user-changpassword.component';
import { ReportMemberComponent } from './report-member/report-member.component';
import { ReportNewfeedComponent } from './report-newfeed/report-newfeed.component';
import { ReportAdditionalprivilegeComponent } from './report-additionalprivilege/report-additionalprivilege.component';
import { ReportGiftComponent } from './report-gift/report-gift.component';
import { ReportPromotionComponent } from './report-promotion/report-promotion.component';
import { ImportpromotionDetailComponent } from './importpromotion-detail/importpromotion-detail.component';
import { ImportgifDetailComponent } from './importgif-detail/importgif-detail.component';



const pagesRoutes: Routes = [
 
    { path: 'chivamember-listing', component: ChivamemberListingComponent ,data: { animation: 'chivamember-listing' } },
    { path: 'chivamember-detail', component: ChivamemberDetailComponent ,data: { animation: 'chivamember-detail' } },
    { path: 'newsfeed-listing', component: NewsfeedListingComponent ,data: { animation: 'newsfeed-listing' } },
     { path: 'newsfeed-detail', component: NewsfeedDetailComponent ,data: { animation: 'newsfeed-detail' } },
     { path: 'additionalprivilege-listing', component: AdditionalprivilegeListingComponent ,data: { animation: 'additionalprivilege-listing' } },
     { path: 'additionalprivilege-detail', component: AdditionalprivilegeDetailComponent ,data: { animation: 'additionalprivilege-detail' } },
     { path: 'gift-listing', component: GiftListingComponent ,data: { animation: 'gift-listing' } },
     { path: 'gift-detail', component: GiftDetailComponent ,data: { animation: 'gift-detail' } },
     { path: 'promotion-listing', component: PromotionListingComponent ,data: { animation: 'promotion-listing' } },
     { path: 'promotion-detail', component: PromotionDetailComponent ,data: { animation: 'promotion-detail' } },
     { path: 'sysenum-listing', component: SysenumListingComponent ,data: { animation: 'sysenum-listing' } },
     { path: 'sysenum-detail', component: SysenumDetailComponent ,data: { animation: 'sysenum-detail' } },
     { path: 'systemlog', component: SystemlogComponent ,data: { animation: 'systemlog' } },
     { path: 'systemlog-detail', component: SystemlogDetailComponent ,data: { animation: 'systemlog-detail' } },
     { path: 'importpromotion', component: ImportpromotionComponent ,data: { animation: 'importpromotion' } },
     { path: 'importgif', component: ImportgifComponent ,data: { animation: 'importgif' } },
     { path: 'claimpromotionandgift', component: ClaimpromotionandgiftComponent ,data: { animation: 'claimpromotionandgift' } },
     { path: 'user-listing', component: UserListingComponent ,data: { animation: 'user-listing' } },
     { path: 'user-detail', component: UserDetailComponent ,data: { animation: 'user-detail' } },
     { path: 'user-changpassword', component: UserChangpasswordComponent ,data: { animation: 'user-changpassword' } },
     { path: 'report-member', component: ReportMemberComponent ,data: { animation: 'report-member' } },
     { path: 'report-newfeed', component: ReportNewfeedComponent ,data: { animation: 'report-newfeed' } },
     { path: 'report-additionalprivilege', component: ReportAdditionalprivilegeComponent ,data: { animation: 'report-additionalprivilege' } },
     { path: 'report-gift', component: ReportGiftComponent ,data: { animation: 'report-gift' } },
     { path: 'report-promotion', component: ReportPromotionComponent ,data: { animation: 'report-promotion' } },
     { path: 'importpromotion-detail', component: ImportpromotionDetailComponent ,data: { animation: 'importpromotion-detail' } },
     { path: 'importgif-detail', component: ImportgifDetailComponent ,data: { animation: 'importgif-detail' } },
    //  { path: 'importgif-detail', component: PopupComponent ,data: { animation: 'importgif-detail' } },

  ];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class MasterRouterModule {}