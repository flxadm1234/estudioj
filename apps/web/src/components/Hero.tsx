import type { HeroSection } from "@/lib/types";
import { Container } from "@/components/Container";

export function Hero({ hero }: { hero: HeroSection }) {
  return (
    <section
      className="relative isolate overflow-hidden bg-navy"
      style={{
        backgroundImage: `url(${hero.image_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-navy/70" />
      <Container>
        <div className="relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-gold">
              ANÁLISIS · ESTRATEGIA · DEFENSA
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
              {hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={hero.cta_href}
                className="inline-flex items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-semibold text-navy hover:opacity-90"
              >
                {hero.cta_label}
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Ver servicios
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

