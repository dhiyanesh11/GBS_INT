# GBS Interiors

Next.js site with public portfolio pages, a single admin login, project editing, and enquiry management. PostgreSQL stores projects and enquiries; the app does not require Google Sheets or n8n.

## Local development

Requires Node.js 20.9 or newer.

1. Run `npm install`.
2. Copy `.env.example` to `.env.local`; set `ADMIN_PASSWORD`.
3. Run `npm run dev` and visit `http://localhost:3000`..

Without `DATABASE_URL` during local development, projects and enquiries use JSON files under `data/`. For production, configure PostgreSQL; production startup fails if it is missing.

## Database setup

Recommended simple managed option: create a PostgreSQL project on Neon. Copy its **pooled** connection string into `DATABASE_URL` and keep `DATABASE_SSL=true`. Other managed PostgreSQL providers work too. Then run `npm run db:migrate` to create the project, enquiry, and rate-limit tables.

## Admin and photos

- Login: `/admin/login`
- Projects: `/admin/projects`
- Enquiries: `/admin/enquiries`

The admin edits project text and ordered HTTPS photo URLs; it does not upload image files. Host photos on a stable image host or CDN, then paste each URL on its own line. First URL is the cover. The admin session lasts eight hours.

## Enquiries

The form validates and stores enquiries in PostgreSQL. It includes consent, a honeypot, and rate limiting. No third-party bot verification is required. No messaging automation is connected; the admin can review saved leads.

## Deployment

This requires a Node-compatible Next.js host, not static hosting. Set all production values from `.env.example` in the host's secret manager. Apply migrations, deploy with `npm run build` / `npm start`, and verify `/api/health`. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain, enable HTTPS and HTTP redirects on the host, and complete [the launch checklist](docs/GO_LIVE_CHECKLIST.md). Never deploy `.env.local` or commit secrets.

### Docker

Docker Compose builds a production Next.js standalone image. PostgreSQL remains external (for example, Neon); the app container does not run a database.

1. Copy `.env.example` to `.env.local` if you have not already, then set `ADMIN_PASSWORD`, `DATABASE_URL`, and `DATABASE_SSL`. Use the production domain for `NEXT_PUBLIC_SITE_URL`.
2. Build and start the app with `docker compose --env-file .env.local up --build -d`.
3. Apply database migrations with `docker compose --env-file .env.local run --rm web node scripts/migrate.mjs`.
4. Check `http://localhost:3000/api/health` (or the host port configured by `PORT`).

The `NEXT_PUBLIC_*` settings are compiled into the browser bundle during image build. Rebuild after changing those values. Server secrets in `.env` are supplied when the container runs. To build directly, use `docker build -t gbs-interiors .` and run it with the production environment variables and `-p 3000:3000`.

Run `npm run lint`, `npm run build`, and `npm audit` before release. Real business contact details, portfolio photography/copy, and privacy text must be supplied or approved by GBS Interiors.
