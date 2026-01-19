import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jane Watson's Portfolio",
  description:
    "Showcase of web projects, desktop applications, and video games. Enjoy!",
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
