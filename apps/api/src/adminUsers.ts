import { pool } from "./db";

export type AdminUserPublic = {
  id: string;
  username: string;
  role: string;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function verifyAdminCredentials(username: string, password: string) {
  const { rows } = await pool.query(
    `select id, username, role
     from admin_users
     where username = $1
       and is_active = true
       and password_hash = crypt($2, password_hash)
     limit 1`,
    [username, password]
  );
  const user = rows[0] as { id: string; username: string; role: string } | undefined;
  if (!user) return null;
  await pool.query(`update admin_users set last_login_at = now() where id = $1`, [user.id]);
  return user;
}

export async function listAdminUsers() {
  const { rows } = await pool.query(
    `select id, username, role, is_active, last_login_at, created_at, updated_at
     from admin_users
     order by created_at asc`
  );
  return rows as AdminUserPublic[];
}

export async function createAdminUser(input: {
  username: string;
  password: string;
  role?: string;
}) {
  const { rows } = await pool.query(
    `insert into admin_users (username, password_hash, role)
     values ($1, crypt($2, gen_salt('bf')), $3)
     returning id, username, role, is_active, last_login_at, created_at, updated_at`,
    [input.username, input.password, input.role ?? "admin"]
  );
  return rows[0] as AdminUserPublic;
}

export async function updateAdminUser(
  id: string,
  patch: Partial<{ username: string; role: string; is_active: boolean }>
) {
  const keys = Object.keys(patch) as (keyof typeof patch)[];
  if (keys.length === 0) return null;
  const values = keys.map((k) => patch[k]);
  const set = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const { rows } = await pool.query(
    `update admin_users set ${set} where id = $${keys.length + 1}
     returning id, username, role, is_active, last_login_at, created_at, updated_at`,
    [...values, id]
  );
  return (rows[0] as AdminUserPublic | undefined) ?? null;
}

export async function setAdminUserPassword(id: string, password: string) {
  const { rows } = await pool.query(
    `update admin_users
     set password_hash = crypt($1, gen_salt('bf'))
     where id = $2
     returning id, username, role, is_active, last_login_at, created_at, updated_at`,
    [password, id]
  );
  return (rows[0] as AdminUserPublic | undefined) ?? null;
}

export async function deactivateAdminUser(id: string) {
  const { rows } = await pool.query(
    `update admin_users
     set is_active = false
     where id = $1
     returning id, username, role, is_active, last_login_at, created_at, updated_at`,
    [id]
  );
  return (rows[0] as AdminUserPublic | undefined) ?? null;
}

