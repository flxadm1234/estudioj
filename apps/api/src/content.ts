import { pool } from "./db";

export async function getSiteConfig() {
  const { rows } = await pool.query(
    `select
      site_name, domain, contact_email, phone, whatsapp_phone, address, logo_url,
      hero_logo_url,
      hero_logo_height,
      about_title, about_body, stats, colors_hex, social_links
     from site_config
     order by created_at desc
     limit 1`
  );
  if (rows[0]) return rows[0];
  const inserted = await pool.query(
    `insert into site_config (site_name, domain, contact_email)
     values ('STEVE DAVILA & ABOGADOS EIRL','stevedavila.com','studioj@stevedavila.com')
     returning
      site_name, domain, contact_email, phone, whatsapp_phone, address, logo_url,
      hero_logo_url,
      hero_logo_height,
      about_title, about_body, stats, colors_hex, social_links`
  );
  return inserted.rows[0];
}

export async function updateSiteConfig(fields: Record<string, unknown>) {
  const current = await pool.query(`select id from site_config order by created_at desc limit 1`);
  const id = current.rows[0]?.id as string | undefined;
  if (!id) {
    const inserted = await pool.query(
      `insert into site_config (${Object.keys(fields).join(",")})
       values (${Object.keys(fields).map((_, i) => `$${i + 1}`).join(",")})
       returning *`,
      Object.values(fields)
    );
    return inserted.rows[0];
  }
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const set = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const updated = await pool.query(`update site_config set ${set} where id = $${keys.length + 1} returning *`, [
    ...values,
    id
  ]);
  return updated.rows[0];
}

export async function getHeroSection() {
  const { rows } = await pool.query(
    `select title, subtitle, image_url, cta_label, cta_href
     from hero_section
     order by created_at desc
     limit 1`
  );
  if (rows[0]) return rows[0];
  const inserted = await pool.query(
    `insert into hero_section (title, subtitle, image_url)
     values ('Defensa estratégica','Análisis, estrategia y defensa legal','')
     returning title, subtitle, image_url, cta_label, cta_href`
  );
  return inserted.rows[0];
}

export async function updateHeroSection(fields: Record<string, unknown>) {
  const current = await pool.query(`select id from hero_section order by created_at desc limit 1`);
  const id = current.rows[0]?.id as string | undefined;
  if (!id) {
    const inserted = await pool.query(
      `insert into hero_section (${Object.keys(fields).join(",")})
       values (${Object.keys(fields).map((_, i) => `$${i + 1}`).join(",")})
       returning *`,
      Object.values(fields)
    );
    return inserted.rows[0];
  }
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const set = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const updated = await pool.query(`update hero_section set ${set} where id = $${keys.length + 1} returning *`, [
    ...values,
    id
  ]);
  return updated.rows[0];
}

