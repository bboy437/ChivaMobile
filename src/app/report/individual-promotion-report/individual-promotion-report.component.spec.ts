import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPromotionReportComponent } from './individual-promotion-report.component';

describe('IndividualPromotionReportComponent', () => {
  let component: IndividualPromotionReportComponent;
  let fixture: ComponentFixture<IndividualPromotionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualPromotionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPromotionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
