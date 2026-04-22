"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { LANGUAGES } from "@/lib/kanji";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { language, setLanguage } = useAppContext();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-lg safe-top">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">

        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8 shrink-0 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/manabu_logo.png"
              alt="Manabu"
              fill
              sizes="32px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold tracking-tight text-slate-800 leading-tight">
              Manabu
            </span>
            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-indigo-500 sm:block">
              JLPT Kanji
            </span>
          </div>
        </Link>

        {/* Language Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            id="language-selector"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 active:scale-95"
          >
            <Globe className="h-3.5 w-3.5 text-indigo-500" />
            <span className="hidden sm:inline max-w-[80px] truncate">
              {currentLang?.name.split(" ")[0]}
            </span>
            <span className="sm:hidden font-semibold text-[11px] tracking-wide text-indigo-600">
              {language.toUpperCase()}
            </span>
            <ChevronDown
              className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-52 animate-scale-in origin-top-right rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setOpen(false); }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-all ${
                    language === lang.code
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex h-6 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[10px] font-bold uppercase text-slate-500">
                    {lang.code}
                  </span>
                  <span className="truncate">{lang.name}</span>
                  {language === lang.code && (
                    <Check className="ml-auto h-3.5 w-3.5 shrink-0 text-indigo-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
