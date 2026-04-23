"use client";

import { useMemo, useState } from "react";

const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_BASE_URL ?? "")
    .trim()
    .replace(/`/g, "")
    .trim() || "";

export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const canSend = useMemo(() => {
    return fullName.trim().length > 2 && message.trim().length > 10;
  }, [fullName, message]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email: email || null,
          phone: phone || null,
          message
        })
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("sent");
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Nombre completo"
          value={fullName}
          onChange={setFullName}
          placeholder="Tu nombre"
        />
        <Field
          label="Teléfono"
          value={phone}
          onChange={setPhone}
          placeholder="+51 ..."
        />
      </div>
      <Field
        label="Correo"
        value={email}
        onChange={setEmail}
        placeholder="tu@correo.com"
        type="email"
      />
      <Field
        label="Mensaje"
        value={message}
        onChange={setMessage}
        placeholder="Cuéntanos brevemente tu caso..."
        multiline
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!canSend || status === "sending"}
          className="rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Enviando..." : "Enviar mensaje"}
        </button>
        {status === "sent" ? (
          <span className="text-sm text-slate-700">Mensaje enviado.</span>
        ) : null}
        {status === "error" ? (
          <span className="text-sm text-red-700">No se pudo enviar.</span>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type,
  multiline
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-navy"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={type ?? "text"}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-navy"
        />
      )}
    </label>
  );
}

