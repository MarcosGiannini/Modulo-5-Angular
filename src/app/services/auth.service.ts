import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isUserLoggedIn: boolean = false; 
  private _username: string | null = null;

  constructor() { }

  login(credentials: { username: string, password: string }): boolean {
    if (credentials.username === 'master@lemoncode.net' && credentials.password === '12345678') {
      this._isUserLoggedIn = true;
      this._username = credentials.username;
      return true;
    }
    return false;
  }
  logout(): void {
    this._isUserLoggedIn = false;
    this._username = null;
  }

  isLogged(): boolean {
    return this._isUserLoggedIn;
  }

  getUsername(): string | null {
    return this._username;
    }
}