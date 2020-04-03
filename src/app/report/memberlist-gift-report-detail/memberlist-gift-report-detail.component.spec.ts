import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberlistGiftReportDetailComponent } from './memberlist-gift-report-detail.component';

describe('MemberlistGiftReportDetailComponent', () => {
  let component: MemberlistGiftReportDetailComponent;
  let fixture: ComponentFixture<MemberlistGiftReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberlistGiftReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberlistGiftReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
