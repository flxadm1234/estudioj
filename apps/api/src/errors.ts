export function isPostgresAuthError(err: unknown) {
  if (!err || typeof err !== "object") return false;
  const code = (err as { code?: unknown }).code;
  return code === "28P01";
}

export function toPublicError(err: unknown) {
  if (isPostgresAuthError(err)) {
    return { status: 503, body: { error: "db_auth_failed" } };
  }
  return { status: 500, body: { error: "internal_error" } };
}

