import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // <-- PASO 1: Importar RouterModule

@Component({
  selector: 'app-menu-public',
  standalone: true, // <-- PASO 2: Asegurar que 'standalone' es true
  imports: [
    RouterModule // <-- PASO 3: Añadir RouterModule a los imports del componente
  ],
  templateUrl: './menu-public.component.html',
  styleUrl: './menu-public.component.scss'
})
export class MenuPublicComponent {

}