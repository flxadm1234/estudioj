import type { HeroSection } from "@/lib/types";
import { Container } from "@/components/Container";
import { sanitizeImageUrl } from "@/lib/format";

export function Hero({ hero, heroLogoUrl }: { hero: HeroSection; heroLogoUrl?: string | null }) {
  const bg = sanitizeImageUrl(hero.image_url);
  const rightLogo = heroLogoUrl ? sanitizeImageUrl(heroLogoUrl) : null;

  return (
    <section
      className="relative isolate overflow-hidden bg-navy"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-navy/70" />
      <Container>
        <div className="relative py-16 sm:py-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
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

            {rightLogo ? (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <img src={rightLogo} alt="Logo" className="h-24 w-auto object-contain" />
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

