import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalprivilegeDetailComponent } from './additionalprivilege-detail.component';

describe('AdditionalprivilegeDetailComponent', () => {
  let component: AdditionalprivilegeDetailComponent;
  let fixture: ComponentFixture<AdditionalprivilegeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalprivilegeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalprivilegeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
