import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { StateService } from '../auth/service/state.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService } from './service/theme.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = 'invitado'
  userEmail: string = ''
  constructor(
    private stateService: StateService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public themeService: ThemeService

  ) {
    this.matIconRegistry.addSvgIcon(
      'light-theme',
      this.domSanitizer.bypassSecurityTrustResourceUrl('ruta-del-icono-light.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'dark-theme',
      this.domSanitizer.bypassSecurityTrustResourceUrl('ruta-del-icono-dark.svg')
    );
  }


  ngOnInit(): void {
    this.isLoggedIn = this.stateService.getIsLoggedInFromLocalStorage();
    this.stateService.setIsLoggedIn(this.isLoggedIn);
    this.stateService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      this.checkUser()
    });
  }
  checkUser() {
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem('userName')!;
      this.userEmail = localStorage.getItem('email')!
    }
  };
  detectChanges() {
    this.cdr.detectChanges();
  }
  logOut() {
    this.authService.logout();
    this.ngOnInit()
    this.stateService.setIsLoggedIn(false);
    this.navigateTo('/home');
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  //search section
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText = '';
  toggleSearch: boolean = false;


  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }


}
