import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({ // Decorador que define el componente
  selector: 'app-menu-public',
  standalone: true, // 
  imports: [
    RouterModule //
  ],
  templateUrl: './menu-public.component.html',
  styleUrl: './menu-public.component.scss'
})
export class MenuPublicComponent { 
  // Este componente no tiene lógica adicional por el momento
  // Se utiliza para mostrar el menú de navegación pública

}