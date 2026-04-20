import type { HeroSection, Service, SiteConfig, TeamMember } from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

async function apiGetOrDefault<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export function getSiteConfig() {
  return apiGetOrDefault<SiteConfig>("/api/site-config", {
    site_name: "STEVE DAVILA & ABOGADOS EIRL",
    domain: "stevedavila.com",
    contact_email: "studioj@stevedavila.com",
    phone: null,
    whatsapp_phone: null,
    address: null,
    logo_url: null,
    about_title: "Quiénes Somos",
    about_body:
      "Somos un estudio jurídico orientado a la excelencia técnica, la estrategia y la confidencialidad.",
    stats: { cases_won: 0, clients: 0, years: 0 },
    colors_hex: { navy: "#0B1F3A", gold: "#C6A15B", white: "#FFFFFF" },
    social_links: {}
  });
}

export function getHeroSection() {
  return apiGetOrDefault<HeroSection>("/api/hero", {
    title: "Defensa estratégica con enfoque corporativo",
    subtitle: "Análisis, estrategia y defensa legal con rigor, discreción y resultados medibles.",
    image_url:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1600&q=80",
    cta_label: "Contáctanos",
    cta_href: "#contacto"
  });
}

export function getServices() {
  return apiGetOrDefault<Service[]>("/api/services", [
    {
      id: "familia",
      name: "Derecho de Familia",
      description:
        "Patria potestad, tenencia, alimentos, régimen de visitas y procesos de familia.",
      icon_svg: null
    },
    {
      id: "civil",
      name: "Derecho Civil",
      description: "Obligaciones, contratos, responsabilidad civil y procesos patrimoniales.",
      icon_svg: null
    },
    {
      id: "penal",
      name: "Derecho Penal",
      description: "Defensa técnica en investigaciones y procesos penales.",
      icon_svg: null
    },
    {
      id: "laboral",
      name: "Derecho Laboral",
      description: "Asesoría preventiva, litigios laborales y cumplimiento.",
      icon_svg: null
    },
    {
      id: "aduanero",
      name: "Derecho Aduanero",
      description: "Asesoría en importación/exportación, procedimientos y sanciones.",
      icon_svg: null
    },
    {
      id: "inmobiliario",
      name: "Derecho Inmobiliario",
      description: "Saneamiento, compraventa, arrendamientos y desarrollos.",
      icon_svg: null
    },
    {
      id: "corporativo",
      name: "Derecho Corporativo",
      description: "Constitución, gobierno corporativo, contratos y compliance.",
      icon_svg: null
    }
  ]);
}

export function getTeam() {
  return apiGetOrDefault<TeamMember[]>("/api/team", [
    {
      id: "principal",
      name: "Steve Dávila",
      role: "Socio Principal",
      specialty: "Litigación y asesoría estratégica",
      photo_url:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80"
    }
  ]);
}

