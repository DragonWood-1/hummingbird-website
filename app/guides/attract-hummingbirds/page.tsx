import type { Metadata } from "next";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "How to Attract Hummingbirds to Your Yard – Complete Guide",
  description: "Everything you need to attract more hummingbirds: the best feeders, plants, nectar recipe, placement tips, and seasonal strategies. Expert advice for beginners and experienced birders.",
  keywords: [
    "how to attract hummingbirds","attract hummingbirds to yard","hummingbird garden tips",
    "best plants for hummingbirds","hummingbird feeder placement","hummingbird nectar recipe",
    "backyard hummingbirds","hummingbird habitat","hummingbird garden plants",
  ],
  alternates: { canonical: "https://hummingbirdwatcher.com/guides/attract-hummingbirds" },
};

export default function AttractHummingbirdsPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -left-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-emerald-400 text-sm mb-6">
            <Link href="/" className="hover:text-emerald-300">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-emerald-300">Guides</Link>
            <span>/</span>
            <span className="text-emerald-200">Attract Hummingbirds</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-emerald-800/60 backdrop-blur-sm border border-emerald-600/30 text-emerald-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
            🐦 Beginner to Expert Guide · 12 min read
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            How to Attract Hummingbirds to Your Yard
          </h1>
          <p className="text-xl text-emerald-200 leading-relaxed max-w-3xl">
            From choosing your first feeder to designing a full hummingbird habitat, this guide covers every strategy — backed by ornithological research and field-tested by thousands of backyard birders.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Feeders","Nectar Recipe","Best Plants","Timing","Common Mistakes"].map((tag) => (
              <span key={tag} className="text-sm bg-emerald-800/60 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-700/50">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-10 bg-emerald-50 border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 text-lg">In This Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { href: "#feeders", label: "1. Choosing the Right Feeder" },
                { href: "#nectar", label: "2. Making the Perfect Nectar" },
                { href: "#plants", label: "3. Best Plants to Attract Hummingbirds" },
                { href: "#placement", label: "4. Feeder Placement & Garden Layout" },
                { href: "#timing", label: "5. Seasonal Timing by Region" },
                { href: "#water", label: "6. Water Features Hummingbirds Love" },
                { href: "#mistakes", label: "7. Common Mistakes to Avoid" },
                { href: "#species", label: "8. Species-Specific Tips" },
              ].map(({ href, label }) => (
                <a key={href} href={href} className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 text-sm py-1 transition-colors">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed mb-12">
            <p className="text-lg">
              Attracting hummingbirds isn&apos;t complicated — these tiny birds are drawn to a handful of reliable cues. But attracting <em>more</em> hummingbirds, keeping them healthy, and building a yard they return to year after year takes a more intentional approach. This guide gives you the complete picture.
            </p>
          </div>

          <section id="feeders" className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              1. Choosing the Right Feeder
            </h2>
            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                Hummingbird feeders come in two primary styles: <strong>bottle feeders</strong> (inverted reservoir) and <strong>saucer feeders</strong> (shallow dish). Both attract hummingbirds equally well, but they differ dramatically in maintenance and pest resistance.
              </p>
              <p>
                <strong>Saucer feeders</strong> are the clear winner for most backyard birders. Because hummingbirds sip upward from a shallow dish, nectar stays below the feeding ports — bees and wasps can&apos;t reach it. These feeders rarely drip, are trivially easy to clean (usually two pieces that fit in the dishwasher), and the lower nectar exposure to sunlight extends the time before fermentation. The downside is smaller capacity: 8–16 oz is typical, which may require daily refills during migration peaks.
              </p>
              <p>
                <strong>Bottle feeders</strong> hold 24–48 oz, reducing refill frequency. But they drip when temperature swings cause pressure changes, which creates sticky residue that attracts yellowjackets and carpenter bees. If you use bottle feeders, choose models with built-in ant moats (a water-filled ring around the hanger) and bee guards over the ports.
              </p>
              <p>
                <strong>Glass vs. plastic:</strong> Glass is more durable long-term, doesn&apos;t absorb odors, and is easier to fully sterilize. UV-stable polycarbonate plastic resists shattering and often comes in more sophisticated designs. Both work well when cleaned properly.
              </p>
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 mt-6">
                <p className="font-semibold text-emerald-900 mb-2">Our Top Feeder Picks</p>
                <ul className="text-sm space-y-1 text-emerald-800">
                  <li>• <strong>Best overall:</strong> Aspects HummZinger Excel 16 oz — saucer design, USA-made, built-in ant moat</li>
                  <li>• <strong>Best value:</strong> Perky-Pet 203CPBN — glass bottle with bee guards and ant moat under $10</li>
                  <li>• <strong>High capacity:</strong> First Nature 993091-546 16 oz — wide-mouth design makes cleaning painless</li>
                </ul>
                <Link href="/shop#feeders" className="inline-flex items-center gap-1 mt-3 text-sm text-emerald-700 font-semibold hover:text-emerald-900">
                  See full feeder reviews →
                </Link>
              </div>
            </div>
          </section>

          <AdUnit slot="6677889900" format="auto" />

          <section id="nectar" className="mt-16 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              2. Making the Perfect Hummingbird Nectar
            </h2>
            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                The ideal hummingbird nectar is a <strong>4:1 ratio of water to plain white granulated sugar</strong> — one cup of sugar to four cups of water. This closely mimics the natural sucrose concentration of the tubular flowers that hummingbirds prefer (15–25% sugar by weight). It&apos;s also the recipe recommended by the Cornell Lab of Ornithology and the Hummingbird Society.
              </p>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 my-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">The Recipe</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-gray-700 mb-2">Ingredients</p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• 1 cup plain white granulated sugar</li>
                      <li>• 4 cups water</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 mb-2">Instructions</p>
                    <ol className="text-gray-600 space-y-1 text-sm list-decimal list-inside">
                      <li>Bring water to a boil</li>
                      <li>Stir in sugar until fully dissolved</li>
                      <li>Cool completely before filling</li>
                      <li>Refrigerate extras up to 2 weeks</li>
                    </ol>
                  </div>
                </div>
              </div>
              <p>
                <strong>What NOT to use:</strong> Red dye #40 has been associated with health problems and is completely unnecessary — hummingbirds are attracted to red feeder parts, not red liquid. Honey ferments rapidly and supports growth of a deadly fungus (Candida). Brown sugar and organic/raw sugars contain molasses, which can harm kidneys. Artificial sweeteners provide no caloric energy and can cause malnutrition.
              </p>
              <p>
                <strong>When to change nectar:</strong> In summer heat (above 80°F), change nectar every 2–3 days regardless of whether it looks cloudy. Fermentation begins before it&apos;s visible. In cooler weather, 4–5 days is acceptable.
              </p>
            </div>
          </section>

          <section id="plants" className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              3. Best Plants to Attract Hummingbirds
            </h2>
            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                Hummingbirds evolved alongside tubular, brightly colored flowers — particularly red, orange, and pink — because these colors are highly visible to their ultraviolet-sensitive vision while being less conspicuous to competing bees. Native plants are almost always the best choice.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
                {[
                  { name: "Cardinal Flower", scientific: "Lobelia cardinalis", score: 99, zone: "3–9", bloom: "July–Sept", note: "The single highest-rated native plant for hummingbird attraction" },
                  { name: "Trumpet Vine", scientific: "Campsis radicans", score: 98, zone: "4–9", bloom: "June–Sept", note: "Vigorous native climber; plant where it can spread" },
                  { name: "Bee Balm", scientific: "Monarda didyma", score: 95, zone: "4–9", bloom: "June–Aug", note: "Doubles as an excellent butterfly plant" },
                  { name: "Red Salvia", scientific: "Salvia coccinea", score: 90, zone: "Annual", bloom: "May–Frost", note: "Planted as annual; blooms continuously all season" },
                  { name: "Penstemon", scientific: "Penstemon spectabilis", score: 88, zone: "5–9", bloom: "May–July", note: "Long-lived perennial; drought tolerant once established" },
                  { name: "Coral Bells", scientific: "Heuchera sanguinea", score: 85, zone: "3–9", bloom: "April–June", note: "Good for spring before other plants bloom" },
                ].map((plant) => (
                  <div key={plant.name} className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{plant.name}</h3>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">Score: {plant.score}</span>
                    </div>
                    <p className="text-xs text-emerald-600 italic mb-2">{plant.scientific}</p>
                    <div className="flex gap-3 text-xs text-gray-500 mb-2">
                      <span>Zones {plant.zone}</span>
                      <span>Bloom: {plant.bloom}</span>
                    </div>
                    <p className="text-sm text-gray-600">{plant.note}</p>
                  </div>
                ))}
              </div>
              <p>
                <strong>Designing for continuous bloom:</strong> The goal is to have at least one hummingbird-attractive plant in bloom from when birds arrive in spring through when they depart in fall. Use our <Link href="/garden-planner" className="text-emerald-700 font-medium hover:text-emerald-900">Garden Planner</Link> to map this out for your USDA zone.
              </p>
            </div>
          </section>

          <AdUnit slot="1122005566" format="auto" />

          <section id="placement" className="mt-16 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              4. Feeder Placement and Garden Layout
            </h2>
            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
              <p><strong>Partial shade over full sun.</strong> Direct afternoon sun accelerates nectar fermentation. A spot with morning sun and afternoon shade extends nectar freshness and encourages longer visits.</p>
              <p><strong>Multiple feeders out of sight of each other.</strong> A dominant bird will station itself near a single feeder and chase away all competitors. By placing two or three feeders where they can&apos;t all be defended simultaneously, you break up this monopoly and routinely double or triple traffic.</p>
              <p><strong>Near flowering plants and at 4–6 feet height.</strong> Hummingbirds use landmarks to navigate their territories. A feeder positioned near trumpet vine, salvia, or bee balm gets discovered faster and revisited more reliably.</p>
              <p><strong>Distance from windows.</strong> Keep feeders either within 3 feet of a window or more than 10 feet away. The 4–8 foot middle distance is the riskiest zone for window strikes.</p>
            </div>
          </section>

          <section id="timing" className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              5. Seasonal Timing by Region
            </h2>
            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>Put feeders out 1–2 weeks before hummingbirds are expected in your region.</p>
              <div className="overflow-x-auto my-6 not-prose">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-emerald-600 text-white">
                      <th className="text-left px-4 py-3 rounded-tl-xl">Region</th>
                      <th className="text-left px-4 py-3">Feeders Out</th>
                      <th className="text-left px-4 py-3">Peak Season</th>
                      <th className="text-left px-4 py-3 rounded-tr-xl">Take Down</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { region: "Southeast (FL, GA, TX Coast)", out: "Mid-February", peak: "March–May", down: "Late October" },
                      { region: "Southwest (AZ, NM, CA)", out: "Early March", peak: "April–September", down: "November" },
                      { region: "Mid-Atlantic & Midwest", out: "Late April", peak: "May–August", down: "October" },
                      { region: "Pacific Northwest", out: "February (Anna's year-round)", peak: "April–September", down: "November" },
                      { region: "Northeast (NY, NE, ME)", out: "Early May", peak: "June–August", down: "September–October" },
                      { region: "Rockies & Mountain West", out: "Mid-April", peak: "June–August", down: "Late September" },
                    ].map((row, i) => (
                      <tr key={row.region} className={i % 2 === 0 ? "bg-white" : "bg-emerald-50"}>
                        <td className="px-4 py-3 font-medium text-gray-900 border-b border-gray-100">{row.region}</td>
                        <td className="px-4 py-3 text-gray-600 border-b border-gray-100">{row.out}</td>
                        <td className="px-4 py-3 text-emerald-700 font-medium border-b border-gray-100">{row.peak}</td>
                        <td className="px-4 py-3 text-gray-600 border-b border-gray-100">{row.down}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="water" className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              6. Water Features Hummingbirds Love
            </h2>
            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>Hummingbirds bathe daily and prefer moving water — mist, drippers, or gentle sprays rather than standing birdbaths. A solar-powered misting attachment over a shallow basin ($15–25) transforms an ordinary birdbath into a hummingbird attraction.</p>
              <p>Keep water features clean. Stagnant water breeds mosquitoes and mold. Empty and refill shallow baths every 2–3 days.</p>
            </div>
          </section>

          <section id="mistakes" className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              7. Common Mistakes That Drive Hummingbirds Away
            </h2>
            <div className="space-y-4">
              {[
                { mistake: "Using red dye in nectar", fix: "Plain white sugar dissolved in water is all hummingbirds need. Red parts on the feeder provide all the visual attraction necessary." },
                { mistake: "Not cleaning feeders often enough", fix: "In summer, clean every 2–3 days. Use a bottle brush, hot water, and occasional dilute bleach rinse." },
                { mistake: "Only putting out one feeder", fix: "One feeder means one dominant bird controls all access. Add a second feeder out of sight of the first to immediately double traffic." },
                { mistake: "Hanging feeders in full sun", fix: "Fermentation and bee attraction both increase dramatically in direct sunlight. Partial shade extends nectar freshness." },
                { mistake: "Taking feeders down too early", fix: "Leave feeders up 2 weeks after the last sighting each fall. Late migrants and juvenile birds need these resources most." },
                { mistake: "Planting only one type of flower", fix: "Layer multiple species with different bloom times for continuous food sources through the season." },
              ].map(({ mistake, fix }) => (
                <div key={mistake} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-xl mt-0.5">✗</span>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">{mistake}</p>
                      <p className="text-gray-600 text-sm leading-relaxed"><span className="text-emerald-600 font-medium">Fix: </span>{fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="species" className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              8. Tips for Specific Hummingbird Species
            </h2>
            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
              <p><strong>Ruby-throated Hummingbird</strong> (Eastern North America): The only regularly breeding hummingbird east of the Mississippi. Highly responsive to red cardinal flowers and trumpet honeysuckle.</p>
              <p><strong>Anna&apos;s Hummingbird</strong> (Pacific Coast, year-round): Keep feeders up all winter — this species doesn&apos;t migrate and relies heavily on supplemental feeding during cold snaps.</p>
              <p><strong>Rufous Hummingbird</strong> (Western Mountains): The most aggressive North American hummingbird. Responds well to multiple feeders spread over a wide area.</p>
              <p><strong>Black-chinned Hummingbird</strong> (Southwest): Highly adaptable, common in desert, mountain, and riparian habitats from Texas to California.</p>
              <p>See full species profiles in our <Link href="/encyclopedia" className="text-emerald-700 font-medium hover:text-emerald-900">Hummingbird Encyclopedia</Link>.</p>
            </div>
          </section>

          <div className="bg-emerald-900 rounded-3xl p-8 text-white text-center my-12">
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Ready to Build Your Hummingbird Garden?</h3>
            <p className="text-emerald-200 mb-6 max-w-2xl mx-auto">Use our free Garden Planner to find the best plants for your USDA zone, visualize bloom timing, and design your perfect layout.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/garden-planner" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all">Open Garden Planner</Link>
              <Link href="/shop#feeders" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all">Shop Top Feeders</Link>
            </div>
          </div>

          <AdUnit slot="9988776655" format="auto" />
        </div>
      </article>

      <section className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { href: "/guides/nectar-recipe", icon: "🍯", title: "Hummingbird Nectar Recipe", desc: "The definitive guide to making safe, effective homemade nectar." },
              { href: "/garden-planner", icon: "🌿", title: "Garden Planner Tool", desc: "Interactive tool to design your hummingbird garden by zone." },
              { href: "/encyclopedia", icon: "📚", title: "Species Encyclopedia", desc: "Detailed profiles for 360+ hummingbird species worldwide." },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="bg-white rounded-2xl p-5 border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all group">
                <div className="text-3xl mb-3">{guide.icon}</div>
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-1">{guide.title}</h3>
                <p className="text-sm text-gray-600">{guide.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
