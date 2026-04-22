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

      <main className="flex-1 pt-14">

        {/* ── Hero (full screen) ──────────────────────── */}
        <section className="hero-section relative flex items-center justify-center overflow-hidden bg-white border-b border-slate-100" style={{ minHeight: "calc(100dvh - 3.5rem)" }}>

          {/* Animated gradient orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="hero-orb hero-orb-1 absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-200/50 to-violet-200/30 blur-[100px]" />
            <div className="hero-orb hero-orb-2 absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-sky-200/40 to-cyan-100/30 blur-[90px]" />
            <div className="hero-orb hero-orb-3 absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-purple-200/30 to-pink-100/20 blur-[80px]" />
          </div>

          {/* Floating kanji characters */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {["漢", "字", "学", "日", "本", "語", "読", "書", "人", "大", "山", "川", "火", "水", "木"].map((char, i) => (
              <span
                key={i}
                className="floating-kanji absolute select-none font-bold text-slate-200/40"
                style={{
                  fontSize: `${18 + (i % 4) * 8}px`,
                  left: `${5 + (i * 6.5) % 90}%`,
                  top: `${8 + (i * 7.3) % 80}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${6 + (i % 3) * 2}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex flex-col items-center text-center">

              {/* Logo with glow ring */}
              <div className="hero-logo-entrance mb-8 relative">
                <div className="absolute -inset-3 animate-spin-slow rounded-full border border-dashed border-indigo-200/60" />
                <div className="absolute -inset-6 animate-spin-reverse rounded-full border border-dashed border-violet-200/40" />
                <div className="hero-logo-glow absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-400/20 via-violet-400/20 to-purple-400/20 blur-xl" />
                <div className="relative h-20 w-20 sm:h-24 sm:w-24">
                  <Image src="/manabu_logo.png" alt="Manabu" fill sizes="96px" className="object-contain drop-shadow-lg" priority />
                </div>
              </div>

              {/* Headline with animated gradient */}
              <h1 className="hero-title text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
                Master{" "}
                <span className="hero-gradient-text bg-[length:200%_auto] bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                  JLPT Kanji
                </span>
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle mt-5 max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
                Flashcards covering <strong className="text-slate-700">N5 → N1</strong> with beautiful 3D flip
                animations and progress tracking — in{" "}
                <strong className="text-slate-700">6 languages</strong>.
              </p>

              {/* Stat pills */}
              <div className="hero-pills mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
                {[
                  { label: "漢 3,000+ Kanji", color: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100" },
                  { label: "🌐 6 Languages",  color: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100" },
                  { label: "📚 5 JLPT Levels", color: "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100" },
                  { label: "⚡ Offline Ready", color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" },
                ].map((p, i) => (
                  <span
                    key={p.label}
                    className={`hero-pill rounded-full border px-4 py-1.5 text-xs font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${p.color}`}
                    style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                  >
                    {p.label}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href="#levels"
                className="hero-cta mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-300/50 active:scale-95"
              >
                <GraduationCap className="h-4.5 w-4.5" />
                Start Learning Now
              </a>

              {/* Scroll indicator */}
              <div className="hero-scroll mt-14 flex flex-col items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">Scroll to explore</span>
                <div className="h-9 w-5 rounded-full border-2 border-slate-300 p-0.5">
                  <div className="mx-auto h-2 w-1 animate-bounce rounded-full bg-indigo-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Level Dashboard ─────────────────────────── */}
        <section id="levels" className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 scroll-mt-14">
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
