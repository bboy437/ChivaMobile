import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysenumDetailComponent } from './sysenum-detail.component';

describe('SysenumDetailComponent', () => {
  let component: SysenumDetailComponent;
  let fixture: ComponentFixture<SysenumDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysenumDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysenumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
