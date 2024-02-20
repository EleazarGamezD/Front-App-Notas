import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from '../interface/user.interface';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  contactForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.contactForm = this.formBuilder.group({
      fullName: ["", [Validators.required, Validators.minLength(3)]],
      email: [, [Validators.required, Validators.email]],
      password: ["", [Validators.required, this.validatePassword]],
      confirmPassword: ["", [Validators.required, this.validatePassword]],
    }, { validator: this.matchingPassword('password', 'confirmPassword') });

  }
  validatePassword(control: { value: any; }) {
    const password = control.value;

    // Verificar si password es null o undefined
    if (password == null) {
      return false; // o true, dependiendo de tus requisitos
    }

    // Requerir al menos 8 caracteres, una mayúscula, una minúscula y un número
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // Verificar si la contraseña es válida después de alcanzar los 8 caracteres
    if (password.length >= 8 && !regex.test(password)) {
      return true;
    }

    return false;
  }


  matchingPassword(campo1: string, campo2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass1 = control.get(campo1)?.value;
      const pass2 = control.get(campo2)?.value;

      if (pass1 !== pass2 && pass2 !== '') {
        control.get(campo2)?.setErrors({ matching: true });
        return { matching: true };
      }
      control.get(campo2)?.setErrors(null);
      return null;
    }
  }
  onSubmit() {
    this.isLoading = true
    const userData = {
      userName: this.contactForm.get('fullName')?.value,
      email: this.contactForm.get('email')?.value,
      password: this.contactForm.get('password')?.value
    };
    const userName = this.contactForm.get('fullName')?.value;
    this.authService.registerUser(userData).subscribe(
      (user: User) => {
        this.contactForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Notificación',
          text: `Bienvenido ${userName}`,
        });
        this.navigateTo('/allnote');
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${error.error.message}`,
        });
        console.error('Error durante el registro:', error);
      }
    )
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
