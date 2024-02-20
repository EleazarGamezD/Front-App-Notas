import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Note } from '../interface/note.interface';
import { NotesService } from '../service/notes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotesDetailsComponent } from '../notes-details/notes-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notes-home',
  templateUrl: './notes-home.component.html',
  styleUrls: ['./notes-home.component.css']
})
export class NotesHomeComponent implements OnInit {
  notes: Note[] = [];
  notesActive: Note[] = [];
  notesArchived: Note[] = [];
  year: string = '';
  month: string = '';
  filterActive: boolean = true;
  isLoading: boolean = true;
  noActiveNotes: boolean = false;
  noInactiveNotes: boolean = false;
  cardHeight: string = 'auto';   // establecemos la altura de la tarjeta
  @ViewChild('titleTextarea')
  titleTextarea!: ElementRef; //leemos el elemneto title
  @ViewChild('descriptionTextarea')
  descriptionTextarea!: ElementRef; //leemos el elemneto description
  @ViewChild('categoryTextarea')
  categoryTextarea!: ElementRef;

  constructor(private notesService: NotesService,
    private dialog: MatDialog,
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

  confirmDelete(noteId: any, noteTitle: string | undefined) {
    const userName = localStorage.getItem('userName')
    Swal.fire({
      title: `¿Estás seguro? ${userName}`,
      text: `Estas a punto de eliminar la nota: ${noteTitle}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteNote(noteId);

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // No haces nada si el usuario cancela
        console.log('Eliminación cancelada');
      }
    });
  }

  deleteNote(noteId: string,): void {
    this.notesService.deleteNoteById(noteId).subscribe(
      result => {
        console.log('Eliminación exitosa', result);
        Swal.fire({
          icon: 'success',
          title: 'Notificación',
          text: `nota Eliminada con Éxito`,
        });
        this.ngOnInit()
        this.getNotes()
      },
      error => {
        console.error('Error al eliminar la nota', error);

      }
    );
  }

  archiveBtnFunction(note: Note) {

    const noteTitle = note.title
    const noteId = note.id
    if (note.isActive === true) {
      note.isActive = false
      this.notesService.editNoteById(noteId, note).subscribe(result => {
        console.log('Nota Archivada con exito', result);
        Swal.fire({
          icon: 'success',
          title: `Notificación`,
          text: `nota ${noteTitle} Archivada con Éxito`,
        });
        this.getNotes()
      })

    } else {
      note.isActive = true
      this.notesService.editNoteById(noteId, note).subscribe(result => {
        console.log('Nota Activada con exito', result);
        Swal.fire({
          icon: 'success',
          title: 'Notificación',
          text: `Nota ${noteTitle}Activada con Éxito`,
        });
        this.getNotes()
      })
    }
  }

  simulateAsyncLoad() {
    setTimeout(() => {
      console.log('esperando 3 segundos...');
      this.isLoading = false;

    }, 2000);
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

  openNoteDetails(id: any) {
    const dialogRef = this.dialog.open(NotesDetailsComponent, {
      data: {
        noteId: id
      }
    })
  }
  autoResize(event: Event, textareaType: string): void {
    const textarea = event.target as HTMLTextAreaElement;
    // Establece la altura del textarea según su contenido
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    // Calcula la altura total de la tarjeta
    const titleHeight = this.titleTextarea.nativeElement.scrollHeight;
    const descriptionHeight = this.descriptionTextarea.nativeElement.scrollHeight;
    const categoryHeight = this.categoryTextarea.nativeElement.scrollHeight;
    // Ajusta la altura de la tarjeta según el contenido de los textarea
    this.cardHeight = `${titleHeight + descriptionHeight + categoryHeight + 200}px`;
  }

  newNote() {
    this.router.navigate(['new-note']);
  }
  editBtnFunction(id: any) {
    console.log(id)
    this.router.navigate(['editnote', id])
  }
}
