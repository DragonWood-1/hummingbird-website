import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { species, getSpeciesBySlug } from "@/lib/species-data";

/* ------------------------------------------------------------------ */
/*  Static generation                                                   */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return species.map((sp) => ({ slug: sp.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                            */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const sp = getSpeciesBySlug(params.slug);
  if (!sp) return { title: "Species Not Found" };

  return {
    title: `${sp.commonName} – ${sp.scientificName} | Species Profile`,
    description: sp.description.slice(0, 160),
    keywords: [
      sp.commonName,
      sp.scientificName,
      "hummingbird identification",
      "hummingbird species",
      "hummingbird facts",
      "hummingbird migration",
      "hummingbird habitat",
      ...sp.colorTags,
      ...sp.habitat.slice(0, 3),
    ],
    alternates: {
      canonical: `https://hummingbirdwatcher.com/species/${sp.slug}`,
    },
    openGraph: {
      title: `${sp.commonName} (${sp.scientificName})`,
      description: sp.description.slice(0, 200),
      url: `https://hummingbirdwatcher.com/species/${sp.slug}`,
      images: [
        {
          url: sp.imageUrl,
          width: 640,
          height: 480,
          alt: sp.commonName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${sp.commonName} | HummingbirdWatcher.com`,
      description: sp.description.slice(0, 200),
      images: [sp.imageUrl],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function ConservationBadge({
  code,
  label,
}: {
  code: string;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center text-sm font-bold px-3 py-1 rounded-full border status-${code.toLowerCase()}`}
      title={label}
    >
      {code}&nbsp;
      <span className="font-normal">{label}</span>
    </span>
  );
}

function StatBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center">
      <p className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-base font-bold text-emerald-900">{value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                      */
/* ------------------------------------------------------------------ */

export default function SpeciesProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const sp = getSpeciesBySlug(params.slug);
  if (!sp) notFound();

  /* JSON-LD structured data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${sp.commonName} (${sp.scientificName}) – Hummingbird Species Profile`,
    description: sp.description,
    image: sp.imageUrl,
    author: { "@type": "Organization", name: "HummingbirdWatcher.com" },
    publisher: {
      "@type": "Organization",
      name: "HummingbirdWatcher.com",
      logo: {
        "@type": "ImageObject",
        url: "https://hummingbirdwatcher.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hummingbirdwatcher.com/species/${sp.slug}`,
    },
    keywords: [sp.commonName, sp.scientificName, "hummingbird", ...sp.colorTags].join(", "),
  };

  /* Similar species: same colorTags overlap, exclude self */
  const similar = species
    .filter(
      (s) =>
        s.slug !== sp.slug &&
        s.colorTags.some((t) => sp.colorTags.includes(t))
    )
    .slice(0, 3);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative h-[480px] md:h-[560px] overflow-hidden">
        {/* Background image */}
        <img
          src={sp.imageUrl}
          alt={sp.commonName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Link
            href="/encyclopedia"
            className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-100 text-sm font-medium mb-4 transition-colors"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Encyclopedia
          </Link>

          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-0">
              <h1
                className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {sp.commonName}
              </h1>
              <p className="text-xl md:text-2xl text-emerald-300 italic mb-4">
                {sp.scientificName}
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                <ConservationBadge
                  code={sp.conservationCode}
                  label={sp.conservationStatus}
                />
                <span className="text-sm text-white/70">
                  Family: {sp.family}
                </span>
              </div>
            </div>

            {/* Color swatches */}
            <div className="flex gap-2 items-center">
              <div
                className="w-9 h-9 rounded-full border-2 border-white/80 shadow-lg"
                style={{ backgroundColor: sp.colors.primary }}
                title="Primary color"
              />
              <div
                className="w-9 h-9 rounded-full border-2 border-white/80 shadow-lg"
                style={{ backgroundColor: sp.colors.secondary }}
                title="Secondary color"
              />
              {sp.colors.throat && (
                <div
                  className="w-9 h-9 rounded-full border-2 border-white/80 shadow-lg"
                  style={{ backgroundColor: sp.colors.throat }}
                  title="Throat / gorget color"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left — main column */}
          <div className="lg:col-span-2 space-y-12">

            {/* Overview */}
            <section>
              <h2
                className="section-heading mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {sp.description}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                <StatBox label="Length" value={sp.length} />
                <StatBox label="Weight" value={sp.weight} />
                <StatBox label="Wingspan" value={sp.wingspan} />
                <StatBox label="Lifespan" value={sp.lifespan} />
              </div>
            </section>

            {/* Fun Fact callout */}
            <div className="bg-emerald-700 text-white rounded-2xl p-7 flex gap-5 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-2xl">
                💡
              </div>
              <div>
                <p className="text-emerald-200 text-xs font-semibold uppercase tracking-widest mb-2">
                  Fun Fact
                </p>
                <p className="text-lg font-semibold leading-relaxed">
                  &ldquo;{sp.funFact}&rdquo;
                </p>
              </div>
            </div>

            {/* Facts */}
            <section>
              <h2
                className="section-heading mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Fascinating Facts
              </h2>
              <ul className="space-y-3">
                {sp.facts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{fact}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Migration */}
            <section>
              <h2
                className="section-heading mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Migration &amp; Nesting
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-sky-500 uppercase tracking-widest mb-2">
                    Northward Migration
                  </p>
                  <p className="font-bold text-sky-900">
                    {sp.migrationMonths.north}
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-2">
                    Southward Migration
                  </p>
                  <p className="font-bold text-amber-900">
                    {sp.migrationMonths.south}
                  </p>
                </div>
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-2">
                    Nesting Season
                  </p>
                  <p className="font-bold text-rose-900">{sp.nestingMonths}</p>
                </div>
              </div>
            </section>

            {/* Garden Tips */}
            <section>
              <h2
                className="section-heading mb-5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Garden Tips &amp; Preferred Flowers
              </h2>
              <p className="text-gray-600 mb-5">
                Plant these nectar-rich flowers to attract{" "}
                <strong>{sp.commonName}</strong> to your garden:
              </p>
              <div className="flex flex-wrap gap-2">
                {sp.flowers.map((flower) => (
                  <span
                    key={flower}
                    className="inline-flex items-center gap-1.5 bg-white border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
                  >
                    <span
                      className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"
                    />
                    {flower}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/garden-planner"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Build Your Garden Plan
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
              </div>
            </section>

            {/* Similar Species */}
            {similar.length > 0 && (
              <section>
                <h2
                  className="section-heading mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Similar Species
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similar.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/species/${s.slug}`}
                      className="species-card group"
                    >
                      <div className="relative h-36 overflow-hidden bg-emerald-100">
                        <img
                          src={s.imageUrl}
                          alt={s.commonName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-4">
                        <p className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {s.commonName}
                        </p>
                        <p className="text-xs text-emerald-600 italic">
                          {s.scientificName}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right — sidebar */}
          <aside className="space-y-7">

            {/* At a Glance */}
            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-emerald-900 text-lg mb-5">
                At a Glance
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-500 font-medium">Diet</dt>
                  <dd className="text-gray-900 text-right">{sp.diet}</dd>
                </div>
                <div className="border-t border-emerald-50 pt-3 flex justify-between gap-2">
                  <dt className="text-gray-500 font-medium">Conservation</dt>
                  <dd className="text-right">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full border status-${sp.conservationCode.toLowerCase()}`}
                    >
                      {sp.conservationCode}
                    </span>
                  </dd>
                </div>
                <div className="border-t border-emerald-50 pt-3">
                  <dt className="text-gray-500 font-medium mb-2">Colors</dt>
                  <dd className="flex gap-2">
                    {sp.colorTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Habitat */}
            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-emerald-900 text-lg mb-4">
                Habitat
              </h3>
              <div className="flex flex-wrap gap-2">
                {sp.habitat.map((h) => (
                  <span
                    key={h}
                    className="text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-100 font-medium"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Range */}
            <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-emerald-900 text-lg mb-4">
                Range
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {sp.range.map((r) => (
                  <span
                    key={r}
                    className="text-xs bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full border border-sky-100"
                  >
                    {r}
                  </span>
                ))}
              </div>

              <h4 className="text-sm font-semibold text-gray-700 mb-2 mt-4">
                US States
              </h4>
              <div className="flex flex-wrap gap-1">
                {sp.states.map((state) => (
                  <Link
                    key={state}
                    href={`/atlas#states`}
                    className="text-xs bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-700 px-2 py-0.5 rounded border border-gray-200 hover:border-emerald-200 transition-colors"
                  >
                    {state}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-emerald-900 text-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Explore More</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/encyclopedia"
                    className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors"
                  >
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
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    Species Encyclopedia
                  </Link>
                </li>
                <li>
                  <Link
                    href="/migration"
                    className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors"
                  >
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
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    Migration Tracker
                  </Link>
                </li>
                <li>
                  <Link
                    href="/garden-planner"
                    className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors"
                  >
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
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    Garden Planner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/atlas"
                    className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors"
                  >
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
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                      />
                    </svg>
                    Hummingbird Atlas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/conservation"
                    className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors"
                  >
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Conservation
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
