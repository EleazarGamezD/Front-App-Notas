import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';
import { User } from '../interface/user.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  contactForm: FormGroup;




  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.contactForm = this.formBuilder.group({
      email: [, [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });

  }
  onSubmit() {
    this.authService.logout()
    const userData = {
      email: this.contactForm.get('email')?.value,
      password: this.contactForm.get('password')?.value
    };
    this.authService.login(userData).subscribe(
      success => {
        if (success) {
          const userName = localStorage.getItem('userName');
          Swal.fire({
            icon: 'success',
            title: 'Notificación',
            text: `Bienvenido ${userName}`,
          });
          this.contactForm.reset();
        } else {
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
}
