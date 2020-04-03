import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAdditionalprivilegeComponent } from './report-additionalprivilege.component';

describe('ReportAdditionalprivilegeComponent', () => {
  let component: ReportAdditionalprivilegeComponent;
  let fixture: ComponentFixture<ReportAdditionalprivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAdditionalprivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAdditionalprivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
