import type { Metadata } from "next";
import Link from "next/link";
import { species } from "@/lib/species-data";

export const metadata: Metadata = {
  title: "Hummingbird Species – All North American Profiles",
  description:
    "Browse all hummingbird species found in North America. Detailed profiles including identification tips, range, habitat, migration, and garden advice for each species.",
  keywords: [
    "hummingbird species list",
    "North American hummingbirds",
    "hummingbird identification",
    "ruby-throated hummingbird",
    "anna's hummingbird",
    "rufous hummingbird",
    "calliope hummingbird",
    "hummingbird profiles",
    "hummingbird facts",
    "backyard hummingbirds",
  ],
  alternates: { canonical: "https://hummingbirdguide.com/species" },
  openGraph: {
    title: "Hummingbird Species – All North American Profiles",
    description:
      "Browse in-depth profiles for every North American hummingbird species, with identification tips, range maps, and garden advice.",
    url: "https://hummingbirdguide.com/species",
  },
};

function ConservationBadge({
  code,
  label,
}: {
  code: string;
  label: string;
}) {
  return (
    <span
      className={`text-xs font-bold px-2 py-0.5 rounded-full border status-${code.toLowerCase()}`}
      title={label}
    >
      {code}
    </span>
  );
}

export default function SpeciesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800/60 backdrop-blur-sm border border-emerald-600/30 text-emerald-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {species.length} Species Profiled
          </div>
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Hummingbird Species
          </h1>
          <p className="text-xl md:text-2xl text-emerald-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore every North American hummingbird species — from the iconic
            Ruby-throated to the desert-dwelling Costa&apos;s. Click any card
            for full identification guides, range maps, and garden tips.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/encyclopedia"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-colors"
            >
              Open Full Encyclopedia
            </Link>
            <Link
              href="/atlas#states"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-colors"
            >
              Species by State
            </Link>
          </div>
        </div>
      </section>

      {/* Intro text */}
      <section className="bg-white py-10 border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-lg leading-relaxed">
            North America is home to more than a dozen regularly breeding
            hummingbird species, with the greatest diversity found in the
            American Southwest. Use the profiles below to identify species by
            plumage, range, and behavior — then visit our{" "}
            <Link
              href="/garden-planner"
              className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
            >
              Garden Planner
            </Link>{" "}
            to attract them to your yard.
          </p>
        </div>
      </section>

      {/* Species Grid */}
      <section className="py-14 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-emerald-800 font-medium">
              {species.length} species
            </p>
            <Link
              href="/encyclopedia"
              className="text-sm text-emerald-700 hover:text-emerald-900 font-medium underline underline-offset-2"
            >
              Search &amp; filter all species →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {species.map((sp) => (
              <Link
                key={sp.slug}
                href={`/species/${sp.slug}`}
                className="species-card group"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-emerald-100">
                  <img
                    src={sp.imageUrl}
                    alt={sp.commonName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = "none";
                      if (t.parentElement) {
                        t.parentElement.style.background = `linear-gradient(135deg, ${sp.colors.primary}, ${sp.colors.secondary})`;
                      }
                    }}
                  />
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <ConservationBadge
                      code={sp.conservationCode}
                      label={sp.conservationStatus}
                    />
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Color swatches */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white/80 shadow"
                      style={{ backgroundColor: sp.colors.primary }}
                      title="Primary color"
                    />
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white/80 shadow"
                      style={{ backgroundColor: sp.colors.secondary }}
                      title="Secondary color"
                    />
                    {sp.colors.throat && (
                      <div
                        className="w-5 h-5 rounded-full border-2 border-white/80 shadow"
                        style={{ backgroundColor: sp.colors.throat }}
                        title="Throat color"
                      />
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {sp.commonName}
                  </h2>
                  <p className="text-sm text-emerald-600 italic mb-3">
                    {sp.scientificName}
                  </p>

                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {sp.description}
                  </p>

                  {/* Quick stats */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-4">
                    <span>Length: {sp.length}</span>
                    <span>Weight: {sp.weight}</span>
                  </div>

                  {/* Habitat tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {sp.habitat.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100"
                      >
                        {h}
                      </span>
                    ))}
                    {sp.habitat.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{sp.habitat.length - 3} more
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-semibold text-emerald-600 group-hover:underline">
                    View full profile →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO / context section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="section-heading mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Identifying North American Hummingbirds
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              North American <strong>hummingbird species</strong> range from the
              tiny Calliope Hummingbird — the smallest breeding bird on the
              continent at just 2.3–3.4 g — to the relatively large
              Blue-throated Mountain-gem at up to 10 g. All belong to the family
              Trochilidae and share remarkable flight adaptations: rotating
              shoulder joints that allow true hovering, hearts that beat up to
              1,260 times per minute, and metabolic rates that require feeding
              every 10–15 minutes.
            </p>
            <p>
              Key <strong>hummingbird identification</strong> features include
              gorget (throat) color, crown color, bill length and curvature,
              tail shape, and the characteristic wing trill. Males are typically
              more brilliantly colored, while females require attention to subtle
              marks like buffy flanks, tail spots, and bill proportions.
            </p>
            <p>
              Our species profiles provide everything you need for confident
              identification: high-resolution photos, color swatches, range
              information, seasonal occurrence data, and comparison tips for
              similar species. Paired with the{" "}
              <Link
                href="/identifier"
                className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
              >
                Hummingbird Identifier
              </Link>{" "}
              tool, these profiles make it easy to put a name to any hummingbird
              visiting your garden.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/identifier"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Identify a Hummingbird
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href="/migration"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-emerald-600 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
            >
              Migration Tracker
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
