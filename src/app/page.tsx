"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LevelGrid from "@/components/LevelGrid";
import { useAppContext } from "@/context/AppContext";
import {
  Zap,
  Layers as LayersIcon,
  RefreshCw,
  BarChart3,
  GraduationCap,
} from "lucide-react";

export default function Home() {
  const { isLoaded } = useAppContext();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-14 w-14 animate-pulse">
            <Image src="/manabu_logo.png" alt="Manabu" fill sizes="56px" className="object-contain" />
          </div>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fc]">
      <Header />

      <main className="flex-1">

        {/* ── Hero ───────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white border-b border-slate-100">
          {/* Soft blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-indigo-100/60 blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-100/50 blur-[60px]" />
            <div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/40 blur-[70px]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-4 py-14 sm:py-20 sm:px-6">
            <div className="flex flex-col items-center text-center">
              {/* Logo */}
              <div className="animate-fade-in-up mb-6 relative h-20 w-20 sm:h-24 sm:w-24 drop-shadow-md">
                <Image src="/manabu_logo.png" alt="Manabu" fill sizes="96px" className="object-contain" priority />
              </div>

              {/* Headline */}
              <h1 className="animate-fade-in-up delay-100 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Master{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">
                  JLPT Kanji
                </span>
              </h1>

              <p className="animate-fade-in-up delay-200 mt-4 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
                Flashcards covering <strong className="text-slate-700">N5 → N1</strong> with beautiful flip
                animations and progress tracking — in{" "}
                <strong className="text-slate-700">6 languages</strong>.
              </p>

              {/* Stat pills */}
              <div className="animate-fade-in-up delay-300 mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
                {[
                  { label: "3,000+ Kanji", color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
                  { label: "6 Languages",  color: "bg-violet-50 text-violet-700 border-violet-100" },
                  { label: "5 JLPT Levels",color: "bg-sky-50    text-sky-700    border-sky-100"    },
                  { label: "Offline Ready", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                ].map((p) => (
                  <span
                    key={p.label}
                    className={`rounded-full border px-3.5 py-1 text-xs font-semibold ${p.color}`}
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Level Dashboard ─────────────────────────── */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">Choose Your Level</h2>
            <p className="mt-1 text-sm text-slate-500">Tap a card to start studying</p>
          </div>
          <LevelGrid />
        </section>

        {/* ── How It Works ────────────────────────────── */}
        <section className="bg-white border-t border-slate-100">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
            {/* Header */}
            <div className="mx-auto mb-14 max-w-xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 ring-1 ring-indigo-100">
                <Zap className="h-3 w-3" />
                Simple &amp; Effective
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                How It Works
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Go from zero to fluent, one card at a time.
              </p>
            </div>

            {/* Steps */}
            <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
              {/* Connector line (desktop only) */}
              <div className="pointer-events-none absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] hidden h-px bg-gradient-to-r from-indigo-200 via-violet-200 to-emerald-200 sm:block" />

              {[
                {
                  step: "01",
                  title: "Choose a Level",
                  desc: "Pick from N5 to N1 based on where you are in your Japanese journey. Each level is colour-coded and shows your mastery at a glance.",
                  icon: <LayersIcon className="h-6 w-6" />,
                  iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
                  shadow: "shadow-indigo-200",
                  chips: ["N5 → N1", "1 900+ Kanji", "Progress saved"],
                  chipColor: "bg-indigo-50 text-indigo-600 ring-indigo-100",
                },
                {
                  step: "02",
                  title: "Flip &amp; Absorb",
                  desc: "Tap any flashcard to reveal the meaning in your native language, along with Onyomi, Kunyomi, and Romaji readings.",
                  icon: <RefreshCw className="h-6 w-6" />,
                  iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
                  shadow: "shadow-violet-200",
                  chips: ["3D flip animation", "6 languages", "Instant reveal"],
                  chipColor: "bg-violet-50 text-violet-600 ring-violet-100",
                },
                {
                  step: "03",
                  title: "Track Mastery",
                  desc: "Hit \"Got It!\" to mark a kanji as mastered. Your progress is saved locally — no account needed, works completely offline.",
                  icon: <BarChart3 className="h-6 w-6" />,
                  iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
                  shadow: "shadow-emerald-200",
                  chips: ["Offline-first", "No sign-up", "Auto-saved"],
                  chipColor: "bg-emerald-50 text-emerald-600 ring-emerald-100",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="group relative flex flex-col items-start rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:ring-slate-300"
                >
                  {/* Step icon */}
                  <div className="relative mb-5">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white ${item.iconBg} shadow-lg ${item.shadow} transition-transform duration-300 group-hover:scale-110`}
                    >
                      {item.icon}
                    </div>
                    {/* Step number badge */}
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-500 ring-1 ring-slate-200 shadow-sm">
                      {item.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-base font-bold text-slate-900">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-slate-500">{item.desc}</p>

                  {/* Feature chips */}
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {item.chips.map((chip) => (
                      <span
                        key={chip}
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${item.chipColor}`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex justify-center">
              <a
                href="#levels"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:opacity-90 hover:shadow-indigo-300 active:scale-95"
              >
                <GraduationCap className="h-4 w-4" />
                Start Studying Now
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
