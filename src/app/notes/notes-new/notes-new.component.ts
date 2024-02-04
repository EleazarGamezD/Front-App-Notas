import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-notes-new',
  templateUrl: './notes-new.component.html',
  styleUrls: ['./notes-new.component.css']
})
export class NotesNewComponent {
  year: number;
  mouth: string = '';
  day: string = '';
  cardHeight: string = 'auto';   // establecemos la altura de la tarjeta
  @ViewChild('titleTextarea')
  titleTextarea!: ElementRef; //leemos el elemneto title
  @ViewChild('descriptionTextarea')
  descriptionTextarea!: ElementRef; //leemos el elemneto description
  @ViewChild('categoryTextarea')
  categoryTextarea!: ElementRef;  //leemos el elemneto category
  constructor() {
    this.year = new Date().getFullYear(),
      this.mouth = new Date().getMonth().toString(),
      this.day = new Date().getDate().toString()
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
}
