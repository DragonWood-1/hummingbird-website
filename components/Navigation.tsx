"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    label: "Encyclopedia",
    href: "/encyclopedia",
    children: [
      { label: "All Species", href: "/encyclopedia" },
      { label: "Species Profiles", href: "/species" },
      { label: "Ruby-throated HB", href: "/species/ruby-throated-hummingbird" },
      { label: "Blue-throated Mountain-gem", href: "/species/blue-throated-mountain-gem" },
      { label: "By State", href: "/atlas" },
    ],
  },
  {
    label: "Migration",
    href: "/migration",
    children: [
      { label: "Migration Tracker", href: "/migration" },
      { label: "Interactive Map", href: "/migration#map" },
      { label: "Heat Maps", href: "/migration#heatmap" },
      { label: "Range Overlays", href: "/migration#ranges" },
    ],
  },
  {
    label: "Garden Planner",
    href: "/garden-planner",
    children: [
      { label: "Plant Recommendations", href: "/garden-planner" },
      { label: "USDA Zone Guide", href: "/garden-planner#zones" },
      { label: "Bloom Calendar", href: "/garden-planner#bloom-calendar" },
      { label: "Layout Visualizer", href: "/garden-planner#layout" },
      { label: "Pollinator Scoring", href: "/garden-planner#pollinator" },
    ],
  },
  {
    label: "Identifier",
    href: "/identifier",
    children: [
      { label: "Color ID Tool", href: "/identifier" },
      { label: "Species Comparison", href: "/identifier#compare" },
    ],
  },
  {
    label: "Atlas",
    href: "/atlas",
    children: [
      { label: "World Map", href: "/atlas" },
      { label: "By State / Region", href: "/atlas#states" },
      { label: "Habitat Locations", href: "/atlas#habitats" },
    ],
  },
  {
    label: "Conservation",
    href: "/conservation",
  },
  {
    label: "Shop",
    href: "/shop",
  },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🐦</span>
            <div>
              <span
                className={`font-bold text-lg tracking-tight transition-colors ${
                  scrolled ? "text-emerald-900" : "text-white"
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                HummingbirdWatcher
              </span>
              <span className={`block text-xs -mt-1 ${scrolled ? "text-emerald-600" : "text-emerald-300"}`}>
                .com
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? scrolled ? "text-emerald-700 bg-emerald-50" : "text-emerald-300"
                      : scrolled ? "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.children && <span className="ml-1 text-xs opacity-60">▾</span>}
                </Link>

                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-emerald-100 py-2 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Shop
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-emerald-100 shadow-xl max-h-screen overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                    pathname === link.href ? "bg-emerald-50 text-emerald-700" : "text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.children.slice(1).map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100">
              <Link
                href="/shop"
                className="block text-center px-4 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Visit Shop
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
