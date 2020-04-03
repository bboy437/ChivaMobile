import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGiftComponent } from './report-gift.component';

describe('ReportGiftComponent', () => {
  let component: ReportGiftComponent;
  let fixture: ComponentFixture<ReportGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
