# GBS Interiors go-live checklist

## Company content

- [ ] Add final logo, brand assets, phone, email, address, service area, and working hours.
- [ ] Add at least 12–20 real showcase photos with approved title, type, location, and project description. Host photos on HTTPS and enter their URLs in admin.
- [ ] Review the sample journal articles and approve or replace them.
- [ ] Have the business review the privacy notice, retention period, controller contact, and grievance contact.

## Managed PostgreSQL

- [ ] Create a GBS-owned Neon PostgreSQL project (or another managed PostgreSQL database).
- [ ] Copy the pooled connection string into the host's `DATABASE_URL` secret; set `DATABASE_SSL=true`.
- [ ] Run `npm run db:migrate` against the production database before deploying.
- [ ] Enable automated backups and test restoring one backup. Keep database credentials private.

## App hosting

- [ ] Create a Node-compatible Next.js hosting project; static export cannot run the admin or API routes.
- [ ] Set `ADMIN_PASSWORD` to a unique value and set all public business values and `NEXT_PUBLIC_SITE_URL` in host environment variables.
- [ ] Create a Cloudflare Turnstile widget for the production domain. Set its site key and secret key in host secrets.
- [ ] Connect the GBS-owned domain, choose the canonical host, enable HTTPS, and redirect HTTP to HTTPS.
- [ ] Deploy using `npm run build` and `npm start`.

## Launch checks

- [ ] `/api/health` returns `ok`.
- [ ] Submit a valid test enquiry and verify it appears in `/admin/enquiries` and in the database.
- [ ] Confirm invalid fields, missing consent, honeypot, Turnstile, and repeat submissions behave as expected.
- [ ] Sign in to `/admin/projects`; add, edit, reorder, and delete a test project; confirm the public page reflects changes.
- [ ] Verify response security headers, HTTPS redirect, sitemap, robots, metadata, and structured data on the live domain.
- [ ] Review mobile, tablet, desktop, keyboard-only navigation, and reduced-motion behavior.
- [ ] Run `npm run lint`, `npm run build`, and `npm audit` on the release commit.
