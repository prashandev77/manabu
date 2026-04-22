"use client";

import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { getKanjiTotalCount, Level } from "@/lib/kanji";
import {
  BookOpen, TrendingUp, Sparkles, ChevronRight,
  Flame, Target, Star,
} from "lucide-react";

const LEVEL_CONFIG = [
  {
    level: "n5" as Level,
    label: "N5",
    subtitle: "Beginner",
    borderColor: "border-emerald-200",
    headerBg: "bg-gradient-to-r from-emerald-50 to-teal-50",
    iconBg: "bg-emerald-100 text-emerald-600",
    barColor: "bg-gradient-to-r from-emerald-400 to-teal-500",
    pctColor: "text-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-700",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    level: "n4" as Level,
    label: "N4",
    subtitle: "Elementary",
    borderColor: "border-sky-200",
    headerBg: "bg-gradient-to-r from-sky-50 to-blue-50",
    iconBg: "bg-sky-100 text-sky-600",
    barColor: "bg-gradient-to-r from-sky-400 to-blue-500",
    pctColor: "text-sky-600",
    badgeBg: "bg-sky-50 text-sky-700",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    level: "n3" as Level,
    label: "N3",
    subtitle: "Intermediate",
    borderColor: "border-violet-200",
    headerBg: "bg-gradient-to-r from-violet-50 to-purple-50",
    iconBg: "bg-violet-100 text-violet-600",
    barColor: "bg-gradient-to-r from-violet-400 to-purple-500",
    pctColor: "text-violet-600",
    badgeBg: "bg-violet-50 text-violet-700",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    level: "n2" as Level,
    label: "N2",
    subtitle: "Upper-Intermediate",
    borderColor: "border-amber-200",
    headerBg: "bg-gradient-to-r from-amber-50 to-orange-50",
    iconBg: "bg-amber-100 text-amber-600",
    barColor: "bg-gradient-to-r from-amber-400 to-orange-500",
    pctColor: "text-amber-600",
    badgeBg: "bg-amber-50 text-amber-700",
    icon: <Flame className="h-5 w-5" />,
  },
  {
    level: "n1" as Level,
    label: "N1",
    subtitle: "Advanced",
    borderColor: "border-rose-200",
    headerBg: "bg-gradient-to-r from-rose-50 to-pink-50",
    iconBg: "bg-rose-100 text-rose-600",
    barColor: "bg-gradient-to-r from-rose-400 to-pink-500",
    pctColor: "text-rose-600",
    badgeBg: "bg-rose-50 text-rose-700",
    icon: <Star className="h-5 w-5" />,
  },
] as const;

export default function LevelGrid() {
  const { progress } = useAppContext();
  const totalMastered = Object.keys(progress).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {LEVEL_CONFIG.map((cfg, i) => {
        const total = getKanjiTotalCount(cfg.level);
        const mastered = Object.keys(progress).filter((id) =>
          id.startsWith(cfg.level + "-")
        ).length;
        const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

        return (
          <Link
            key={cfg.level}
            href={`/study/${cfg.level}`}
            className={`animate-fade-in-up delay-${i * 100} group flex flex-col overflow-hidden rounded-2xl border ${cfg.borderColor} bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]`}
          >
            {/* Card header with gradient */}
            <div className={`flex items-center justify-between px-5 py-4 ${cfg.headerBg}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${cfg.iconBg} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                  {cfg.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{cfg.label}</h3>
                  <p className="text-xs text-slate-500">{cfg.subtitle}</p>
                </div>
              </div>
              <div className={`rounded-full px-2.5 py-1 text-xs font-bold ${cfg.badgeBg}`}>
                {pct}%
              </div>
            </div>

            {/* Card body */}
            <div className="flex flex-1 flex-col justify-between px-5 py-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-extrabold text-slate-800 tabular-nums">
                    {mastered}
                    <span className="text-sm font-normal text-slate-400"> / {total}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">kanji mastered</p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-500" />
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${cfg.barColor}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </Link>
        );
      })}

      {/* Total card */}
      <div className="flex flex-col justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 shadow-sm">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Mastered</p>
            <p className="text-2xl font-extrabold text-slate-800 tabular-nums">
              {totalMastered}
              <span className="text-sm font-normal text-slate-400"> kanji</span>
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-400">Keep studying to fill up all levels!</p>
      </div>
    </div>
  );
}
