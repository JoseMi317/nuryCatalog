import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'propiedades/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'admin/propiedades/:id/editar',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
