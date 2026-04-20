import Image from "next/image";
import { Container } from "@/components/Container";
import type { TeamMember } from "@/lib/types";
import { sanitizeImageUrl } from "@/lib/format";

export function Team({ team }: { team: TeamMember[] }) {
  return (
    <section id="equipo" className="bg-slate-50 py-12 sm:py-16">
      <Container>
        <h2 className="text-2xl font-semibold text-navy">Equipo</h2>
        <p className="mt-2 text-sm text-slate-600">
          Profesionales con enfoque estratégico y atención personalizada.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div
              key={m.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-slate-100">
                {m.photo_url ? (
                  <Image
                    src={sanitizeImageUrl(m.photo_url)}
                    alt={m.name}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="p-5">
                <p className="font-semibold text-navy">{m.name}</p>
                {m.role ? <p className="mt-1 text-sm text-slate-600">{m.role}</p> : null}
                {m.specialty ? (
                  <p className="mt-2 text-sm text-slate-700">{m.specialty}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

