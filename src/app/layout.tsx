import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LuxeEstate — Luxury Real Estate",
  description: "Discover your dream home with LuxeEstate. Browse exclusive luxury properties in prime locations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
