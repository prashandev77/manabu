"use client";

import { use, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { getKanjiByLevel, Level, Kanji, LanguageCode } from "@/lib/kanji";
import {
  ArrowLeft, ArrowRight, RotateCcw, Check,
  BookOpen, Shuffle, ChevronLeft, Volume2,
} from "lucide-react";

/* ── Level accent colours ─────────────────────────── */
const LEVEL_ACCENT: Record<Level, { bar: string; btn: string; badge: string }> = {
  n5: { bar: "from-emerald-400 to-teal-500",  btn: "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-200",  badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  n4: { bar: "from-sky-400 to-blue-500",       btn: "bg-sky-500    hover:bg-sky-400    shadow-sky-200",       badge: "bg-sky-50   text-sky-700   border-sky-200"   },
  n3: { bar: "from-violet-400 to-purple-500",  btn: "bg-violet-500 hover:bg-violet-400 shadow-violet-200",    badge: "bg-violet-50 text-violet-700 border-violet-200" },
  n2: { bar: "from-amber-400 to-orange-500",   btn: "bg-amber-500  hover:bg-amber-400  shadow-amber-200",     badge: "bg-amber-50  text-amber-700  border-amber-200"  },
  n1: { bar: "from-rose-400 to-pink-500",      btn: "bg-rose-500   hover:bg-rose-400   shadow-rose-200",      badge: "bg-rose-50  text-rose-700  border-rose-200"  },
};

/* ── 3D Flip Card ─────────────────────────────────── */
function FlipCard({
  kanji,
  language,
  isFlipped,
  onFlip,
  level,
}: {
  kanji: Kanji;
  language: LanguageCode;
  isFlipped: boolean;
  onFlip: () => void;
  level: Level;
}) {
  const accent = LEVEL_ACCENT[level];

  return (
    <div
      className="flip-container mx-auto w-full max-w-sm cursor-pointer select-none"
      style={{ height: "clamp(340px, 60vw, 400px)" }}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onFlip()}
      aria-label="Flip card"
    >
      <div className={`flip-inner h-full w-full ${isFlipped ? "is-flipped" : ""}`}>

        {/* FRONT – Kanji character */}
        <div className="flip-face flip-face-front flex flex-col items-center justify-center border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-white" />
          <div className="relative z-10 flex flex-col items-center px-6">
            <span
              className="font-bold leading-none text-slate-800"
              style={{ fontSize: "clamp(80px, 20vw, 130px)" }}
            >
              {kanji.kanji}
            </span>
            <div className="mt-6 flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5">
              <span className="text-xs font-medium text-slate-500">Tap to reveal meaning</span>
            </div>
          </div>
        </div>

        {/* BACK – Meaning + readings */}
        <div className="flip-face flip-face-back flex flex-col items-center border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 to-violet-50/30 pointer-events-none" />

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 py-5">

            {/* Kanji (small, faded) */}
            <p className="mb-1 text-2xl font-bold text-slate-200">{kanji.kanji}</p>

            {/* Meaning */}
            <div className={`w-full max-w-[280px] rounded-2xl border px-4 py-2.5 text-center ${accent.badge}`}>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Meaning</p>
              <p className="text-base font-extrabold sm:text-lg leading-snug">
                {kanji.translations[language]}
              </p>
            </div>

            {/* Readings row */}
            <div className="mt-3 grid w-full max-w-[280px] grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50 px-2 py-2 text-center">
                <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">On</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-700">{kanji.onyomi || "—"}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 px-2 py-2 text-center">
                <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Kun</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-700">{kanji.kunyomi || "—"}</p>
              </div>
            </div>

            {/* Romaji */}
            {kanji.romaji && kanji.romaji !== "romaji" && (
              <p className="mt-2 text-[11px] text-slate-400">
                Romaji: <span className="font-medium text-slate-500">{kanji.romaji}</span>
              </p>
            )}

            {/* Hint */}
            <p className="mt-3 text-[10px] text-slate-400">Tap to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────── */
export default function StudyPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const router = useRouter();
  const { language, progress, markAsMastered, isLoaded } = useAppContext();

  const kanjiList = getKanjiByLevel(level as Level);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(false);

  const displayList = useMemo(() => {
    if (shuffled) return [...kanjiList].sort(() => Math.random() - 0.5);
    return kanjiList;
  }, [kanjiList, shuffled]);

  /* Loading */
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  /* Empty level */
  if (displayList.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f8f9fc]">
        <Header />
        <main className="flex flex-1 items-center justify-center p-8 text-center">
          <div>
            <p className="text-slate-500">No kanji found for this level.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600"
            >
              Go Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentKanji = displayList[currentIndex];
  const isMastered    = !!progress[currentKanji.id];
  const masteredCount = displayList.filter((k) => progress[k.id]).length;
  const navPct = ((currentIndex + 1) / displayList.length) * 100;
  const accent  = LEVEL_ACCENT[level as Level];

  const go = (direction: 1 | -1) => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev + direction + displayList.length) % displayList.length
      );
    }, 180);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fc]">
      <Header />

      {/* ── Top navigation bar ─── */}
      <div className="sticky top-14 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Levels</span>
          </button>

          {/* Level badge + counter */}
          <div className="flex items-center gap-2">
            <span className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${accent.badge}`}>
              {(level as string).toUpperCase()}
            </span>
            <span className="text-xs tabular-nums text-slate-500">
              <span className="font-semibold text-slate-800">{currentIndex + 1}</span>
              {" / "}
              {displayList.length}
            </span>
          </div>

          {/* Mastery counter */}
          <div className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-semibold text-slate-700 tabular-nums">
              {masteredCount}
            </span>
            <span className="hidden text-xs text-slate-400 sm:inline">mastered</span>
          </div>
        </div>

        {/* Thin progress bar */}
        <div className="h-[3px] w-full bg-slate-100">
          <div
            className={`h-full bg-gradient-to-r ${accent.bar} transition-all duration-400 ease-out`}
            style={{ width: `${navPct}%` }}
          />
        </div>
      </div>

      {/* ── Main study area ─────── */}
      <main className="flex flex-1 flex-col items-center justify-start px-4 pt-8 pb-6 sm:justify-center sm:pt-4">

        {/* Flip card */}
        <FlipCard
          kanji={currentKanji}
          language={language}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped((f) => !f)}
          level={level as Level}
        />

        {/* ── Controls ───────────── */}
        <div className="mt-7 flex w-full max-w-sm flex-col items-center gap-4">

          {/* Prev / Got It / Next */}
          <div className="flex w-full items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 active:scale-95"
              aria-label="Previous card"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => { markAsMastered(currentKanji.id); go(1); }}
              className={`flex flex-1 h-12 items-center justify-center gap-2 rounded-2xl text-sm font-bold text-white shadow-lg transition-all active:scale-95 ${
                isMastered
                  ? "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-200"
                  : `bg-gradient-to-r ${accent.bar} shadow-indigo-200 hover:opacity-90`
              }`}
            >
              {isMastered ? (
                <><Check className="h-4 w-4" /> Mastered!</>
              ) : (
                <><BookOpen className="h-4 w-4" /> Got It!</>
              )}
            </button>

            <button
              onClick={() => go(1)}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 active:scale-95"
              aria-label="Next card"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Secondary controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setShuffled((s) => !s); setCurrentIndex(0); setIsFlipped(false); }}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all active:scale-95 ${
                shuffled
                  ? "bg-violet-100 text-violet-700"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
              }`}
            >
              <Shuffle className="h-3.5 w-3.5" />
              Shuffle
            </button>

            <button
              onClick={() => { setIsFlipped(false); setCurrentIndex(0); }}
              className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-700 active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restart
            </button>
          </div>
        </div>

        {/* ── Swipe hint (mobile only) ── */}
        <p className="mt-6 text-xs text-slate-400 sm:hidden">
          Tap the card to flip • Use arrows to navigate
        </p>
      </main>

      <Footer />
    </div>
  );
}
