import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../interface/note.interface';
import { NotesService } from '../service/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-home',
  templateUrl: './notes-home.component.html',
  styleUrls: ['./notes-home.component.css']
})
export class NotesHomeComponent implements OnInit {
  @Input() notes: Note[] = [];
  year: string = '';
  month: string = '';
  filterActive: boolean = true;
  isLoading: boolean = true;
  constructor(private notesService: NotesService,
    private router: Router,) { }
  ngOnInit(): void {
    this.simulateAsyncLoad();
    this.getNotes()
  }
  getNotes() {
    this.notesService.getAllNote()
      .subscribe((data: any) => {
        this.notes = data.map((note: Note) => {
          if (note.createDate) {
            const dateParts = note.createDate.split('T')[0].split('-');
            const year = dateParts[0];
            const month = dateParts[1];
            const day = dateParts[2];

            return {
              ...note,
              year: `${year}`,
              month: `${month}/${day}`,
              formattedDate: `${year}-${month}-${day}`,

            };
          } else {
            return note;
          }
        });

      });
  }

  simulateAsyncLoad() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000); // Simulate a delay of 3 seconds
  }
  toggleNoteIsActiveToFalse(active: boolean) {
    this.filterActive = false;

  }

  toggleNoteIsActiveToTrue(active: boolean) {
    this.filterActive = true;

  }

  showAddNoteButton(): boolean {
    // Devuelve true si el filtro está activo (mostrando notas activas)
    return this.filterActive;
  }

  showViewArchivedNotesButton(): boolean {
    // Devuelve true si el filtro no está activo (mostrando notas archivadas)
    return !this.filterActive;
  }



}
