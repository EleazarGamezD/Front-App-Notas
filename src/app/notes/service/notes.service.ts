import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { Note } from '../interface/note.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private baseUrl: string = environment.baseUrl;

  constructor(
    private router: Router,
    private http: HttpClient) { }


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
}
