"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/app/admin/AdminShell";
import { adminApi } from "@/lib/adminApi";

type Lead = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  message: string;
  source: string;
  created_at: string;
};

export default function AdminLeadsPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");

  useEffect(() => {
    adminApi
      .listLeads(100)
      .then((x) => {
        setItems(x as Lead[]);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold text-navy">Leads</h1>
      {status === "error" ? (
        <div className="mt-3 text-sm text-red-700">No se pudo cargar.</div>
      ) : null}

      <div className="mt-8 overflow-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {items.map((l) => (
              <tr key={l.id} className="border-t border-slate-200 align-top">
                <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-600">
                  {new Date(l.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-medium text-navy">{l.full_name}</td>
                <td className="px-4 py-3 text-slate-700">{l.email ?? "-"}</td>
                <td className="px-4 py-3 text-slate-700">{l.phone ?? "-"}</td>
                <td className="px-4 py-3 text-slate-700">{l.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

