import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberlistGiftReportComponent } from './memberlist-gift-report.component';

describe('MemberlistGiftReportComponent', () => {
  let component: MemberlistGiftReportComponent;
  let fixture: ComponentFixture<MemberlistGiftReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberlistGiftReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberlistGiftReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
