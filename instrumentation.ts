export async function register() {
  if (process.env.NODE_ENV !== "production") return;
  const required = [
    "NEXT_PUBLIC_SITE_URL", "ADMIN_PASSWORD", "DATABASE_URL", "TURNSTILE_SECRET_KEY",
    "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  ];
  const missing = required.filter(name => !process.env[name]?.trim());
  if (missing.length) throw new Error(`Production configuration is incomplete. Set: ${missing.join(", ")}`);
  if (process.env.ADMIN_PASSWORD === "change-me") throw new Error("Replace the example ADMIN_PASSWORD before production startup.");
  if (!process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://")) throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS in production.");
}
