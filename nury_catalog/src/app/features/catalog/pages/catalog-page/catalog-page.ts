import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PropertyCard } from '../../../../shared/components/property-card/property-card';
import { MOCK_PROPERTIES } from '../../../../shared/data/mock-properties';

@Component({
  selector: 'app-catalog-page',
  imports: [PropertyCard, RouterLink],
  templateUrl: './catalog-page.html'
})
export class CatalogPage {
  protected readonly properties = MOCK_PROPERTIES;
  protected readonly featured = MOCK_PROPERTIES.filter((property) => property.featured);
}
