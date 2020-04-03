import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPromotionReportDetailComponent } from './individual-promotion-report-detail.component';

describe('IndividualPromotionReportDetailComponent', () => {
  let component: IndividualPromotionReportDetailComponent;
  let fixture: ComponentFixture<IndividualPromotionReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualPromotionReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPromotionReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
