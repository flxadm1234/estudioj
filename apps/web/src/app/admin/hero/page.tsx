"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/app/admin/AdminShell";
import { adminApi } from "@/lib/adminApi";
import type { HeroSection } from "@/lib/types";

export default function AdminHeroPage() {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "error" | "saved">("idle");

  useEffect(() => {
    adminApi
      .getHero()
      .then(setHero)
      .catch(() => setStatus("error"));
  }, []);

  async function onSave() {
    if (!hero) return;
    setStatus("saving");
    try {
      const updated = await adminApi.patchHero(hero);
      setHero(updated);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1200);
    } catch {
      setStatus("error");
    }
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-navy">Hero</h1>
        <button
          onClick={onSave}
          className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white"
          disabled={!hero || status === "saving"}
        >
          {status === "saving" ? "Guardando..." : "Guardar"}
        </button>
      </div>
      {status === "saved" ? (
        <div className="mt-3 text-sm text-emerald-700">Guardado.</div>
      ) : null}
      {status === "error" ? (
        <div className="mt-3 text-sm text-red-700">No se pudo cargar/guardar.</div>
      ) : null}

      {!hero ? null : (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4">
            <Field
              label="Título"
              value={hero.title}
              onChange={(v) => setHero({ ...hero, title: v })}
            />
            <Textarea
              label="Subtítulo"
              value={hero.subtitle}
              onChange={(v) => setHero({ ...hero, subtitle: v })}
            />
            <Field
              label="Imagen URL"
              value={hero.image_url}
              onChange={(v) => setHero({ ...hero, image_url: v })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="CTA label"
                value={hero.cta_label}
                onChange={(v) => setHero({ ...hero, cta_label: v })}
              />
              <Field
                label="CTA href"
                value={hero.cta_href}
                onChange={(v) => setHero({ ...hero, cta_href: v })}
              />
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Field({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-navy"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-navy"
      />
    </label>
  );
}

