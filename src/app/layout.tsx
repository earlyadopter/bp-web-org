import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BorderlessPress — Editorial Contributor Program",
    template: "%s | BorderlessPress",
  },
  description:
    "Join the BorderlessPress editorial team. Help create open-access relocation guides for people moving to new countries.",
  openGraph: {
    title: "BorderlessPress — Editorial Contributor Program",
    description:
      "Join the BorderlessPress editorial team. Help create open-access relocation guides for people moving to new countries.",
    url: "https://borderlesspress.org",
    siteName: "BorderlessPress",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BorderlessPress — Editorial Contributor Program",
    description:
      "Join the BorderlessPress editorial team. Help create open-access relocation guides for people moving to new countries.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
