import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChivamemberListingComponent } from './chivamember-listing.component';

describe('ChivamemberListingComponent', () => {
  let component: ChivamemberListingComponent;
  let fixture: ComponentFixture<ChivamemberListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChivamemberListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChivamemberListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
