import { pool } from "./db";

export async function listServices() {
  const { rows } = await pool.query(
    `select id, name, description, icon_svg
     from services
     where is_active = true
     order by sort_order asc, created_at asc`
  );
  return rows;
}

export async function adminListServices() {
  const { rows } = await pool.query(
    `select id, name, description, icon_svg, sort_order, is_active, created_at, updated_at
     from services
     order by sort_order asc, created_at asc`
  );
  return rows;
}

export async function createService(input: {
  name: string;
  description: string;
  icon_svg?: string | null;
  sort_order?: number;
  is_active?: boolean;
}) {
  const { rows } = await pool.query(
    `insert into services (name, description, icon_svg, sort_order, is_active)
     values ($1,$2,$3,$4,$5)
     returning *`,
    [
      input.name,
      input.description,
      input.icon_svg ?? null,
      input.sort_order ?? 0,
      input.is_active ?? true
    ]
  );
  return rows[0];
}

export async function updateService(
  id: string,
  fields: Partial<{
    name: string;
    description: string;
    icon_svg: string | null;
    sort_order: number;
    is_active: boolean;
  }>
) {
  const keys = Object.keys(fields) as (keyof typeof fields)[];
  if (keys.length === 0) return null;
  const values = keys.map((k) => fields[k]);
  const set = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const { rows } = await pool.query(
    `update services set ${set} where id = $${keys.length + 1} returning *`,
    [...values, id]
  );
  return rows[0] ?? null;
}

export async function deleteService(id: string) {
  const { rowCount } = await pool.query(`delete from services where id = $1`, [id]);
  return (rowCount ?? 0) > 0;
}

export async function listTeam() {
  const { rows } = await pool.query(
    `select id, name, role, specialty, photo_url
     from team
     where is_active = true
     order by sort_order asc, created_at asc`
  );
  return rows;
}

export async function adminListTeam() {
  const { rows } = await pool.query(
    `select id, name, role, specialty, photo_url, sort_order, is_active, created_at, updated_at
     from team
     order by sort_order asc, created_at asc`
  );
  return rows;
}

export async function createTeamMember(input: {
  name: string;
  role?: string | null;
  specialty?: string | null;
  photo_url?: string | null;
  sort_order?: number;
  is_active?: boolean;
}) {
  const { rows } = await pool.query(
    `insert into team (name, role, specialty, photo_url, sort_order, is_active)
     values ($1,$2,$3,$4,$5,$6)
     returning *`,
    [
      input.name,
      input.role ?? null,
      input.specialty ?? null,
      input.photo_url ?? null,
      input.sort_order ?? 0,
      input.is_active ?? true
    ]
  );
  return rows[0];
}

export async function updateTeamMember(
  id: string,
  fields: Partial<{
    name: string;
    role: string | null;
    specialty: string | null;
    photo_url: string | null;
    sort_order: number;
    is_active: boolean;
  }>
) {
  const keys = Object.keys(fields) as (keyof typeof fields)[];
  if (keys.length === 0) return null;
  const values = keys.map((k) => fields[k]);
  const set = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const { rows } = await pool.query(
    `update team set ${set} where id = $${keys.length + 1} returning *`,
    [...values, id]
  );
  return rows[0] ?? null;
}

export async function deleteTeamMember(id: string) {
  const { rowCount } = await pool.query(`delete from team where id = $1`, [id]);
  return (rowCount ?? 0) > 0;
}

export async function createLead(input: {
  full_name: string;
  email?: string | null;
  phone?: string | null;
  message: string;
  source?: string;
}) {
  const { rows } = await pool.query(
    `insert into leads (full_name, email, phone, message, source)
     values ($1,$2,$3,$4,$5)
     returning id, created_at`,
    [input.full_name, input.email ?? null, input.phone ?? null, input.message, input.source ?? "web"]
  );
  return rows[0];
}

export async function listLeads(limit: number) {
  const { rows } = await pool.query(
    `select id, full_name, email, phone, message, source, created_at
     from leads
     order by created_at desc
     limit $1`,
    [limit]
  );
  return rows;
}

