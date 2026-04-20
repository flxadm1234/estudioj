import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STEVE DAVILA & ABOGADOS EIRL",
  description: "Estudio jurídico: análisis, estrategia y defensa legal."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

