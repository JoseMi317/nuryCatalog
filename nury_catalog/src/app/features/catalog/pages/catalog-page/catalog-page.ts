import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PropertyCard } from '../../../../shared/components/property-card/property-card';
import { PropertyCategoryId } from '../../../../shared/models/property.model';
import { PropertyService } from '../../../../shared/services/property.service';
import {
  buildGeneralContactMessage,
  buildWhatsappUrl,
} from '../../../../shared/utils/contact-links';

type CategoryFilter = PropertyCategoryId | 'all';

@Component({
  selector: 'app-catalog-page',
  imports: [NgClass, PropertyCard, RouterLink],
  templateUrl: './catalog-page.html',
})
export class CatalogPage {
  private readonly propertyService = inject(PropertyService);

  protected readonly categories = this.propertyService.categories;
  protected readonly featured = computed(() =>
    this.propertyService.properties().filter((property) => property.featured),
  );
  protected readonly selectedCategory = signal<CategoryFilter>('all');
  protected readonly searchTerm = signal('');
  protected readonly generalContactHref = buildWhatsappUrl(buildGeneralContactMessage());
  protected readonly totalCount = computed(() => this.propertyService.properties().length);
  protected readonly activeCategories = computed(() =>
    this.categories().filter((category) => this.countByCategory(category.id) > 0),
  );

  constructor() {
    void this.propertyService.loadCatalog();
  }

  protected readonly filteredProperties = computed(() => {
    const selectedCategory = this.selectedCategory();
    const searchTerm = this.searchTerm().trim().toLowerCase();

    return this.propertyService.properties().filter((property) => {
      const matchesCategory =
        selectedCategory === 'all' || property.categoryId === selectedCategory;
      const matchesSearch =
        !searchTerm ||
        [property.title, property.location, property.categoryLabel, property.teaser]
          .join(' ')
          .toLowerCase()
          .includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  });

  protected readonly visibleCount = computed(() => this.filteredProperties().length);

  protected selectCategory(category: CategoryFilter): void {
    this.selectedCategory.set(category);
  }

  protected setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  protected clearFilters(): void {
    this.selectedCategory.set('all');
    this.searchTerm.set('');
  }

  protected countByCategory(categoryId: PropertyCategoryId): number {
    return this.propertyService
      .properties()
      .filter((property) => property.categoryId === categoryId).length;
  }

  protected setImageFallback(event: Event): void {
    const image = event.target as HTMLImageElement;

    if (image.src.endsWith('/property-placeholder.svg')) {
      return;
    }

    image.src = '/property-placeholder.svg';
  }
}
