import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 safe-bottom">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-6 w-6 overflow-hidden rounded-md">
            <Image src="/manabu_logo.png" alt="Manabu" fill sizes="24px" className="object-contain" />
          </div>
          <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
            Manabu
          </span>
        </Link>

        <p className="flex items-center gap-1.5 text-xs text-slate-400">
          Built with{" "}
          <Heart className="h-3 w-3 fill-rose-400 text-rose-400" />
          {" "}for Japanese learners worldwide
        </p>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Manabu
        </p>
      </div>
    </footer>
  );
}
