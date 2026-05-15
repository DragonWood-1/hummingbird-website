"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { species } from "@/lib/species-data";

const CONSERVATION_OPTIONS = [
  { code: "LC", label: "Least Concern" },
  { code: "NT", label: "Near Threatened" },
  { code: "VU", label: "Vulnerable" },
  { code: "EN", label: "Endangered" },
  { code: "CR", label: "Critically Endangered" },
];

const COLOR_OPTIONS = ["green", "red", "ruby", "rufous", "purple", "blue"];

const ALL_REGIONS = Array.from(
  new Set(species.flatMap((s) => s.range))
).sort();

const FUN_FACTS = [
  "A hummingbird's heart beats up to 1,260 times per minute during flight.",
  "Hummingbirds are the only birds that can fly backwards.",
  "A hummingbird must eat roughly half its body weight in sugar every day.",
  "The Calliope Hummingbird is the smallest breeding bird in all of North America.",
  "Rufous Hummingbirds migrate up to 3,900 miles — the longest migration relative to body size of any bird.",
  "Hummingbirds can enter a nightly state called torpor, dropping their heart rate from 1,200 to just 50 beats per minute.",
  "The iridescent colors of hummingbird feathers are created by light refraction, not pigment.",
  "Anna's Hummingbird is one of the few hummingbirds known to sing a complex, multi-note song.",
];

function ConservationBadge({ code, label }: { code: string; label: string }) {
  return (
    <span
      className={`text-xs font-bold px-2 py-0.5 rounded-full border status-${code.toLowerCase()}`}
      title={label}
    >
      {code}
    </span>
  );
}

export default function EncyclopediaPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [colorFilter, setColorFilter] = useState<string[]>([]);
  const [regionFilter, setRegionFilter] = useState("");
  const [factIndex] = useState(() => Math.floor(Math.random() * FUN_FACTS.length));

  const filtered = useMemo(() => {
    return species.filter((sp) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        sp.commonName.toLowerCase().includes(q) ||
        sp.scientificName.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(sp.conservationCode);

      const matchesColor =
        colorFilter.length === 0 ||
        colorFilter.some((c) =>
          sp.colorTags.some((tag) => tag.toLowerCase().includes(c.toLowerCase()))
        );

      const matchesRegion =
        !regionFilter ||
        sp.range.some((r) =>
          r.toLowerCase().includes(regionFilter.toLowerCase())
        );

      return matchesSearch && matchesStatus && matchesColor && matchesRegion;
    });
  }, [search, statusFilter, colorFilter, regionFilter]);

  function toggleStatus(code: string) {
    setStatusFilter((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }

  function toggleColor(color: string) {
    setColorFilter((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter([]);
    setColorFilter([]);
    setRegionFilter("");
  }

  const hasActiveFilters =
    search || statusFilter.length > 0 || colorFilter.length > 0 || regionFilter;

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
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {species.length} North American Species Profiled
          </div>
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Hummingbird Encyclopedia
          </h1>
          <p className="text-xl md:text-2xl text-emerald-200 max-w-3xl mx-auto leading-relaxed">
            Explore detailed profiles for 360+ hummingbird species worldwide —
            from the iconic Ruby-throated to the rare Bee Hummingbird. Discover
            facts, habitats, migration routes, and garden tips.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-30 bg-white border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                placeholder="Search species by name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-emerald-50"
              />
            </div>

            {/* Conservation status chips */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-1">
                Status:
              </span>
              {CONSERVATION_OPTIONS.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => toggleStatus(code)}
                  title={label}
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border transition-all ${
                    statusFilter.includes(code)
                      ? `status-${code.toLowerCase()} ring-2 ring-offset-1 ring-emerald-400`
                      : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            {/* Color chips */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-1">
                Color:
              </span>
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  onClick={() => toggleColor(color)}
                  className={`text-xs px-2.5 py-1 rounded-full border capitalize transition-all ${
                    colorFilter.includes(color)
                      ? "bg-emerald-600 text-white border-emerald-600 ring-2 ring-offset-1 ring-emerald-400"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-emerald-50"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>

            {/* Region select */}
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="text-sm border border-emerald-200 rounded-xl px-3 py-2.5 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 min-w-[160px]"
            >
              <option value="">All Regions</option>
              {ALL_REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {/* Clear */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-emerald-600 hover:text-emerald-800 font-medium underline underline-offset-2 whitespace-nowrap"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Species Grid */}
      <section className="py-12 bg-emerald-50 min-h-[40vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-emerald-800 font-medium">
              {filtered.length === species.length
                ? `${species.length} species`
                : `${filtered.length} of ${species.length} species`}
            </p>
            {hasActiveFilters && filtered.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No species match your filters.
              </p>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((sp) => (
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
                    {/* Color swatches at bottom */}
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

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-4">
                      <span>📏 {sp.length}</span>
                      <span>⚖️ {sp.weight}</span>
                    </div>

                    {/* Color tags */}
                    <div className="flex flex-wrap gap-1">
                      {sp.colorTags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 capitalize"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                No species found
              </p>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Fun Fact Section */}
      <section className="py-14 bg-emerald-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-emerald-300 text-sm font-semibold uppercase tracking-widest mb-3">
            Did You Know?
          </p>
          <blockquote className="text-2xl md:text-3xl font-semibold leading-relaxed">
            &ldquo;{FUN_FACTS[factIndex]}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* SEO About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="section-heading mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About Hummingbirds
          </h2>

          <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-5">
            <p>
              <strong>Hummingbird species</strong> belong to the family
              Trochilidae, comprising over 360 species found exclusively in the
              Americas — from southern Alaska to Tierra del Fuego. North America
              hosts about 17 regularly breeding species, with the highest
              diversity in the southwestern United States and Mexico.
            </p>
            <p>
              <strong>Hummingbird identification</strong> depends on several
              field marks: throat (gorget) color, body size, tail shape, bill
              length, and geographic range. Males are typically more colorful,
              with iridescent gorgets that flash different hues depending on
              lighting angle. Females are often green above and whitish below,
              making them considerably harder to distinguish.
            </p>
            <p>
              <strong>Hummingbird nectar</strong> is the primary fuel source for
              these remarkable birds, supplemented by small insects and spiders
              for protein. The ideal nectar solution for feeders is a 4:1
              water-to-white-sugar ratio — never use red dye, honey, or
              artificial sweeteners. For{" "}
              <strong>backyard birding</strong> enthusiasts, planting
              nectar-rich flowers alongside a feeder creates the most attractive
              habitat.
            </p>
            <p>
              <strong>Hummingbird migration</strong> is one of nature&apos;s
              most impressive feats. The Ruby-throated Hummingbird crosses the
              Gulf of Mexico non-stop — up to 500 miles — on a fat reserve
              weighing less than a paper clip. The Rufous Hummingbird makes the
              longest migration relative to body size of any bird on Earth,
              traveling up to 3,900 miles between Mexican wintering grounds and
              Alaskan breeding sites.
            </p>
            <p>
              <strong>Hummingbird nesting</strong> is a feat of engineering
              miniaturization. Most species construct a tiny cup of plant fibers
              and spider silk — stretchy enough to expand as chicks grow — often
              camouflaged with lichens on the outside. Females alone build the
              nest, incubate eggs (12–19 days), and raise chicks to fledging
              (18–28 days).
            </p>
            <p>
              Use this encyclopedia for{" "}
              <strong>hummingbird species identification</strong>, garden
              planning, migration timing, and conservation research. Each profile
              includes range maps, food plant lists, and tips for attracting that
              species to your backyard.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/garden-planner"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Garden Planner
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
            <Link
              href="/atlas"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-emerald-600 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
            >
              Hummingbird Atlas
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
