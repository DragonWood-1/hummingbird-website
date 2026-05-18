import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://hummingbirdwatcher.com"),
  title: {
    default: "HummingbirdWatcher.com – Species, Migration, Garden Planner & More",
    template: "%s | HummingbirdWatcher.com",
  },
  description: "The ultimate hummingbird resource: species encyclopedia, migration tracker, interactive maps, garden planner, hummingbird identifier, conservation status, and shopping for feeders, prints & more.",
  keywords: [
    "hummingbird species","hummingbird migration","hummingbird garden","hummingbird feeder",
    "ruby-throated hummingbird","anna's hummingbird","rufous hummingbird","hummingbird identification",
    "hummingbird nectar","hummingbird facts","backyard birding","hummingbird nesting",
    "DIY hummingbird feeder","hummingbird plants","attract hummingbirds","hummingbird encyclopedia",
    "hummingbird conservation","hummingbird atlas","migration map","hummingbird flowers",
  ],
  authors: [{ name: "HummingbirdWatcher.com" }],
  creator: "HummingbirdWatcher.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hummingbirdwatcher.com",
    siteName: "HummingbirdWatcher.com",
    title: "HummingbirdWatcher.com – Your Complete Hummingbird Resource",
    description: "Species encyclopedia, migration tracker, garden planner, hummingbird identifier & conservation tools — all in one place.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Hummingbird in flight" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HummingbirdWatcher.com",
    description: "The complete hummingbird resource for birders, gardeners & nature lovers.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "https://hummingbirdwatcher.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <meta name="theme-color" content="#064e3b" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4240246726849925" crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
