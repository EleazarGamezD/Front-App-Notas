// state.service.ts
import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  constructor(private router: Router,) { }
  getIsLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  setIsLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
    console.log(this.isLoggedInSubject.value);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
