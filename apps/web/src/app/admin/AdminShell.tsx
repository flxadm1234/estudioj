"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { adminAuth } from "@/lib/adminApi";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!adminAuth.token() && !pathname.startsWith("/admin/login")) {
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  return (
    <div>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/admin" className="text-sm font-semibold text-navy">
            CMS
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <NavLink href="/admin/site" label="Sitio" />
            <NavLink href="/admin/hero" label="Hero" />
            <NavLink href="/admin/services" label="Servicios" />
            <NavLink href="/admin/team" label="Equipo" />
            <NavLink href="/admin/leads" label="Leads" />
            <NavLink href="/admin/users" label="Usuarios" />
            <button
              className="rounded-md bg-slate-900 px-3 py-1 text-white"
              onClick={() => {
                adminAuth.logout();
                router.replace("/admin/login");
              }}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={active ? "font-semibold text-navy" : "text-slate-700 hover:text-navy"}
    >
      {label}
    </Link>
  );
}

