import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMemberComponent } from './report-member.component';

describe('ReportMemberComponent', () => {
  let component: ReportMemberComponent;
  let fixture: ComponentFixture<ReportMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
