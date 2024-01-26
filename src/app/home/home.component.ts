import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  year: number;

  constructor(private router: Router,
  ) {
    this.year = new Date().getFullYear();

  }


}
