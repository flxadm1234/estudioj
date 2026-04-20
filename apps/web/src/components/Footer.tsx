import { Container } from "@/components/Container";
import type { SiteConfig } from "@/lib/types";

export function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="text-sm font-semibold text-navy">{config.site_name}</div>
            <div className="mt-1 text-xs text-slate-600">{config.domain}</div>
          </div>
          <div className="text-xs text-slate-600">
            © {new Date().getFullYear()} {config.site_name}. Todos los derechos
            reservados.
          </div>
        </div>
      </Container>
    </footer>
  );
}

