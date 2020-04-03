import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyGiftReportComponent } from './daily-gift-report.component';

describe('DailyGiftReportComponent', () => {
  let component: DailyGiftReportComponent;
  let fixture: ComponentFixture<DailyGiftReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyGiftReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyGiftReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
