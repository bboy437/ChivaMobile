import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChivamemberListingDialogComponent } from './chivamember-listing-dialog.component';

describe('ChivamemberListingDialogComponent', () => {
  let component: ChivamemberListingDialogComponent;
  let fixture: ComponentFixture<ChivamemberListingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChivamemberListingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChivamemberListingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
