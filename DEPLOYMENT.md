# Deployment Guide: Comeback Legend Full-Stack

Your application is now a production-ready Next.js app using Prisma and PostgreSQL. Follow these steps to deploy to Vercel and Supabase.

## 1. Database Setup (Supabase)
1. Go to [Supabase](https://supabase.com) and create a new project.
2. In your project settings, go to **Database** -> **Connection String**.
3. Copy the **Transaction** mode connection string (ends with `?pgbouncer=true`).
4. Replace `[YOUR-PASSWORD]` with your database password.

## 2. Environment Variables
In your Vercel project settings, add the following environment variables:

- `DATABASE_URL`: Your Supabase connection string.
- `NEXTAUTH_URL`: Your production URL (e.g., `https://your-app.vercel.app`).
- `NEXTAUTH_SECRET`: A random long string (generate one with `openssl rand -base64 32`).

## 3. Local Preparation
Before pushing to GitHub:
1. Run `npx prisma generate` to update the Prisma client.
2. Ensure you have a `.env` file with `DATABASE_URL` during development.

## 4. Deployment to Vercel
1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. In the **Build Command**, use: `npx prisma generate && next build`.
4. Vercel will automatically detect Next.js and deploy.

## 5. Database Migration
To set up your tables on the production database, run from your terminal:
```bash
npx prisma db push
```
*Note: Make sure your LOCAL `.env` has the PRODUCTION `DATABASE_URL` when running this, or run it through CI/CD.*

## Troubleshooting
- **Database Errors**: Ensure your `DATABASE_URL` is correct and accessible.
- **Auth Errors**: Verify `NEXTAUTH_SECRET` and `NEXTAUTH_URL` match your deployment.
- **CSS Issues**: If styles don't appear, check if `app/globals.css` is correctly imported in `app/layout.jsx`.

---
**Your comeback is now legendary and secure.** 🔥
