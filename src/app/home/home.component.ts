import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../auth/service/state.service';
/* import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'node_modules/jquery/dist/jquery.min.js';
import 'node_modules/@popperjs/core/dist/umd/popper.min.js';
import 'node_modules/bootstrap/dist/js/bootstrap.min.js'; */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss']
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
