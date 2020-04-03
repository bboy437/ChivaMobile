import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualGiftReportDetailComponent } from './individual-gift-report-detail.component';

describe('IndividualGiftReportDetailComponent', () => {
  let component: IndividualGiftReportDetailComponent;
  let fixture: ComponentFixture<IndividualGiftReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualGiftReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualGiftReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
