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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MasterRouterModule } from './master.routes';
import { CoreModule } from '../core/core.module';
import { ChivamemberListingComponent } from './chivamember-listing/chivamember-listing.component';
import { ChivamemberDetailComponent } from './chivamember-detail/chivamember-detail.component';
import { NewsfeedListingComponent } from './newsfeed-listing/newsfeed-listing.component';
import { NewsfeedDetailComponent } from './newsfeed-detail/newsfeed-detail.component';
import { AdditionalprivilegeListingComponent } from './additionalprivilege-listing/additionalprivilege-listing.component';
import { AdditionalprivilegeDetailComponent } from './additionalprivilege-detail/additionalprivilege-detail.component';
import { QuillModule } from 'ngx-quill';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { GiftDetailComponent } from './gift-detail/gift-detail.component';
import { GiftListingComponent } from './gift-listing/gift-listing.component';
import { PromotionListingComponent } from './promotion-listing/promotion-listing.component';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { RedeemListingComponent } from './promotion-detail/dialog/redeem-listing/redeem-listing.component';
import { SysenumDetailComponent } from './sysenum-detail/sysenum-detail.component';
import { SysenumListingComponent } from './sysenum-listing/sysenum-listing.component';
import { SystemlogComponent } from './systemlog/systemlog.component';
import { ImportpromotionComponent } from './importpromotion/importpromotion.component';
import { ImportpromotionDialogComponent } from './importpromotion/dialog/importpromotion-dialog/importpromotion-dialog.component';
import { TextMaskModule } from 'angular2-text-mask';
import { ImportgifComponent } from './importgif/importgif.component';
import { PopupComponent } from './importgif/popup/popup.component';
import { SystemlogDetailComponent } from './systemlog-detail/systemlog-detail.component';

import { ClaimpromotionandgiftComponent } from './claimpromotionandgift/claimpromotionandgift.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserChangpasswordComponent } from './user-changpassword/user-changpassword.component';
import { WebDataRocksPivot } from "./webdatarocks/webdatarocks.angular4";
import { ReportMemberComponent } from './report-member/report-member.component';
import { ReportNewfeedComponent } from './report-newfeed/report-newfeed.component';
import { ReportAdditionalprivilegeComponent } from './report-additionalprivilege/report-additionalprivilege.component';
import { ReportGiftComponent } from './report-gift/report-gift.component';
import { ReportPromotionComponent } from './report-promotion/report-promotion.component';
import { ImportpromotionDetailComponent } from './importpromotion-detail/importpromotion-detail.component';
import { ImportgifDetailComponent } from './importgif-detail/importgif-detail.component';
import { ChivamemberListingDialogComponent } from './chivamember-listing/dialog/chivamember-listing-dialog/chivamember-listing-dialog.component';
@NgModule({
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
        MasterRouterModule,
        MatSortModule,
        MatPaginatorModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
        QuillModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSnackBarModule,
        MatDialogModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        TextMaskModule
    

    ],
    declarations: [
        ChivamemberListingComponent,
        ChivamemberDetailComponent,
        NewsfeedListingComponent,
        NewsfeedDetailComponent,
        AdditionalprivilegeListingComponent,
        AdditionalprivilegeDetailComponent,
        GiftDetailComponent,
        GiftListingComponent,
        PromotionListingComponent,
        PromotionDetailComponent,
        RedeemListingComponent,
        SysenumDetailComponent,
        SysenumListingComponent,
        SystemlogComponent,
        ImportpromotionComponent,
        ImportpromotionDialogComponent,
        ImportgifComponent,
        PopupComponent,
        SystemlogDetailComponent,
        ClaimpromotionandgiftComponent,
        UserListingComponent,
        UserDetailComponent,
        UserChangpasswordComponent,
        WebDataRocksPivot,
        ReportMemberComponent,
        ReportNewfeedComponent,
        ReportAdditionalprivilegeComponent,
        ReportGiftComponent,
        ReportPromotionComponent,
        ImportpromotionDetailComponent,
        ImportgifDetailComponent,
        ChivamemberListingDialogComponent
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
    entryComponents: [RedeemListingComponent,ImportpromotionDialogComponent,PopupComponent,ChivamemberListingDialogComponent]
})
export class MasterModule { }
