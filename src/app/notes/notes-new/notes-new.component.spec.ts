import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesNewComponent } from './notes-new.component';

describe('NotesNewComponent', () => {
  let component: NotesNewComponent;
  let fixture: ComponentFixture<NotesNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesNewComponent]
    });
    fixture = TestBed.createComponent(NotesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
