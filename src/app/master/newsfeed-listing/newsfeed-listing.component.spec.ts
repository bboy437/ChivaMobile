import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedListingComponent } from './newsfeed-listing.component';

describe('NewsfeedListingComponent', () => {
  let component: NewsfeedListingComponent;
  let fixture: ComponentFixture<NewsfeedListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsfeedListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
