import { Injectable, signal } from '@angular/core';

import { getSupabaseClient } from '../../core/supabase/supabase.client';
import { MOCK_PROPERTIES, PROPERTY_CATEGORIES } from '../data/mock-properties';
import {
  Property,
  PropertyCategory,
  PropertyCategoryId,
  PropertyOperation,
  PropertyStatus,
} from '../models/property.model';

type PropertyImageRow = {
  url: string;
  alt: string | null;
  sort_order: number | null;
};

type PropertyRow = {
  id: string;
  slug: string;
  title: string;
  category_id: PropertyCategoryId;
  category_label: string | null;
  type: string;
  operation: PropertyOperation;
  status: PropertyStatus;
  location: string;
  price: string;
  area: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parking: number | null;
  description: string;
  teaser: string;
  amenities: string[] | null;
  featured: boolean | null;
  property_images: PropertyImageRow[] | null;
};

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private hasLoadedSupabase = false;
  private loadPromise: Promise<void> | null = null;

  readonly categories = signal<PropertyCategory[]>(PROPERTY_CATEGORIES);
  readonly properties = signal<Property[]>(MOCK_PROPERTIES);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadCatalog(): Promise<void> {
    if (this.hasLoadedSupabase) {
      return Promise.resolve();
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loading.set(true);

    this.loadPromise = Promise.all([this.loadCategories(), this.loadProperties()])
      .then(([categories, properties]) => {
        if (categories.length > 0) {
          this.categories.set(categories);
        }

        this.properties.set(properties);

        this.error.set(null);
        this.hasLoadedSupabase = true;
      })
      .catch((error: unknown) => {
        console.warn('Supabase catalog load failed. Using local mock data.', error);
        this.error.set('No se pudo cargar Supabase; usando datos locales.');
      })
      .finally(() => {
        this.loading.set(false);
        this.loadPromise = null;
      });

    return this.loadPromise;
  }

  propertyBySlug(slug: string | null): Property | null {
    return this.properties().find((property) => property.slug === slug) ?? null;
  }

  private async loadCategories(): Promise<PropertyCategory[]> {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
      .from('categories')
      .select('id,label,short_label,description,sort_order')
      .order('sort_order', { ascending: true });

    if (error) {
      throw error;
    }

    return (data ?? []).map((category) => ({
      id: category.id as PropertyCategoryId,
      label: category.label,
      shortLabel: category.short_label,
      description: category.description,
    }));
  }

  private async loadProperties(): Promise<Property[]> {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
      .from('properties')
      .select(
        `
          id,
          slug,
          title,
          category_id,
          category_label,
          type,
          operation,
          status,
          location,
          price,
          area,
          bedrooms,
          bathrooms,
          parking,
          description,
          teaser,
          amenities,
          featured,
          property_images (
            url,
            alt,
            sort_order
          )
        `,
      )
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return ((data ?? []) as PropertyRow[]).map((property) => this.mapProperty(property));
  }

  private mapProperty(property: PropertyRow): Property {
    const images = [...(property.property_images ?? [])]
      .sort((left, right) => (left.sort_order ?? 0) - (right.sort_order ?? 0))
      .map((image) => image.url);

    return {
      id: property.id,
      slug: property.slug,
      title: property.title,
      categoryId: property.category_id,
      categoryLabel: property.category_label ?? property.type,
      type: property.type,
      operation: property.operation,
      status: property.status,
      location: property.location,
      price: property.price,
      area: property.area ?? 0,
      bedrooms: property.bedrooms ?? 0,
      bathrooms: property.bathrooms ?? 0,
      parking: property.parking ?? 0,
      description: property.description,
      teaser: property.teaser,
      amenities: property.amenities ?? [],
      images: images.length > 0 ? images : [MOCK_PROPERTIES[0].images[0]],
      featured: property.featured ?? false,
    };
  }
}
