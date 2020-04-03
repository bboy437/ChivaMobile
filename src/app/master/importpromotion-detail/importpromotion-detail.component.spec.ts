import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportpromotionDetailComponent } from './importpromotion-detail.component';

describe('ImportpromotionDetailComponent', () => {
  let component: ImportpromotionDetailComponent;
  let fixture: ComponentFixture<ImportpromotionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportpromotionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportpromotionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
