import { Router } from "express";
import { getHeroSection, getSiteConfig } from "../content";
import { createLead, listServices, listTeam } from "../catalog";
import { LeadCreateSchema } from "../validators";
import { asyncHandler } from "../asyncHandler";
import { sendLeadNotification } from "../mailer";

export const publicRouter = Router();

publicRouter.get(
  "/site-config",
  asyncHandler(async (_req, res) => {
  const data = await getSiteConfig();
  return res.json(data);
  })
);

publicRouter.get(
  "/hero",
  asyncHandler(async (_req, res) => {
  const data = await getHeroSection();
  return res.json(data);
  })
);

publicRouter.get(
  "/services",
  asyncHandler(async (_req, res) => {
  const data = await listServices();
  return res.json(data);
  })
);

publicRouter.get(
  "/team",
  asyncHandler(async (_req, res) => {
  const data = await listTeam();
  return res.json(data);
  })
);

publicRouter.post(
  "/leads",
  asyncHandler(async (req, res) => {
    const parsed = LeadCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
    const lead = await createLead(parsed.data);
    sendLeadNotification({
      full_name: parsed.data.full_name,
      email: parsed.data.email ?? null,
      phone: parsed.data.phone ?? null,
      message: parsed.data.message,
      created_at: lead.created_at
    }).catch(() => undefined);
    return res.status(201).json(lead);
  })
);

publicRouter.get("/health", (_req, res) => {
  return res.json({ ok: true });
});

