create extension if not exists pgcrypto;
create extension if not exists citext;

create table if not exists site_config (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'STEVE DAVILA & ABOGADOS EIRL',
  domain text not null default 'stevedavila.com',
  contact_email text not null default 'studioj@stevedavila.com',
  phone text,
  whatsapp_phone text,
  address text,
  logo_url text,
  hero_logo_url text,
  hero_logo_height int,
  about_title text not null default 'Quiénes Somos',
  about_body text not null default 'Somos un estudio jurídico orientado a la excelencia técnica, la estrategia y la confidencialidad. Acompañamos a personas y empresas con un enfoque claro: proteger sus intereses y generar resultados.',
  stats jsonb not null default '{"cases_won":120,"clients":300,"years":10}'::jsonb,
  colors_hex jsonb not null default '{"navy":"#0B1F3A","gold":"#C6A15B","white":"#FFFFFF"}'::jsonb,
  social_links jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table site_config add column if not exists hero_logo_url text;
alter table site_config add column if not exists hero_logo_height int;

create unique index if not exists site_config_singleton on site_config ((true));

create table if not exists hero_section (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null,
  image_url text not null,
  cta_label text not null default 'Agenda una consulta',
  cta_href text not null default '#contacto',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create unique index if not exists hero_section_singleton on hero_section ((true));

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  icon_svg text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists services_active_order_idx on services (is_active, sort_order, created_at);

create table if not exists team (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  specialty text,
  photo_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists team_active_order_idx on team (is_active, sort_order, created_at);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  message text not null,
  source text not null default 'web',
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on leads (created_at desc);

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  username citext not null,
  password_hash text not null,
  role text not null default 'admin',
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'admin_users'
      and column_name = 'username'
      and data_type = 'text'
  ) then
    alter table admin_users alter column username type citext using username::citext;
  end if;
exception when undefined_table then
  null;
end;
$$;

create unique index if not exists admin_users_username_uq on admin_users (username);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_site_config_updated_at on site_config;
create trigger trg_site_config_updated_at
before update on site_config
for each row execute function set_updated_at();

drop trigger if exists trg_hero_section_updated_at on hero_section;
create trigger trg_hero_section_updated_at
before update on hero_section
for each row execute function set_updated_at();

drop trigger if exists trg_services_updated_at on services;
create trigger trg_services_updated_at
before update on services
for each row execute function set_updated_at();

drop trigger if exists trg_team_updated_at on team;
create trigger trg_team_updated_at
before update on team
for each row execute function set_updated_at();

drop trigger if exists trg_admin_users_updated_at on admin_users;
create trigger trg_admin_users_updated_at
before update on admin_users
for each row execute function set_updated_at();
