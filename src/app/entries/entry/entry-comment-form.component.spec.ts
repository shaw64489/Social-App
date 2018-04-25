import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryCommentFormComponent } from './entry-comment-form.component';

describe('EntryCommentFormComponent', () => {
  let component: EntryCommentFormComponent;
  let fixture: ComponentFixture<EntryCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
