import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "@/components/cursor-glow";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Bunzo Burger | Futuristic Premium Fast Food",
  description:
    "Bunzo Burger delivers immersive premium fast food with interactive 3D experiences, signature burgers, and cinematic ordering.",
  keywords: ["Bunzo Burger", "premium burgers", "futuristic food", "3D burger website"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#0B0B0B] text-white">
        <CursorGlow />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
