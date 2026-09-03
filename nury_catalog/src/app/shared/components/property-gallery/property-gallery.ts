import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-property-gallery',
  templateUrl: './property-gallery.html',
})
export class PropertyGallery {
  images = input.required<string[]>();
  title = input.required<string>();
  selectedIndex = signal(0);

  protected setImageFallback(event: Event): void {
    const image = event.target as HTMLImageElement;

    if (image.src.endsWith('/property-placeholder.svg')) {
      return;
    }

    image.src = '/property-placeholder.svg';
  }
}
