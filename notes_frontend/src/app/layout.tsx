import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Notes Manager",
  description: "Create, view, edit, and delete notes with a modern light UI.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1976d2",
};

/**
 * Important for static export:
 * - Remove dynamic="force-dynamic" and similar directives which prevent static export.
 * - The mock API uses localStorage and is only invoked from client components.
 * - The layout remains a server component rendering static shell markup.
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-shell" suppressHydrationWarning>
        <Navbar />
        <main className="app-main">{children}</main>
      </body>
    </html>
  );
}
