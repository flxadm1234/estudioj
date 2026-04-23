export function normalizePhoneForWhatsApp(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

export function sanitizeImageUrl(url: string) {
  return url
    .trim()
    .replace(/`/g, "")
    .trim()
    .replace(/\)+$/g, "");
}

