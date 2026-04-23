export type ServiceIconOption = {
  id: string;
  label: string;
  svg: string;
};

export const serviceIconOptions: ServiceIconOption[] = [
  {
    id: "gavel",
    label: "Martillo judicial",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 7l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M11 10l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3 21l6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9 15l-3-3 5-5 3 3-5 5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 10l5-5 3 3-5 5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`
  },
  {
    id: "scales",
    label: "Balanza",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 6h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 6l-3 6h6L6 6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M18 6l-3 6h6l-3-6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 21h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: "briefcase",
    label: "Maletín",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 9h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 12h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 12v2h4v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: "shield",
    label: "Escudo",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3l8 4v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V7l8-4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: "users",
    label: "Personas",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 11a3 3 0 1 0-6 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 14c-3.3 0-6 1.7-6 4v2h12v-2c0-2.3-2.7-4-6-4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M18 9a2 2 0 1 0-2-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19 20v-1.5c0-1.6-1.4-2.9-3.2-3.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: "home",
    label: "Inmueble",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11l9-8 9 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 10v11h14V10" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M10 21v-6h4v6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`
  },
  {
    id: "document",
    label: "Documento",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 3v4h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 11h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 15h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: "handshake",
    label: "Acuerdo",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l2 2c1 1 2.5 1 3.5 0l4.5-4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 11l5-5 5 5-5 5-5-5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M22 11l-5-5-5 5 5 5 5-5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`
  }
];

export const serviceIconsById = Object.fromEntries(
  serviceIconOptions.map((o) => [o.id, o.svg])
) as Record<string, string>;

export const serviceIconIdBySvg = new Map(
  serviceIconOptions.map((o) => [o.svg, o.id])
);

