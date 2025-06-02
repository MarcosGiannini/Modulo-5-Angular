import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPublicComponent } from './layout/header-public/header-public.component';
import { MenuPublicComponent } from './layout/menu-public/menu-public.component';
import { FooterComponent } from './layout/footer/footer.component';

// En src/app/app.component.ts

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderPublicComponent,
    MenuPublicComponent,
    FooterComponent
    // Cuando usemos los componentes privados, los añadiremos aquí también
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lab-angular'; 
}