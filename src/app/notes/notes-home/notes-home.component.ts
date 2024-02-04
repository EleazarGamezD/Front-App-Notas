import { Component, OnInit } from '@angular/core';
import { Note } from '../interface/note.interface';
import { NotesService } from '../service/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-home',
  templateUrl: './notes-home.component.html',
  styleUrls: ['./notes-home.component.css']
})
export class NotesHomeComponent implements OnInit {
  notes: Note[] = [];
  year: string = '';
  month: string = '';
  filterActive: boolean = true;
  constructor(private notesService: NotesService,
    private router: Router,) { }
  ngOnInit(): void {
    this.getNotes()
  }
  getNotes() {
    this.notesService.getAllNote()
      .subscribe((data: any) => {
        this.notes = data.map((note: Note) => {
          console.log(note)
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

  filterNotes(active: boolean) {
    this.filterActive = active;
  }


}
