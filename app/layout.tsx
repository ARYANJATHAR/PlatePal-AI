import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlatePal AI - Understand Every Menu Instantly",
  description: "AI-powered menu translation and explanation service with cultural insights and allergen awareness",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>🍽️</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface text-white">
        {children}
      </body>
    </html>
  );
}
