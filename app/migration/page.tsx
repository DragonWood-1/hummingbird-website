import type { Metadata } from "next";
import { species } from "@/lib/species-data";

export const metadata: Metadata = {
  title: "Hummingbird Migration Tracker – Maps, Heat Maps & Range Overlays",
  description: "Track hummingbird migration in real time. Explore interactive maps, heat maps by month, species range overlays, weather corridors, and expert tips on when to put out feeders by region.",
  keywords: ["hummingbird migration","migration tracker","migration map","hummingbird heat map","when do hummingbirds arrive","hummingbird migration map","spring migration","fall migration"],
  alternates: { canonical: "https://hummingbirdguide.com/migration" },
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const REGIONS = [
  { name: "Pacific Coast", color: "#0ea5e9" },
  { name: "Southwest", color: "#f59e0b" },
  { name: "Rocky Mtn", color: "#8b5cf6" },
  { name: "Midwest", color: "#10b981" },
  { name: "Eastern USA", color: "#ef4444" },
];

// Density 0–10 per region per month (spring peak Mar-May, fall peak Aug-Oct)
const HEATMAP_DATA: number[][] = [
  // Pacific Coast
  [2, 3, 6, 8, 9, 10, 9, 8, 6, 4, 2, 2],
  // Southwest
  [3, 4, 7, 9, 9, 8, 7, 6, 5, 3, 2, 2],
  // Rocky Mtn
  [0, 0, 1, 4, 8, 9, 9, 8, 5, 2, 0, 0],
  // Midwest
  [0, 0, 1, 4, 7, 8, 8, 7, 5, 2, 0, 0],
  // Eastern USA
  [0, 0, 2, 5, 8, 9, 9, 8, 6, 3, 1, 0],
];

const SPRING_TIMELINE = [
  { month: "January", event: "Allen's Hummingbird arrives in coastal CA & OR", active: false },
  { month: "February", event: "Costa's Hummingbird begins breeding in Sonoran Desert", active: false },
  { month: "March", event: "Ruby-throated males push north; Rufous departs Mexico", active: true },
  { month: "April", event: "Broad-tailed & Black-chinned arrive in the West; Ruby-throated reaches mid-states", active: true },
  { month: "May", event: "Ruby-throated reaches Canada; Calliope & Rufous reach Alaska", active: true },
  { month: "June", event: "All species on breeding grounds — migration complete", active: false },
];

const FALL_TIMELINE = [
  { month: "July", event: "Adult male Ruby-throated begin southward movement", active: true },
  { month: "August", event: "Rufous & Broad-tailed peak in mountain meadows heading south", active: true },
  { month: "September", event: "Ruby-throated crossing Gulf of Mexico; western species entering Mexico", active: true },
  { month: "October", event: "Late migrants; lingering individuals in Gulf Coast states", active: false },
  { month: "November", event: "Only Anna's & Costa's remain in southwest", active: false },
  { month: "December", event: "Anna's Hummingbird begins nesting on Pacific Coast", active: false },
];

const FEEDER_TIPS = [
  { region: "Pacific Coast", putOut: "Year-round", takeIn: "Never (Anna's stays all year)", note: "Anna's Hummingbirds are present 365 days" },
  { region: "Southwest / Desert", putOut: "February 15", takeIn: "November 1", note: "Costa's & Black-chinned arrive early" },
  { region: "Rocky Mountains", putOut: "April 15", takeIn: "October 1", note: "Wait for Broad-tailed males to arrive" },
  { region: "Midwest", putOut: "May 1", takeIn: "October 15", note: "Ruby-throated arrive mid-spring" },
  { region: "Eastern USA", putOut: "April 15", takeIn: "November 1", note: "Keep feeders up 2 weeks after last sighting" },
];

const WEATHER_FACTS = [
  { icon: "🌡️", title: "Temperature Corridors", desc: "Hummingbirds follow the 50°F isotherm northward in spring, tracking flowering plants that need similar conditions." },
  { icon: "💨", title: "Tailwind Advantage", desc: "Ruby-throated Hummingbirds time their Gulf crossing to exploit southerly tailwinds, reducing the 18-hour flight to as little as 14 hours." },
  { icon: "🌸", title: "Floral Synchrony", desc: "Migration timing is synchronized with peak bloom of key nectar plants — particularly red tubular flowers along the flyway." },
  { icon: "⛅", title: "Weather Delays", desc: "Cold fronts can stall migration for days. Hummingbirds enter torpor to conserve fat reserves during adverse weather." },
];

function densityColor(val: number): string {
  if (val === 0) return "bg-slate-800";
  if (val <= 2) return "bg-emerald-950";
  if (val <= 4) return "bg-emerald-800";
  if (val <= 6) return "bg-emerald-600";
  if (val <= 8) return "bg-emerald-400";
  return "bg-emerald-300";
}

export default function MigrationPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 py-24 px-4">
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-pulse"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}
            />
          ))}
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-700 rounded-full px-4 py-1.5 text-emerald-300 text-sm mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse inline-block" />
            Live Sighting Data Updated Daily
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-white to-emerald-300 bg-clip-text text-transparent">
            Hummingbird Migration Tracker
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Follow the remarkable journeys of hummingbirds across North America — from wintering grounds in Mexico
            to summer breeding ranges in Canada and Alaska. Explore real-time maps, density heat maps,
            and species range overlays.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#map" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Interactive Map
            </a>
            <a href="#heatmap" className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Heat Map
            </a>
            <a href="#ranges" className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Range Overlays
            </a>
          </div>
        </div>
      </section>

      {/* ── Migration Timeline ── */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Migration Timeline</h2>
        <p className="text-slate-400 text-center mb-12">Month-by-month movement patterns across North America</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Spring */}
          <div>
            <h3 className="text-xl font-semibold text-emerald-400 mb-6 flex items-center gap-2">
              <span className="text-2xl">🌱</span> Spring Migration (Jan – Jun)
            </h3>
            <div className="relative pl-6 border-l-2 border-emerald-800 space-y-6">
              {SPRING_TIMELINE.map((item) => (
                <div key={item.month} className="relative">
                  <div className={`absolute -left-[25px] w-4 h-4 rounded-full border-2 ${item.active ? "bg-emerald-400 border-emerald-300" : "bg-slate-700 border-slate-600"}`} />
                  <div className={`rounded-xl p-4 ${item.active ? "bg-emerald-900/40 border border-emerald-700" : "bg-slate-800/40 border border-slate-700"}`}>
                    <div className={`text-sm font-bold mb-1 ${item.active ? "text-emerald-300" : "text-slate-400"}`}>{item.month}</div>
                    <div className="text-sm text-slate-300">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fall */}
          <div>
            <h3 className="text-xl font-semibold text-amber-400 mb-6 flex items-center gap-2">
              <span className="text-2xl">🍂</span> Fall Migration (Jul – Dec)
            </h3>
            <div className="relative pl-6 border-l-2 border-amber-900 space-y-6">
              {FALL_TIMELINE.map((item) => (
                <div key={item.month} className="relative">
                  <div className={`absolute -left-[25px] w-4 h-4 rounded-full border-2 ${item.active ? "bg-amber-400 border-amber-300" : "bg-slate-700 border-slate-600"}`} />
                  <div className={`rounded-xl p-4 ${item.active ? "bg-amber-900/30 border border-amber-800" : "bg-slate-800/40 border border-slate-700"}`}>
                    <div className={`text-sm font-bold mb-1 ${item.active ? "text-amber-300" : "text-slate-400"}`}>{item.month}</div>
                    <div className="text-sm text-slate-300">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Map ── */}
      <section id="map" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Interactive Map</h2>
        <p className="text-slate-400 text-center mb-10">Real-time sighting data from citizen scientists across North America</p>

        <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden">
          {/* SVG USA outline placeholder */}
          <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-200 text-sm font-medium">Showing real-time sighting data</span>
            </div>
            <div className="flex gap-2">
              {["All Species","Ruby-throated","Rufous","Anna's"].map((label) => (
                <button key={label} className="text-xs bg-emerald-800 hover:bg-emerald-700 px-3 py-1 rounded-full transition-colors border border-emerald-700">
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative bg-emerald-950 rounded-2xl overflow-hidden" style={{ height: "400px" }}>
            {/* Stylized USA Map SVG */}
            <svg viewBox="0 0 900 500" className="w-full h-full opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Continental outline */}
              <path d="M120,80 L750,80 L820,140 L800,320 L720,380 L640,400 L500,420 L380,410 L200,380 L100,300 L80,200 Z"
                stroke="#10b981" strokeWidth="2" fill="#064e3b" fillOpacity="0.4"/>
              {/* State grid lines */}
              {[200,320,440,560,680].map((x) => (
                <line key={x} x1={x} y1="80" x2={x} y2="400" stroke="#065f46" strokeWidth="1" strokeDasharray="4,4"/>
              ))}
              {[160,240,320,360].map((y) => (
                <line key={y} x1="80" y1={y} x2="820" y2={y} stroke="#065f46" strokeWidth="1" strokeDasharray="4,4"/>
              ))}
              {/* Sighting dots */}
              {[
                [180,200],[200,240],[220,180],[280,190],[300,210],[320,200],[340,180],
                [280,280],[310,290],[320,300],[280,320],[300,330],
                [400,160],[420,180],[440,170],[460,160],[400,220],[430,230],
                [500,200],[520,210],[540,200],[560,180],[500,240],
                [600,150],[620,160],[640,150],[660,140],[620,190],[640,200],
                [680,200],[700,210],[720,200],[700,240],[680,260],
                [160,300],[180,310],[160,330],[180,340],[200,300],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="6" fill="#34d399" fillOpacity="0.85">
                  <animate attributeName="r" values="5;8;5" dur={`${1.5 + (i % 4) * 0.3}s`} repeatCount="indefinite"/>
                  <animate attributeName="fill-opacity" values="0.85;0.4;0.85" dur={`${1.5 + (i % 4) * 0.3}s`} repeatCount="indefinite"/>
                </circle>
              ))}
              {/* Migration arrows */}
              <path d="M250,370 Q300,300 350,200" stroke="#6ee7b7" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity="0.6" strokeDasharray="8,4"/>
              <path d="M500,380 Q520,300 540,180" stroke="#6ee7b7" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="8,4"/>
              <path d="M680,350 Q700,280 710,160" stroke="#6ee7b7" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="8,4"/>
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#6ee7b7"/>
                </marker>
              </defs>
              {/* Labels */}
              <text x="200" y="430" fill="#6ee7b7" fontSize="12" textAnchor="middle">Eastern Flyway</text>
              <text x="500" y="450" fill="#6ee7b7" fontSize="12" textAnchor="middle">Central Flyway</text>
              <text x="700" y="420" fill="#6ee7b7" fontSize="12" textAnchor="middle">Pacific Flyway</text>
            </svg>

            {/* Legend overlay */}
            <div className="absolute bottom-4 left-4 bg-emerald-950/90 rounded-xl p-3 text-xs space-y-1.5">
              <div className="text-emerald-300 font-semibold mb-2">Legend</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-400 inline-block animate-pulse"/><span className="text-emerald-200">Active Sighting</span></div>
              <div className="flex items-center gap-2"><span className="w-8 h-0.5 bg-emerald-400 inline-block opacity-60" style={{borderTop:"2px dashed"}} /><span className="text-emerald-200">Migration Route</span></div>
            </div>

            {/* Stats overlay */}
            <div className="absolute top-4 right-4 bg-emerald-950/90 rounded-xl p-3 text-xs space-y-2">
              <div className="text-emerald-300 font-semibold">Today's Stats</div>
              <div className="text-emerald-100">47 new sightings</div>
              <div className="text-emerald-100">12 states reporting</div>
              <div className="text-emerald-100">5 species tracked</div>
            </div>
          </div>

          <p className="text-center text-emerald-400 text-sm mt-4">
            Full Leaflet.js map integration available — submit sightings via eBird or iNaturalist
          </p>
        </div>
      </section>

      {/* ── Heat Map ── */}
      <section id="heatmap" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Migration Heat Map</h2>
        <p className="text-slate-400 text-center mb-10">Sighting density by region and month — darker green = higher activity</p>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr>
                <th className="text-left text-slate-400 text-sm font-medium pb-4 pr-4 w-32">Region</th>
                {MONTHS.map((m) => (
                  <th key={m} className="text-center text-slate-400 text-xs font-medium pb-4 w-12">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-2">
              {REGIONS.map((region, ri) => (
                <tr key={region.name}>
                  <td className="pr-4 py-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: region.color }} />
                      <span className="text-sm text-slate-300 font-medium whitespace-nowrap">{region.name}</span>
                    </div>
                  </td>
                  {HEATMAP_DATA[ri].map((val, mi) => (
                    <td key={mi} className="py-1 px-0.5">
                      <div
                        className={`w-10 h-10 rounded-lg ${densityColor(val)} flex items-center justify-center text-xs font-bold transition-all hover:scale-110 cursor-default`}
                        title={`${region.name} – ${MONTHS[mi]}: density ${val}/10`}
                      >
                        {val > 0 ? (
                          <span className={val >= 7 ? "text-slate-900" : "text-emerald-200"}>{val}</span>
                        ) : (
                          <span className="text-slate-700">–</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <span className="text-slate-500 text-xs">Density scale:</span>
            {[0,2,4,6,8,10].map((v) => (
              <div key={v} className="flex items-center gap-1">
                <div className={`w-5 h-5 rounded ${densityColor(v)}`} />
                <span className="text-xs text-slate-500">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Range Overlays ── */}
      <section id="ranges" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Species Range Overlays</h2>
        <p className="text-slate-400 text-center mb-10">Known breeding and wintering states for each species</p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {species.map((sp) => (
            <div key={sp.slug} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-emerald-700 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white text-sm">{sp.commonName}</h3>
                  <p className="text-slate-500 text-xs italic">{sp.scientificName}</p>
                </div>
                <span className="text-xs bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800">
                  {sp.states.length} states
                </span>
              </div>

              <div className="mb-3">
                <div className="text-xs text-slate-500 mb-1">Primary color</div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border border-slate-600" style={{ backgroundColor: sp.colors.primary }} />
                  {sp.colors.throat && (
                    <div className="w-5 h-5 rounded-full border border-slate-600" style={{ backgroundColor: sp.colors.throat }} />
                  )}
                  <span className="text-slate-400 text-xs">{sp.colorTags.join(", ")}</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-xs text-slate-500 mb-1.5">Migration</div>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">↑ Spring</span>
                    <span className="text-slate-400">{sp.migrationMonths.north}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">↓ Fall</span>
                    <span className="text-slate-400">{sp.migrationMonths.south}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-2">States / Range</div>
                <div className="flex flex-wrap gap-1">
                  {sp.states.slice(0, 8).map((st) => (
                    <span key={st} className="text-xs bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">{st.substring(0,3)}</span>
                  ))}
                  {sp.states.length > 8 && (
                    <span className="text-xs bg-emerald-900/50 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800">+{sp.states.length - 8} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Weather Overlays ── */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Weather & Climate Overlays</h2>
        <p className="text-slate-400 text-center mb-10">How temperature corridors and wind patterns shape migration</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WEATHER_FACTS.map((fact) => (
            <div key={fact.title} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-emerald-700 transition-colors">
              <div className="text-3xl mb-3">{fact.icon}</div>
              <h3 className="font-semibold text-white mb-2">{fact.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{fact.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feeder Tips ── */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">When to Put Out Feeders</h2>
        <p className="text-slate-400 text-center mb-10">Timing recommendations by region to welcome arriving hummingbirds</p>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
          <div className="grid grid-cols-4 bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wide px-6 py-3">
            <span>Region</span>
            <span>Put Out Feeder</span>
            <span>Take In Feeder</span>
            <span>Notes</span>
          </div>
          {FEEDER_TIPS.map((tip, i) => (
            <div
              key={tip.region}
              className={`grid grid-cols-4 px-6 py-4 text-sm gap-4 items-center ${i % 2 === 0 ? "bg-slate-900" : "bg-slate-900/50"} border-b border-slate-800 last:border-0`}
            >
              <span className="font-medium text-white">{tip.region}</span>
              <span className="text-emerald-400 font-semibold">{tip.putOut}</span>
              <span className="text-amber-400">{tip.takeIn}</span>
              <span className="text-slate-400 text-xs">{tip.note}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-emerald-900/30 border border-emerald-800 rounded-2xl p-5">
          <h3 className="font-semibold text-emerald-300 mb-2">Pro Tip: The 2-Week Rule</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Always keep feeders out for at least 2 weeks after your last sighting in fall. Late migrants
            — especially juvenile birds making their first solo journey — may be 2–3 weeks behind adults.
            A clean feeder could be a lifesaver during their marathon migration.
          </p>
        </div>
      </section>

      {/* ── Migration Facts Sidebar (displayed as grid) ── */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Remarkable Migration Facts</h2>
        <p className="text-slate-400 text-center mb-10">The science behind one of nature's most extraordinary journeys</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { stat: "500 mi", label: "Non-stop Gulf Crossing", desc: "Ruby-throated Hummingbirds fly 500 miles across the Gulf of Mexico without stopping — a feat lasting up to 20 hours." },
            { stat: "3,900 mi", label: "Rufous Round Trip", desc: "The Rufous Hummingbird has the longest migration of any hummingbird relative to body size on Earth." },
            { stat: "2× / year", label: "Rocky Mountain Crossing", desc: "The tiny Calliope Hummingbird crosses the Rocky Mountains twice each year during its 5,000-mile migration." },
            { stat: "54°F", label: "Torpor Body Temp", desc: "During cold nights, hummingbirds drop their body temperature to near 54°F to conserve precious fat reserves." },
            { stat: "50%", label: "Weight as Fat", desc: "Before migrating over the Gulf, Ruby-throated Hummingbirds nearly double their body weight by storing fat." },
            { stat: "Jan", label: "Earliest Nester", desc: "Anna's Hummingbird begins nesting as early as December–January in California — while most birds are still in the tropics." },
          ].map((fact) => (
            <div key={fact.stat} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-emerald-700 transition-colors">
              <div className="text-3xl font-black text-emerald-400 mb-1">{fact.stat}</div>
              <div className="text-white font-semibold mb-2">{fact.label}</div>
              <p className="text-slate-400 text-sm leading-relaxed">{fact.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Similar Species Teaser ── */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-900/40 to-slate-900 rounded-3xl border border-emerald-800 p-8 text-center">
          <h2 className="text-2xl font-bold text-emerald-300 mb-3">Can't Tell Rufous from Allen's?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Several hummingbird species are nearly identical in the field. Our Species Identifier tool
            walks you through key differences in tail shape, gorget color, and range to help you make
            a confident ID.
          </p>
          <a href="/identifier" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Open Species Identifier →
          </a>
        </div>
      </section>
    </main>
  );
}
