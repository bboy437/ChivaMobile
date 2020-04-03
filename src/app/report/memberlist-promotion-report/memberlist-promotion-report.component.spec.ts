import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberlistPromotionReportComponent } from './memberlist-promotion-report.component';

describe('MemberlistPromotionReportComponent', () => {
  let component: MemberlistPromotionReportComponent;
  let fixture: ComponentFixture<MemberlistPromotionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberlistPromotionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberlistPromotionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
