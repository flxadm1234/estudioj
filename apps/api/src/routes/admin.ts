import { Router } from "express";
import { z } from "zod";
import { env } from "../env";
import { requireAdmin, signAdminToken } from "../auth";
import { getHeroSection, getSiteConfig, updateHeroSection, updateSiteConfig } from "../content";
import { asyncHandler } from "../asyncHandler";
import {
  createAdminUser,
  deactivateAdminUser,
  listAdminUsers,
  setAdminUserPassword,
  updateAdminUser,
  verifyAdminCredentials
} from "../adminUsers";
import {
  adminListServices,
  adminListTeam,
  createService,
  createTeamMember,
  deleteService,
  deleteTeamMember,
  listLeads,
  updateService,
  updateTeamMember
} from "../catalog";
import {
  HeroUpdateSchema,
  AdminUserCreateSchema,
  AdminUserPasswordSchema,
  AdminUserUpdateSchema,
  ServiceCreateSchema,
  ServiceUpdateSchema,
  SiteConfigUpdateSchema,
  TeamCreateSchema,
  TeamUpdateSchema
} from "../validators";

export const adminRouter = Router();

adminRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const parsed = z
      .object({ username: z.string().min(1), password: z.string().min(1) })
      .safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
    const { username, password } = parsed.data;

    const user = await verifyAdminCredentials(username, password);
    if (user) {
      const token = signAdminToken({ id: user.id, username: user.username, role: user.role });
      return res.json({ token });
    }

    if (env.ADMIN_USER && env.ADMIN_PASSWORD) {
      if (username === env.ADMIN_USER && password === env.ADMIN_PASSWORD) {
        const token = signAdminToken({ id: "env_admin", username, role: "superadmin" });
        return res.json({ token });
      }
    }

    return res.status(401).json({ error: "invalid_credentials" });
  })
);

adminRouter.use(requireAdmin);

adminRouter.get(
  "/users",
  asyncHandler(async (_req, res) => {
    return res.json(await listAdminUsers());
  })
);

adminRouter.post(
  "/users",
  asyncHandler(async (req, res) => {
    const parsed = AdminUserCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
    const created = await createAdminUser(parsed.data);
    return res.status(201).json(created);
  })
);

adminRouter.patch(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const parsed = AdminUserUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
    const updated = await updateAdminUser(req.params.id, parsed.data);
    if (!updated) return res.status(404).json({ error: "not_found" });
    return res.json(updated);
  })
);

adminRouter.patch(
  "/users/:id/password",
  asyncHandler(async (req, res) => {
    const parsed = AdminUserPasswordSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
    const updated = await setAdminUserPassword(req.params.id, parsed.data.password);
    if (!updated) return res.status(404).json({ error: "not_found" });
    return res.json(updated);
  })
);

adminRouter.delete(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const updated = await deactivateAdminUser(req.params.id);
    if (!updated) return res.status(404).json({ error: "not_found" });
    return res.status(204).send();
  })
);

adminRouter.get(
  "/site-config",
  asyncHandler(async (_req, res) => {
    return res.json(await getSiteConfig());
  })
);

adminRouter.patch(
  "/site-config",
  asyncHandler(async (req, res) => {
    const parsed = SiteConfigUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
    const data = await updateSiteConfig(parsed.data);
    return res.json(data);
  })
);

adminRouter.get(
  "/hero",
  asyncHandler(async (_req, res) => {
    return res.json(await getHeroSection());
  })
);

adminRouter.patch(
  "/hero",
  asyncHandler(async (req, res) => {
    const parsed = HeroUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
    const data = await updateHeroSection(parsed.data);
    return res.json(data);
  })
);

adminRouter.get(
  "/services",
  asyncHandler(async (_req, res) => {
    return res.json(await adminListServices());
  })
);

adminRouter.post(
  "/services",
  asyncHandler(async (req, res) => {
    const parsed = ServiceCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
    const created = await createService(parsed.data);
    return res.status(201).json(created);
  })
);

adminRouter.patch(
  "/services/:id",
  asyncHandler(async (req, res) => {
    const parsed = ServiceUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
    const updated = await updateService(req.params.id, parsed.data);
    if (!updated) return res.status(404).json({ error: "not_found" });
    return res.json(updated);
  })
);

adminRouter.delete(
  "/services/:id",
  asyncHandler(async (req, res) => {
    const ok = await deleteService(req.params.id);
    return res.status(ok ? 204 : 404).send();
  })
);

adminRouter.get(
  "/team",
  asyncHandler(async (_req, res) => {
    return res.json(await adminListTeam());
  })
);

adminRouter.post(
  "/team",
  asyncHandler(async (req, res) => {
    const parsed = TeamCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
    const created = await createTeamMember(parsed.data);
    return res.status(201).json(created);
  })
);

adminRouter.patch(
  "/team/:id",
  asyncHandler(async (req, res) => {
    const parsed = TeamUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid_body" });
    const updated = await updateTeamMember(req.params.id, parsed.data);
    if (!updated) return res.status(404).json({ error: "not_found" });
    return res.json(updated);
  })
);

adminRouter.delete(
  "/team/:id",
  asyncHandler(async (req, res) => {
    const ok = await deleteTeamMember(req.params.id);
    return res.status(ok ? 204 : 404).send();
  })
);

adminRouter.get(
  "/leads",
  asyncHandler(async (req, res) => {
    const limit = z.coerce.number().int().min(1).max(200).catch(50).parse(req.query.limit);
    return res.json(await listLeads(limit));
  })
);

