import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { Note } from '../interface/note.interface';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getAllNote(): Observable<Note> {
    const url = `${this.baseUrl}note/all`;
    const signedToken = localStorage.getItem('token');

    if (signedToken) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${signedToken}`,
      });
      return this.http.get<Note>(url, { headers });
    } else {
      return throwError("No se encontró un token de autenticación en el almacenamiento local.");
    }
  }
}
