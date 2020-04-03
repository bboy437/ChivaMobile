import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysenumListingComponent } from './sysenum-listing.component';

describe('SysenumListingComponent', () => {
  let component: SysenumListingComponent;
  let fixture: ComponentFixture<SysenumListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysenumListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysenumListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
