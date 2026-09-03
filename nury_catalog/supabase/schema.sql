create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id text primary key,
  label text not null,
  short_label text not null,
  description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category_id text not null references public.categories(id),
  category_label text,
  type text not null,
  operation text not null check (operation in ('Venta', 'Renta')),
  status text not null check (status in ('Disponible', 'Reservado', 'Vendido')),
  location text not null,
  price text not null default 'Bajo consulta',
  area integer,
  bedrooms integer,
  bathrooms integer,
  parking integer,
  description text not null default '',
  teaser text not null default '',
  amenities text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  url text not null,
  alt text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;

drop policy if exists "Public can read categories" on public.categories;
create policy "Public can read categories"
on public.categories
for select
to anon, authenticated
using (true);

drop policy if exists "Public can read published properties" on public.properties;
create policy "Public can read published properties"
on public.properties
for select
to anon, authenticated
using (published = true);

drop policy if exists "Public can read images for published properties" on public.property_images;
create policy "Public can read images for published properties"
on public.property_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.properties
    where properties.id = property_images.property_id
      and properties.published = true
  )
);

insert into public.categories (id, label, short_label, description, sort_order)
values
  ('apartamento-venta', 'Apartamentos en Venta', 'Aptos. venta', 'Apartamentos disponibles para compra.', 1),
  ('apartamento-renta', 'Apartamentos en Renta', 'Aptos. renta', 'Opciones de apartamento para alquilar.', 2),
  ('casa-renta', 'Casas en Renta', 'Casas renta', 'Casas listas para vivir en renta.', 3),
  ('casa-venta', 'Casas en Venta', 'Casas venta', 'Casas disponibles para compra.', 4),
  ('oficina', 'Oficinas', 'Oficinas', 'Espacios comerciales y oficinas.', 5),
  ('proyecto', 'Proyectos', 'Proyectos', 'Desarrollos inmobiliarios en promoción.', 6)
on conflict (id) do update set
  label = excluded.label,
  short_label = excluded.short_label,
  description = excluded.description,
  sort_order = excluded.sort_order;

insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do update set
  public = excluded.public;

drop policy if exists "Public can read property images" on storage.objects;
create policy "Public can read property images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'property-images');
