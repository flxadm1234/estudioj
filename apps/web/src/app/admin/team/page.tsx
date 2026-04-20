"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/app/admin/AdminShell";
import { adminApi } from "@/lib/adminApi";

type AdminTeam = {
  id: string;
  name: string;
  role: string | null;
  specialty: string | null;
  photo_url: string | null;
  sort_order: number;
  is_active: boolean;
};

export default function AdminTeamPage() {
  const [items, setItems] = useState<AdminTeam[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");
  const [newName, setNewName] = useState("");

  async function refresh() {
    setStatus("loading");
    try {
      const list = await adminApi.listTeam();
      setItems(list as AdminTeam[]);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onCreate() {
    if (newName.trim().length < 1) return;
    await adminApi.createTeam({ name: newName.trim() });
    setNewName("");
    await refresh();
  }

  async function onPatch(id: string, patch: Partial<AdminTeam>) {
    await adminApi.patchTeam(id, patch);
    await refresh();
  }

  async function onDelete(id: string) {
    await adminApi.deleteTeam(id);
    await refresh();
  }

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold text-navy">Equipo</h1>
      {status === "error" ? (
        <div className="mt-3 text-sm text-red-700">No se pudo cargar.</div>
      ) : null}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-navy">Nuevo integrante</div>
        <div className="mt-4 grid gap-4">
          <Field label="Nombre" value={newName} onChange={setNewName} />
          <button
            onClick={onCreate}
            className="w-fit rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white"
          >
            Añadir
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {items.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-semibold text-navy">{m.name}</div>
                <div className="mt-1 text-xs text-slate-600">{m.id}</div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={m.is_active}
                    onChange={(e) => onPatch(m.id, { is_active: e.target.checked })}
                  />
                  Activo
                </label>
                <button
                  onClick={() => onDelete(m.id)}
                  className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              <Field
                label="Nombre"
                value={m.name}
                onChange={(v) => setItems((cur) => cur.map((x) => (x.id === m.id ? { ...x, name: v } : x)))}
              />
              <Field
                label="Cargo"
                value={m.role ?? ""}
                onChange={(v) => setItems((cur) => cur.map((x) => (x.id === m.id ? { ...x, role: v || null } : x)))}
              />
              <Field
                label="Especialidad"
                value={m.specialty ?? ""}
                onChange={(v) =>
                  setItems((cur) => cur.map((x) => (x.id === m.id ? { ...x, specialty: v || null } : x)))
                }
              />
              <Field
                label="Foto URL"
                value={m.photo_url ?? ""}
                onChange={(v) => setItems((cur) => cur.map((x) => (x.id === m.id ? { ...x, photo_url: v || null } : x)))}
              />
              <Field
                label="Orden"
                value={String(m.sort_order)}
                onChange={(v) =>
                  setItems((cur) =>
                    cur.map((x) =>
                      x.id === m.id ? { ...x, sort_order: Number(v || 0) } : x
                    )
                  )
                }
              />
              <button
                onClick={() =>
                  onPatch(m.id, {
                    name: m.name,
                    role: m.role,
                    specialty: m.specialty,
                    photo_url: m.photo_url,
                    sort_order: m.sort_order
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

