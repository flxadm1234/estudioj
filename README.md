# STEVE DAVILA & ABOGADOS EIRL (EstudioJ)

Monorepo con:
- `apps/api`: API + CMS (Express + PostgreSQL)
- `apps/web`: Web pública (Next.js) consumiendo la API

## Requisitos
- Node.js LTS
- Docker (recomendado) o PostgreSQL local

## Arranque local (rápido)
1) Copia variables de entorno:

   - Crea `.env` desde `.env.example`

2) Levanta PostgreSQL:

   - `docker compose up -d`

3) Crea el esquema y datos iniciales:

   - Ejecuta `db/schema.sql`
   - Ejecuta `db/seed.sql`

4) Instala dependencias y levanta en modo dev:

   - `npm install`
   - `npm run dev`

Servicios:
- API: `http://localhost:4000`
- Web: `http://localhost:3000`

## CMS (admin)
- Login: `POST /admin/login` (usa `ADMIN_USER` / `ADMIN_PASSWORD`)
- CRUD protegido por JWT bajo `/admin/*`

## Envío de correos (leads)
- Al enviar el formulario de contacto, siempre se guarda en `leads`.
- Si configuras SMTP (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`), la API envía una notificación a `LEADS_NOTIFY_TO` (por defecto `studioj@stevedavila.com`).

## Despliegue sin afectar el VPS
- El proyecto usa puertos configurables (API_PORT / web por defecto 3000).
- En VPS, corre en puertos distintos a los ya usados (o detrás de un reverse proxy).
- Toda configuración vive en variables de entorno, no en archivos del sistema del VPS.
