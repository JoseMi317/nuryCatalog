import { Routes } from '@angular/router';

import { AdminLayout } from './core/layouts/admin-layout/admin-layout';
import { PublicLayout } from './core/layouts/public-layout/public-layout';
import { AdminDashboardPage } from './features/admin/pages/admin-dashboard-page/admin-dashboard-page';
import { AdminPropertiesPage } from './features/admin/pages/admin-properties-page/admin-properties-page';
import { AdminPropertyFormPage } from './features/admin/pages/admin-property-form-page/admin-property-form-page';
import { CatalogPage } from './features/catalog/pages/catalog-page/catalog-page';
import { PropertyDetailPage } from './features/catalog/pages/property-detail-page/property-detail-page';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'propiedades' },
      { path: 'propiedades', component: CatalogPage },
      { path: 'propiedades/:slug', component: PropertyDetailPage }
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', component: AdminDashboardPage },
      { path: 'propiedades', component: AdminPropertiesPage },
      { path: 'propiedades/nueva', component: AdminPropertyFormPage },
      { path: 'propiedades/:id/editar', component: AdminPropertyFormPage }
    ]
  },
  { path: '**', redirectTo: 'propiedades' }
];
