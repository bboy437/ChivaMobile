import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftListingComponent } from './gift-listing.component';

describe('GiftListingComponent', () => {
  let component: GiftListingComponent;
  let fixture: ComponentFixture<GiftListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
