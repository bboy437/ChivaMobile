import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrantReportDetailComponent } from './registrant-report-detail.component';

describe('RegistrantReportDetailComponent', () => {
  let component: RegistrantReportDetailComponent;
  let fixture: ComponentFixture<RegistrantReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrantReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrantReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
