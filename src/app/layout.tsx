import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CompareProvider } from "@/lib/CompareContext";

export const metadata: Metadata = {
  title: "MobileMatch — Find Your Perfect Phone",
  description:
    "Search, compare, and discover the best mobile phones with AI-powered recommendations, side-by-side comparisons, and expert reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <CompareProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CompareProvider>
      </body>
    </html>
  );
}
