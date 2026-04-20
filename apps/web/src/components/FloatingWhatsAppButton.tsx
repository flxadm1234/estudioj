"use client";

import { normalizePhoneForWhatsApp } from "@/lib/format";

export function FloatingWhatsAppButton({
  phone,
  message
}: {
  phone: string;
  message?: string;
}) {
  const normalized = normalizePhoneForWhatsApp(phone);
  const href = message
    ? `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${normalized}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.42 0 .06 5.36.06 11.98c0 2.1.55 4.15 1.6 5.97L0 24l6.2-1.62a12 12 0 0 0 5.77 1.47h.01c6.62 0 12-5.36 12-11.98 0-3.2-1.25-6.2-3.46-8.39ZM12 21.8h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.68.96.98-3.59-.23-.37a9.83 9.83 0 0 1-1.51-5.22C2.14 6.47 6.49 2.12 12 2.12c2.64 0 5.13 1.03 6.99 2.9a9.78 9.78 0 0 1 2.9 6.95c0 5.51-4.38 9.83-9.89 9.83Zm5.72-7.33c-.31-.15-1.86-.92-2.15-1.02-.29-.11-.5-.15-.7.15-.2.31-.81 1.02-.99 1.23-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.47-1.53-.91-.81-1.53-1.82-1.71-2.12-.18-.31-.02-.47.13-.62.13-.13.31-.36.46-.54.15-.18.2-.31.31-.52.1-.2.05-.38-.03-.54-.08-.15-.7-1.69-.96-2.31-.25-.6-.51-.52-.7-.53h-.6c-.2 0-.54.08-.82.38-.28.31-1.07 1.05-1.07 2.56 0 1.51 1.1 2.97 1.25 3.17.15.2 2.16 3.3 5.22 4.63.73.31 1.3.5 1.75.64.74.24 1.41.21 1.94.13.59-.09 1.86-.76 2.12-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.2-.6-.36Z" />
        </svg>
      </span>
      <span className="hidden sm:block">WhatsApp</span>
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}

