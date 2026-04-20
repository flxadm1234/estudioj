import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool(
  env.DATABASE_URL
    ? { connectionString: env.DATABASE_URL }
    : {
        host: env.POSTGRES_HOST,
        port: env.POSTGRES_PORT,
        database: env.POSTGRES_DB,
        user: env.POSTGRES_USER,
        password: env.POSTGRES_PASSWORD
      }
);

