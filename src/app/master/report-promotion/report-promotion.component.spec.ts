import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPromotionComponent } from './report-promotion.component';

describe('ReportPromotionComponent', () => {
  let component: ReportPromotionComponent;
  let fixture: ComponentFixture<ReportPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
