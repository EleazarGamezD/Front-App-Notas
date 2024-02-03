import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../auth/service/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  year: number;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private stateService: StateService,
  ) {
    this.year = new Date().getFullYear();
  }
  ngOnInit() {
    this.isLoggedIn = this.stateService.getIsLoggedInFromLocalStorage();
    this.stateService.setIsLoggedIn(this.isLoggedIn);
    this.stateService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      if (this.isLoggedIn === true) {
        this.navigateTo('/allnote')
      } else { this.navigateTo('/home') }
    });
  }



  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
