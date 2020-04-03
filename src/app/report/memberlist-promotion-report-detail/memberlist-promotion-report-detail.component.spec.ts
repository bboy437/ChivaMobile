import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberlistPromotionReportDetailComponent } from './memberlist-promotion-report-detail.component';

describe('MemberlistPromotionReportDetailComponent', () => {
  let component: MemberlistPromotionReportDetailComponent;
  let fixture: ComponentFixture<MemberlistPromotionReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberlistPromotionReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberlistPromotionReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
