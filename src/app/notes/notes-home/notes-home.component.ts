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
  notesActive: Note[] = [];
  notesArchived: Note[] = [];
  year: string = '';
  month: string = '';
  filterActive: boolean = true;
  isLoading: boolean = true;
  noActiveNotes: boolean = false;
  noInactiveNotes: boolean = false;


  constructor(private notesService: NotesService,
    private router: Router,) { }
  ngOnInit(): void {
    this.simulateAsyncLoad();
    this.getNotes()


  }
  getNotes() {
    this.notesService.getAllNote()
      .subscribe((data: any) => {
        let activeNotesCount = 0;
        let inactiveNotesCount = 0;

        // Crear arreglos separados para notas activas e inactivas
        this.notesActive = [];
        this.notesArchived = [];

        this.notes = data.map((notes: Note) => {
          if (notes.createDate) {
            const dateParts = notes.createDate.split('T')[0].split('-');
            const year = dateParts[0];
            const month = dateParts[1];
            const day = dateParts[2];

            const formattedNote = {
              ...notes,
              year: `${year}`,
              month: `${month}/${day}`,
              formattedDate: `${year}-${month}-${day}`
            };

            // Separar notas activas e inactivas
            if (formattedNote.isActive) {
              this.notesActive.push(formattedNote);
              activeNotesCount++;
            } else {
              this.notesArchived.push(formattedNote);
              inactiveNotesCount++;
            }

            return formattedNote;
          } else {
            return notes;
          }
        });

        // Actualizar variables booleanas
        this.noActiveNotes = activeNotesCount === 0;
        this.noInactiveNotes = inactiveNotesCount === 0;

        // Ahora puedes usar this.notesActive y this.notesArchived según tus necesidades
        console.log('Notas activas:', this.notesActive);
        console.log('Notas inactivas:', this.notesArchived);

        // Actualizar isLoading según si hay notas activas o inactivas
        this.isLoading = activeNotesCount === 0;
        console.log('Total de notas:', this.notes.length);
      });
  }


  simulateAsyncLoad() {
    setTimeout(() => {
      console.log('esperando 3 segundos...');
      this.isLoading = false;

    }, 5000); // Simulate a delay of 3 seconds
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
  // Lógica para determinar si hay notas archivadas
  hasArchivedNotes(): boolean {
    return this.notes.some(note => !note.isActive);
  }

}
