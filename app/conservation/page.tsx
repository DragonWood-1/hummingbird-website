import type { Metadata } from "next";
import Link from "next/link";
import { species } from "@/lib/species-data";

export const metadata: Metadata = {
  title: "Hummingbird Conservation Status & Life Span Data",
  description: "Explore hummingbird conservation status by species, population trends, threats to hummingbirds, lifespan data, and how you can help protect these amazing birds.",
  keywords: ["hummingbird conservation","hummingbird lifespan","threatened hummingbirds","hummingbird population","protect hummingbirds","hummingbird habitat loss","IUCN hummingbird"],
  alternates: { canonical: "https://hummingbirdguide.com/conservation" },
};

const threats = [
  {
    title: "Habitat Loss",
    icon: "🌳",
    description: "Deforestation and urbanization destroy critical habitat, especially in tropical wintering grounds in Central America.",
    severity: "Critical",
    color: "red",
  },
  {
    title: "Climate Change",
    icon: "🌡️",
    description: "Shifting temperatures alter migration timing and flower blooming cycles, creating mismatches between hummingbirds and their food sources.",
    severity: "High",
    color: "orange",
  },
  {
    title: "Pesticide Use",
    icon: "🧪",
    description: "Insecticides reduce insect populations that hummingbirds rely on for protein, and can directly harm birds.",
    severity: "High",
    color: "orange",
  },
  {
    title: "Window Collisions",
    icon: "🪟",
    description: "Millions of birds including hummingbirds die annually from window strikes. Window treatments can dramatically reduce this.",
    severity: "Moderate",
    color: "yellow",
  },
  {
    title: "Cat Predation",
    icon: "🐱",
    description: "Free-roaming cats are a leading cause of bird mortality. Keeping cats indoors saves billions of birds per year.",
    severity: "Moderate",
    color: "yellow",
  },
  {
    title: "Feeder Contamination",
    icon: "🌸",
    description: "Dirty feeders can spread mold and disease. Regular cleaning (every 2-3 days in heat) is essential.",
    severity: "Low",
    color: "blue",
  },
];

const lifespanData = [
  { species: "Ruby-throated Hummingbird", typical: "3–5 years", maximum: "9 years 1 month", notes: "Record held by a banded female in Michigan" },
  { species: "Anna's Hummingbird", typical: "4–6 years", maximum: "8 years 2 months", notes: "Year-round residents may live longer" },
  { species: "Rufous Hummingbird", typical: "3–5 years", maximum: "8 years 11 months", notes: "Long migrants face higher mortality" },
  { species: "Black-chinned Hummingbird", typical: "3–6 years", maximum: "10 years", notes: "One of the longest-lived North American hummingbirds" },
  { species: "Broad-tailed Hummingbird", typical: "4–6 years", maximum: "12 years", notes: "High-altitude specialists may live longer" },
  { species: "Calliope Hummingbird", typical: "3–5 years", maximum: "8 years", notes: "Smallest bird with longest migration relative to size" },
  { species: "Blue-throated Mountain-gem", typical: "5–8 years", maximum: "12 years", notes: "Larger body size correlates with longer lifespan" },
];

const howToHelp = [
  { icon: "🌺", title: "Plant Native Flowers", description: "Native wildflowers provide the best nectar and attract the insects hummingbirds need for protein.", action: "See our plant guide" },
  { icon: "🧹", title: "Clean Feeders Regularly", description: "Wash feeders with hot water every 2-3 days. Use 4:1 water-to-sugar solution (no dye).", action: "Feeder care guide" },
  { icon: "🐦", title: "Make Windows Safe", description: "Apply window film, decals, or screens to reduce deadly collisions. One collision per window per year is too many.", action: "Window safety tips" },
  { icon: "🏡", title: "Create Habitat", description: "Let part of your yard grow wild. Dense shrubs provide nesting sites and insect habitat.", action: "Habitat guide" },
  { icon: "📊", title: "Report Sightings", description: "Submit sightings to eBird, Journey North, or HummingbirdMonitor.org to help scientists track populations.", action: "Submit a sighting" },
  { icon: "🌍", title: "Support Conservation Orgs", description: "Hummingbird Society, ABC, and Audubon work to protect habitats on both breeding and wintering grounds.", action: "Donate" },
];

const statusByCode: Record<string, { label: string; description: string; color: string; bgColor: string }> = {
  LC: { label: "Least Concern", description: "Population stable or increasing. Not facing significant threats.", color: "text-green-800", bgColor: "bg-green-100 border-green-200" },
  NT: { label: "Near Threatened", description: "Approaching thresholds for threatened status. Monitoring required.", color: "text-yellow-800", bgColor: "bg-yellow-100 border-yellow-200" },
  VU: { label: "Vulnerable", description: "Faces a high risk of extinction in the wild if threats continue.", color: "text-orange-800", bgColor: "bg-orange-100 border-orange-200" },
  EN: { label: "Endangered", description: "Faces a very high risk of extinction. Immediate conservation action needed.", color: "text-red-800", bgColor: "bg-red-100 border-red-200" },
  CR: { label: "Critically Endangered", description: "Faces an extremely high risk of extinction. Emergency intervention required.", color: "text-white", bgColor: "bg-red-900 border-red-800" },
};

export default function ConservationPage() {
  const speciesGroups = {
    LC: species.filter(s => s.conservationCode === "LC"),
    NT: species.filter(s => s.conservationCode === "NT"),
    VU: species.filter(s => s.conservationCode === "VU"),
    EN: species.filter(s => s.conservationCode === "EN"),
    CR: species.filter(s => s.conservationCode === "CR"),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Hummingbird Conservation Status",
            description: "IUCN conservation status, lifespan data, threats, and conservation actions for North American hummingbirds.",
            url: "https://hummingbirdguide.com/conservation",
          }),
        }}
      />

      {/* Hero */}
      <section className="pt-16 hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <span className="inline-block bg-red-500/20 text-red-300 border border-red-500/30 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            Conservation
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Hummingbird<br />
            <span className="hero-text-gradient">Conservation Center</span>
          </h1>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
            Understanding conservation status, population trends, lifespan data, and concrete actions to protect these remarkable birds.
          </p>
        </div>
      </section>

      {/* Conservation status overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">IUCN Conservation Status Guide</h2>
            <p className="section-subheading mx-auto">The International Union for Conservation of Nature classifies species into these categories based on population data and threat analysis.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {Object.entries(statusByCode).map(([code, info]) => (
              <div key={code} className={`p-5 rounded-2xl border ${info.bgColor}`}>
                <div className={`text-2xl font-bold mb-1 ${info.color}`}>{code}</div>
                <div className={`font-semibold mb-2 ${info.color}`}>{info.label}</div>
                <p className={`text-xs leading-relaxed ${info.color} opacity-80`}>{info.description}</p>
                <div className="mt-3 text-right">
                  <span className={`text-xs font-bold ${info.color}`}>
                    {speciesGroups[code as keyof typeof speciesGroups]?.length || 0} species in our guide
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Species by status */}
          <div className="space-y-8">
            {Object.entries(speciesGroups).filter(([,arr]) => arr.length > 0).map(([code, speciesList]) => (
              <div key={code}>
                <h3 className={`text-lg font-bold mb-4 flex items-center gap-3`}>
                  <span className={`px-3 py-1 rounded-full text-sm border ${statusByCode[code].bgColor} ${statusByCode[code].color}`}>
                    {code} — {statusByCode[code].label}
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {speciesList.map((sp) => (
                    <Link key={sp.slug} href={`/species/${sp.slug}`} className="feature-card p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full" style={{ background: `linear-gradient(135deg, ${sp.colors.primary}, ${sp.colors.secondary})` }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate">{sp.commonName}</div>
                        <div className="text-sm text-emerald-600 italic truncate">{sp.scientificName}</div>
                        <div className="text-xs text-gray-500 mt-1">Lifespan: {sp.lifespan}</div>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threats */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Threats to Hummingbirds</h2>
            <p className="section-subheading mx-auto">Understanding what hummingbirds face is the first step toward protecting them.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {threats.map((threat) => (
              <div key={threat.title} className="feature-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl">{threat.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{threat.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                      threat.color === "red" ? "bg-red-100 text-red-700 border-red-200" :
                      threat.color === "orange" ? "bg-orange-100 text-orange-700 border-orange-200" :
                      threat.color === "yellow" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                      "bg-blue-100 text-blue-700 border-blue-200"
                    }`}>
                      {threat.severity} Threat
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{threat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifespan data */}
      <section id="lifespan" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Hummingbird Life Span Data</h2>
            <p className="section-subheading mx-auto">Despite their tiny size, hummingbirds can live surprisingly long lives. Data from banding programs across North America.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-emerald-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-emerald-900">Species</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-emerald-900">Typical Lifespan</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-emerald-900">Maximum Recorded</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-emerald-900">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {lifespanData.map((row) => (
                  <tr key={row.species} className="hover:bg-emerald-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-900">{row.species}</td>
                    <td className="py-4 px-4">
                      <span className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full">{row.typical}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{row.maximum}</span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
            <h3 className="font-bold text-emerald-900 mb-2">About Hummingbird Longevity</h3>
            <p className="text-emerald-800 text-sm leading-relaxed">
              Hummingbirds have extraordinarily high metabolic rates — their hearts beat up to 1,200 times per minute and their wings beat 50+ times per second. Despite this, they can live remarkably long lives for such small birds. The oldest known wild hummingbird was a Broad-tailed Hummingbird that lived 12 years. Banding programs operated by licensed researchers are the primary source of lifespan data. To enter torpor each night — dropping heart rate from 1,200 to just 50 beats per minute — may help hummingbirds extend their lives by conserving energy.
            </p>
          </div>
        </div>
      </section>

      {/* How to help */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>How You Can Help</h2>
            <p className="text-emerald-200 text-lg max-w-2xl mx-auto">Every backyard birder and gardener can make a real difference for hummingbird populations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {howToHelp.map((item) => (
              <div key={item.title} className="bg-emerald-800/50 border border-emerald-700/50 rounded-2xl p-6 hover:bg-emerald-800 transition-colors">
                <span className="text-3xl block mb-4">{item.icon}</span>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-emerald-300 text-sm leading-relaxed mb-4">{item.description}</p>
                <span className="text-emerald-400 text-sm font-semibold hover:text-emerald-300 cursor-pointer">{item.action} →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Population trends */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Population Trends</h2>
            <p className="section-subheading mx-auto">Long-term monitoring data from the North American Breeding Bird Survey and bird banding programs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                species: "Ruby-throated Hummingbird",
                trend: "Stable",
                change: "+2%",
                icon: "↗",
                color: "green",
                detail: "Population stable at ~20 million. Feeder availability may have boosted populations in marginal habitats.",
              },
              {
                species: "Rufous Hummingbird",
                trend: "Declining",
                change: "-60%",
                icon: "↘",
                color: "red",
                detail: "Population has declined approximately 60% since 1970. Habitat loss on wintering grounds in Mexico is a primary driver.",
              },
              {
                species: "Anna's Hummingbird",
                trend: "Increasing",
                change: "+300%",
                icon: "↑",
                color: "green",
                detail: "Range has dramatically expanded northward since the 1930s, aided by urban gardens, feeders, and exotic plantings.",
              },
            ].map((item) => (
              <div key={item.species} className="feature-card p-6">
                <h3 className="font-bold text-gray-900 mb-2">{item.species}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-3xl font-bold ${item.color === "green" ? "text-green-600" : "text-red-600"}`}>{item.change}</span>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${item.color === "green" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{item.trend}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-50 border-t border-emerald-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">Ready to Make a Difference?</h2>
          <p className="text-emerald-700 mb-8">Start with your own backyard — plant native flowers, maintain clean feeders, and report your sightings to help scientists track populations.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/garden-planner" className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
              Plan Your Hummingbird Garden
            </Link>
            <Link href="/shop#feeders" className="px-6 py-3 border-2 border-emerald-600 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-colors">
              Shop Feeders
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
