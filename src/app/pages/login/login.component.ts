import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder) {
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

onSubmit() {
  console.log(this.loginForm.value);
  if (this.loginForm.valid) {
  console.log('Formulario válido, ¡listo para enviar!');
} else {
  console.log('Formulario inválido, por favor revisa los campos.');
}
}
}

