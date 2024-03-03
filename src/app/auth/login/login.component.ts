import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

import { StateService } from '../service/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;


  constructor(
    private router: Router,
    private stateService: StateService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: [, [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });

  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    this.authService.logout()
    this.isLoading = true
    const userData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };
    this.authService.login(userData).subscribe(
      success => {
        if (success) {
          const userName = localStorage.getItem('userName');
          this.stateService.setIsLoggedIn(true);
          Swal.fire({
            icon: 'success',
            title: 'Notificación',
            text: `Bienvenido ${userName}`,
          });
          this.navigateTo('/allnote');
          this.loginForm.reset();
        } else {
          this.isLoading = false
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Usuario y/o contraseña invalida.`,

          });
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${error}`,
        });

      }
    );
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
