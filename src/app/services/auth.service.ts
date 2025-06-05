import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators'; // ¡Importamos delay aquí!

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isUserLoggedIn: boolean = false;
  private _username: string | null = null;

  constructor() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this._isUserLoggedIn = true;
      this._username = storedUsername;
    } else {
      this._isUserLoggedIn = false;
      this._username = null;
    }
  }

  // COMENTARIO PARA EL PROFESOR:
  // Se ha añadido un delay de 2 segundos en la respuesta del método login()
  // para simular una operación asíncrona real, utilizando el operador 'delay' de RxJS.
  login(credentials: { username: string, password: string }): Observable<boolean> {
    if (credentials.username === 'master@lemoncode.net' && credentials.password === '12345678') {
      localStorage.setItem('username', credentials.username);
      this._isUserLoggedIn = true;
      this._username = credentials.username;
      return of(true).pipe(delay(2000)); // Añadimos el delay de 2 segundos aquí
    }
    this._isUserLoggedIn = false;
    this._username = null;
    return of(false).pipe(delay(2000)); // Y también aquí, para el caso de credenciales incorrectas
  }

  logout(): void {
    this._isUserLoggedIn = false;
    this._username = null;
    localStorage.removeItem('username');
  }

  isLogged(): boolean {
    return this._isUserLoggedIn;
  }

  getUsername(): string | null {
    return this._username;
  }
}