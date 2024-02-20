import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDetailsComponent } from './notes-details.component';

describe('NotesDetailsComponent', () => {
  let component: NotesDetailsComponent;
  let fixture: ComponentFixture<NotesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesDetailsComponent]
    });
    fixture = TestBed.createComponent(NotesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
