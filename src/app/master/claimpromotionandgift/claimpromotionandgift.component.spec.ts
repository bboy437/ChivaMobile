import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimpromotionandgiftComponent } from './claimpromotionandgift.component';

describe('ClaimpromotionandgiftComponent', () => {
  let component: ClaimpromotionandgiftComponent;
  let fixture: ComponentFixture<ClaimpromotionandgiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimpromotionandgiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimpromotionandgiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
