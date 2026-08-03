import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PropertyGallery } from '../../../../shared/components/property-gallery/property-gallery';
import { MOCK_PROPERTIES } from '../../../../shared/data/mock-properties';

@Component({
  selector: 'app-property-detail-page',
  imports: [PropertyGallery, RouterLink],
  templateUrl: './property-detail-page.html'
})
export class PropertyDetailPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly property = computed(() => {
    const slug = this.route.snapshot.paramMap.get('slug');
    return MOCK_PROPERTIES.find((property) => property.slug === slug) ?? MOCK_PROPERTIES[0];
  });
}
