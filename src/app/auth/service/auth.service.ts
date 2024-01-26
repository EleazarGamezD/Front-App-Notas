import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/app/environments/environment.prod';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private baseUrl: string = environment.baseUrl;
  private authToken!: string;


  constructor(
    private http: HttpClient,

  ) { this.isLoggedInSubject.next(this.isLoggedIn()) }


  private isLoggedIn(): boolean {
    // Implementa tu lógica para verificar si el usuario está autenticado
    // Puedes acceder a localStorage aquí
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  setLoggedIn(value: boolean): void {
    // Puedes realizar cualquier lógica adicional aquí antes de actualizar el estado
    this.isLoggedInSubject.next(value);
  }

  registerUser(userData: User): Observable<User> {
    const url = `${this.baseUrl}user/register`;
    console.log(userData);
    return this.http.post<User>(url, userData).pipe(
      map((resp: any) => {
        // Almacenar el token y el nombre de usuario en el localStorage

        localStorage.setItem('token', resp.token);
        localStorage.setItem('userName', resp.user.userName);
        localStorage.setItem('isLoggedIn', 'true');
        console.log(resp);

        return resp.user; // Puedes devolver el objeto del usuario si es necesario
      }),
      catchError(err => {
        console.error('Error durante el registro:', err);
        throw err; // Reenviar el error para que sea manejado en el componente que realiza la llamada
      })
    );
  }


  login(required: User) {
    const url = `${this.baseUrl}user/login`;
    return this.http.post<User>(url, required).pipe(
      map((resp: any) => {

        localStorage.setItem('token', resp.token);
        localStorage.setItem('userName', resp.user.userName);
        localStorage.setItem('isLoggedIn', 'true');

        return true;  // Devuelve true solo si la solicitud es exitosa
      }),
      catchError(error => {
        return of(false);  // Devuelve false en caso de error
      })
    );
  }
  logout() {
    localStorage.clear();
    localStorage.setItem('isLoggedIn', 'false');
  }

}
