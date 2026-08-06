export type PropertyCategoryId =
  | 'apartamento-venta'
  | 'apartamento-renta'
  | 'casa-renta'
  | 'casa-venta'
  | 'oficina'
  | 'proyecto';

export type PropertyOperation = 'Venta' | 'Renta';
export type PropertyStatus = 'Disponible' | 'Reservado' | 'Vendido';

export interface PropertyCategory {
  id: PropertyCategoryId;
  label: string;
  shortLabel: string;
  description: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  categoryId: PropertyCategoryId;
  categoryLabel: string;
  type: string;
  operation: PropertyOperation;
  status: PropertyStatus;
  location: string;
  price: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  description: string;
  teaser: string;
  amenities: string[];
  images: string[];
  featured?: boolean;
}
