import { Container } from "@/components/Container";
import type { SiteConfig } from "@/lib/types";

export function Stats({ config }: { config: SiteConfig }) {
  const casesWon = config.stats?.cases_won ?? 0;
  const clients = config.stats?.clients ?? 0;
  const years = config.stats?.years ?? 0;

  return (
    <section className="bg-navy py-12 text-white sm:py-16">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          <Stat label="Casos" value={`${casesWon}+`} />
          <Stat label="Clientes" value={`${clients}+`} />
          <Stat label="Años" value={`${years}+`} />
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
      <div className="text-3xl font-semibold text-gold">{value}</div>
      <div className="mt-2 text-sm tracking-wide text-white/80">{label}</div>
    </div>
  );
}

