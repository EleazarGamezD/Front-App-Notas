import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../service/notes.service';

import Swal from 'sweetalert2';
import { Category } from '../interface/category.interface';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-notes-new',
  templateUrl: './notes-new.component.html',
  styleUrls: ['./notes-new.component.css']
})
export class NotesNewComponent implements OnInit {
  categories: string[] = [];
  myControl = new FormControl('');
  year: number;
  month: string = '';
  day: string = '';
  noteForm: FormGroup;
  cardHeight: string = 'auto';   // establecemos la altura de la tarjeta
  @ViewChild('titleTextarea')
  titleTextarea!: ElementRef; //leemos el elemneto title
  @ViewChild('descriptionTextarea')
  descriptionTextarea!: ElementRef; //leemos el elemneto description
  @ViewChild('categoryTextarea')
  categoryTextarea!: ElementRef;  //leemos el elemneto category
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notesService: NotesService
  ) {
    this.year = new Date().getFullYear();
    this.month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    this.day = new Date().getDate().toString();
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getAllCategories()
  }

  createNote() {
    if (this.noteForm.valid) {
      const formData = this.noteForm.value;
      this.notesService.newNote(formData).subscribe(
        response => {
          console.log('Server response:', response);
          Swal.fire({
            icon: 'success',
            title: 'notification',
            text: `Nota ${formData.title} creada con exito, Gracias!`,
          });
          //redirigir
          setTimeout(() => {
            this.goBack()
          }, 2000)

        },
        error => {
          console.error('Error creando la nota:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear la nota',
          });
        }
      );
    }
  }

  getAllCategories() {
    this.notesService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data.map((category: any) => category.name);
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  // seccion para autoajuste de la tarjeta segun el texarea
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

  updateCategoryValue(): void {
    const inputValue = this.myControl.value;
    const categoryControl = this.noteForm.get('category');

    if (categoryControl) {
      categoryControl.setValue(inputValue);
    }
  }



  goBack() {
    this.router.navigate(['/allnote']);
  }


}
