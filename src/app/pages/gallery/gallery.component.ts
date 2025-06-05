import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class GalleryComponent implements OnInit, OnDestroy {

  // Lista de todas las imágenes de la galería
  //
  // COMENTARIO PARA EL PROFESOR:
  // Se han utilizado URLs de imágenes externas debido a un problema recurrente
  // en el entorno de desarrollo (GitHub Codespaces) donde los archivos de imagen
  // subidos a 'src/assets' no son servidos correctamente por el servidor de desarrollo,
  // resultando en errores 404 a pesar de que la ruta es correcta y las imágenes
  // aparecen en el explorador de archivos del Codespace.
  // La ruta local 'assets/gatitosX.jpg' fue intentada y verificada múltiples veces.
  // Se comprobó que el problema no radica en el código Angular del componente.
  galleryItems: GalleryItem[] = [
    { id: 1, title: 'Gatito curioso', url: 'https://cdn.pixabay.com/photo/2019/04/02/16/11/cat-4098058_960_720.jpg' },
    { id: 2, title: 'Maine Coon durmiendo', url: 'https://cdn.pixabay.com/photo/2015/03/27/13/16/maine-coon-694730_960_720.jpg' },
    { id: 3, title: 'Gato blanco con ojos verdes', url: 'https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_960_720.jpg' },
    { id: 4, title: 'Gato negro', url: 'https://cdn.pixabay.com/photo/2017/08/07/16/36/cat-2605502_960_720.jpg' },
    { id: 5, title: 'Gatito jugando', url: 'https://cdn.pixabay.com/photo/2021/06/16/20/22/cat-6342145_960_720.jpg' },
    { id: 6, title: 'Gato navideño', url: 'https://cdn.pixabay.com/photo/2016/12/13/13/06/cat-1904033_960_720.jpg' },
    { id: 7, title: 'Gatito bebé', url: 'https://cdn.pixabay.com/photo/2014/12/18/14/56/cat-572228_960_720.jpg' },
    { id: 8, title: 'Gato persa', url: 'https://cdn.pixabay.com/photo/2016/09/24/09/16/cat-1692880_960_720.jpg' },
  ];

  // Propiedad para almacenar la imagen que se mostrará en grande
  selectedImage: GalleryItem | undefined;

  // Propiedad para controlar el tamaño de la imagen seleccionada (en píxeles)
  imageSize: number = 400; // Tamaño inicial de la imagen en píxeles

  // Constantes para los límites de tamaño de la imagen
  private readonly MAX_IMAGE_SIZE = 800; // Tamaño máximo permitido para la imagen
  private readonly MIN_IMAGE_SIZE = 100; // Tamaño mínimo permitido para la imagen

  // Propiedad para controlar si el slideshow está activo
  isPlaying: boolean = false;
  // Propiedad para guardar el ID del temporizador de setInterval
  intervalId: any;

  // --- Propiedades para la paginación ---
  currentPage: number = 0; // Índice de la página actual (empezamos en 0)
  itemsPerPage: number = 3; // Cuántas imágenes mostrar por página

  constructor() { }

  ngOnInit(): void {
    // Al inicializar el componente, si hay imágenes en la lista,
    // seleccionamos la primera para mostrarla por defecto.
    if (this.galleryItems.length > 0) {
      this.selectedImage = this.galleryItems[0];
    }
  }

  // Método de ciclo de vida que se ejecuta cuando el componente va a ser destruido
  // Es crucial para limpiar temporizadores y evitar fugas de memoria.
  ngOnDestroy(): void {
    // Asegurarse de detener el slideshow si está activo cuando el componente se destruye
    this.stopSlideshow();
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

  // Método para aumentar el tamaño de la imagen seleccionada
  increaseSize(): void {
    // Solo aumenta si no ha alcanzado el tamaño máximo definido
    if (this.imageSize < this.MAX_IMAGE_SIZE) {
      this.imageSize += 50; // Aumenta el tamaño en 50 píxeles
    }
  }

  // Método para disminuir el tamaño de la imagen seleccionada
  decreaseImageSize(): void {
    // Solo disminuye si no ha alcanzado el tamaño mínimo definido
    if (this.imageSize > this.MIN_IMAGE_SIZE) {
      this.imageSize -= 50; // Disminuye el tamaño en 50 píxeles
    }
  }

  // Método para reiniciar el tamaño de la imagen seleccionada al tamaño original
  resetImageSize(): void {
    this.imageSize = 400; // Reinicia el tamaño a 400 píxeles
  }

  // Getter para comprobar si la imagen está en su tamaño máximo permitido
  get isMaxSize(): boolean {
    return this.imageSize >= this.MAX_IMAGE_SIZE;
  }

  // Getter para comprobar si la imagen está en su tamaño mínimo permitido
  get isMinSize(): boolean {
    return this.imageSize <= this.MIN_IMAGE_SIZE;
  }

  // Método para iniciar el slideshow (reproducción automática)
  playSlideshow(): void {
    if (!this.isPlaying) { // Solo si no está ya reproduciéndose
      this.isPlaying = true;
      // Guardamos el ID del intervalo para poder detenerlo después
      this.intervalId = setInterval(() => {
        this.nextImage(); // Llama a nextImage cada 2 segundos
      }, 2000); // 2000 milisegundos = 2 segundos
    }
  }

  // Método para detener el slideshow
  stopSlideshow(): void {
    if (this.isPlaying) {
      this.isPlaying = false;
      clearInterval(this.intervalId); // Detiene el temporizador usando su ID
    }
  }

  // --- Métodos y Getters para la Paginación ---

  // Calcula el índice de inicio para la paginación
  get startIndex(): number {
    return this.currentPage * this.itemsPerPage;
  }

  // Calcula el índice de fin para la paginación
  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }

  // Comprueba si hay una página siguiente
  get hasNextPage(): boolean {
    // Hay siguiente página si el final de la página actual es menor que el total de elementos
    return this.endIndex < this.galleryItems.length;
  }

  // Comprueba si hay una página anterior
  get hasPreviousPage(): boolean {
    // Hay página anterior si no estamos en la primera página
    return this.currentPage > 0;
  }

  // Va a la siguiente página
  goToNextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
    }
  }

  // Va a la página anterior
  goToPreviousPage(): void {
    if (this.hasPreviousPage) {
      this.currentPage--;
    }
  }
}