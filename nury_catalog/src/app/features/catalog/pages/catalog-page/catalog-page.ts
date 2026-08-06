import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PropertyCard } from '../../../../shared/components/property-card/property-card';
import { MOCK_PROPERTIES, PROPERTY_CATEGORIES } from '../../../../shared/data/mock-properties';
import {
  PropertyCategoryId,
  PropertyOperation,
  PropertyStatus
} from '../../../../shared/models/property.model';

type CategoryFilter = PropertyCategoryId | 'all';
type OperationFilter = PropertyOperation | 'all';
type StatusFilter = PropertyStatus | 'all';

@Component({
  selector: 'app-catalog-page',
  imports: [PropertyCard, RouterLink],
  templateUrl: './catalog-page.html'
})
export class CatalogPage {
  protected readonly categories = PROPERTY_CATEGORIES;
  protected readonly featured = MOCK_PROPERTIES.filter((property) => property.featured);
  protected readonly selectedCategory = signal<CategoryFilter>('all');
  protected readonly selectedOperation = signal<OperationFilter>('all');
  protected readonly selectedStatus = signal<StatusFilter>('all');
  protected readonly searchTerm = signal('');

  protected readonly filteredProperties = computed(() => {
    const selectedCategory = this.selectedCategory();
    const selectedOperation = this.selectedOperation();
    const selectedStatus = this.selectedStatus();
    const searchTerm = this.searchTerm().trim().toLowerCase();

    return MOCK_PROPERTIES.filter((property) => {
      const matchesCategory = selectedCategory === 'all' || property.categoryId === selectedCategory;
      const matchesOperation = selectedOperation === 'all' || property.operation === selectedOperation;
      const matchesStatus = selectedStatus === 'all' || property.status === selectedStatus;
      const matchesSearch =
        !searchTerm ||
        [property.title, property.location, property.categoryLabel, property.teaser]
          .join(' ')
          .toLowerCase()
          .includes(searchTerm);

      return matchesCategory && matchesOperation && matchesStatus && matchesSearch;
    });
  });

  protected readonly visibleCount = computed(() => this.filteredProperties().length);

  protected selectCategory(category: CategoryFilter): void {
    this.selectedCategory.set(category);
  }

  protected selectOperation(operation: OperationFilter): void {
    this.selectedOperation.set(operation);
  }

  protected selectStatus(status: StatusFilter): void {
    this.selectedStatus.set(status);
  }

  protected setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  protected clearFilters(): void {
    this.selectedCategory.set('all');
    this.selectedOperation.set('all');
    this.selectedStatus.set('all');
    this.searchTerm.set('');
  }

  protected countByCategory(categoryId: PropertyCategoryId): number {
    return MOCK_PROPERTIES.filter((property) => property.categoryId === categoryId).length;
  }
}
