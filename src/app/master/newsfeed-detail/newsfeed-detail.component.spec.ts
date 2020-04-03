import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedDetailComponent } from './newsfeed-detail.component';

describe('NewsfeedDetailComponent', () => {
  let component: NewsfeedDetailComponent;
  let fixture: ComponentFixture<NewsfeedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsfeedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
