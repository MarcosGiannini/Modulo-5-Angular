import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appRotate]', // El selector ha sido modificado a img[appRotate] para restringir la aplicación de la directiva solo a elementos <img>, según el reto.
  standalone: true
})
export class RotateDirective {
  @Input() appRotate: number = 0;
  @Input() step: number = 10;

  private rotation: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.rotation = this.appRotate;
    this.setRotation();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (event.shiftKey) {
      this.rotation -= this.step;
    } else {
      this.rotation += this.step;
    }
    this.setRotation();
    console.log(`Elemento rotado a ${this.rotation} grados.`);
  }

  private setRotation(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `rotate(${this.rotation}deg)`);
  }
}