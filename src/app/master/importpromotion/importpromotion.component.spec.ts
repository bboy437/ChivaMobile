import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportpromotionComponent } from './importpromotion.component';

describe('ImportpromotionComponent', () => {
  let component: ImportpromotionComponent;
  let fixture: ComponentFixture<ImportpromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportpromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportpromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
