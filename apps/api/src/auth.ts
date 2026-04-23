import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "./env";

export type AdminTokenPayload = {
  sub: string;
  username: string;
  role: string;
};

export function signAdminToken(input: { id: string; username: string; role: string }) {
  const payload: AdminTokenPayload = {
    sub: input.id,
    username: input.username,
    role: input.role
  };
  return jwt.sign(payload, env.API_JWT_SECRET, { expiresIn: "8h" });
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    const decoded = jwt.verify(token, env.API_JWT_SECRET) as AdminTokenPayload;
    (res.locals as { admin?: AdminTokenPayload }).admin = decoded;
    return next();
  } catch {
    return res.status(401).json({ error: "unauthorized" });
  }
}

