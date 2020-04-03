import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNewfeedComponent } from './report-newfeed.component';

describe('ReportNewfeedComponent', () => {
  let component: ReportNewfeedComponent;
  let fixture: ComponentFixture<ReportNewfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportNewfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNewfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
