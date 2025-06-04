import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({ // Decorador que define el componente
  selector: 'app-menu-private',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './menu-private.component.html',
  styleUrl: './menu-private.component.scss'
})
export class MenuPrivateComponent {

}
