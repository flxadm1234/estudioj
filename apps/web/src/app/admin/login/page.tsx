"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminAuth } from "@/lib/adminApi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await adminAuth.login(username, password);
      router.replace("/admin");
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-navy">Acceso CMS</h1>
        <p className="mt-2 text-sm text-slate-600">
          Ingresa tus credenciales de administrador.
        </p>

        <div className="mt-6 grid gap-4">
          <Field label="Usuario" value={username} onChange={setUsername} />
          <Field label="Contraseña" value={password} onChange={setPassword} type="password" />
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-navy px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
          {error ? (
            <div className="text-sm text-red-700">Credenciales inválidas.</div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type ?? "text"}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-navy"
      />
    </label>
  );
}

