import Link from "next/link";
import { species } from "@/lib/species-data";
import { plants } from "@/lib/plants-data";

export default function HomePage() {
  const featuredSpecies = species.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-800/60 backdrop-blur-sm border border-emerald-600/30 text-emerald-300 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Migration Season Active — Track hummingbirds now →
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Complete{" "}
              <span className="hero-text-gradient">Hummingbird</span>{" "}
              Guide
            </h1>

            <p className="text-xl md:text-2xl text-emerald-200 leading-relaxed mb-10 max-w-3xl">
              Encyclopedia, migration maps, garden planner, species identifier, and conservation tools — everything for hummingbird lovers in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/encyclopedia" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-emerald-900/50 hover:shadow-emerald-500/30 hover:-translate-y-0.5">
                Explore Encyclopedia
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/migration" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-2xl border border-white/20 transition-all backdrop-blur-sm">
                View Migration Map
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              </Link>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "360+", label: "Species Worldwide", icon: "🐦" },
                { value: "17", label: "US Breeding Species", icon: "🇺🇸" },
                { value: "3,900mi", label: "Longest Migration", icon: "🗺️" },
                { value: "50+", label: "Hummingbird Plants", icon: "🌺" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-emerald-300 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Everything About Hummingbirds</h2>
            <p className="section-subheading mx-auto">From encyclopedia to garden planning — explore all our tools and resources.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: "/encyclopedia",
                icon: "📚",
                title: "Species Encyclopedia",
                description: "Detailed profiles for 360+ hummingbird species worldwide, including facts, habitat, diet, and range maps.",
                color: "from-emerald-500 to-teal-600",
                tags: ["Species Profiles", "Life Span Data", "Conservation Status"],
              },
              {
                href: "/migration",
                icon: "🗺️",
                title: "Migration Tracker",
                description: "Interactive migration maps with real-time data overlays, heat maps, range boundaries, and seasonal sighting reports.",
                color: "from-blue-500 to-cyan-600",
                tags: ["Heat Maps", "Range Overlays", "Seasonal Alerts"],
              },
              {
                href: "/garden-planner",
                icon: "🌿",
                title: "Garden Planner",
                description: "Build your perfect hummingbird garden with plant recommendations, USDA zone compatibility, bloom calendars, and a layout visualizer.",
                color: "from-green-500 to-emerald-600",
                tags: ["Plant Recs", "USDA Zones", "Bloom Calendar"],
              },
              {
                href: "/identifier",
                icon: "🔍",
                title: "Species Identifier",
                description: "Identify hummingbirds by color, size, range, and field marks. Compare similar species side by side.",
                color: "from-purple-500 to-violet-600",
                tags: ["Color ID", "Size", "Range"],
              },
              {
                href: "/atlas",
                icon: "🌍",
                title: "Hummingbird Atlas",
                description: "Explore hummingbird distribution worldwide — interactive maps by state, country, and habitat type.",
                color: "from-amber-500 to-orange-600",
                tags: ["World Maps", "By State", "Habitats"],
              },
              {
                href: "/conservation",
                icon: "🌱",
                title: "Conservation Center",
                description: "Track conservation status, threats, and population trends. Learn how to help protect hummingbirds.",
                color: "from-red-500 to-rose-600",
                tags: ["IUCN Status", "Population Data", "How to Help"],
              },
            ].map((feature) => (
              <Link key={feature.href} href={feature.href} className="feature-card p-6 group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full border border-emerald-100">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Species */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="section-heading">Featured Species</h2>
              <p className="text-emerald-700 mt-2">Meet North America&apos;s most beloved hummingbirds</p>
            </div>
            <Link href="/encyclopedia" className="hidden md:inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-800 transition-colors">
              View All Species
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSpecies.map((sp) => (
              <Link key={sp.slug} href={`/species/${sp.slug}`} className="species-card group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={sp.imageUrl}
                    alt={sp.commonName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.parentElement!.style.background = `linear-gradient(135deg, ${sp.colors.primary}, ${sp.colors.secondary})`;
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full border status-${sp.conservationCode.toLowerCase()}`}>
                      {sp.conservationCode}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{sp.commonName}</h3>
                  <p className="text-sm text-emerald-600 italic mb-3">{sp.scientificName}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{sp.description.substring(0, 120)}...</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs text-gray-500">📏 {sp.length}</span>
                    <span className="text-xs text-gray-500">⚖️ {sp.weight}</span>
                    <span className="text-xs text-gray-500">🌍 {sp.conservationStatus}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/encyclopedia" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
              Explore All 9 Species Profiles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Migration highlight */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-emerald-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #10b981 0%, transparent 50%), radial-gradient(circle at 80% 50%, #0077b6 0%, transparent 50%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-emerald-500/20 text-emerald-400 text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-emerald-500/30">
                Live Migration Data
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Track the Great<br />Hummingbird Migration
              </h2>
              <p className="text-emerald-200 text-lg leading-relaxed mb-8">
                Follow the remarkable journeys of hummingbirds across North America. Interactive maps show real-time sighting data, historical migration corridors, and predictive models for when to expect hummingbirds in your area.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "🗺️", label: "Migration Routes", desc: "All major corridors mapped" },
                  { icon: "🌡️", label: "Weather Overlays", desc: "Temperature & wind data" },
                  { icon: "📊", label: "Heat Maps", desc: "Density by region & season" },
                  { icon: "🔔", label: "Arrival Alerts", desc: "Notifications for your area" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{item.label}</div>
                      <div className="text-emerald-400 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/migration" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all">
                Open Migration Tracker
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            {/* Simplified map preview */}
            <div className="bg-emerald-900/40 rounded-3xl p-6 border border-emerald-700/30 backdrop-blur-sm">
              <div className="text-center mb-4">
                <span className="text-xs text-emerald-400 uppercase tracking-wider">Spring Migration Timeline</span>
              </div>
              <div className="space-y-3">
                {[
                  { month: "February", region: "Southern Texas, Florida", active: true },
                  { month: "March", region: "Gulf Coast, Southeast", active: true },
                  { month: "April", region: "Mid-Atlantic, Midwest", active: true },
                  { month: "May", region: "Northeast, Great Lakes", active: false },
                  { month: "June", region: "Canada, Northern Rockies", active: false },
                ].map((item, i) => (
                  <div key={item.month} className="flex items-center gap-4">
                    <div className="w-20 text-right text-sm text-emerald-300 font-medium">{item.month}</div>
                    <div className="flex-1 h-8 bg-emerald-900/60 rounded-lg relative overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg transition-all"
                        style={{ width: `${(5 - i) * 18}%`, opacity: item.active ? 1 : 0.3 }}
                      />
                      <span className="absolute inset-0 flex items-center px-3 text-xs text-white">{item.region}</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${item.active ? "bg-emerald-400 animate-pulse" : "bg-gray-600"}`} />
                  </div>
                ))}
              </div>
              <div className="mt-6 p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 text-center">
                <p className="text-emerald-300 text-xs">📍 Set your location for personalized arrival predictions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garden planner teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Plant cards preview */}
            <div className="grid grid-cols-2 gap-4">
              {plants.slice(0, 4).map((plant) => (
                <div key={plant.name} className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: plant.colorHex }} />
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{plant.name}</div>
                      <div className="text-xs text-gray-500">Zones {plant.usdaZones}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-medium">Score: {plant.pollinatorScore}/100</span>
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${plant.pollinatorScore}%` }} />
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {plant.bloomMonths.slice(0, 3).map((m) => (
                      <span key={m} className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                        {["J","F","M","A","M","J","J","A","S","O","N","D"][m-1]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-green-200">
                🌿 Garden Planner
              </span>
              <h2 className="section-heading mb-4">Design Your Perfect Hummingbird Garden</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our interactive garden planner helps you choose the best plants for your region, visualize your layout, and maximize pollinator scores — ensuring hummingbirds visit all season long.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "USDA hardiness zone compatibility checker",
                  "Month-by-month bloom calendar to ensure year-round nectar",
                  "Drag-and-drop garden layout visualizer",
                  "Pollinator scoring system for each plant combination",
                  "Native vs. exotic plant recommendations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/garden-planner" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all">
                Launch Garden Planner
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ruby-throated spotlight */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Ruby-throated Hummingbird Facts</h2>
            <p className="section-subheading mx-auto">North America&apos;s most beloved backyard visitor</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { icon: "💓", value: "1,200 BPM", label: "Heart rate during flight", color: "rose" },
              { icon: "🪶", value: "53×/sec", label: "Wing beats per second", color: "emerald" },
              { icon: "✈️", value: "500 mi", label: "Non-stop Gulf crossing", color: "blue" },
              { icon: "🧠", value: "4.2%", label: "Brain-to-body ratio", color: "purple" },
            ].map((fact) => (
              <div key={fact.label} className={`bg-white rounded-2xl p-6 text-center border border-${fact.color}-100 shadow-sm hover:shadow-md transition-shadow`}>
                <div className="text-4xl mb-3">{fact.icon}</div>
                <div className={`text-3xl font-bold text-${fact.color}-600 mb-2`}>{fact.value}</div>
                <div className="text-sm text-gray-600">{fact.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/species/ruby-throated-hummingbird" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all">
              Read Full Ruby-throated HB Profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Shop Hummingbird Essentials</h2>
            <p className="section-subheading mx-auto">Feeders, art prints, garden seeds, and coloring pages — curated for hummingbird enthusiasts</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: "🎨", title: "Coloring Pages", desc: "Printable hummingbird art", href: "/shop#coloring-pages", color: "from-pink-400 to-rose-500" },
              { icon: "🌸", title: "Hummingbird Feeders", desc: "Top-rated feeders", href: "/shop#feeders", color: "from-red-400 to-orange-500" },
              { icon: "🖼️", title: "Art Prints", desc: "Beautiful wall art", href: "/shop#art-prints", color: "from-purple-400 to-violet-500" },
              { icon: "🪴", title: "Garden Decor", desc: "Stakes, ornaments & more", href: "/shop#decor", color: "from-emerald-400 to-teal-500" },
              { icon: "🌱", title: "Garden Seeds", desc: "Hummingbird-attractive plants", href: "/shop#seeds", color: "from-green-400 to-emerald-500" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="shop-card text-center p-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-600 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
              Browse Full Shop
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO: Hummingbirds by state teaser */}
      <section className="py-16 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Hummingbirds in Your State
          </h2>
          <p className="text-emerald-300 mb-8">Find which hummingbird species visit your state and the best times to see them.</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {["Arizona","California","Texas","Colorado","New York","Florida","Washington","Oregon","New Mexico","Alaska","Michigan","Georgia","Colorado","Illinois","North Carolina"].map((state) => (
              <Link
                key={state}
                href={`/atlas#${state.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm bg-emerald-900 hover:bg-emerald-700 text-emerald-300 hover:text-white px-3 py-2 rounded-lg transition-colors border border-emerald-800"
              >
                {state}
              </Link>
            ))}
            <Link href="/atlas#states" className="text-sm bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg transition-colors font-semibold">
              All 50 States →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
