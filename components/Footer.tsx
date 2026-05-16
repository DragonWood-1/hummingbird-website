import Link from "next/link";

const footerLinks = {
  Encyclopedia: [
    { label: "All Species", href: "/encyclopedia" },
    { label: "Ruby-throated HB", href: "/species/ruby-throated-hummingbird" },
    { label: "Anna's Hummingbird", href: "/species/anna-hummingbird" },
    { label: "Rufous Hummingbird", href: "/species/rufous-hummingbird" },
    { label: "Blue-throated Mountain-gem", href: "/species/blue-throated-mountain-gem" },
  ],
  Migration: [
    { label: "Migration Tracker", href: "/migration" },
    { label: "Heat Maps", href: "/migration#heatmap" },
    { label: "Range Overlays", href: "/migration#ranges" },
    { label: "Interactive Map", href: "/migration#map" },
  ],
  "Garden Planner": [
    { label: "Plant Recommendations", href: "/garden-planner" },
    { label: "USDA Zone Guide", href: "/garden-planner#zones" },
    { label: "Bloom Calendar", href: "/garden-planner#bloom-calendar" },
    { label: "Garden Layout Tool", href: "/garden-planner#layout" },
    { label: "Pollinator Scoring", href: "/garden-planner#pollinator" },
  ],
  "Tools & Resources": [
    { label: "Species Identifier", href: "/identifier" },
    { label: "Hummingbird Atlas", href: "/atlas" },
    { label: "By State", href: "/atlas#states" },
    { label: "Conservation Status", href: "/conservation" },
    { label: "Life Span Data", href: "/conservation#lifespan" },
  ],
  Shop: [
    { label: "Coloring Pages", href: "/shop#coloring-pages" },
    { label: "Hummingbird Feeders", href: "/shop#feeders" },
    { label: "Art Prints", href: "/shop#art-prints" },
    { label: "Garden Decor", href: "/shop#decor" },
    { label: "Hummingbird Seeds", href: "/shop#seeds" },
  ],
};

const seoKeywords = [
  "hummingbird species","hummingbird migration","hummingbird garden","hummingbird feeder",
  "ruby-throated hummingbird facts","attract hummingbirds","hummingbird nectar recipe",
  "backyard birding","hummingbird nesting","DIY hummingbird feeder","hummingbird plants",
  "what flowers attract hummingbirds","hummingbird conservation","hummingbird identification",
];

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-white">
      {/* Newsletter */}
      <div className="bg-emerald-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get Seasonal Hummingbird Alerts
          </h3>
          <p className="text-emerald-200 mb-6">Migration updates, garden tips & exclusive content delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="#">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-colors whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐦</span>
              <span className="font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                HummingbirdGuide
              </span>
            </Link>
            <p className="text-emerald-300 text-sm leading-relaxed">
              Your complete hummingbird resource — from encyclopedia & migration to garden planning & conservation.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-emerald-800 hover:bg-emerald-700 rounded-lg flex items-center justify-center transition-colors text-sm">f</a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-emerald-800 hover:bg-emerald-700 rounded-lg flex items-center justify-center transition-colors text-sm">in</a>
              <a href="#" aria-label="Pinterest" className="w-9 h-9 bg-emerald-800 hover:bg-emerald-700 rounded-lg flex items-center justify-center transition-colors text-sm">P</a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 bg-emerald-800 hover:bg-emerald-700 rounded-lg flex items-center justify-center transition-colors text-sm">YT</a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-emerald-200 mb-3 text-sm uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-emerald-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SEO keywords section */}
        <div className="border-t border-emerald-900 pt-8 mb-8">
          <p className="text-emerald-600 text-xs mb-3 uppercase tracking-wider">Popular Topics</p>
          <div className="flex flex-wrap gap-2">
            {seoKeywords.map((kw) => (
              <span key={kw} className="text-xs text-emerald-500 bg-emerald-900/50 px-3 py-1 rounded-full">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-emerald-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-emerald-500">
          <p>© {new Date().getFullYear()} HummingbirdGuide.com — All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Affiliate Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
