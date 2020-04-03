import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalprivilegeListingComponent } from './additionalprivilege-listing.component';

describe('AdditionalprivilegeListingComponent', () => {
  let component: AdditionalprivilegeListingComponent;
  let fixture: ComponentFixture<AdditionalprivilegeListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalprivilegeListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalprivilegeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
