import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-card',
  imports: [RouterLink],
  templateUrl: './property-card.html',
})
export class PropertyCard {
  property = input.required<Property>();

  protected setImageFallback(event: Event): void {
    const image = event.target as HTMLImageElement;

    if (image.src.endsWith('/property-placeholder.svg')) {
      return;
    }

    image.src = '/property-placeholder.svg';
  }
}
