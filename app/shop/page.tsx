import type { Metadata } from "next";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Hummingbird Shop – Feeders, Art Prints, Coloring Pages & Garden Seeds",
  description: "Shop our curated collection of hummingbird feeders, art prints, coloring pages, garden decor, and hummingbird-attracting plant seeds. Perfect gifts for birdwatchers and nature lovers.",
  keywords: ["hummingbird feeder","hummingbird art prints","hummingbird coloring pages","hummingbird garden decor","hummingbird seeds","hummingbird gifts","hummingbird merchandise"],
  alternates: { canonical: "https://hummingbirdwatcher.com/shop" },
};

const coloringPages = [
  {
    title: "Ruby-throated Hummingbird",
    description: "Detailed line art of North America's most beloved hummingbird, perfect for all skill levels.",
    price: "$2.99",
    badge: "Bestseller",
    format: "PDF Download",
    pages: 3,
    difficulty: "Beginner–Intermediate",
  },
  {
    title: "Hummingbird Garden Scene",
    description: "A hummingbird visiting trumpet vine and bee balm in a beautiful garden setting.",
    price: "$3.99",
    badge: "New",
    format: "PDF Download",
    pages: 5,
    difficulty: "Intermediate",
  },
  {
    title: "Hummingbird Species Pack",
    description: "8 different hummingbird species in one bundle: Ruby-throated, Anna's, Rufous, Calliope & more.",
    price: "$9.99",
    badge: "Best Value",
    format: "PDF Download",
    pages: 12,
    difficulty: "All Levels",
  },
  {
    title: "Hummingbird & Flowers Adult Coloring",
    description: "Intricate mandala-style designs featuring hummingbirds and native flowers. Meditation coloring for adults.",
    price: "$4.99",
    badge: null,
    format: "PDF Download",
    pages: 6,
    difficulty: "Advanced",
  },
  {
    title: "Kids Hummingbird Coloring Pack",
    description: "Simple, bold outlines perfect for young artists ages 3-8. Fun facts on each page.",
    price: "$2.99",
    badge: null,
    format: "PDF Download",
    pages: 8,
    difficulty: "Kids (3–8)",
  },
  {
    title: "Migration Map Coloring Page",
    description: "Color in the migration routes across North America. Educational and fun.",
    price: "$1.99",
    badge: null,
    format: "PDF Download",
    pages: 2,
    difficulty: "All Levels",
  },
];

const feeders = [
  {
    title: "Perky-Pet 203CPBN Glass Hummingbird Feeder",
    description: "Classic glass hummingbird feeder with perches, built-in ant moat, and bee guards. Easy to fill and clean — a top pick for backyard birders.",
    price: "$8.97",
    rating: 4.7,
    reviews: 2847,
    badge: "Best Value",
    href: "https://amzn.to/4wE4AHQ",
    features: ["Ant moat", "Bee guards", "Perches", "Easy clean"],
  },
  {
    title: "First Nature 993091-546 16 oz Flower Feeder",
    description: "Wide-mouth 16 oz red flower feeder makes filling and cleaning effortless. High capacity for busy feeding stations — a favorite among hummingbird enthusiasts.",
    price: "$15.90",
    rating: 4.6,
    reviews: 5234,
    badge: "Most Popular",
    href: "https://amzn.to/4nItToc",
    features: ["16 oz capacity", "Wide mouth", "10 feeding ports", "Dishwasher safe"],
  },
  {
    title: "Aspects HummZinger Excel 16 oz (Limited Edition)",
    description: "Award-winning saucer design with built-in ant moat and rain guard. Easy to disassemble and clean. American-made quality that lasts for years.",
    price: "$32.99",
    rating: 4.8,
    reviews: 3102,
    badge: "Premium Pick",
    href: "https://amzn.to/4eVJ1vU",
    features: ["16 oz capacity", "Built-in ant moat", "Rain guard", "USA made"],
  },
  {
    title: "Juegoal Glass Wild Bird Waterer 28 oz",
    description: "28 oz glass water cooler with metal handle for hanging in garden, tree, or yard. Doubles as a decorative outdoor accent — hummingbirds love fresh water.",
    price: "$19.99",
    rating: 4.5,
    reviews: 891,
    badge: "Decorative",
    href: "https://amzn.to/4ufHO7v",
    features: ["28 oz capacity", "Glass construction", "Metal handle", "Hanging design"],
  },
];

const artPrints = [
  {
    title: "PBXBJY Hummingbird Watercolor Canvas Print 12×12",
    description: "Hummingbird with floral watercolor painting on canvas — framed and ready to hang. Perfect for bathroom, bedroom, or office decor.",
    price: "$21.59",
    sizes: ["12×12"],
    medium: "Framed canvas print",
    badge: "Bestseller",
    href: "https://amzn.to/4dCTVV3",
  },
  {
    title: "Canvbay Hummingbird Spring Flower Canvas 24×36",
    description: "Large-format hummingbird with spring flowers canvas print, ready to hang. A striking statement piece for living room, bedroom, or office.",
    price: "$55.99",
    sizes: ["24×36"],
    medium: "Canvas, ready to hang",
    badge: "Gallery Pick",
    href: "https://amzn.to/4nIw0bC",
  },
  {
    title: "XJYISUO Vintage Gold Framed Hummingbird Wall Art",
    description: "Colorful hummingbird botanical canvas art in vintage gold frame. Nature-inspired floral and bird painting for living room, bedroom, or dining room.",
    price: "$25.99",
    sizes: ["Multiple"],
    medium: "Framed canvas print",
    badge: "Gift Idea",
    href: "https://amzn.to/4uQjCZc",
  },
  {
    title: "National Geographic Bird Migration Wall Map",
    description: "Eastern Hemisphere laminated wall map showing bird migration routes — 31.25×20.25 inches. A must-have for serious birders and nature enthusiasts.",
    price: "$52.99",
    sizes: ["31.25×20.25"],
    medium: "Laminated wall map",
    badge: "Educational",
    href: "https://amzn.to/4wSXAqK",
  },
];

const gardenDecor = [
  {
    title: "Spoontiques Hummingbird Stepping Stone",
    description: "Spoontiques decorative garden stepping stone featuring a beautiful hummingbird design. Durable cast resin, weather-resistant for year-round outdoor use.",
    price: "$22.99",
    category: "Stones & Markers",
    badge: "Gift Idea",
    href: "https://amzn.to/4tHaYve",
  },
  {
    title: "Bshine Solar Hummingbird Lights",
    description: "Metal stake solar lights with hanging flower and hummingbird design. Waterproof, auto on at dusk — perfect for paths, terrace, and lawn.",
    price: "$24.99",
    category: "Solar Lights",
    badge: "Popular",
    href: "https://amzn.to/4eUHpTh",
  },
  {
    title: "FLAGWIX 3D Hummingbird Wind Spinner 12\"",
    description: "3D stainless steel hummingbird wind spinner, rust-resistant and kinetic. A stunning gift for women, mom, or grandma — indoors or outdoors.",
    price: "$27.95",
    category: "Wind Spinners",
    badge: "Gift Idea",
    href: "https://amzn.to/4tTJWB2",
  },
  {
    title: "Hummingbird Metal Wind Spinner 12\"",
    description: "12-inch 3D stainless steel hanging wind spinner, great for yard art and garden decor. Perfect Christmas or birthday gift for hummingbird lovers.",
    price: "$26.99",
    category: "Wind Spinners",
    badge: null,
    href: "https://amzn.to/4umK7Ws",
  },
  {
    title: "Vintage Hummingbird Deep Tone Wind Chime 32\"",
    description: "Large 32\" outdoor wind chime with vintage hummingbird design and deep, melodic tones. Beautiful accent for patio, porch, balcony, or garden.",
    price: "$26.99",
    category: "Wind Chimes",
    badge: "Bestseller",
    href: "https://amzn.to/49YCmxA",
  },
  {
    title: "VIVOHOME Polyresin Pedestal Bird Bath 28\"",
    description: "28-inch weather-resistant polyresin pedestal birdbath with 20\" bowl. Hummingbirds love shallow moving water — a must-have for any garden.",
    price: "$37.99",
    category: "Birdbaths",
    badge: null,
    href: "https://amzn.to/4fpz0Y4",
  },
];

const seeds = [
  {
    name: "Cardinal Flower Seeds (100 PCS)",
    scientificName: "Lobelia cardinalis",
    price: "$7.59",
    servings: "100 seeds per packet",
    zones: "3–9",
    bloomSeason: "July–September",
    pollinatorScore: 99,
    badge: "#1 Rated",
    href: "https://amzn.to/49ZrPlN",
  },
  {
    name: "KVITER Spotted Bee Balm Seeds (350 PCS)",
    scientificName: "Monarda punctata",
    price: "$7.99",
    servings: "350 seeds per packet",
    zones: "4–9",
    bloomSeason: "June–August",
    pollinatorScore: 95,
    badge: "Non-GMO",
    href: "https://amzn.to/4uXHOJi",
  },
  {
    name: "Trumpet Vine Seeds (300 PCS)",
    scientificName: "Campsis radicans",
    price: "$8.99",
    servings: "300 seeds per packet",
    zones: "4–9",
    bloomSeason: "June–September",
    pollinatorScore: 98,
    badge: "Native",
    href: "https://amzn.to/4wCdHIX",
  },
  {
    name: "SVI Red Sage Seeds (1000 PCS)",
    scientificName: "Salvia coccinea",
    price: "$7.49",
    servings: "1000 seeds per packet",
    zones: "Annual",
    bloomSeason: "May–Frost",
    pollinatorScore: 90,
    badge: "Heirloom",
    href: "https://amzn.to/42HWfFq",
  },
  {
    name: "Penstemon Spectabilis Seeds (500+)",
    scientificName: "Penstemon spectabilis",
    price: "$9.99",
    servings: "500+ seeds per packet",
    zones: "5–9",
    bloomSeason: "May–July",
    pollinatorScore: 88,
    badge: "Drought Tolerant",
    href: "https://amzn.to/4ufJihX",
  },
  {
    name: "HOME GROWN Wildflower Seeds Mix (90,000+)",
    scientificName: "24-variety mix",
    price: "$15.99",
    servings: "3 oz / 90,000+ seeds",
    zones: "4–9",
    bloomSeason: "Spring–Fall",
    pollinatorScore: 93,
    badge: "Best Value",
    href: "https://amzn.to/4dtdwH7",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-4 h-4 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🛍️ Hummingbird Shop
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Everything for the<br />
            <span className="hero-text-gradient">Hummingbird Lover</span>
          </h1>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto mb-8">
            Curated feeders, art prints, coloring pages, garden decor, and native plant seeds — perfect for birders, gardeners, and gift-givers.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Coloring Pages", href: "#coloring-pages" },
              { label: "Feeders", href: "#feeders" },
              { label: "Art Prints", href: "#art-prints" },
              { label: "Garden Decor", href: "#decor" },
              { label: "Seeds", href: "#seeds" },
            ].map((cat) => (
              <a key={cat.href} href={cat.href} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full border border-white/20 transition-colors">
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate disclosure */}
      <div className="bg-amber-50 border-b border-amber-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber-800 text-xs text-center">
            <strong>Affiliate Disclosure:</strong> Some links on this page are affiliate links. We may earn a small commission when you purchase through our links, at no additional cost to you. This helps us maintain the site.
          </p>
        </div>
      </div>

      {/* Coloring Pages */}
      <section id="coloring-pages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="section-heading">🎨 Printable Coloring Pages</h2>
              <p className="text-emerald-700 mt-2">Instant PDF downloads — print at home and enjoy!</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coloringPages.map((item) => (
              <div key={item.title} className="shop-card">
                {/* Placeholder image area */}
                <div className="h-40 bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center relative">
                  <div className="text-6xl opacity-40">🐦</div>
                  {item.badge && (
                    <span className="absolute top-3 left-3 text-xs font-bold bg-emerald-600 text-white px-2 py-1 rounded-full">{item.badge}</span>
                  )}
                  <span className="absolute top-3 right-3 text-xs bg-white text-gray-600 px-2 py-1 rounded-full border shadow-sm">{item.format}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-700">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <span>📄 {item.pages} pages</span>
                    <span>🎨 {item.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-700">{item.price}</span>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors">
                      Download Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad: between coloring pages and feeders */}
      <div className="bg-white py-4">
        <div className="max-w-5xl mx-auto px-4">
          <AdUnit slot="1122334455" format="auto" />
        </div>
      </div>

      {/* Feeders */}
      <section id="feeders" className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="section-heading">🌸 Hummingbird Feeders</h2>
            <p className="text-emerald-700 mt-2">Top-rated feeders curated by our editors. Easy to fill, easy to clean.</p>
          </div>

          {/* Feeder tips */}
          <div className="bg-white rounded-2xl p-6 mb-8 border border-emerald-200">
            <h3 className="font-bold text-emerald-900 mb-3">💡 Feeder Pro Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">1.</span>
                <span>Use 4:1 water-to-white-sugar solution. Never use red dye, honey, or artificial sweeteners.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">2.</span>
                <span>Clean feeders every 2-3 days in summer heat. Moldy nectar can kill hummingbirds.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">3.</span>
                <span>Hang multiple feeders out of sight of each other to reduce territorial disputes.</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feeders.map((feeder) => (
              <div key={feeder.title} className="shop-card p-6 flex gap-5">
                <div className="w-24 h-24 bg-gradient-to-br from-red-50 to-orange-100 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                  🌸
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-emerald-700">{feeder.title}</h3>
                    {feeder.badge && (
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full flex-shrink-0">{feeder.badge}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={feeder.rating} />
                    <span className="text-sm text-gray-500">{feeder.rating} ({feeder.reviews.toLocaleString()})</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{feeder.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {feeder.features.map((f) => (
                      <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{f}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-emerald-700">{feeder.price}</span>
                    <a
                      href={feeder.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      View on Amazon
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad: between feeders and art prints */}
      <div className="bg-emerald-50 py-4">
        <div className="max-w-5xl mx-auto px-4">
          <AdUnit slot="5544332211" format="auto" />
        </div>
      </div>

      {/* Art Prints */}
      <section id="art-prints" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="section-heading">🖼️ Art Prints</h2>
            <p className="text-emerald-700 mt-2">Beautiful hummingbird artwork for your home — giclée prints on archival paper.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artPrints.map((print) => (
              <div key={print.title} className="shop-card">
                <div className="h-52 bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center relative">
                  <div className="text-6xl opacity-30">🎨</div>
                  {print.badge && (
                    <span className="absolute top-3 left-3 text-xs font-bold bg-purple-600 text-white px-2 py-1 rounded-full">{print.badge}</span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2">{print.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{print.description}</p>
                  <div className="text-xs text-gray-500 mb-1">Sizes: {print.sizes.join(", ")}</div>
                  <div className="text-xs text-gray-500 mb-4">{print.medium}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-700">{print.price}</span>
                    <a
                      href={print.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      View on Amazon
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garden Decor */}
      <section id="decor" className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="section-heading">🪴 Garden Decor</h2>
            <p className="text-emerald-700 mt-2">Hummingbird-themed stakes, ornaments, wind chimes, and more for your outdoor space.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gardenDecor.map((item) => (
              <div key={item.title} className="shop-card p-6">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  {item.badge && (
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full flex-shrink-0">{item.badge}</span>
                  )}
                </div>
                <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-3">{item.category}</span>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-emerald-700">{item.price}</span>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    View on Amazon
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seeds */}
      <section id="seeds" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="section-heading">🌱 Hummingbird Garden Seeds</h2>
            <p className="text-emerald-700 mt-2">Native and hummingbird-attracting plant seeds — the best way to invite these beautiful birds to your yard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seeds.map((seed) => (
              <div key={seed.name} className="shop-card p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-emerald-700">{seed.name}</h3>
                    <p className="text-sm text-emerald-600 italic">{seed.scientificName}</p>
                  </div>
                  {seed.badge && (
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full flex-shrink-0 border border-green-200">{seed.badge}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{seed.servings}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Zones {seed.zones}</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Bloom:</span> {seed.bloomSeason}
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Pollinator Score</span>
                    <span className="font-bold text-emerald-700">{seed.pollinatorScore}/100</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${seed.pollinatorScore}%` }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-emerald-700">{seed.price}</span>
                  <a
                    href={seed.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    View on Amazon
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Seed planting guide CTA */}
          <div className="mt-12 bg-emerald-900 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Not Sure What to Plant?</h3>
            <p className="text-emerald-200 mb-6 max-w-2xl mx-auto">Our free Garden Planner finds the perfect plants for your USDA zone, shows bloom calendars, and even lets you design your garden layout.</p>
            <Link href="/garden-planner" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-colors">
              Open Garden Planner (Free)
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Gift guide */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50 border-t border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎁 Gift Guide for Hummingbird Lovers</h2>
          <p className="text-gray-600 mb-8">Know a hummingbird enthusiast? These make perfect gifts for any budget.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { budget: "Under $10", idea: "Coloring page bundle", href: "#coloring-pages" },
              { budget: "Under $25", idea: "Hummingbird feeder + seeds", href: "#feeders" },
              { budget: "Under $50", idea: "Art print + garden decor", href: "#art-prints" },
              { budget: "Ultimate Gift", idea: "Full garden starter kit", href: "#seeds" },
            ].map((gift) => (
              <a key={gift.budget} href={gift.href} className="bg-white rounded-2xl p-4 text-center border border-rose-100 hover:border-rose-300 hover:shadow-md transition-all">
                <div className="font-bold text-rose-600 text-sm mb-1">{gift.budget}</div>
                <div className="text-gray-700 text-sm">{gift.idea}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
