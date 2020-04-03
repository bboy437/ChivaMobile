import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyGiftReportDetailComponent } from './daily-gift-report-detail.component';

describe('DailyGiftReportDetailComponent', () => {
  let component: DailyGiftReportDetailComponent;
  let fixture: ComponentFixture<DailyGiftReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyGiftReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyGiftReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
