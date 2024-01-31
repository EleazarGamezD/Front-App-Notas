import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from '../service/notes.service';



@Component({
  selector: 'app-notes-menu',
  templateUrl: './notes-menu.component.html',
  styleUrls: ['./notes-menu.component.css']
})
export class NotesMenuComponent {

  constructor(
    private notesService: NotesService,
    private router: Router,) { }


}
