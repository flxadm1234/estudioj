import { Container } from "@/components/Container";
import type { Service } from "@/lib/types";

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section id="servicios" className="bg-white py-12 sm:py-16">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-navy">Servicios Legales</h2>
            <p className="mt-2 text-sm text-slate-600">
              Áreas de práctica orientadas a personas y empresas.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="rounded-xl border border-slate-200 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="h-10 w-10 rounded-lg bg-navy/5" />
              <h3 className="mt-4 text-base font-semibold text-navy">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

