import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPromotionReportComponent } from './daily-promotion-report.component';

describe('DailyPromotionReportComponent', () => {
  let component: DailyPromotionReportComponent;
  let fixture: ComponentFixture<DailyPromotionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyPromotionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyPromotionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
