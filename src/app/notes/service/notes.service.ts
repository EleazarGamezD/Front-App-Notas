import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { Note } from '../interface/note.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { RouterLink, Router } from '@angular/router';
import { Category } from '../interface/category.interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private baseUrl: string = environment.baseUrl;

  constructor(
    private router: Router,
    private http: HttpClient) { }

  newNote(note: Note) {
    const url = `${this.baseUrl}note/add`;
    const signedToken = localStorage.getItem('token');
    let results: Observable<any>;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${signedToken}`,
    });
    try {
      console.log(note)
      results = this.http.post(url, note, { headers })
      this.getAllNote()
      return results
    }
    catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      throw error;
    }

  }

  getAllNote(): Observable<Note> {
    const url = `${this.baseUrl}note/all`;
    const signedToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${signedToken}`,
    });
    return this.http.get<Note>(url, { headers }).pipe(
      catchError((error) => {
        localStorage.clear();
        this.router.navigate(['/']);
        return throwError("Su sesión ha expirado, por favor inicie sesión de nuevo");
      })
    );
  }


  deleteNoteById(noteId: string): Observable<string> {
    console.log(noteId)
    const url = `${this.baseUrl}note/delete/` + noteId;
    console.log(url)
    const signedToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${signedToken}` });
    return this.http.delete(url, { headers, responseType: 'text' }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  archiveNoteById(noteId: any, note: Note) {
    const url = `${this.baseUrl}note/update/` + noteId;
    const signedToken = localStorage.getItem('token');
    let results: Observable<any>;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${signedToken}`,
    });
    try {
      console.log(noteId, note)
      results = this.http.put(url, note, { headers })
      return results
    }
    catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      throw error;
    }

  }

  getAllCategories(): Observable<Category> {
    const url = `${this.baseUrl}categories/all`;
    const signedToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${signedToken}`,
    });
    return this.http.get<Category>(url, { headers }).pipe(
      catchError((error) => {
        console.log(error)
        return throwError("Su sesión ha expirado, por favor inicie sesión de nuevo");
      })
    );
  }
}
