import type { HeroSection, Service, SiteConfig, TeamMember } from "@/lib/types";

const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_BASE_URL ?? "")
    .trim()
    .replace(/`/g, "")
    .trim() || "";

function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("estudioj_admin_token");
}

function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem("estudioj_admin_token", token);
  else window.localStorage.removeItem("estudioj_admin_token");
}

async function adminFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      ...(token ? { authorization: `Bearer ${token}` } : {})
    }
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `http_${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const adminAuth = {
  async login(username: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error("invalid_credentials");
    const data = (await res.json()) as { token: string };
    setToken(data.token);
    return data;
  },
  logout() {
    setToken(null);
  },
  token() {
    return getToken();
  }
};

export const adminApi = {
  getSiteConfig() {
    return adminFetch<SiteConfig>("/api/admin/site-config");
  },
  patchSiteConfig(body: Partial<SiteConfig>) {
    return adminFetch<SiteConfig>("/api/admin/site-config", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
  },
  getHero() {
    return adminFetch<HeroSection>("/api/admin/hero");
  },
  patchHero(body: Partial<HeroSection>) {
    return adminFetch<HeroSection>("/api/admin/hero", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
  },
  listServices() {
    return adminFetch<(Service & { sort_order: number; is_active: boolean })[]>(
      "/api/admin/services"
    );
  },
  createService(body: Partial<Service> & { name: string; description: string }) {
    return adminFetch<Service>("/api/admin/services", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
  },
  patchService(id: string, body: Partial<Service> & Record<string, unknown>) {
    return adminFetch<Service>(`/api/admin/services/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
  },
  deleteService(id: string) {
    return adminFetch<void>(`/api/admin/services/${id}`, { method: "DELETE" });
  },
  listTeam() {
    return adminFetch<(TeamMember & { sort_order: number; is_active: boolean })[]>(
      "/api/admin/team"
    );
  },
  createTeam(body: Partial<TeamMember> & { name: string }) {
    return adminFetch<TeamMember>("/api/admin/team", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
  },
  patchTeam(id: string, body: Partial<TeamMember> & Record<string, unknown>) {
    return adminFetch<TeamMember>(`/api/admin/team/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
  },
  deleteTeam(id: string) {
    return adminFetch<void>(`/api/admin/team/${id}`, { method: "DELETE" });
  },
  listLeads(limit = 50) {
    return adminFetch<
      {
        id: string;
        full_name: string;
        email: string | null;
        phone: string | null;
        message: string;
        source: string;
        created_at: string;
      }[]
    >(`/api/admin/leads?limit=${limit}`);
  }
};

