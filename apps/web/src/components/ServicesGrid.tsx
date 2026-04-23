import { Container } from "@/components/Container";
import type { Service } from "@/lib/types";

function canRenderSvg(svg: string) {
  const v = svg.trim().toLowerCase();
  if (!v.startsWith("<svg")) return false;
  if (v.includes("<script")) return false;
  if (v.includes("onload=") || v.includes("onerror=") || v.includes("onclick=")) return false;
  return true;
}

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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
                {s.icon_svg && canRenderSvg(s.icon_svg) ? (
                  <span
                    className="[&>svg]:h-6 [&>svg]:w-6"
                    dangerouslySetInnerHTML={{ __html: s.icon_svg }}
                  />
                ) : null}
              </div>
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

