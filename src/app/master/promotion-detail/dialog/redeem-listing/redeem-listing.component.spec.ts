import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemListingComponent } from './redeem-listing.component';

describe('RedeemListingComponent', () => {
  let component: RedeemListingComponent;
  let fixture: ComponentFixture<RedeemListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
