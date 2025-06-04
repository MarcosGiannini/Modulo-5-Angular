import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ // Selector para el componente de inicio de sesión
  selector: 'app-login', 
  standalone: true, 
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent { // Componente para manejar el inicio de sesión
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    }); 
  }

  // Getter para el control 'username'
  get username() {
  return this.loginForm.get('username');
}

  // Getter para el control 'password'
  get password() {
  return this.loginForm.get('password');
}

onSubmit() { // Método para manejar el envío del formulario de inicio de sesión
  console.log(this.loginForm.value);
  if (this.loginForm.valid) {
  const esLoginCorrecto = this.authService.login(this.loginForm.value);
  if (esLoginCorrecto) {
      console.log('Login exitoso. Redirigiendo al dashboard...');
      this.router.navigate(['/dashboard']);
  } else {
    console.log('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
  }
} else {
  console.log('Formulario inválido, por favor revisa los campos.');
  this.loginForm.markAllAsTouched();
}
}
}

