"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/app/admin/AdminShell";
import { adminApi } from "@/lib/adminApi";

type AdminUser = {
  id: string;
  username: string;
  role: string;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
};

export default function AdminUsersPage() {
  const [items, setItems] = useState<AdminUser[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("admin");

  async function refresh() {
    setStatus("loading");
    try {
      const list = await adminApi.listAdminUsers();
      setItems(list as AdminUser[]);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onCreate() {
    if (newUsername.trim().length < 3 || newPassword.length < 8) return;
    await adminApi.createAdminUser({
      username: newUsername.trim(),
      password: newPassword,
      role: newRole.trim() || "admin"
    });
    setNewUsername("");
    setNewPassword("");
    setNewRole("admin");
    await refresh();
  }

  async function onPatch(id: string, patch: Partial<Pick<AdminUser, "username" | "role" | "is_active">>) {
    await adminApi.patchAdminUser(id, patch);
    await refresh();
  }

  async function onResetPassword(id: string) {
    const password = window.prompt("Nueva contraseña (mínimo 8 caracteres):");
    if (!password || password.length < 8) return;
    await adminApi.setAdminUserPassword(id, password);
    await refresh();
  }

  async function onDeactivate(id: string) {
    if (!window.confirm("¿Desactivar este usuario?")) return;
    await adminApi.deactivateAdminUser(id);
    await refresh();
  }

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold text-navy">Usuarios</h1>
      <p className="mt-2 text-sm text-slate-600">
        Crea y administra usuarios del CMS.
      </p>

      {status === "error" ? (
        <div className="mt-3 text-sm text-red-700">No se pudo cargar.</div>
      ) : null}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-navy">Nuevo usuario</div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="Usuario" value={newUsername} onChange={setNewUsername} placeholder="admin2" />
          <Field label="Contraseña" value={newPassword} onChange={setNewPassword} type="password" />
          <Field label="Rol" value={newRole} onChange={setNewRole} placeholder="admin" />
        </div>
        <button
          onClick={onCreate}
          className="mt-4 w-fit rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white"
        >
          Crear
        </button>
      </div>

      <div className="mt-8 grid gap-4">
        {items.map((u) => (
          <div
            key={u.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-semibold text-navy">{u.username}</div>
                <div className="mt-1 text-xs text-slate-600">{u.id}</div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={u.is_active}
                    onChange={(e) => onPatch(u.id, { is_active: e.target.checked })}
                  />
                  Activo
                </label>
                <button
                  onClick={() => onResetPassword(u.id)}
                  className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Cambiar clave
                </button>
                <button
                  onClick={() => onDeactivate(u.id)}
                  className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Desactivar
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Usuario"
                value={u.username}
                onChange={(v) => setItems((cur) => cur.map((x) => (x.id === u.id ? { ...x, username: v } : x)))}
              />
              <Field
                label="Rol"
                value={u.role}
                onChange={(v) => setItems((cur) => cur.map((x) => (x.id === u.id ? { ...x, role: v } : x)))}
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <div>
                Último login: {u.last_login_at ? new Date(u.last_login_at).toLocaleString() : "-"}
              </div>
              <div>Creado: {new Date(u.created_at).toLocaleString()}</div>
            </div>
            <button
              onClick={() => onPatch(u.id, { username: u.username, role: u.role })}
              className="mt-4 w-fit rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white"
            >
              Guardar cambios
            </button>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type ?? "text"}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-navy"
      />
    </label>
  );
}

