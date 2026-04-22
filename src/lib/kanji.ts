import n5Data from '@/data/n5.json';
import n4Data from '@/data/n4.json';
import n3Data from '@/data/n3.json';
import n2Data from '@/data/n2.json';
import n1Data from '@/data/n1.json';

export type TranslationMap = {
  en: string;
  si: string;
  ne: string;
  vi: string;
  hi: string;
  th: string;
};

export type Kanji = {
  id: string;
  kanji: string;
  onyomi: string;
  kunyomi: string;
  romaji: string;
  translations: TranslationMap;
};

export type Level = 'n5' | 'n4' | 'n3' | 'n2' | 'n1';

// We load all data levels.
const kanjiData: Record<Level, Kanji[]> = {
  n5: n5Data as Kanji[],
  n4: n4Data as Kanji[],
  n3: n3Data as Kanji[],
  n2: n2Data as Kanji[],
  n1: n1Data as Kanji[],
};

export function getKanjiByLevel(level: Level): Kanji[] {
  return kanjiData[level] || [];
}

export function getKanjiTotalCount(level: Level): number {
  return kanjiData[level]?.length || 0;
}

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'si', name: 'සිංහල (Sinhala)' },
  { code: 'ne', name: 'नेपाली (Nepali)' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'th', name: 'ภาษาไทย (Thai)' }
] as const;

export type LanguageCode = typeof LANGUAGES[number]['code'];
