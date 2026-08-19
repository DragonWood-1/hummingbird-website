import type { Metadata } from "next";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Hummingbird Guides – How-To Articles, Recipes & Expert Advice",
  description: "Free expert guides on attracting hummingbirds, making nectar, choosing feeders, building habitats, and understanding migration. Research-backed, practical advice for every experience level.",
  keywords: [
    "hummingbird guides","how to attract hummingbirds","hummingbird nectar recipe",
    "hummingbird feeder guide","backyard hummingbird tips","hummingbird habitat",
  ],
  alternates: { canonical: "https://hummingbirdwatcher.com/guides" },
};

const guides = [
  {
    href: "/guides/attract-hummingbirds",
    icon: "🐦",
    title: "How to Attract Hummingbirds to Your Yard",
    desc: "Complete beginner-to-expert guide: feeders, plants, placement, timing, water features, and the most common mistakes backyard birders make.",
    tags: ["Feeders", "Plants", "Placement", "Seasonal Tips"],
    readTime: "12 min",
    level: "All Levels",
    color: "from-emerald-500 to-teal-600",
  },
  {
    href: "/guides/nectar-recipe",
    icon: "🍯",
    title: "Hummingbird Nectar Recipe – The Correct 4:1 Ratio",
    desc: "The only recipe endorsed by the Cornell Lab of Ornithology and the Hummingbird Society. Covers what to use, what never to use, fermentation timing, and proper cleaning.",
    tags: ["Recipe", "Safety", "Feeder Cleaning", "FAQ"],
    readTime: "7 min",
    level: "Beginner",
    color: "from-amber-500 to-orange-600",
  },
  {
    href: "/garden-planner",
    icon: "🌿",
    title: "Hummingbird Garden Planner (Interactive Tool)",
    desc: "Find the best plants for your USDA zone, visualize month-by-month bloom timing, and design your garden layout with our free interactive planner.",
    tags: ["Plants", "USDA Zones", "Bloom Calendar", "Interactive"],
    readTime: "Interactive",
    level: "All Levels",
    color: "from-green-500 to-emerald-600",
  },
  {
    href: "/migration",
    icon: "🗺️",
    title: "Migration Tracker & Range Maps",
    desc: "Follow hummingbird migrations in real time. Interactive maps with heat maps, range overlays, and seasonal arrival data for every North American species.",
    tags: ["Migration Routes", "Heat Maps", "Seasonal"],
    readTime: "Interactive",
    level: "All Levels",
    color: "from-blue-500 to-cyan-600",
  },
  {
    href: "/identifier",
    icon: "🔍",
    title: "Hummingbird Identifier – What Species Is That?",
    desc: "Identify hummingbirds by color, size, range, and field marks. Compare similar species side by side with our interactive identification tool.",
    tags: ["Identification", "Color ID", "Species Comparison"],
    readTime: "Interactive",
    level: "Intermediate",
    color: "from-purple-500 to-violet-600",
  },
  {
    href: "/conservation",
    icon: "🌱",
    title: "Hummingbird Conservation – Threats & How to Help",
    desc: "Which species are threatened and why. What backyard birders can do to make a real difference for hummingbird populations worldwide.",
    tags: ["IUCN Status", "Threats", "Action Steps"],
    readTime: "8 min",
    level: "All Levels",
    color: "from-red-500 to-rose-600",
  },
];

export default function GuidesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -left-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800/60 backdrop-blur-sm border border-emerald-600/30 text-emerald-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
            📖 Free Expert Guides
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Hummingbird Guides
          </h1>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto leading-relaxed">
            Research-backed, practical guides for attracting, feeding, and understanding hummingbirds — from first feeder to full habitat design.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link key={guide.href} href={guide.href} className="feature-card p-6 group flex flex-col">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${guide.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                  {guide.icon}
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 font-medium">{guide.level}</span>
                  <span className="text-xs text-gray-400">{guide.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-3">{guide.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{guide.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {guide.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <AdUnit slot="2233445566" format="auto" />
          </div>
        </div>
      </section>

      {/* Quick facts section */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Key Facts Every Backyard Birder Should Know
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Quick reference for the most important hummingbird care facts — based on ornithological research and field observation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "🍯", fact: "4:1 water-to-sugar is the only correct nectar ratio", detail: "Matches the sucrose concentration of preferred wildflowers" },
              { icon: "🚫", fact: "Never use red dye, honey, or artificial sweeteners", detail: "Red dye is unnecessary; honey and sweeteners can be fatal" },
              { icon: "🧹", fact: "Change nectar every 2–3 days in summer heat", detail: "Fermentation and mold begin before nectar appears cloudy" },
              { icon: "📍", fact: "Multiple feeders out of sight of each other doubles traffic", detail: "Dominant birds can't defend feeders they can't see simultaneously" },
              { icon: "🌡️", fact: "Partial shade extends nectar freshness significantly", detail: "Direct sun accelerates fermentation and bee attraction" },
              { icon: "📅", fact: "Leave feeders up 2 weeks after last fall sighting", detail: "Late migrants and first-year birds need supplemental food most" },
              { icon: "🌸", fact: "Cardinal flower is the single best hummingbird plant in North America", detail: "Pollinator score: 99/100 — evolved specifically for hummingbird pollination" },
              { icon: "💧", fact: "Misting water features attract hummingbirds better than open birdbaths", detail: "They prefer bathing in moving water rather than standing pools" },
            ].map(({ icon, fact, detail }) => (
              <div key={fact} className="bg-white rounded-xl p-5 border border-emerald-100 shadow-sm flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{fact}</p>
                  <p className="text-gray-500 text-xs">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Encyclopedia CTA */}
      <section className="py-16 bg-emerald-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Explore the Species Encyclopedia</h2>
          <p className="text-emerald-200 mb-8">Detailed profiles for 360+ hummingbird species worldwide — including range maps, identification field marks, habitat, migration timing, and plant lists for attracting each species.</p>
          <Link href="/encyclopedia" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg rounded-2xl transition-all">
            Open Encyclopedia
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
