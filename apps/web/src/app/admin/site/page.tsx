"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/app/admin/AdminShell";
import { adminApi } from "@/lib/adminApi";
import type { SiteConfig } from "@/lib/types";
import { sanitizeImageUrl } from "@/lib/format";

export default function AdminSitePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "error" | "saved">("idle");
  const [socialJson, setSocialJson] = useState("{}");
  const [colorsJson, setColorsJson] = useState("{}");
  const [statsJson, setStatsJson] = useState("{}");

  useEffect(() => {
    adminApi
      .getSiteConfig()
      .then((c) => {
        setConfig(c);
        setSocialJson(JSON.stringify(c.social_links ?? {}, null, 2));
        setColorsJson(JSON.stringify(c.colors_hex ?? {}, null, 2));
        setStatsJson(JSON.stringify(c.stats ?? {}, null, 2));
      })
      .catch(() => setStatus("error"));
  }, []);

  async function onSave() {
    if (!config) return;
    setStatus("saving");
    try {
      const social_links = JSON.parse(socialJson || "{}") as Record<string, string>;
      const colors_hex = JSON.parse(colorsJson || "{}") as Record<string, string>;
      const stats = JSON.parse(statsJson || "{}") as Record<string, number>;
      const updated = await adminApi.patchSiteConfig({ ...config, social_links, colors_hex, stats });
      setConfig(updated);
      setStatsJson(JSON.stringify(updated.stats ?? {}, null, 2));
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1200);
    } catch {
      setStatus("error");
    }
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-navy">Configuración del sitio</h1>
        <button
          onClick={onSave}
          className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white"
          disabled={!config || status === "saving"}
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

      {!config ? null : (
        <div className="mt-8 grid gap-6">
          <Card title="Identidad">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Nombre del sitio"
                value={config.site_name}
                onChange={(v) => setConfig({ ...config, site_name: v })}
              />
              <Field
                label="Dominio"
                value={config.domain}
                onChange={(v) => setConfig({ ...config, domain: v })}
              />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                label="Logo URL"
                value={config.logo_url ?? ""}
                onChange={(v) => setConfig({ ...config, logo_url: v || null })}
              />
              <Field
                label="Logo banner (derecha) URL"
                value={config.hero_logo_url ?? ""}
                onChange={(v) => setConfig({ ...config, hero_logo_url: v || null })}
              />
              <NumberField
                label="Alto logo banner (px)"
                value={config.hero_logo_height ?? 96}
                onChange={(v) => setConfig({ ...config, hero_logo_height: v })}
              />
              <Field
                label="Correo"
                value={config.contact_email}
                onChange={(v) => setConfig({ ...config, contact_email: v })}
              />
            </div>
            {config.logo_url ? (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-700">Previsualización</div>
                <img
                  src={sanitizeImageUrl(config.logo_url)}
                  alt="Logo"
                  className="mt-3 h-10 w-auto"
                />
              </div>
            ) : null}
            {config.hero_logo_url ? (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-700">Previsualización (banner derecha)</div>
                <img
                  src={sanitizeImageUrl(config.hero_logo_url)}
                  alt="Logo banner"
                  className="mt-3 w-auto"
                  style={{ height: `${Math.max(24, Math.min(240, config.hero_logo_height ?? 96))}px` }}
                />
              </div>
            ) : null}
          </Card>

          <Card title="Contacto">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                label="Teléfono"
                value={config.phone ?? ""}
                onChange={(v) => setConfig({ ...config, phone: v || null })}
              />
              <Field
                label="WhatsApp"
                value={config.whatsapp_phone ?? ""}
                onChange={(v) => setConfig({ ...config, whatsapp_phone: v || null })}
              />
              <Field
                label="Dirección"
                value={config.address ?? ""}
                onChange={(v) => setConfig({ ...config, address: v || null })}
              />
            </div>
          </Card>

          <Card title="Quiénes Somos">
            <Field
              label="Título"
              value={config.about_title}
              onChange={(v) => setConfig({ ...config, about_title: v })}
            />
            <div className="mt-4">
              <Textarea
                label="Texto"
                value={config.about_body}
                onChange={(v) => setConfig({ ...config, about_body: v })}
              />
            </div>
          </Card>

          <Card title="JSON">
            <div className="grid gap-6 lg:grid-cols-2">
              <Textarea label="colors_hex" value={colorsJson} onChange={setColorsJson} />
              <Textarea label="social_links" value={socialJson} onChange={setSocialJson} />
            </div>
            <div className="mt-6">
              <Textarea label="stats" value={statsJson} onChange={setStatsJson} />
            </div>
          </Card>
        </div>
      )}
    </AdminShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-navy">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
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
        rows={8}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-xs outline-none focus:border-navy"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange
}: {
  label: string;
  value: number;
  onChange: (v: number | null) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="number"
        min={24}
        max={240}
        value={Number.isFinite(value) ? value : 96}
        onChange={(e) => {
          const n = Number(e.target.value);
          onChange(Number.isFinite(n) ? n : null);
        }}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-navy"
      />
    </label>
  );
}

