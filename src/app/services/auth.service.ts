import { Injectable } from '@angular/core'; // Importa Injectable desde Angular core para poder inyectar este servicio en otros componentes o servicios

@Injectable({
  providedIn: 'root' // Esto permite que el servicio sea inyectado en cualquier componente o servicio de la aplicación
})
export class AuthService { // Servicio de autenticación que maneja el estado de inicio de sesión del usuario
  private _isUserLoggedIn: boolean = false; // Variable privada que indica si el usuario está logueado
  private _username: string | null = null; // Variable privada que almacena el nombre de usuario del usuario logueado

constructor() {
  // Intentamos obtener el username de localStorage
  const storedUsername = localStorage.getItem('username');

  // Si encontramos un username guardado, significa que el usuario estaba logueado
  if (storedUsername) {
    this._isUserLoggedIn = true; // Establecemos el estado de logueado a true
    this._username = storedUsername; // Asignamos el username recuperado
  } else {
    // Si no encontramos username, el usuario no está logueado
    this._isUserLoggedIn = false; // Mantenemos el estado en false (por si acaso no era el valor inicial)
    this._username = null; // Aseguramos que el username sea null
  }
}

  login(credentials: { username: string, password: string }): boolean { // Método para iniciar sesión del usuario
    if (credentials.username === 'master@lemoncode.net' && credentials.password === '12345678') {
      localStorage.setItem('username', credentials.username); // Guada el nombre de usuario en localStorage para persistencia de sesión
      this._isUserLoggedIn = true; // Marca al usuario como logueado
      this._username = credentials.username; // Guarda el nombre de usuario en la variable de instancia
      return true; // Retorna true si el login es exitoso
    }
    return false;
  }
  logout(): void { // Método para cerrar sesión del usuario
    this._isUserLoggedIn = false; // Marca al usuario como no logueado
    this._username = null; // Limpia el nombre de usuario
  }

  isLogged(): boolean { // Método para verificar si el usuario está logueado
    return this._isUserLoggedIn; // Retorna el estado de inicio de sesión del usuario
  }

  getUsername(): string | null { // Método para obtener el nombre de usuario del usuario logueado
    return this._username; // Retorna el nombre de usuario o null si no hay usuario logueado
    }
}