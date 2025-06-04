import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf y *ngFor

// Definición de la interfaz para un elemento de la galería
interface GalleryItem {
  id: number;
  title: string;
  url: string; // La propiedad 'url' para la ruta de la imagen
}

@Component({
  selector: 'app-gallery',
  standalone: true, // Componente autónomo
  imports: [CommonModule], // Importamos CommonModule para poder usar *ngIf y *ngFor en el HTML
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit { // Implementamos OnInit para lógica de inicialización

  // Lista de todas las imágenes de la galería
  // Usamos las rutas locales de tu carpeta assets (si no funcionan, usaremos externas)
  galleryItems: GalleryItem[] = [
    { id: 1, title: 'Gatito 1', url: 'assets/gatitos1.jpg' },
    { id: 2, title: 'Gatito 2', url: 'assets/gatitos2.jpg' },
    { id: 3, title: 'Gatito 3', url: 'assets/gatitos3.jpg' },
    { id: 4, title: 'Gatito 4', url: 'assets/gatitos4.jpg' },
    { id: 5, title: 'Gatito 5', url: 'assets/gatitos5.jpg' },
    { id: 6, title: 'Gatito 6', url: 'assets/gatitos6.jpg' },
    { id: 7, title: 'Gatito 7', url: 'assets/gatitos7.jpg' },
    { id: 8, title: 'Gatito 8', url: 'assets/gatitos8.jpg' },
  ];

  // Propiedad para almacenar la imagen que se mostrará en grande
  selectedImage: GalleryItem | undefined;

  constructor() { }

  ngOnInit(): void {
    // Al inicializar el componente, si hay imágenes en la lista,
    // seleccionamos la primera para mostrarla por defecto.
    if (this.galleryItems.length > 0) {
      this.selectedImage = this.galleryItems[0];
    }
  }

  // Método público para seleccionar una imagen al hacer clic en una miniatura
  selectImage(image: GalleryItem): void {
    this.selectedImage = image; // La imagen clicada se convierte en la imagen seleccionada
  }

  // Método para avanzar a la siguiente imagen (con ciclo)
  nextImage(): void {
    if (this.selectedImage) {
      const currentIndex = this.galleryItems.findIndex(item => item.id === this.selectedImage!.id);
      // Calcula el siguiente índice, ciclando al inicio si llega al final
      const nextIndex = (currentIndex + 1) % this.galleryItems.length;
      this.selectedImage = this.galleryItems[nextIndex];
    }
  }

  // Método para retroceder a la imagen anterior (con ciclo)
  previousImage(): void {
    if (this.selectedImage) {
      const currentIndex = this.galleryItems.findIndex(item => item.id === this.selectedImage!.id);
      // Calcula el índice anterior, ciclando a la última si es la primera
      const previousIndex = (currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
      this.selectedImage = this.galleryItems[previousIndex];
    }
  }

  // Getter para comprobar si la imagen actual es la última de la lista
  get isLastImage(): boolean {
    if (!this.selectedImage || this.galleryItems.length === 0) {
      return true; // Si no hay imagen seleccionada o la lista está vacía, deshabilita el botón
    }
    const currentIndex = this.galleryItems.findIndex(item => item.id === this.selectedImage!.id);
    return currentIndex === this.galleryItems.length - 1;
  }

  // Getter para comprobar si la imagen actual es la primera de la lista
  get isFirstImage(): boolean {
    if (!this.selectedImage || this.galleryItems.length === 0) {
      return true; // Si no hay imagen seleccionada o la lista está vacía, deshabilita el botón
    }
    const currentIndex = this.galleryItems.findIndex(item => item.id === this.selectedImage!.id);
    return currentIndex === 0;
  }
}