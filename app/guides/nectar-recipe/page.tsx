import type { Metadata } from "next";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Hummingbird Nectar Recipe – The Correct 4:1 Ratio (Vet-Approved)",
  description: "The only hummingbird nectar recipe you need: 4 parts water, 1 part plain white sugar. Learn what NOT to use, when to change nectar, and how to keep feeders clean and safe.",
  keywords: [
    "hummingbird nectar recipe","hummingbird food recipe","homemade hummingbird nectar",
    "hummingbird sugar water ratio","best hummingbird nectar","4 to 1 nectar ratio",
    "how to make hummingbird food","hummingbird nectar without red dye",
  ],
  alternates: { canonical: "https://hummingbirdwatcher.com/guides/nectar-recipe" },
};

export default function NectarRecipePage() {
  return (
    <>
      <section className="hero-gradient py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -left-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-emerald-400 text-sm mb-6">
            <Link href="/" className="hover:text-emerald-300">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-emerald-300">Guides</Link>
            <span>/</span>
            <span className="text-emerald-200">Nectar Recipe</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-emerald-800/60 backdrop-blur-sm border border-emerald-600/30 text-emerald-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
            🍯 Vet-Approved Recipe · 7 min read
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Correct Hummingbird Nectar Recipe
          </h1>
          <p className="text-xl text-emerald-200 leading-relaxed max-w-3xl">
            One recipe. No additives. Endorsed by the Cornell Lab of Ornithology, the Hummingbird Society, and veterinary ornithologists worldwide.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-emerald-900 rounded-3xl p-8 md:p-10 text-white mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🍯</span>
              <div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>The Only Hummingbird Nectar Recipe</h2>
                <p className="text-emerald-300 text-sm">4 parts water · 1 part sugar · nothing else</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-800/50 rounded-2xl p-5">
                <h3 className="font-bold text-emerald-300 uppercase text-xs tracking-wider mb-3">Ingredients</h3>
                <ul className="space-y-2 text-white">
                  <li className="flex items-start gap-2"><span className="text-emerald-400">•</span> 1 cup plain white granulated sugar</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400">•</span> 4 cups water (tap or filtered)</li>
                </ul>
              </div>
              <div className="bg-emerald-800/50 rounded-2xl p-5">
                <h3 className="font-bold text-emerald-300 uppercase text-xs tracking-wider mb-3">Instructions</h3>
                <ol className="space-y-2 text-white text-sm">
                  <li><span className="font-bold text-emerald-400">1.</span> Boil the water</li>
                  <li><span className="font-bold text-emerald-400">2.</span> Stir in sugar until dissolved</li>
                  <li><span className="font-bold text-emerald-400">3.</span> Cool completely</li>
                  <li><span className="font-bold text-emerald-400">4.</span> Fill feeder; refrigerate rest</li>
                </ol>
              </div>
              <div className="bg-emerald-800/50 rounded-2xl p-5">
                <h3 className="font-bold text-emerald-300 uppercase text-xs tracking-wider mb-3">Scaling</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li><span className="text-emerald-400 font-bold">8 oz:</span> ½ cup water + 2 tbsp sugar</li>
                  <li><span className="text-emerald-400 font-bold">16 oz:</span> 1 cup water + ¼ cup sugar</li>
                  <li><span className="text-emerald-400 font-bold">32 oz:</span> 2 cups water + ½ cup sugar</li>
                  <li><span className="text-emerald-400 font-bold">1 gallon:</span> 3 cups water + ¾ cup sugar</li>
                </ul>
              </div>
            </div>
            <div className="bg-red-900/40 rounded-2xl p-5 border border-red-800/50">
              <h3 className="font-bold text-red-300 mb-3">⚠️ Never Use These Ingredients</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-red-200">
                {["Red food dye","Honey","Brown sugar","Organic/raw sugar","Artificial sweeteners","Agave syrup","Corn syrup","Maple syrup","Powerade / sports drinks"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5"><span className="text-red-400">✗</span> {item}</div>
                ))}
              </div>
            </div>
          </div>

          <AdUnit slot="3344556677" format="auto" />

          <div className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Why the 4:1 Ratio Is Correct</h2>
            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>The 4:1 water-to-sugar ratio (approximately 20% sugar by weight) closely mirrors the natural sucrose concentration of the tubular flowers that hummingbirds prefer — typically 15–25%. This isn&apos;t arbitrary: hummingbirds have evolved to process sucrose-rich nectar at this concentration.</p>
              <p><strong>Why not stronger?</strong> A 3:1 or 2:1 solution ferments faster and stresses the kidneys. There is documented evidence of kidney damage in hummingbirds fed stronger-than-4:1 solutions over extended periods.</p>
              <p><strong>Why not weaker?</strong> A 5:1 or 6:1 solution is less attractive and provides less energy per visit. Hummingbirds need to consume roughly half their body weight in sugar daily — dilute nectar requires significantly more visits to achieve this.</p>
              <p><strong>Why plain white granulated sugar?</strong> Sucrose (table sugar) is the exact same molecule that makes up 95%+ of hummingbird flower nectar. Other sugars create problems:</p>
              <ul className="space-y-2">
                <li><strong>Honey:</strong> Contains naturally occurring Aspergillus mold spores that grow rapidly in warm feeders, causing a fatal tongue infection in hummingbirds.</li>
                <li><strong>Brown sugar / raw sugar:</strong> Contains molasses, which has high iron content. Hummingbirds are highly sensitive to iron — elevated levels cause iron storage disease affecting their liver.</li>
                <li><strong>Artificial sweeteners:</strong> Zero-calorie sweeteners provide no energy. A hummingbird drinking sweetener-based nectar would starve while appearing to feed.</li>
              </ul>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>When to Change Nectar and How to Clean Feeders</h2>
            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>Nectar change frequency is the most overlooked factor in hummingbird health. Fermented nectar causes digestive upset. Mold causes candidiasis and aspergillosis — fungal infections that can be fatal.</p>
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 my-6 not-prose">
                <h3 className="font-bold text-amber-900 mb-4">Change Schedule by Temperature</h3>
                <div className="space-y-3">
                  {[
                    { temp: "Below 70°F (21°C)", interval: "Every 5–7 days" },
                    { temp: "70–80°F (21–27°C)", interval: "Every 3–4 days" },
                    { temp: "80–90°F (27–32°C)", interval: "Every 2 days" },
                    { temp: "Above 90°F (32°C)", interval: "Daily" },
                  ].map(({ temp, interval }) => (
                    <div key={temp} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-amber-100">
                      <span className="font-medium text-gray-900 text-sm">{temp}</span>
                      <span className="font-bold text-amber-800 text-sm">{interval}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p><strong>Cleaning routine:</strong> Every time you change nectar, rinse with hot water and scrub with a bottle brush. Once per week, clean with dilute bleach: 1 tablespoon per 1 quart of water. Soak 1–2 minutes, rinse four times. Never use soap.</p>
              <p><strong>Storage:</strong> Prepared nectar keeps in the refrigerator for up to 2 weeks.</p>
            </div>
          </div>

          <AdUnit slot="4455667788" format="auto" />

          <div className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>The Truth About Red Dye in Hummingbird Nectar</h2>
            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>Red dye #40 is the most common additive in commercial hummingbird nectars and the most unnecessary. Hummingbirds are attracted to red feeder parts — the base, the ports, the flowers attached to the feeder — not red liquid.</p>
              <p>Red dye #40 (Allura Red AC) is a petroleum-derived synthetic dye linked to cellular damage in rodent studies. The Hummingbird Society, Cornell Lab of Ornithology, and the majority of veterinary ornithologists advise against its use. Since there is no benefit and potential harm, don&apos;t use it.</p>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Nectar FAQ</h2>
            <div className="space-y-4">
              {[
                { q: "Does boiling the water matter?", a: "Boiling helps dissolve the sugar and eliminates chlorine from tap water. However, what matters most is cleaning frequency. If you use filtered water, boiling is optional." },
                { q: "Why is my nectar cloudy?", a: "Cloudy nectar indicates fermentation or bacterial/fungal growth. Discard it immediately, clean the feeder thoroughly with dilute bleach, rinse four times, and refill with fresh nectar." },
                { q: "Can hummingbirds die from bad nectar?", a: "Yes. Mold in feeders causes fungal infections (Aspergillosis, Candidiasis) that can be fatal. Consistent cleaning is both a bird-health measure and the key to keeping birds coming back." },
                { q: "Should I put nectar in the fridge before filling the feeder?", a: "Yes. Always let nectar cool completely before filling feeders. Warm nectar accelerates fermentation inside the feeder." },
                { q: "Is the nectar recipe different for different species?", a: "No. The 4:1 recipe is appropriate for all hummingbird species in North America." },
                { q: "Can I use distilled water?", a: "Yes. Distilled water works fine and requires no boiling. Cost and convenience favor tap water for most people." },
              ].map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-200 shadow-sm group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900 list-none">
                    {q}
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{a}</div>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-14 bg-emerald-900 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Ready to Set Up Your Feeder?</h3>
            <p className="text-emerald-200 mb-6 max-w-xl mx-auto">Browse our editor-curated feeder recommendations, all chosen for easy cleaning and maximum bee resistance.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop#feeders" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all">Shop Top Feeders</Link>
              <Link href="/guides/attract-hummingbirds" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all">Full Attraction Guide</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { href: "/guides/attract-hummingbirds", icon: "🐦", title: "How to Attract Hummingbirds", desc: "Complete guide to feeders, plants, placement, and seasonal tips." },
              { href: "/shop#feeders", icon: "🌸", title: "Best Feeders", desc: "Editor-curated feeder picks chosen for cleanliness and durability." },
              { href: "/garden-planner", icon: "🌿", title: "Garden Planner", desc: "Design a hummingbird garden with plants matched to your USDA zone." },
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
