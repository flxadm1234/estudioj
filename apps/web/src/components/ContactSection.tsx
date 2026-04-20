import { Container } from "@/components/Container";
import type { SiteConfig } from "@/lib/types";
import { ContactForm } from "@/components/ContactForm";

export function ContactSection({ config }: { config: SiteConfig }) {
  return (
    <section id="contacto" className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-navy">Contacto</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Envíanos tu consulta. Te responderemos a la brevedad con un enfoque claro
              y confidencial.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-slate-700">
              <div>
                <span className="font-semibold text-navy">Correo:</span>{" "}
                <a className="hover:underline" href={`mailto:${config.contact_email}`}>
                  {config.contact_email}
                </a>
              </div>
              {config.phone ? (
                <div>
                  <span className="font-semibold text-navy">Teléfono:</span>{" "}
                  <a className="hover:underline" href={`tel:${config.phone}`}>
                    {config.phone}
                  </a>
                </div>
              ) : null}
              {config.address ? (
                <div>
                  <span className="font-semibold text-navy">Dirección:</span>{" "}
                  {config.address}
                </div>
              ) : null}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

