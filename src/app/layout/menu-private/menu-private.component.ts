// En src/app/layout/menu-private/menu-private.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ¡Importa RouterModule!

@Component({
  selector: 'app-menu-private',
  standalone: true,
  imports: [RouterModule], // Añádelo aquí
  templateUrl: './menu-private.component.html',
  styleUrl: './menu-private.component.scss'
})
export class MenuPrivateComponent {
  // ...
}