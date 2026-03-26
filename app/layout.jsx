import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Comeback Habit Tracker",
  description: "Secure full-stack habit tracker with streaks, badges, and motivation.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Comeback Habit Tracker",
    description: "Build consistency, unlock badges, and track your comeback.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
