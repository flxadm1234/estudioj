import Link from "next/link";
import { Container } from "@/components/Container";
import type { SiteConfig } from "@/lib/types";
import { normalizePhoneForWhatsApp } from "@/lib/format";

export function Header({ config }: { config: SiteConfig }) {
  const whatsapp = config.whatsapp_phone
    ? `https://wa.me/${normalizePhoneForWhatsApp(config.whatsapp_phone)}`
    : null;

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="bg-navy text-white">
        <Container>
          <div className="flex items-center justify-between gap-4 py-2 text-sm">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {config.phone ? (
                <a className="hover:underline" href={`tel:${config.phone}`}>
                  {config.phone}
                </a>
              ) : null}
              <a className="hover:underline" href={`mailto:${config.contact_email}`}>
                {config.contact_email}
              </a>
            </div>
            {whatsapp ? (
              <a
                className="rounded-md bg-gold px-3 py-1 font-medium text-navy hover:opacity-90"
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            ) : null}
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-semibold tracking-wide text-navy">
            {config.site_name}
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <a className="hover:text-navy" href="#servicios">
              Servicios
            </a>
            <a className="hover:text-navy" href="#equipo">
              Equipo
            </a>
            <a className="hover:text-navy" href="#contacto">
              Contacto
            </a>
          </nav>
        </div>
      </Container>
    </header>
  );
}

