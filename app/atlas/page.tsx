"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { statesData } from "@/lib/states-data";

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */

const REGIONS = Array.from(new Set(statesData.map((s) => s.region))).sort();

const HABITATS = [
  {
    name: "Deciduous Forest",
    icon: "🌳",
    description:
      "Eastern hardwood forests are summer home to the Ruby-throated Hummingbird. Look for them along forest edges, in clearings, and at garden feeders near wooded areas.",
    species: ["Ruby-throated Hummingbird"],
    months: "April – October",
    color: "emerald",
  },
  {
    name: "Mountain Meadows",
    icon: "⛰️",
    description:
      "High-altitude meadows in the Rockies host Broad-tailed and Calliope Hummingbirds. Wildflower carpets of paintbrush and penstemon provide abundant nectar from May through August.",
    species: ["Broad-tailed Hummingbird", "Calliope Hummingbird", "Rufous Hummingbird"],
    months: "May – September",
    color: "sky",
  },
  {
    name: "Desert Scrub",
    icon: "🌵",
    description:
      "Sonoran and Mojave deserts support Costa's and Black-chinned Hummingbirds among ocotillo and chuparosa. Arizona's canyons host the greatest US hummingbird diversity.",
    species: ["Costa's Hummingbird", "Black-chinned Hummingbird", "Anna's Hummingbird"],
    months: "February – October",
    color: "amber",
  },
  {
    name: "Coastal Scrub",
    icon: "🌊",
    description:
      "California's coastal chaparral is dominated year-round by Anna's Hummingbird, with Allen's Hummingbird arriving as early as January. Fuchsia, salvia, and currant bloom prolifically.",
    species: ["Anna's Hummingbird", "Allen's Hummingbird"],
    months: "Year-round",
    color: "teal",
  },
  {
    name: "Tropical Forest",
    icon: "🌿",
    description:
      "The tropics of Mexico and Central America are the epicenter of hummingbird diversity, with over 150 species. North American migrants like the Rufous and Ruby-throated overwinter here.",
    species: ["Rufous Hummingbird", "Ruby-throated Hummingbird"],
    months: "October – March (wintering)",
    color: "lime",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function HabitatCard({
  habitat,
}: {
  habitat: typeof HABITATS[number];
}) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
    sky: "bg-sky-50 border-sky-200 text-sky-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    teal: "bg-teal-50 border-teal-200 text-teal-800",
    lime: "bg-lime-50 border-lime-200 text-lime-800",
  };
  const badgeMap: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-700",
    sky: "bg-sky-100 text-sky-700",
    amber: "bg-amber-100 text-amber-700",
    teal: "bg-teal-100 text-teal-700",
    lime: "bg-lime-100 text-lime-700",
  };

  return (
    <div
      className={`rounded-2xl border p-6 ${colorMap[habitat.color]} transition-shadow hover:shadow-md`}
    >
      <div className="text-4xl mb-3">{habitat.icon}</div>
      <h3 className="text-xl font-bold mb-2">{habitat.name}</h3>
      <p className="text-sm leading-relaxed mb-4 opacity-90">
        {habitat.description}
      </p>
      <p className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
        Peak Season
      </p>
      <p className="text-sm font-bold mb-4">{habitat.months}</p>
      <p className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
        Common Species
      </p>
      <div className="flex flex-wrap gap-1.5">
        {habitat.species.map((sp) => (
          <span
            key={sp}
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeMap[habitat.color]}`}
          >
            {sp}
          </span>
        ))}
      </div>
    </div>
  );
}

function StateCard({ state }: { state: typeof statesData[number] }) {
  return (
    <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-900">{state.name}</h3>
          <span className="text-xs text-gray-400">{state.region}</span>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-emerald-600 text-white font-extrabold text-lg rounded-xl flex-shrink-0">
          {state.abbreviation}
        </div>
      </div>

      {/* Species count */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-1.5">
          <span className="text-xl font-extrabold text-emerald-700">
            {state.speciesCount}
          </span>
          <span className="text-xs text-emerald-600 font-medium">
            {state.speciesCount === 1 ? "species" : "species"}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Peak: <span className="font-semibold text-gray-700">{state.peakViewingMonths}</span>
        </div>
      </div>

      {/* Common species */}
      {state.commonSpecies.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Common Species
          </p>
          <div className="flex flex-wrap gap-1">
            {state.commonSpecies.slice(0, 3).map((sp) => (
              <span
                key={sp}
                className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100"
              >
                {sp}
              </span>
            ))}
            {state.commonSpecies.length > 3 && (
              <span className="text-xs text-gray-400">
                +{state.commonSpecies.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Hotspots */}
      {state.hotspots.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Top Hotspots
          </p>
          <ul className="space-y-0.5">
            {state.hotspots.slice(0, 2).map((spot) => (
              <li key={spot} className="text-xs text-gray-600 flex items-start gap-1.5">
                <span className="text-emerald-400 mt-0.5 flex-shrink-0">📍</span>
                {spot}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Garden tip */}
      <div className="text-xs text-gray-500 leading-relaxed bg-emerald-50 rounded-xl p-3 italic">
        {state.gardenTips}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                           */
/* ------------------------------------------------------------------ */

export default function AtlasPage() {
  const [regionFilter, setRegionFilter] = useState("");
  const [minSpecies, setMinSpecies] = useState(0);
  const [stateSearch, setStateSearch] = useState("");

  const filteredStates = useMemo(() => {
    return statesData.filter((s) => {
      const matchesRegion = !regionFilter || s.region === regionFilter;
      const matchesMin = s.speciesCount >= minSpecies;
      const matchesSearch =
        !stateSearch ||
        s.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
        s.commonSpecies.some((sp) =>
          sp.toLowerCase().includes(stateSearch.toLowerCase())
        );
      return matchesRegion && matchesMin && matchesSearch;
    });
  }, [regionFilter, minSpecies, stateSearch]);

  const totalSpeciesRecorded = Math.max(...statesData.map((s) => s.speciesCount));

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-700/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800/60 backdrop-blur-sm border border-emerald-600/30 text-emerald-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {statesData.length} US States &bull; {totalSpeciesRecorded} Max Species in One State
          </div>
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Hummingbird Atlas
          </h1>
          <p className="text-xl md:text-2xl text-emerald-200 max-w-3xl mx-auto leading-relaxed mb-10">
            Explore hummingbird distribution by state, habitat, and world
            region. Discover where species occur, peak viewing windows, top
            birding hotspots, and what to plant in your local garden.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#states"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-colors"
            >
              Browse by State
            </a>
            <a
              href="#habitats"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-colors"
            >
              Explore Habitats
            </a>
            <Link
              href="/migration"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-colors"
            >
              Migration Map
            </Link>
          </div>
        </div>
      </section>

      {/* World Map section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              className="section-heading mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Global Hummingbird Distribution
            </h2>
            <p className="section-subheading mx-auto text-center">
              Hummingbirds are found exclusively in the Americas — from southern
              Alaska to Tierra del Fuego. The Neotropics hold over 90% of all
              360+ species.
            </p>
          </div>

          {/* Map placeholder */}
          <div className="map-container bg-emerald-100 flex flex-col items-center justify-center text-center gap-4 mb-6">
            <div className="w-20 h-20 bg-emerald-200 rounded-full flex items-center justify-center text-4xl">
              🌎
            </div>
            <div>
              <p className="text-emerald-700 font-semibold text-lg">
                Interactive Map — Enable JavaScript
              </p>
              <p className="text-emerald-600 text-sm mt-1 max-w-md">
                An interactive Leaflet map showing hummingbird range overlays
                will load here. Enable JavaScript in your browser to view it.
              </p>
            </div>
          </div>

          {/* Quick geographic stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Species Worldwide", value: "360+" },
              { label: "North American Species", value: "~17" },
              { label: "US State Records (Peak)", value: `${totalSpeciesRecorded}` },
              { label: "Continents with Hummingbirds", value: "1 (Americas)" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center"
              >
                <p className="text-3xl font-extrabold text-emerald-700 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-emerald-600 font-medium leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* States section */}
      <section id="states" className="py-16 bg-emerald-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h2
                className="section-heading"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Hummingbirds by US State
              </h2>
              <p className="section-subheading">
                Viewing windows, hotspots, garden advice, and species lists for
                each state.
              </p>
            </div>
          </div>

          {/* Filter controls */}
          <div className="bg-white border border-emerald-100 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-wrap shadow-sm">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400"
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
                placeholder="Search state or species…"
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50"
              />
            </div>

            {/* Region filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                Region:
              </label>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="text-sm border border-emerald-200 rounded-xl px-3 py-2.5 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="">All Regions</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Min species filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                Min Species:
              </label>
              <select
                value={minSpecies}
                onChange={(e) => setMinSpecies(Number(e.target.value))}
                className="text-sm border border-emerald-200 rounded-xl px-3 py-2.5 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value={0}>Any</option>
                <option value={3}>3+</option>
                <option value={5}>5+</option>
                <option value={10}>10+</option>
                <option value={15}>15+</option>
              </select>
            </div>

            {/* Results count */}
            <p className="text-sm text-emerald-700 font-medium ml-auto whitespace-nowrap">
              {filteredStates.length} of {statesData.length} states
            </p>
          </div>

          {/* State cards grid */}
          {filteredStates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredStates.map((state) => (
                <StateCard key={state.abbreviation} state={state} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                No states match your filters
              </p>
              <p className="text-gray-500 mb-6">
                Try a different region or minimum species count.
              </p>
              <button
                onClick={() => {
                  setRegionFilter("");
                  setMinSpecies(0);
                  setStateSearch("");
                }}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Top birding destinations callout */}
      <section className="py-14 bg-emerald-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Top Hummingbird Destinations in the USA
            </h2>
            <p className="text-emerald-300 text-lg">
              These locations are renowned for exceptional hummingbird diversity
              and accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Madera Canyon, AZ",
                detail:
                  "Up to 14 species recorded. A premier birding destination in the Santa Rita Mountains with year-round activity.",
                icon: "🦅",
              },
              {
                name: "Big Bend NP, TX",
                detail:
                  "Straddles the Chihuahuan Desert and hosts rare Mexican species at the northern edge of their range.",
                icon: "🌵",
              },
              {
                name: "Ramsey Canyon, AZ",
                detail:
                  "Known as the 'hummingbird capital of the world' — up to 15 species at this Nature Conservancy preserve.",
                icon: "🏔️",
              },
            ].map((dest) => (
              <div
                key={dest.name}
                className="bg-emerald-800/60 border border-emerald-700/40 rounded-2xl p-6 text-center hover:bg-emerald-800 transition-colors"
              >
                <div className="text-4xl mb-3">{dest.icon}</div>
                <h3 className="font-bold text-lg mb-2">{dest.name}</h3>
                <p className="text-emerald-300 text-sm leading-relaxed">
                  {dest.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Habitats section */}
      <section id="habitats" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="section-heading mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Hummingbird Habitats
            </h2>
            <p className="section-subheading mx-auto text-center">
              From coastal chaparral to high mountain meadows, each habitat
              type supports distinct assemblages of hummingbird species.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HABITATS.map((habitat) => (
              <HabitatCard key={habitat.name} habitat={habitat} />
            ))}
          </div>
        </div>
      </section>

      {/* Migration callout */}
      <section className="py-14 bg-emerald-50 border-t border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="section-heading mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Track Hummingbird Migration in Real Time
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Our interactive migration tracker shows first arrival dates, peak
            passage, and last sighting data for each species across North
            America — updated seasonally.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/migration"
              className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
            >
              Open Migration Tracker
            </Link>
            <Link
              href="/encyclopedia"
              className="px-7 py-3.5 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-semibold rounded-xl transition-all"
            >
              Browse Encyclopedia
            </Link>
          </div>
        </div>
      </section>

      {/* SEO text section */}
      <section className="py-16 bg-white border-t border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="section-heading mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About the Hummingbird Atlas
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-5">
            <p>
              The <strong>Hummingbird Atlas</strong> is a geographic reference
              covering the distribution of hummingbird species across every US
              state, organized by region, habitat type, and seasonal
              occurrence. Whether you&apos;re planning a birding trip to
              Arizona&apos;s famous hummingbird canyons or setting up a feeder
              in your New England backyard, the atlas provides location-specific
              data to guide your experience.
            </p>
            <p>
              <strong>Hummingbird species by state</strong> data reflects both
              breeding and migratory records. States like Texas (18 species) and
              Arizona (15+ species) rank among the highest in North America due
              to their geographic position at the crossroads of eastern and
              western hummingbird populations, combined with proximity to
              Mexico&apos;s species-rich Sierra Madre mountains.
            </p>
            <p>
              <strong>Hummingbird habitats</strong> range from coastal scrub —
              where Anna&apos;s Hummingbirds remain year-round — to high alpine
              meadows that host Calliope and Broad-tailed Hummingbirds during
              the brief summer window. Understanding habitat associations is the
              first step in knowing which species to expect in any given
              location and season.
            </p>
            <p>
              Our state-by-state garden tips are tailored to local climates and
              native plant communities, ensuring you plant species that thrive in
              your USDA hardiness zone while maximizing nectar production for
              local hummingbirds. Combine the atlas with our{" "}
              <Link
                href="/garden-planner"
                className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
              >
                Garden Planner
              </Link>{" "}
              for personalized planting recommendations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
