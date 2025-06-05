import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importamos CommonModule para directivas como *ngIf
import { RotateDirective } from '../../directives/rotate.directive'; // Importamos tu directiva Rotate

@Component({
  selector: 'app-home',
  standalone: true, // Asumimos que es standalone, lo cual es el patrón que hemos seguido
  imports: [
    CommonModule,    // Añadimos CommonModule
    RotateDirective  // Añadimos tu directiva Rotate aquí
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}