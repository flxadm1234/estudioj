import Image from "next/image";
import { Container } from "@/components/Container";
import type { SiteConfig, TeamMember } from "@/lib/types";
import { sanitizeImageUrl } from "@/lib/format";

export function About({
  config,
  principal
}: {
  config: SiteConfig;
  principal?: TeamMember;
}) {
  const photoUrl = principal?.photo_url ? sanitizeImageUrl(principal.photo_url) : null;

  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-navy">{config.about_title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              {config.about_body}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            {photoUrl ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={photoUrl}
                  alt={principal?.name ?? "Foto"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-xl bg-slate-100" />
            )}
            <div className="px-2 pb-2 pt-4">
              <p className="text-sm font-semibold text-navy">
                {principal?.name ?? "Equipo legal"}
              </p>
              <p className="mt-1 text-xs text-slate-600">
                {principal?.role ?? "Asesoría integral y litigación"}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

