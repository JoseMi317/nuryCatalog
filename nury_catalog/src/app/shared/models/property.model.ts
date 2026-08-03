export type PropertyStatus = 'Disponible' | 'Reservado' | 'Vendido';

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: string;
  operation: 'Venta' | 'Renta';
  status: PropertyStatus;
  location: string;
  price: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  description: string;
  amenities: string[];
  images: string[];
  featured?: boolean;
}
