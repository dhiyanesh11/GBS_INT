export async function register() {
  if (process.env.NODE_ENV !== "production") return;
  const required = [
    "NEXT_PUBLIC_SITE_URL", "ADMIN_PASSWORD", "DATABASE_URL",
  ];
  const missing = required.filter(name => !process.env[name]?.trim());
  if (missing.length) throw new Error(`Production configuration is incomplete. Set: ${missing.join(", ")}`);
  if (process.env.ADMIN_PASSWORD === "change-me") throw new Error("Replace the example ADMIN_PASSWORD before production startup.");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const localHttpUrl = siteUrl?.startsWith("http://localhost:") || siteUrl?.startsWith("http://127.0.0.1:");
  if (!siteUrl?.startsWith("https://") && !localHttpUrl) throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS in production (HTTP is allowed for localhost).");
}
