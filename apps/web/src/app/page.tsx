import { getHeroSection, getServices, getSiteConfig, getTeam } from "@/lib/api";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { About } from "@/components/About";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Stats } from "@/components/Stats";
import { Team } from "@/components/Team";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [config, hero, services, team] = await Promise.all([
    getSiteConfig(),
    getHeroSection(),
    getServices(),
    getTeam()
  ]);

  const principal = team[0];

  return (
    <div className="min-h-screen">
      <Header config={config} />
      <main>
        <Hero hero={hero} heroLogoUrl={config.hero_logo_url} heroLogoHeight={config.hero_logo_height} />
        <Benefits />
        <About config={config} principal={principal} />
        <ServicesGrid services={services} />
        <Stats config={config} />
        <Team team={team} />
        <ContactSection config={config} />
      </main>
      <Footer config={config} />
      <FloatingWhatsAppButton
        phone={config.whatsapp_phone ?? "+51 934 393 091"}
        message="Hola Steve Dávila, quisiera una consulta legal."
      />
    </div>
  );
}

