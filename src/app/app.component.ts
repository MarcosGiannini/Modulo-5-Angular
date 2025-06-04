import { Component } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { HeaderPublicComponent } from './layout/header-public/header-public.component';
import { MenuPublicComponent } from './layout/menu-public/menu-public.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MenuPrivateComponent } from "./layout/menu-private/menu-private.component";

// Importa los módulos necesarios y los componentes que se usarán en la aplicación

@Component({ // Decorador que define el componente principal de la aplicación
  selector: 'app-root', // Selector del componente, se usa en el HTML principal
  standalone: true, // Indica que este componente es independiente y no necesita un módulo específico
  imports: [ // Importa los módulos y componentes necesarios
    CommonModule,
    RouterOutlet,
    HeaderPublicComponent,
    MenuPublicComponent,
    FooterComponent,
    MenuPrivateComponent
],
  templateUrl: './app.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrl: './app.component.scss' // Ruta al archivo de estilos SCSS del componente
})
export class AppComponent { // Clase del componente principal de la aplicación
  title = 'lab-angular'; // Título de la aplicación 
  constructor(public authService: AuthService) { 
    // Inyecta el servicio de autenticación para poder usarlo en la plantilla

  }
}