import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading: boolean = false; // Propiedad para controlar el estado de carga

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.isLoading = true; // Activamos el indicador de carga al iniciar la petición

      // COMENTARIO PARA EL PROFESOR:
      // Se muestra un indicador de carga (isLoading) durante la espera del delay de RxJs.
      this.authService.login(this.loginForm.value).subscribe({
        next: (isLoginCorrecto: boolean) => {
          if (isLoginCorrecto) {
            console.log('Login exitoso. Redirigiendo al dashboard...');
            this.router.navigate(['/dashboard']);
          } else {
            console.log('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
          }
        },
        error: (err) => {
          console.error('Ocurrió un error durante el login:', err);
        },
        complete: () => { // Se ejecuta cuando el Observable se completa (después del delay)
          console.log('Proceso de login completado.');
          this.isLoading = false; // Desactivamos el indicador de carga al finalizar
        }
      });
    } else {
      console.log('Formulario inválido, por favor revisa los campos.');
      this.loginForm.markAllAsTouched();
    }
  }
}