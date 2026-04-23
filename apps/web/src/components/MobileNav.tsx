"use client";

import { useMemo, useState } from "react";

type NavItem = { href: string; label: string };

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const renderedItems = useMemo(() => items, [items]);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menú"
        className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700 md:hidden"
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="text-sm font-semibold text-navy">Menú</div>
              <button
                type="button"
                aria-label="Cerrar menú"
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700"
                onClick={() => setOpen(false)}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="grid gap-1 p-4">
              {renderedItems.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  className="rounded-md px-3 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}

