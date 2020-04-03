import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportgifDetailComponent } from './importgif-detail.component';

describe('ImportgifDetailComponent', () => {
  let component: ImportgifDetailComponent;
  let fixture: ComponentFixture<ImportgifDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportgifDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportgifDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
