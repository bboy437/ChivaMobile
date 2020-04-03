import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangeComponent } from './user-change.component';

describe('UserChangeComponent', () => {
  let component: UserChangeComponent;
  let fixture: ComponentFixture<UserChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
