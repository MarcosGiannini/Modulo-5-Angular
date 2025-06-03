import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPublicComponent } from './layout/header-public/header-public.component';
import { MenuPublicComponent } from './layout/menu-public/menu-public.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MenuPrivateComponent } from "./layout/menu-private/menu-private.component";

// En src/app/app.component.ts

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderPublicComponent,
    MenuPublicComponent,
    FooterComponent,
    MenuPrivateComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lab-angular'; 
  constructor(public authService: AuthService) {

  }
}