export default function robots() {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://example.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
