import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChivamemberDetailComponent } from './chivamember-detail.component';

describe('ChivamemberDetailComponent', () => {
  let component: ChivamemberDetailComponent;
  let fixture: ComponentFixture<ChivamemberDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChivamemberDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChivamemberDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
