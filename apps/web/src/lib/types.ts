export type SiteConfig = {
  site_name: string;
  domain: string;
  contact_email: string;
  phone: string | null;
  whatsapp_phone: string | null;
  address: string | null;
  logo_url: string | null;
  hero_logo_url: string | null;
  about_title: string;
  about_body: string;
  stats: Record<string, number>;
  colors_hex: Record<string, string>;
  social_links: Record<string, string>;
};

export type HeroSection = {
  title: string;
  subtitle: string;
  image_url: string;
  cta_label: string;
  cta_href: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  icon_svg: string | null;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string | null;
  specialty: string | null;
  photo_url: string | null;
};

