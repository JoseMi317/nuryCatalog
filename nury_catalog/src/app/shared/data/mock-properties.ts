import { Property } from '../models/property.model';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'NUR-001',
    slug: 'apartamento-vista-hermosa',
    title: 'Apartamento moderno en Vista Hermosa',
    type: 'Apartamento',
    operation: 'Venta',
    status: 'Disponible',
    location: 'Vista Hermosa, Zona 15',
    price: '$185,000',
    area: 118,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    description:
      'Apartamento con excelente iluminación natural, ambientes integrados y amenidades ideales para familias o inversión.',
    amenities: ['Gimnasio', 'Piscina', 'Seguridad 24/7', 'Salón social'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'NUR-002',
    slug: 'casa-familiar-carretera',
    title: 'Casa familiar en Carretera a El Salvador',
    type: 'Casa',
    operation: 'Venta',
    status: 'Disponible',
    location: 'Km 16.5, Carretera a El Salvador',
    price: '$320,000',
    area: 245,
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    description:
      'Casa amplia con jardín, sala familiar y espacios cómodos para una familia que busca privacidad y buena ubicación.',
    amenities: ['Jardín', 'Pérgola', 'Área de servicio', 'Condominio privado'],
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'NUR-003',
    slug: 'terreno-san-jose-pinula',
    title: 'Terreno residencial en San José Pinula',
    type: 'Terreno',
    operation: 'Venta',
    status: 'Reservado',
    location: 'San José Pinula',
    price: '$95,000',
    area: 650,
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    description:
      'Terreno con topografía aprovechable dentro de sector residencial tranquilo, ideal para construcción de vivienda.',
    amenities: ['Acceso controlado', 'Entorno residencial', 'Servicios cercanos'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'NUR-004',
    slug: 'apartamento-zona-catorce',
    title: 'Apartamento premium en Zona 14',
    type: 'Apartamento',
    operation: 'Renta',
    status: 'Disponible',
    location: 'Zona 14, Guatemala',
    price: '$1,250/mes',
    area: 96,
    bedrooms: 2,
    bathrooms: 2,
    parking: 2,
    description:
      'Apartamento listo para habitar, con acabados modernos y cercanía a comercios, restaurantes y vías principales.',
    amenities: ['Lobby', 'Coworking', 'Terraza', 'Pet friendly'],
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  }
];
