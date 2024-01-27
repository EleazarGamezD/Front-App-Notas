import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { StateService } from '../auth/service/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private stateService: StateService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService) { }


  ngOnInit(): void {
    this.stateService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  detectChanges() {
    this.cdr.detectChanges();
  }
  logOut() {
    this.authService.logout();
    this.stateService.setIsLoggedIn(false);
    this.navigateTo('/home');
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
