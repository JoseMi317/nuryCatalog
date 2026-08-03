import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-property-gallery',
  templateUrl: './property-gallery.html'
})
export class PropertyGallery {
  images = input.required<string[]>();
  title = input.required<string>();
  selectedIndex = signal(0);
}
