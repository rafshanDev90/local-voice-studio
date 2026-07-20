"use client";

import { useState } from "react";

const products = [
  {
    id: "tts",
    title: "Text to Speech",
    description:
      "Natural voiceovers using Kokoro ONNX. 20+ voice presets across 5 languages with smart script optimization.",
    href: "/app/speech-synthesis/text-to-speech",
    status: "ready" as const,
    features: [
      "20+ neural voice presets",
      "5 language support",
      "Smart script optimization",
      "Real-time streaming",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <path d="M12 18.5A6.5 6.5 0 0 0 18.5 12M12 18.5A6.5 6.5 0 0 1 5.5 12M12 18.5v3M8 21.5h8" />
        <circle cx="12" cy="6" r="4" />
      </svg>
    ),
  },
  {
    id: "cleaner",
    title: "Voice Cleaner",
    description:
      "Remove background noise from voice recordings using AI-powered spectral gating. Clean audio in seconds.",
    href: "/app/voice-cleaner",
    status: "ready" as const,
    features: [
      "AI noise reduction",
      "Multiple format support",
      "Adjustable intensity",
      "Instant processing",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <path d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>
    ),
  },
  {
    id: "audiobook",
    title: "Audiobook",
    description:
      "Turn books, articles, and long-form text into narrated audiobooks with chapter navigation and smart prosody.",
    href: "/app/audiobook",
    status: "ready" as const,
    features: [
      "Chapter navigation",
      "Smart prosody",
      "Bookmark support",
      "Export to MP3",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

export function ProductShowcase() {
  const [active, setActive] = useState("tts");
  const product = products.find((p) => p.id === active) ?? products[0]!;

  return (
    <section className="bg-white py-20 lg:py-28" id="products">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-brand-mustard">
            Products
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Everything you need
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
          {/* Tab list */}
          <div className="flex flex-row gap-2 lg:flex-col">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`group flex flex-1 items-center gap-3 rounded-xl p-4 text-left transition-all lg:flex-initial ${
                  active === p.id
                    ? "bg-brand-maroon text-white shadow-lg shadow-brand-maroon/20"
                    : "bg-surface-secondary text-text-secondary hover:bg-surface-tertiary"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    active === p.id
                      ? "bg-white/20 text-white"
                      : "bg-border/50 text-text-secondary"
                  }`}
                >
                  {p.icon}
                </div>
                <div className="hidden min-w-0 lg:block">
                  <div className="text-sm font-medium">{p.title}</div>
                  <div
                    className={`mt-0.5 text-xs ${
                      active === p.id ? "text-white/70" : "text-text-tertiary"
                    }`}
                  >
                    {p.status === "ready" ? "Ready" : "Coming soon"}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="rounded-2xl border border-border/50 bg-surface-secondary p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-maroon text-white shadow-sm">
                {product.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">
                  {product.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Features list */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {product.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2.5 rounded-lg border border-border/40 bg-white px-4 py-3"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-brand-emerald"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-text-primary">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href={product.status === "ready" ? product.href : "#"}
                className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                  product.status === "ready"
                    ? "bg-brand-maroon text-white hover:shadow-md hover:-translate-y-0.5"
                    : "cursor-not-allowed bg-border/50 text-text-tertiary"
                }`}
              >
                {product.status === "ready" ? "Open" : "Coming soon"}
                {product.status === "ready" && (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
