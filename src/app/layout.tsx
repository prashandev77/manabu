import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manabu | JLPT Kanji Flashcards",
  description:
    "Master JLPT Kanji from N5 to N1 with Manabu — a modern, multilingual flashcard app supporting English, Sinhala, Nepali, Vietnamese, Hindi, and Thai.",
  keywords: ["JLPT", "Kanji", "Japanese", "Flashcards", "N5", "N4", "N3", "N2", "N1"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
