"use client";

import { useState, useMemo } from "react";
import { species, Species } from "@/lib/species-data";

// ── Filter option types ────────────────────────────────────────────────────
type PrimaryColor = "iridescent green" | "rufous/orange" | "ruby red" | "purple/violet" | "blue" | "black" | "";
type ThroatColor = "ruby red" | "purple/violet" | "magenta/pink" | "orange" | "black" | "blue" | "";
type SizeClass = "tiny" | "small" | "medium" | "large" | "";
type Region =
  | "Eastern USA"
  | "Western USA"
  | "Southwest"
  | "Pacific Coast"
  | "Alaska"
  | "Mexico/Central America"
  | "";

// ── Filter option data ─────────────────────────────────────────────────────
const PRIMARY_COLOR_OPTIONS: { value: PrimaryColor; label: string; hex: string }[] = [
  { value: "iridescent green", label: "Iridescent Green", hex: "#2d7d46" },
  { value: "rufous/orange", label: "Rufous / Orange", hex: "#c17f3b" },
  { value: "ruby red", label: "Ruby Red", hex: "#c1121f" },
  { value: "purple/violet", label: "Purple / Violet", hex: "#7b2d8b" },
  { value: "blue", label: "Blue", hex: "#2f6690" },
  { value: "black", label: "Black / Dark", hex: "#2c2c54" },
];

const THROAT_COLOR_OPTIONS: { value: ThroatColor; label: string; hex: string }[] = [
  { value: "ruby red", label: "Ruby Red", hex: "#c1121f" },
  { value: "purple/violet", label: "Purple / Violet", hex: "#7b2d8b" },
  { value: "magenta/pink", label: "Magenta / Pink", hex: "#c850c0" },
  { value: "orange", label: "Orange / Rufous", hex: "#ff6b35" },
  { value: "black", label: "Black / Dark", hex: "#1a1a2e" },
  { value: "blue", label: "Blue", hex: "#0055a4" },
];

const SIZE_OPTIONS: { value: SizeClass; label: string; desc: string }[] = [
  { value: "tiny", label: "Tiny", desc: "< 3 in" },
  { value: "small", label: "Small", desc: "3–3.5 in" },
  { value: "medium", label: "Medium", desc: "3.5–4 in" },
  { value: "large", label: "Large", desc: "4+ in" },
];

const REGION_OPTIONS: { value: Region; label: string; icon: string }[] = [
  { value: "Eastern USA", label: "Eastern USA", icon: "🌲" },
  { value: "Western USA", label: "Western USA", icon: "🏔️" },
  { value: "Southwest", label: "Southwest", icon: "🌵" },
  { value: "Pacific Coast", label: "Pacific Coast", icon: "🌊" },
  { value: "Alaska", label: "Alaska", icon: "❄️" },
  { value: "Mexico/Central America", label: "Mexico / C. America", icon: "🌴" },
];

// ── Matching helpers ───────────────────────────────────────────────────────
function speciesMatchesRegion(sp: Species, region: Region): boolean {
  if (!region) return true;
  const statesLower = sp.states.map((s) => s.toLowerCase());
  const rangeLower = sp.range.map((r) => r.toLowerCase()).join(" ");
  switch (region) {
    case "Eastern USA":
      return statesLower.some((s) =>
        ["alabama","arkansas","connecticut","delaware","florida","georgia","illinois","indiana",
          "iowa","kansas","kentucky","louisiana","maine","maryland","massachusetts","michigan",
          "minnesota","mississippi","missouri","nebraska","new hampshire","new jersey","new york",
          "north carolina","ohio","oklahoma","pennsylvania","rhode island","south carolina",
          "tennessee","texas","vermont","virginia","west virginia","wisconsin"].includes(s)
      );
    case "Western USA":
      return statesLower.some((s) =>
        ["alaska","washington","oregon","california","idaho","montana","wyoming","colorado",
          "utah","nevada","arizona","new mexico"].includes(s)
      );
    case "Southwest":
      return statesLower.some((s) => ["arizona","new mexico","texas","nevada","utah"].includes(s));
    case "Pacific Coast":
      return statesLower.some((s) => ["california","oregon","washington"].includes(s));
    case "Alaska":
      return statesLower.includes("alaska");
    case "Mexico/Central America":
      return rangeLower.includes("mexico") || rangeLower.includes("central america");
    default:
      return true;
  }
}

function speciesMatchesSize(sp: Species, size: SizeClass): boolean {
  if (!size) return true;
  const inMatch = sp.length.match(/[\d.]+\s*in/g);
  if (!inMatch) return true;
  const nums = inMatch.map((s) => parseFloat(s));
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  switch (size) {
    case "tiny": return avg < 3;
    case "small": return avg >= 3 && avg < 3.5;
    case "medium": return avg >= 3.5 && avg < 4;
    case "large": return avg >= 4;
    default: return true;
  }
}

function speciesMatchesPrimaryColor(sp: Species, color: PrimaryColor): boolean {
  if (!color) return true;
  const tags = sp.colorTags.join(" ").toLowerCase();
  switch (color) {
    case "iridescent green": return tags.includes("green") || tags.includes("iridescent");
    case "rufous/orange": return tags.includes("rufous") || tags.includes("orange") || tags.includes("rust");
    case "ruby red": return tags.includes("red") || tags.includes("ruby");
    case "purple/violet": return tags.includes("purple") || tags.includes("violet");
    case "blue": return tags.includes("blue");
    case "black": return tags.includes("black");
    default: return true;
  }
}

function speciesMatchesThroatColor(sp: Species, throat: ThroatColor): boolean {
  if (!throat || !sp.colors.throat) return true;
  const tags = sp.colorTags.join(" ").toLowerCase();
  switch (throat) {
    case "ruby red": return sp.colorTags.includes("ruby-throat") || tags.includes("red");
    case "purple/violet": return tags.includes("purple") || tags.includes("violet");
    case "magenta/pink": return tags.includes("magenta") || tags.includes("pink");
    case "orange": return tags.includes("orange") || tags.includes("rufous");
    case "black": return tags.includes("black");
    case "blue": return tags.includes("blue");
    default: return true;
  }
}

// ── Static content ─────────────────────────────────────────────────────────
const FIELD_MARKS = [
  {
    category: "Gorget (Throat Patch)",
    icon: "✨",
    marks: [
      { name: "Ruby-red flash", desc: "Brilliant ruby-red gorget that flashes like a traffic light in sunlight. Appears black in poor light. Only Ruby-throated has this in eastern NA." },
      { name: "Purple-violet band", desc: "Black-chinned males show a velvet-black chin with a lower band of iridescent purple-violet — only visible at certain angles." },
      { name: "Rose-pink crown + gorget", desc: "Anna's Hummingbird is the only species with rose-pink extending over the entire crown, not just the throat." },
      { name: "Streaked gorget", desc: "Calliope's gorget has individual elongated wine-red feathers that can flare like whiskers — not a solid patch." },
    ],
  },
  {
    category: "Tail Shape & Pattern",
    icon: "🪶",
    marks: [
      { name: "Rufous vs Allen's", desc: "Rufous has an entirely rufous back; Allen's usually shows a green back. Tail feathers are the definitive ID — Rufous r2 is broader at the tip." },
      { name: "Broad tail trill", desc: "Male Broad-tailed Hummingbirds produce a distinctive metallic cricket-like trill with narrowed outer tail feathers — audible from 50 ft." },
      { name: "Blue-throated tail flash", desc: "Blue-throated Mountain-gem has large white tips on the outer tail feathers — very visible in flight, especially from below." },
    ],
  },
  {
    category: "Wing Sounds",
    icon: "🎵",
    marks: [
      { name: "Broad-tailed cricket trill", desc: "The male Broad-tailed Hummingbird produces an unmistakable high-pitched metallic trill on every wingbeat — often heard before seen." },
      { name: "Rufous wing buzz", desc: "Rufous wings produce a lower, softer buzz compared to the Broad-tailed's trill. Sound alone won't separate Rufous from Allen's." },
      { name: "Ruby-throated hum", desc: "The classic deep 'hum' of hovering hummingbirds — Ruby-throated produces a soft, low-pitched hum at 53 beats per second." },
    ],
  },
  {
    category: "Overall Body Color",
    icon: "🎨",
    marks: [
      { name: "All-green females", desc: "Most female hummingbirds appear green above with white/buff below. Context, range, and bill shape are critical for female ID." },
      { name: "Rufous coloration", desc: "Any extensive rufous/orange-brown coloration immediately points to Rufous or Allen's. Other species only show rufous on flanks." },
      { name: "Blue-gray underparts", desc: "Blue-throated Mountain-gem shows distinctive blue-gray underparts and white facial stripes — no other US species matches this." },
    ],
  },
];

const COMPARISONS = [
  {
    title: "Ruby-throated vs Black-chinned",
    subtitle: "The east vs west look-alikes",
    leftSlug: "ruby-throated-hummingbird",
    rightSlug: "black-chinned-hummingbird",
    differences: [
      { trait: "Throat in sunlight", left: "Brilliant ruby-red flash", right: "Purple-violet band below black chin" },
      { trait: "Throat in shade", left: "Appears all black", right: "Appears all black" },
      { trait: "Primary range", left: "Eastern North America", right: "Western North America" },
      { trait: "Overlap zone", left: "Texas (limited)", right: "Texas (limited)" },
      { trait: "Wing sound", left: "Soft hum", right: "Soft hum — similar" },
      { trait: "Tail in flight", left: "Forked, dark", right: "Pumps tail while hovering" },
      { trait: "Bill", left: "Straight, medium", right: "Slightly longer, curves down" },
    ],
  },
  {
    title: "Rufous vs Allen's",
    subtitle: "Nearly identical — look at the tail and back",
    leftSlug: "rufous-hummingbird",
    rightSlug: "allens-hummingbird",
    differences: [
      { trait: "Back color (male)", left: "All rufous/orange", right: "Green back, rufous flanks" },
      { trait: "Gorget", left: "Fiery orange-red", right: "Orange-red (same)" },
      { trait: "Range overlap", left: "Pacific Coast + Interior West", right: "Narrow coastal CA / OR strip" },
      { trait: "Key field mark", left: "Wider r2 tail feather tip", right: "Narrower, pointed r2 tip" },
      { trait: "Migration timing", left: "Mar–May north; Jul–Oct south", right: "Jan–Mar north; Jun–Aug south" },
      { trait: "Non-migratory pop.", left: "None", right: "Southern CA subspecies resident" },
      { trait: "Best ID method", left: "In-hand r2 measurement", right: "In-hand r2 measurement" },
    ],
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────
function FilterButton({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all flex items-center gap-2 ${
        active
          ? "border-emerald-400 text-white scale-105 shadow-lg shadow-emerald-900/30"
          : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300 bg-slate-800"
      }`}
      style={active && color ? { backgroundColor: color + "33", borderColor: color } : {}}
    >
      {children}
    </button>
  );
}

function SpeciesResultCard({ sp }: { sp: Species }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-700 transition-colors">
      <div className="relative h-40 overflow-hidden bg-slate-800">
        <img
          src={sp.imageUrl}
          alt={sp.commonName}
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-bold text-white text-sm leading-tight">{sp.commonName}</h3>
          <p className="text-slate-400 text-xs italic">{sp.scientificName}</p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-slate-600" style={{ backgroundColor: sp.colors.primary }} title="Primary" />
          <div className="w-4 h-4 rounded-full border border-slate-600" style={{ backgroundColor: sp.colors.secondary }} title="Secondary" />
          {sp.colors.throat && (
            <div className="w-4 h-4 rounded-full border border-slate-600" style={{ backgroundColor: sp.colors.throat }} title="Throat" />
          )}
          <span className="text-slate-500 text-xs">{sp.colorTags.join(", ")}</span>
        </div>

        <div className="text-xs text-slate-400">
          <span className="text-slate-500">Length:</span> {sp.length}
        </div>

        <div className="flex flex-wrap gap-1">
          {sp.range.map((r) => (
            <span key={r} className="text-xs bg-emerald-900/50 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">{r}</span>
          ))}
        </div>

        <div className="text-xs text-slate-500 flex gap-3">
          <span>↑ {sp.migrationMonths.north}</span>
          <span>↓ {sp.migrationMonths.south}</span>
        </div>

        <a
          href={`/species/${sp.slug}`}
          className="block text-center text-xs bg-emerald-800 hover:bg-emerald-700 text-emerald-200 px-3 py-2 rounded-lg transition-colors"
        >
          Full Profile →
        </a>
      </div>
    </div>
  );
}

// ── Main exported client component ─────────────────────────────────────────
export default function IdentifierClient() {
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>("");
  const [throatColor, setThroatColor] = useState<ThroatColor>("");
  const [sizeClass, setSizeClass] = useState<SizeClass>("");
  const [region, setRegion] = useState<Region>("");

  const hasFilters = Boolean(primaryColor || throatColor || sizeClass || region);

  const filteredSpecies = useMemo(() => {
    if (!hasFilters) return [];
    return species.filter(
      (sp) =>
        speciesMatchesPrimaryColor(sp, primaryColor) &&
        speciesMatchesThroatColor(sp, throatColor) &&
        speciesMatchesSize(sp, sizeClass) &&
        speciesMatchesRegion(sp, region)
    );
  }, [primaryColor, throatColor, sizeClass, region, hasFilters]);

  function clearFilters() {
    setPrimaryColor("");
    setThroatColor("");
    setSizeClass("");
    setRegion("");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 py-24 px-4">
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-700 rounded-full px-4 py-1.5 text-emerald-300 text-sm mb-6">
            <span>🔍</span> Interactive Species Identification
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-white to-emerald-300 bg-clip-text text-transparent">
            Hummingbird Identifier
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Identify hummingbird species by color, size, and region. Use our interactive filters,
            compare similar species side-by-side, and learn the key field marks that separate look-alike species.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#color" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Start Identifying
            </a>
            <a href="#compare" className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Compare Species
            </a>
            <a href="#field-marks" className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Field Marks Guide
            </a>
          </div>
        </div>
      </section>

      {/* ── Color Identification Tool ── */}
      <section id="color" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Color Identification Tool</h2>
        <p className="text-slate-400 text-center mb-10">
          Select the colors and features you observed to narrow down the species
        </p>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Primary color */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold">1</span>
                  Primary Body Color
                </h3>
                <div className="flex flex-wrap gap-2">
                  {PRIMARY_COLOR_OPTIONS.map((opt) => (
                    <FilterButton
                      key={opt.value}
                      active={primaryColor === opt.value}
                      onClick={() => setPrimaryColor(primaryColor === opt.value ? "" : opt.value)}
                      color={opt.hex}
                    >
                      <span className="w-3 h-3 rounded-full inline-block border border-white/20" style={{ backgroundColor: opt.hex }} />
                      {opt.label}
                    </FilterButton>
                  ))}
                </div>
              </div>

              {/* Throat color */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold">2</span>
                  Throat / Gorget Color
                </h3>
                <div className="flex flex-wrap gap-2">
                  {THROAT_COLOR_OPTIONS.map((opt) => (
                    <FilterButton
                      key={opt.value}
                      active={throatColor === opt.value}
                      onClick={() => setThroatColor(throatColor === opt.value ? "" : opt.value)}
                      color={opt.hex}
                    >
                      <span className="w-3 h-3 rounded-full inline-block border border-white/20" style={{ backgroundColor: opt.hex }} />
                      {opt.label}
                    </FilterButton>
                  ))}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Note: gorget colors only show in males. Females mostly lack iridescent throat patches.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Size */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold">3</span>
                  Apparent Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SIZE_OPTIONS.map((opt) => (
                    <FilterButton
                      key={opt.value}
                      active={sizeClass === opt.value}
                      onClick={() => setSizeClass(sizeClass === opt.value ? "" : opt.value)}
                    >
                      <span className="font-bold">{opt.label}</span>
                      <span className="text-slate-500">{opt.desc}</span>
                    </FilterButton>
                  ))}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  All hummingbirds appear tiny in the field — focus on relative size if multiple species are present.
                </p>
              </div>

              {/* Region */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold">4</span>
                  Region Where Observed
                </h3>
                <div className="flex flex-wrap gap-2">
                  {REGION_OPTIONS.map((opt) => (
                    <FilterButton
                      key={opt.value}
                      active={region === opt.value}
                      onClick={() => setRegion(region === opt.value ? "" : opt.value)}
                    >
                      <span>{opt.icon}</span>
                      {opt.label}
                    </FilterButton>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Active filters */}
          {hasFilters && (
            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-3">
              <span className="text-sm text-slate-500">Active filters:</span>
              {primaryColor && (
                <span className="text-xs bg-emerald-900/50 text-emerald-300 border border-emerald-800 px-2 py-1 rounded-full">{primaryColor}</span>
              )}
              {throatColor && (
                <span className="text-xs bg-purple-900/50 text-purple-300 border border-purple-800 px-2 py-1 rounded-full">Throat: {throatColor}</span>
              )}
              {sizeClass && (
                <span className="text-xs bg-sky-900/50 text-sky-300 border border-sky-800 px-2 py-1 rounded-full">{sizeClass}</span>
              )}
              {region && (
                <span className="text-xs bg-amber-900/50 text-amber-300 border border-amber-800 px-2 py-1 rounded-full">{region}</span>
              )}
              <button
                onClick={clearFilters}
                className="ml-auto text-xs text-slate-500 hover:text-red-400 underline transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {!hasFilters ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate-400 text-lg font-medium">Select at least one filter above to see matching species</p>
            <p className="text-slate-600 text-sm mt-1">The more filters you apply, the more precise your identification</p>
          </div>
        ) : filteredSpecies.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
            <div className="text-5xl mb-4">🤔</div>
            <p className="text-slate-400 text-lg font-medium">No species match all selected filters</p>
            <p className="text-slate-600 text-sm mt-1">
              Try removing one or more filters — some combinations don&apos;t occur in nature
            </p>
            <button onClick={clearFilters} className="mt-4 text-sm text-emerald-400 hover:text-emerald-300 underline">
              Clear filters and start over
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-white">
                {filteredSpecies.length} matching {filteredSpecies.length === 1 ? "species" : "species"}
              </h3>
              <span className="text-sm text-slate-500">{species.length - filteredSpecies.length} species filtered out</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredSpecies.map((sp) => (
                <SpeciesResultCard key={sp.slug} sp={sp} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Species Comparison ── */}
      <section id="compare" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Similar Species Comparison</h2>
        <p className="text-slate-400 text-center mb-10">
          Side-by-side comparison of the most commonly confused species pairs
        </p>

        <div className="space-y-10">
          {COMPARISONS.map((comp) => {
            const left = species.find((s) => s.slug === comp.leftSlug);
            const right = species.find((s) => s.slug === comp.rightSlug);
            if (!left || !right) return null;
            return (
              <div key={comp.title} className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
                <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
                  <h3 className="text-xl font-bold text-white">{comp.title}</h3>
                  <p className="text-slate-400 text-sm">{comp.subtitle}</p>
                </div>

                <div className="grid grid-cols-[1fr_1fr_1fr] divide-x divide-slate-800">
                  <div className="p-4 text-slate-500 text-xs font-semibold uppercase tracking-wide flex items-end">Trait</div>
                  <div className="p-4">
                    <div className="font-bold text-emerald-300">{left.commonName}</div>
                    <div className="text-xs text-slate-500 italic">{left.scientificName}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-4 h-4 rounded-full border border-slate-600" style={{ backgroundColor: left.colors.primary }} />
                      {left.colors.throat && (
                        <div className="w-4 h-4 rounded-full border border-slate-600" style={{ backgroundColor: left.colors.throat }} />
                      )}
                      <span className="text-xs text-slate-500">{left.length}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-amber-300">{right.commonName}</div>
                    <div className="text-xs text-slate-500 italic">{right.scientificName}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-4 h-4 rounded-full border border-slate-600" style={{ backgroundColor: right.colors.primary }} />
                      {right.colors.throat && (
                        <div className="w-4 h-4 rounded-full border border-slate-600" style={{ backgroundColor: right.colors.throat }} />
                      )}
                      <span className="text-xs text-slate-500">{right.length}</span>
                    </div>
                  </div>
                </div>

                {comp.differences.map((diff, di) => {
                  const identical = diff.left === diff.right;
                  return (
                    <div
                      key={diff.trait}
                      className={`grid grid-cols-[1fr_1fr_1fr] divide-x divide-slate-800 border-t border-slate-800 ${
                        di % 2 === 0 ? "bg-slate-900" : "bg-slate-900/50"
                      }`}
                    >
                      <div className="p-3 text-xs font-semibold text-slate-400 flex items-center">{diff.trait}</div>
                      <div className={`p-3 text-sm ${identical ? "text-slate-400" : "text-emerald-300"}`}>{diff.left}</div>
                      <div className={`p-3 text-sm ${identical ? "text-slate-400" : "text-amber-300"}`}>{diff.right}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Field Marks Guide ── */}
      <section id="field-marks" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Field Marks Guide</h2>
        <p className="text-slate-400 text-center mb-10">
          Key identification features explained — what to look for in the field
        </p>

        <div className="space-y-8">
          {FIELD_MARKS.map((section) => (
            <div key={section.category} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-900/50 to-transparent px-6 py-4 border-b border-slate-800 flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <h3 className="text-lg font-bold text-emerald-300">{section.category}</h3>
              </div>
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                {section.marks.map((mark) => (
                  <div key={mark.name} className="p-5">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block flex-shrink-0" />
                      {mark.name}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{mark.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-5">
          {[
            { icon: "📸", title: "Photography Tip", desc: "Set your camera to burst mode at 1/2000s or faster. Hummingbird wings move up to 80 times per second — you need the speed." },
            { icon: "🌤️", title: "Lighting Matters", desc: "Gorget colors are iridescent — they only appear colored when light hits at the right angle. A dull throat in shade does not mean no gorget." },
            { icon: "🎯", title: "Focus on Range First", desc: "Before looking at colors, always check the range. In eastern North America, a breeding bird is almost certainly a Ruby-throated." },
          ].map((tip) => (
            <div key={tip.title} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="text-2xl mb-2">{tip.icon}</div>
              <h4 className="font-semibold text-white mb-2">{tip.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── All Species Gallery ── */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">All Tracked Species</h2>
        <p className="text-slate-400 text-center mb-10">All hummingbird species found in North America with key ID details</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {species.map((sp) => (
            <div key={sp.slug} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-700 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-bold text-white text-sm">{sp.commonName}</h3>
                  <p className="text-slate-500 text-xs italic">{sp.scientificName}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <div className="w-5 h-5 rounded-full border border-slate-600" style={{ backgroundColor: sp.colors.primary }} />
                  {sp.colors.throat && (
                    <div className="w-5 h-5 rounded-full border border-slate-600" style={{ backgroundColor: sp.colors.throat }} />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {sp.colorTags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="text-xs text-slate-500 mb-3">
                <span className="text-slate-400">{sp.length}</span>
                {" · "}
                <span>{sp.states.length} states</span>
              </div>

              <a href={`/species/${sp.slug}`} className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                Full profile →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
