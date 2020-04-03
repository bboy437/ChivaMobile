import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualGiftReportComponent } from './individual-gift-report.component';

describe('IndividualGiftReportComponent', () => {
  let component: IndividualGiftReportComponent;
  let fixture: ComponentFixture<IndividualGiftReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualGiftReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualGiftReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
