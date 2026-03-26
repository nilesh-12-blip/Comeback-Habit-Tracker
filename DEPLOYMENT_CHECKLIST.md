# Production Deployment Checklist

## 1) Hosting
- Deploy to Vercel using this repository.
- Set framework preset to `Next.js`.

## 2) Database
- Replace local SQLite with PostgreSQL in production.
- Update `DATABASE_URL` to managed Postgres (Neon/Supabase/Render).
- Run:
  - `npm run db:generate`
  - `npm run db:push`

## 3) Environment Variables
- `DATABASE_URL`
- `NEXTAUTH_SECRET` (long random 32+ chars)
- `NEXTAUTH_URL` (your production domain)
- `NEXT_PUBLIC_APP_URL` (same production domain)

## 4) Security
- Keep HTTPS enabled.
- Keep proxy/headers active.
- Do not commit real `.env` values.

## 5) SEO
- Verify `robots.txt` and `sitemap.xml` after deploy.
- Add site to Google Search Console.
- Submit sitemap URL: `/sitemap.xml`.
- Configure Open Graph image and metadata for marketing pages.

## 6) Post-Deploy Verification
- Register a user and login.
- Create habits and toggle progress.
- Verify badge unlock and summary.
- Check `/api/health`.
