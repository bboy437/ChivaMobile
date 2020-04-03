import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrantReportComponent } from './registrant-report.component';

describe('RegistrantReportComponent', () => {
  let component: RegistrantReportComponent;
  let fixture: ComponentFixture<RegistrantReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrantReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrantReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
