insert into site_config (site_name, domain, contact_email, phone, whatsapp_phone, address, logo_url, about_title, about_body, stats, social_links)
values (
  'STEVE DAVILA & ABOGADOS EIRL',
  'stevedavila.com',
  'studioj@stevedavila.com',
  '+51 000 000 000',
  '+51 000 000 000',
  'Lima, Perú',
  'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=400&q=80',
  'Quiénes Somos',
  'Somos un estudio jurídico comprometido con la excelencia, la ética y la estrategia. Brindamos acompañamiento legal integral, con comunicación clara y enfoque en resultados.',
  '{"cases_won":120,"clients":300,"years":10}'::jsonb,
  '{"facebook":"","instagram":"","linkedin":""}'::jsonb
)
on conflict do nothing;

insert into hero_section (title, subtitle, image_url, cta_label, cta_href)
values (
  'Defensa estratégica con enfoque corporativo',
  'Análisis, estrategia y defensa legal con rigor, discreción y resultados medibles.',
  'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1600&q=80',
  'Contáctanos',
  '#contacto'
)
on conflict do nothing;

insert into services (name, description, icon_svg, sort_order)
values
  ('Derecho de Familia', 'Patria potestad, tenencia, alimentos, régimen de visitas y procesos de familia.', null, 10),
  ('Derecho Civil', 'Obligaciones, contratos, responsabilidad civil y procesos patrimoniales.', null, 20),
  ('Derecho Penal', 'Defensa técnica en investigaciones y procesos penales.', null, 30),
  ('Derecho Laboral', 'Asesoría preventiva, litigios laborales y cumplimiento.', null, 40),
  ('Derecho Aduanero', 'Asesoría en importación/exportación, procedimientos y sanciones.', null, 50),
  ('Derecho Inmobiliario', 'Saneamiento, compraventa, arrendamientos y desarrollos.', null, 60),
  ('Derecho Corporativo', 'Constitución, gobierno corporativo, contratos y compliance.', null, 70)
on conflict do nothing;

insert into team (name, role, specialty, photo_url, sort_order)
values
  ('Steve Dávila', 'Socio Principal', 'Litigación y asesoría estratégica', 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80', 10)
on conflict do nothing;
