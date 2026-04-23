"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/app/admin/AdminShell";
import { adminApi } from "@/lib/adminApi";
import { serviceIconIdBySvg, serviceIconOptions, serviceIconsById } from "@/lib/serviceIcons";

type AdminService = {
  id: string;
  name: string;
  description: string;
  icon_svg: string | null;
  sort_order: number;
  is_active: boolean;
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<AdminService[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newIconId, setNewIconId] = useState<string>("");

  async function refresh() {
    setStatus("loading");
    try {
      const list = await adminApi.listServices();
      setItems(list as AdminService[]);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onCreate() {
    if (newName.trim().length < 1 || newDesc.trim().length < 1) return;
    await adminApi.createService({
      name: newName.trim(),
      description: newDesc.trim(),
      icon_svg: newIconId ? serviceIconsById[newIconId] : null
    });
    setNewName("");
    setNewDesc("");
    setNewIconId("");
    await refresh();
  }

  async function onPatch(id: string, patch: Partial<AdminService>) {
    await adminApi.patchService(id, patch);
    await refresh();
  }

  async function onDelete(id: string) {
    await adminApi.deleteService(id);
    await refresh();
  }

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold text-navy">Servicios</h1>
      {status === "error" ? (
        <div className="mt-3 text-sm text-red-700">No se pudo cargar.</div>
      ) : null}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-navy">Nuevo servicio</div>
        <div className="mt-4 grid gap-4">
          <Field label="Nombre" value={newName} onChange={setNewName} />
          <Textarea label="Descripción" value={newDesc} onChange={setNewDesc} />
          <IconSelect
            label="Ícono"
            value={newIconId}
            onChange={setNewIconId}
          />
          <button
            onClick={onCreate}
            className="w-fit rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white"
          >
            Añadir
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {items.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-semibold text-navy">{s.name}</div>
                <div className="mt-1 text-xs text-slate-600">{s.id}</div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={s.is_active}
                    onChange={(e) => onPatch(s.id, { is_active: e.target.checked })}
                  />
                  Activo
                </label>
                <button
                  onClick={() => onDelete(s.id)}
                  className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              <Field
                label="Nombre"
                value={s.name}
                onChange={(v) => setItems((cur) => cur.map((x) => (x.id === s.id ? { ...x, name: v } : x)))}
              />
              <Textarea
                label="Descripción"
                value={s.description}
                onChange={(v) =>
                  setItems((cur) => cur.map((x) => (x.id === s.id ? { ...x, description: v } : x)))
                }
              />
              <IconSelect
                label="Ícono"
                value={serviceIconIdBySvg.get(s.icon_svg ?? "") ?? ""}
                onChange={(iconId) =>
                  setItems((cur) =>
                    cur.map((x) =>
                      x.id === s.id
                        ? { ...x, icon_svg: iconId ? serviceIconsById[iconId] : null }
                        : x
                    )
                  )
                }
              />
              <Field
                label="Orden"
                value={String(s.sort_order)}
                onChange={(v) =>
                  setItems((cur) =>
                    cur.map((x) =>
                      x.id === s.id ? { ...x, sort_order: Number(v || 0) } : x
                    )
                  )
                }
              />
              <button
                onClick={() =>
                  onPatch(s.id, {
                    name: s.name,
                    description: s.description,
                    sort_order: s.sort_order,
                    icon_svg: s.icon_svg
                  })
                }
                className="w-fit rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

function IconSelect({
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
      <div className="flex items-center gap-3">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-navy"
        >
          <option value="">Sin ícono</option>
          {serviceIconOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
          {value ? (
            <span
              className="[&>svg]:h-6 [&>svg]:w-6"
              dangerouslySetInnerHTML={{ __html: serviceIconsById[value] }}
            />
          ) : null}
        </div>
      </div>
    </label>
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
        rows={3}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-navy"
      />
    </label>
  );
}

