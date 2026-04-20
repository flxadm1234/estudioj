import express from "express";
import cors from "cors";
import { env } from "./env";
import { publicRouter } from "./routes/public";
import { adminRouter } from "./routes/admin";
import { toPublicError } from "./errors";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

app.use("/api", publicRouter);
app.use("/admin", adminRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const pub = toPublicError(err);
  if (pub.status >= 500) {
    process.stderr.write(String(err) + "\n");
  }
  return res.status(pub.status).json(pub.body);
});

app.use((_req, res) => {
  res.status(404).json({ error: "not_found" });
});

app.listen(env.API_PORT, () => {
  process.stdout.write(`API listening on http://localhost:${env.API_PORT}\n`);
});

