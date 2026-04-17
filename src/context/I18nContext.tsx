import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export type Language = "tr" | "en";

type Dict = Record<string, { tr: string; en: string }>;

const dictionary: Dict = {
  "nav.about": { tr: "Hakkında", en: "About" },
  "nav.menu": { tr: "Menü", en: "Menu" },
  "nav.openMenu": { tr: "Menüyü aç", en: "Open menu" },
  "hero.tagline": {
    tr: "Karakterler, büyüler, asalar ve Hogwarts'ın dört binası — büyülü bir arşiv.",
    en: "Characters, spells, wands and the four houses of Hogwarts — a magical archive.",
  },
  "lang.toggle": { tr: "EN", en: "TR" },
  "footer.rights": { tr: "Tüm hakları saklıdır.", en: "All rights reserved." },
  "gallery.empty": { tr: "Gösterilecek içerik yok", en: "No content to display" },
  "loading": { tr: "Yükleniyor...", en: "Loading..." },
  "error.title": { tr: "İçerik yüklenirken hata", en: "Error loading content" },
  "error.retry": { tr: "Tekrar dene", en: "Retry" },
};

interface I18nContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  toggle: () => void;
  t: (key: keyof typeof dictionary | string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "wr-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "tr";
    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    return stored === "en" || stored === "tr" ? stored : "tr";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Language) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((p) => (p === "tr" ? "en" : "tr")), []);

  const t = useCallback(
    (key: string) => {
      const entry = dictionary[key];
      if (!entry) return key;
      return entry[lang];
    },
    [lang]
  );

  return <I18nContext.Provider value={{ lang, setLang, toggle, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
