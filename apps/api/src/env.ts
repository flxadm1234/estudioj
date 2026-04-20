import dotenv from "dotenv";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";

const candidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "..", ".env"),
  path.resolve(process.cwd(), "..", "..", ".env")
];

const envPath = candidates.find((p) => fs.existsSync(p));
dotenv.config(envPath ? { path: envPath } : undefined);

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().min(1).optional(),
  SMTP_PASSWORD: z.string().min(1).optional(),
  SMTP_SECURE: z.coerce.boolean().optional(),
  SMTP_FROM: z.string().min(1).optional(),
  LEADS_NOTIFY_TO: z.string().min(1).optional(),
  POSTGRES_HOST: z.string().default("localhost"),
  POSTGRES_PORT: z.coerce.number().default(5432),
  POSTGRES_DB: z.string().default("estudioj"),
  POSTGRES_USER: z.string().default("postgres"),
  POSTGRES_PASSWORD: z.string().default("postgres"),
  API_PORT: z.coerce.number().default(4000),
  API_JWT_SECRET: z.string().min(16),
  ADMIN_USER: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(1)
});

export const env = EnvSchema.parse(process.env);

