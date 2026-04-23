"use client";

import Link from "next/link";
import { AdminShell } from "@/app/admin/AdminShell";

export default function AdminHome() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold text-navy">Panel de administración</h1>
      <p className="mt-2 text-sm text-slate-600">
        Gestiona el contenido del sitio sin tocar el código.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card href="/admin/site" title="Configuración del sitio" />
        <Card href="/admin/hero" title="Hero" />
        <Card href="/admin/services" title="Servicios" />
        <Card href="/admin/team" title="Equipo" />
        <Card href="/admin/leads" title="Leads" />
        <Card href="/admin/users" title="Usuarios" />
      </div>
    </AdminShell>
  );
}

function Card({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md"
    >
      <div className="text-sm font-semibold text-navy">{title}</div>
      <div className="mt-1 text-xs text-slate-600">Abrir</div>
    </Link>
  );
}

