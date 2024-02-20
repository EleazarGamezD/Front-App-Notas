import { Component, Inject, OnInit } from '@angular/core';
import { Note } from '../interface/note.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from '../service/notes.service';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css']
})
export class NotesDetailsComponent implements OnInit {
  note: Note = {};
  isLoading: boolean = true;
  constructor(
    private notesService: NotesService,
    public dialogRef: MatDialogRef<NotesDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.simulateAsyncLoad();

    let noteId = this.data.noteId
    console.log(noteId)
    this.notesService.getNoteById(noteId).subscribe(
      (data: any) => {
        this.note = data
      },
      error => {
        console.error('Error al obtener la nota:', error);
      }
    )
  }
  onClose(): void {
    this.dialogRef.close();
  }
  simulateAsyncLoad() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); // Simulate a delay of 3 seconds
  }
}
