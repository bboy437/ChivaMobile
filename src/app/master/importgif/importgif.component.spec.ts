import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportgifComponent } from './importgif.component';

describe('ImportgifComponent', () => {
  let component: ImportgifComponent;
  let fixture: ComponentFixture<ImportgifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportgifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportgifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
