import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PropertyGallery } from '../../../../shared/components/property-gallery/property-gallery';
import { PropertyService } from '../../../../shared/services/property.service';
import {
  buildGeneralContactMessage,
  buildPropertyContactMessage,
  buildWhatsappUrl,
} from '../../../../shared/utils/contact-links';

@Component({
  selector: 'app-property-detail-page',
  imports: [PropertyGallery, RouterLink],
  templateUrl: './property-detail-page.html',
})
export class PropertyDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly propertyService = inject(PropertyService);

  constructor() {
    void this.propertyService.loadCatalog();
  }

  protected readonly property = computed(() => {
    const slug = this.route.snapshot.paramMap.get('slug');
    return this.propertyService.propertyBySlug(slug);
  });

  protected readonly contactHref = computed(() => {
    const property = this.property();
    const message = property
      ? buildPropertyContactMessage(property)
      : buildGeneralContactMessage();

    return buildWhatsappUrl(message);
  });
}
