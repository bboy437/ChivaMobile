import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionListingComponent } from './promotion-listing.component';

describe('PromotionListingComponent', () => {
  let component: PromotionListingComponent;
  let fixture: ComponentFixture<PromotionListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
