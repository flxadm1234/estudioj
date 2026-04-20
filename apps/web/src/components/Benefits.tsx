import { Container } from "@/components/Container";

const items = [
  {
    title: "Análisis",
    body: "Revisión rigurosa del caso, diagnóstico jurídico y evaluación de riesgos."
  },
  {
    title: "Estrategia",
    body: "Plan de acción claro, con alternativas y criterios de éxito definidos."
  },
  {
    title: "Defensa",
    body: "Representación sólida, argumentación precisa y seguimiento constante."
  }
];

export function Benefits() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="h-1 w-14 rounded-full bg-gold" />
              <h3 className="mt-4 text-lg font-semibold text-navy">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

