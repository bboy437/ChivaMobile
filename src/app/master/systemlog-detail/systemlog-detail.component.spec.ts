import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemlogDetailComponent } from './systemlog-detail.component';

describe('SystemlogDetailComponent', () => {
  let component: SystemlogDetailComponent;
  let fixture: ComponentFixture<SystemlogDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemlogDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemlogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
