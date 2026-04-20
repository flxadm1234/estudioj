import { z } from "zod";

export const LeadCreateSchema = z.object({
  full_name: z.string().min(3).max(200),
  email: z.string().email().nullable().optional(),
  phone: z.string().min(3).max(50).nullable().optional(),
  message: z.string().min(10).max(4000),
  source: z.string().min(1).max(50).optional()
});

export const SiteConfigUpdateSchema = z.object({
  site_name: z.string().min(1).optional(),
  domain: z.string().min(1).optional(),
  contact_email: z.string().email().optional(),
  phone: z.string().nullable().optional(),
  whatsapp_phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  logo_url: z.string().url().nullable().optional(),
  about_title: z.string().min(1).optional(),
  about_body: z.string().min(1).optional(),
  stats: z.record(z.number()).optional(),
  colors_hex: z.record(z.string()).optional(),
  social_links: z.record(z.string()).optional()
});

export const HeroUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  subtitle: z.string().min(1).optional(),
  image_url: z.string().url().optional(),
  cta_label: z.string().min(1).optional(),
  cta_href: z.string().min(1).optional()
});

export const ServiceCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  icon_svg: z.string().nullable().optional(),
  sort_order: z.number().int().optional(),
  is_active: z.boolean().optional()
});

export const ServiceUpdateSchema = ServiceCreateSchema.partial();

export const TeamCreateSchema = z.object({
  name: z.string().min(1),
  role: z.string().nullable().optional(),
  specialty: z.string().nullable().optional(),
  photo_url: z.string().url().nullable().optional(),
  sort_order: z.number().int().optional(),
  is_active: z.boolean().optional()
});

export const TeamUpdateSchema = TeamCreateSchema.partial();

