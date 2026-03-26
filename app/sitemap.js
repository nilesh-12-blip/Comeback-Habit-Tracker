export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://example.com";
  return [
    { url: `${base}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/docs`, priority: 0.7, changeFrequency: "monthly" },
  ];
}
