export const metadata = {
  title: "Architecture | Comeback Habit Tracker",
  description: "System architecture, backend, database, and deployment guide.",
};

export default function DocsPage() {
  return (
    <main className="container" style={{ padding: "36px 0 56px" }}>
      <h1>Architecture</h1>
      <ul>
        <li>Frontend + backend: Next.js App Router</li>
        <li>Database: Prisma ORM (SQLite locally, PostgreSQL in production)</li>
        <li>API: Route handlers under `app/api/*`</li>
        <li>Security: strict headers in middleware + next config</li>
        <li>SEO: metadata, sitemap, robots configured</li>
      </ul>
    </main>
  );
}
