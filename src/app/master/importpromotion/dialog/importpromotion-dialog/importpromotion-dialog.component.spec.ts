import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportpromotionDialogComponent } from './importpromotion-dialog.component';

describe('ImportpromotionDialogComponent', () => {
  let component: ImportpromotionDialogComponent;
  let fixture: ComponentFixture<ImportpromotionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportpromotionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportpromotionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
