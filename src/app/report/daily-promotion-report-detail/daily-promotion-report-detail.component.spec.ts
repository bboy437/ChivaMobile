import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPromotionReportDetailComponent } from './daily-promotion-report-detail.component';

describe('DailyPromotionReportDetailComponent', () => {
  let component: DailyPromotionReportDetailComponent;
  let fixture: ComponentFixture<DailyPromotionReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyPromotionReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyPromotionReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
