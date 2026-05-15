"use client";

import { useState, useMemo } from "react";
import { plants, usdaZones, months, Plant } from "@/lib/plants-data";

// ── Types ──────────────────────────────────────────────────────────────────
type SunFilter = "all" | "full-sun" | "part-shade" | "full-shade";
type WaterFilter = "all" | "low" | "medium" | "high";
type GridCell = string | null; // plant name or empty

const GRID_ROWS = 5;
const GRID_COLS = 10;

const PLANT_COLORS: Record<string, string> = {
  "Trumpet Vine": "#ff4500",
  "Bee Balm": "#e63946",
  "Cardinal Flower": "#c1121f",
  "Coral Honeysuckle": "#ff6f61",
  "Salvia (Red)": "#dc143c",
  Penstemon: "#6a4c93",
  Columbine: "#ff6b35",
  "Indian Paintbrush": "#ff2400",
  Fuchsia: "#c71585",
  Agave: "#ffd700",
  Ocotillo: "#c0392b",
  "Trumpet Honeysuckle": "#ff6f00",
};

const SUN_ICONS: Record<string, string> = {
  "full-sun": "☀️",
  "part-shade": "⛅",
  "full-shade": "🌑",
};
const WATER_ICONS: Record<string, string> = {
  low: "💧",
  medium: "💧💧",
  high: "💧💧💧",
};

function zoneNumber(zone: string): number {
  return parseInt(zone, 10);
}

function plantCompatibleWithZone(plant: Plant, zone: number): boolean {
  const zStr = plant.usdaZones;
  // Handle ranges like "4–9", "8–11", "3–8"
  const match = zStr.match(/(\d+)[–-](\d+)/);
  if (match) {
    return zone >= parseInt(match[1]) && zone <= parseInt(match[2]);
  }
  // Handle "8–11 (annual elsewhere)" style
  const matchAnnual = zStr.match(/(\d+)/);
  if (matchAnnual) return zone >= parseInt(matchAnnual[1]);
  return true;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function BloomBubbles({ bloomMonths }: { bloomMonths: number[] }) {
  return (
    <div className="flex gap-0.5 flex-wrap">
      {months.map((m, idx) => {
        const active = bloomMonths.includes(idx + 1);
        return (
          <div
            key={m}
            title={m}
            className={`w-5 h-5 rounded-full text-[9px] flex items-center justify-center font-bold transition-colors ${
              active ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-500"
            }`}
          >
            {m[0]}
          </div>
        );
      })}
    </div>
  );
}

function PollinatorBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-2 rounded-full transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs text-emerald-400 font-bold w-7 text-right">{score}</span>
    </div>
  );
}

function PlantCard({
  plant,
  onAdd,
  isAdded,
}: {
  plant: Plant;
  onAdd: (name: string) => void;
  isAdded: boolean;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-emerald-700 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl border border-slate-700 flex-shrink-0"
            style={{ backgroundColor: plant.colorHex }}
          />
          <div>
            <h3 className="font-semibold text-white text-sm leading-tight">{plant.name}</h3>
            <p className="text-slate-500 text-xs italic">{plant.scientificName}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${
          plant.type === "perennial" ? "bg-emerald-900/50 text-emerald-300 border-emerald-800" :
          plant.type === "annual" ? "bg-amber-900/50 text-amber-300 border-amber-800" :
          plant.type === "vine" ? "bg-sky-900/50 text-sky-300 border-sky-800" :
          plant.type === "shrub" ? "bg-purple-900/50 text-purple-300 border-purple-800" :
          "bg-slate-800 text-slate-300 border-slate-700"
        }`}>
          {plant.type}
        </span>
      </div>

      {/* Pollinator score */}
      <div>
        <div className="text-xs text-slate-500 mb-1">Pollinator Score</div>
        <PollinatorBar score={plant.pollinatorScore} />
      </div>

      {/* Bloom calendar */}
      <div>
        <div className="text-xs text-slate-500 mb-1.5">Bloom Calendar</div>
        <BloomBubbles bloomMonths={plant.bloomMonths} />
      </div>

      {/* Details row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
        <span>{SUN_ICONS[plant.sunRequirement]} {plant.sunRequirement.replace("-", " ")}</span>
        <span>{WATER_ICONS[plant.waterNeeds]} {plant.waterNeeds} water</span>
        <span>📏 {plant.height}</span>
      </div>

      {/* USDA Zones */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500">Zones:</span>
        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">{plant.usdaZones}</span>
        <span className="text-xs text-slate-500">|</span>
        <span className="text-xs text-slate-400">{plant.color}</span>
      </div>

      {/* Add to Garden */}
      <button
        onClick={() => onAdd(plant.name)}
        className={`w-full py-2 rounded-xl text-sm font-semibold transition-all ${
          isAdded
            ? "bg-emerald-700 text-emerald-100 border border-emerald-600 cursor-default"
            : "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500"
        }`}
      >
        {isAdded ? "✓ Added to Garden" : "Add to Garden"}
      </button>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function GardenPlannerClient() {
  const [selectedZone, setSelectedZone] = useState<string>("5");
  const [sunFilter, setSunFilter] = useState<SunFilter>("all");
  const [waterFilter, setWaterFilter] = useState<WaterFilter>("all");
  const [selectedBloomMonth, setSelectedBloomMonth] = useState<number | null>(null);
  const [addedPlants, setAddedPlants] = useState<Set<string>>(new Set());
  const [gardenGrid, setGardenGrid] = useState<GridCell[][]>(
    Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(null))
  );
  const [activePlantBrush, setActivePlantBrush] = useState<string | null>(null);

  // ── Filtered plants ──
  const filteredPlants = useMemo(() => {
    return plants.filter((p) => {
      if (!plantCompatibleWithZone(p, zoneNumber(selectedZone))) return false;
      if (sunFilter !== "all" && p.sunRequirement !== sunFilter) return false;
      if (waterFilter !== "all" && p.waterNeeds !== waterFilter) return false;
      if (selectedBloomMonth !== null && !p.bloomMonths.includes(selectedBloomMonth)) return false;
      return true;
    });
  }, [selectedZone, sunFilter, waterFilter, selectedBloomMonth]);

  // ── Leaderboard ──
  const rankedPlants = useMemo(
    () => [...plants].sort((a, b) => b.pollinatorScore - a.pollinatorScore),
    []
  );

  // ── Garden grid handlers ──
  function handleCellClick(row: number, col: number) {
    setGardenGrid((prev) => {
      const next = prev.map((r) => [...r]);
      if (next[row][col] === activePlantBrush) {
        next[row][col] = null;
      } else {
        next[row][col] = activePlantBrush;
      }
      return next;
    });
  }

  function clearGrid() {
    setGardenGrid(Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(null)));
  }

  function handleAddPlant(name: string) {
    setAddedPlants((prev) => new Set([...prev, name]));
    setActivePlantBrush(name);
  }

  const currentZoneInfo = usdaZones.find((z) => z.zone === selectedZone);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-emerald-950 to-slate-900 py-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          {["🌺","🌿","🌸","🌼","🍃","🌻"].map((emoji, i) => (
            <span
              key={i}
              className="absolute text-4xl opacity-10 select-none"
              style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            >
              {emoji}
            </span>
          ))}
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-900/50 border border-green-700 rounded-full px-4 py-1.5 text-green-300 text-sm mb-6">
            <span>🌱</span> Interactive Garden Design Tool
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-300 via-emerald-200 to-green-300 bg-clip-text text-transparent">
            Hummingbird Garden Planner
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Design a garden that hummingbirds can't resist. Filter plants by your USDA hardiness zone,
            visualize bloom periods month by month, and lay out your garden with our interactive grid.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#zones" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Find Plants for My Zone
            </a>
            <a href="#bloom-calendar" className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Bloom Calendar
            </a>
            <a href="#layout" className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Layout Visualizer
            </a>
          </div>
        </div>
      </section>

      {/* ── USDA Zone Selector + Filters ── */}
      <section id="zones" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Find Plants for Your Zone</h2>
        <p className="text-slate-400 text-center mb-10">Select your USDA hardiness zone to see compatible hummingbird plants</p>

        {/* Zone selector */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-8">
          <div className="flex flex-wrap gap-6 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-400 mb-2">USDA Hardiness Zone</label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 text-sm"
              >
                {usdaZones.map((z) => (
                  <option key={z.zone} value={z.zone}>
                    Zone {z.zone} — {z.region} ({z.temp})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Sun Requirement</label>
              <div className="flex gap-2">
                {(["all","full-sun","part-shade","full-shade"] as SunFilter[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSunFilter(opt)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      sunFilter === opt ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    {opt === "all" ? "All" : SUN_ICONS[opt] + " " + opt.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Water Needs</label>
              <div className="flex gap-2">
                {(["all","low","medium","high"] as WaterFilter[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setWaterFilter(opt)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      waterFilter === opt ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    {opt === "all" ? "All" : WATER_ICONS[opt] + " " + opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Bloom Month</label>
              <div className="flex gap-1 flex-wrap">
                <button
                  onClick={() => setSelectedBloomMonth(null)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedBloomMonth === null ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  All
                </button>
                {months.map((m, idx) => (
                  <button
                    key={m}
                    onClick={() => setSelectedBloomMonth(selectedBloomMonth === idx + 1 ? null : idx + 1)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedBloomMonth === idx + 1 ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {currentZoneInfo && (
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-4 text-sm">
              <span className="text-emerald-400 font-semibold">Zone {selectedZone}</span>
              <span className="text-slate-400">{currentZoneInfo.region}</span>
              <span className="text-slate-500">Min temp: {currentZoneInfo.temp}</span>
              <span className="text-emerald-300 font-medium ml-auto">{filteredPlants.length} compatible plants</span>
            </div>
          )}
        </div>

        {/* Plant cards grid */}
        {filteredPlants.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredPlants.map((plant) => (
              <PlantCard
                key={plant.name}
                plant={plant}
                onAdd={handleAddPlant}
                isAdded={addedPlants.has(plant.name)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-500">
            <div className="text-5xl mb-4">🌱</div>
            <p className="text-lg font-medium text-slate-400">No plants match your filters</p>
            <p className="text-sm mt-1">Try adjusting your zone or filter settings</p>
          </div>
        )}
      </section>

      {/* ── Bloom Calendar ── */}
      <section id="bloom-calendar" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Bloom Calendar</h2>
        <p className="text-slate-400 text-center mb-10">Visualize when each plant provides nectar — aim for year-round color</p>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-slate-400 text-xs font-semibold uppercase tracking-wide p-4 w-44">Plant</th>
                {months.map((m) => (
                  <th key={m} className="text-center text-slate-500 text-xs font-medium p-2 w-12">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plants.map((plant, pi) => (
                <tr key={plant.name} className={pi % 2 === 0 ? "bg-slate-900" : "bg-slate-900/50"}>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: plant.colorHex }} />
                      <span className="text-sm text-slate-300 font-medium">{plant.name}</span>
                    </div>
                  </td>
                  {months.map((m, mi) => {
                    const active = plant.bloomMonths.includes(mi + 1);
                    return (
                      <td key={m} className="p-1">
                        <div
                          className={`h-7 rounded transition-all ${
                            active ? "opacity-90" : "bg-slate-800 opacity-30"
                          }`}
                          style={active ? { backgroundColor: plant.colorHex } : {}}
                          title={active ? `${plant.name} blooms in ${m}` : undefined}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-900 rounded-xl text-sm text-emerald-300">
          <strong>Garden tip:</strong> Aim for at least 3 plants blooming in every month of hummingbird season (April–October).
          Coral Honeysuckle and Salvia provide the longest continuous bloom periods.
        </div>
      </section>

      {/* ── Pollinator Leaderboard ── */}
      <section id="pollinator" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Pollinator Score Leaderboard</h2>
        <p className="text-slate-400 text-center mb-10">Ranked by effectiveness at attracting hummingbirds (score out of 100)</p>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
          {rankedPlants.map((plant, idx) => (
            <div
              key={plant.name}
              className={`flex items-center gap-4 px-6 py-4 border-b border-slate-800 last:border-0 ${
                idx === 0 ? "bg-gradient-to-r from-yellow-900/20 to-transparent" :
                idx === 1 ? "bg-gradient-to-r from-slate-700/20 to-transparent" :
                idx === 2 ? "bg-gradient-to-r from-amber-900/20 to-transparent" : ""
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 ${
                idx === 0 ? "bg-yellow-500 text-yellow-900" :
                idx === 1 ? "bg-slate-400 text-slate-900" :
                idx === 2 ? "bg-amber-600 text-amber-100" :
                "bg-slate-800 text-slate-400"
              }`}>
                {idx + 1}
              </div>
              <div className="w-4 h-4 rounded-sm flex-shrink-0" style={{ backgroundColor: plant.colorHex }} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-sm">{plant.name}</div>
                <div className="text-xs text-slate-500 italic">{plant.scientificName}</div>
              </div>
              <div className="flex-1 hidden sm:block">
                <PollinatorBar score={plant.pollinatorScore} />
              </div>
              <div className="text-lg font-black text-emerald-400 w-10 text-right">{plant.pollinatorScore}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Garden Layout Visualizer ── */}
      <section id="layout" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">Garden Layout Visualizer</h2>
        <p className="text-slate-400 text-center mb-10">Click cells to plant flowers. Select a plant brush from the legend below.</p>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
          {/* Plant brush selector */}
          <div className="mb-6">
            <div className="text-sm text-slate-400 mb-3 font-medium">
              Active brush: {activePlantBrush
                ? <span className="text-emerald-300 font-semibold">{activePlantBrush}</span>
                : <span className="text-slate-500">None selected — add plants from the zone finder above</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActivePlantBrush(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  activePlantBrush === null
                    ? "bg-red-900/50 border-red-700 text-red-300"
                    : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                }`}
              >
                🗑 Eraser
              </button>
              {Array.from(addedPlants).map((name) => {
                const color = PLANT_COLORS[name] ?? "#6ee7b7";
                return (
                  <button
                    key={name}
                    onClick={() => setActivePlantBrush(name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                      activePlantBrush === name
                        ? "border-white scale-105 shadow-lg"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                    style={activePlantBrush === name ? { backgroundColor: color + "33", borderColor: color } : {}}
                  >
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                    {name}
                  </button>
                );
              })}
              {addedPlants.size === 0 && (
                <span className="text-xs text-slate-600 italic py-1.5">Add plants above to use as brushes</span>
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="overflow-x-auto">
            <div className="inline-block">
              {/* Column labels */}
              <div className="flex mb-1">
                <div className="w-8" />
                {Array.from({ length: GRID_COLS }).map((_, ci) => (
                  <div key={ci} className="w-12 text-center text-xs text-slate-600">{ci + 1}</div>
                ))}
              </div>
              {gardenGrid.map((row, ri) => (
                <div key={ri} className="flex items-center mb-1">
                  <div className="w-8 text-xs text-slate-600 text-center">{String.fromCharCode(65 + ri)}</div>
                  {row.map((cell, ci) => {
                    const color = cell ? (PLANT_COLORS[cell] ?? "#6ee7b7") : null;
                    return (
                      <button
                        key={ci}
                        onClick={() => handleCellClick(ri, ci)}
                        title={cell ?? "Empty"}
                        className={`w-12 h-12 rounded-lg border transition-all hover:scale-105 mx-0.5 ${
                          cell ? "border-white/20" : "border-slate-700 hover:border-slate-500 bg-slate-800 hover:bg-slate-700"
                        }`}
                        style={cell && color ? { backgroundColor: color, boxShadow: `0 0 8px ${color}55` } : {}}
                      >
                        {cell && (
                          <span className="text-xs text-white/80 font-bold leading-none block text-center px-0.5 truncate">
                            {cell.split(" ")[0][0]}{cell.split(" ")[1]?.[0] ?? ""}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Grid controls */}
          <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
            <div className="text-sm text-slate-500">
              Grid: {GRID_ROWS} rows × {GRID_COLS} columns
              {" · "}
              Planted: {gardenGrid.flat().filter(Boolean).length} cells
            </div>
            <button
              onClick={clearGrid}
              className="text-xs bg-red-900/30 hover:bg-red-900/60 text-red-400 border border-red-900 px-4 py-2 rounded-lg transition-colors"
            >
              Clear Garden
            </button>
          </div>

          {/* Legend */}
          {addedPlants.size > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-500 mb-2">Plant Key</div>
              <div className="flex flex-wrap gap-3">
                {Array.from(addedPlants).map((name) => {
                  const color = PLANT_COLORS[name] ?? "#6ee7b7";
                  const initials = name.split(" ").map((w: string) => w[0]).slice(0, 2).join("");
                  return (
                    <div key={name} className="flex items-center gap-1.5 text-xs">
                      <div className="w-5 h-5 rounded flex items-center justify-center text-white font-bold text-[9px]"
                        style={{ backgroundColor: color }}>
                        {initials}
                      </div>
                      <span className="text-slate-400">{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── What Flowers Attract Hummingbirds ── */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-emerald-300">What Flowers Attract Hummingbirds?</h2>
        <p className="text-slate-400 text-center mb-10">Native vs exotic plants — why natives win for hummingbird habitat</p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-emerald-900/30 border border-emerald-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
              <span>🌿</span> Native Plants
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {[
                "Co-evolved with local hummingbird species over thousands of years",
                "Provide the right flower shape and nectar chemistry for native hummingbirds",
                "Support the insects hummingbirds also need for protein",
                "Require less water and maintenance once established",
                "Create sustainable habitat that persists year after year",
                "Best examples: Cardinal Flower, Bee Balm, Trumpet Vine, Columbine",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
              <span>🌺</span> Exotic/Non-Native Plants
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {[
                "Can still provide nectar, but may lack correct flower morphology",
                "Often bred for appearance, reducing nectar production",
                "May not support native insect populations",
                "Some (like Japanese honeysuckle) are invasive — avoid these",
                "Best exotic options: Fuchsia, Salvia coccinea, Agave",
                "Always prefer non-invasive exotic varieties",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "Tubular Shape", icon: "🌺", desc: "Hummingbirds evolved with tubular flowers that perfectly match their bill length. Flat flowers are less efficient." },
            { title: "Red & Orange Colors", icon: "🔴", desc: "Hummingbirds are strongly attracted to red, orange, and pink — they have excellent color vision extending into the UV spectrum." },
            { title: "High Nectar Volume", icon: "🍯", desc: "Plants that produce abundant, dilute-to-moderate sugar concentration nectar (20–25%) are most preferred." },
          ].map((item) => (
            <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h4 className="font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
