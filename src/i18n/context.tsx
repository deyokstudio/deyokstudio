import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { en, type Dictionary } from "./en";
import { ro } from "./ro";
import { ru } from "./ru";
import { useRouterState } from "@tanstack/react-router";

export const LANGS = ["en", "ro", "ru"] as const;
export type Lang = (typeof LANGS)[number];
const DICTS: Record<Lang, Dictionary> = { en, ro, ru };
const STORAGE_KEY = "deyok-lang";

interface I18nValue {
  lang: Lang;
  t: Dictionary;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const search = useRouterState({ select: (state) => state.location.searchStr });

  useEffect(() => {
    const fromUrl = new URLSearchParams(search).get("lang");
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const pick = [fromUrl, stored].find((v): v is Lang => LANGS.includes(v as Lang));
    if (pick) setLangState(pick);
  }, [search]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = DICTS[lang].meta.title;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    const url = new URL(window.location.href);
    if (l === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", l);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  return <I18nContext.Provider value={{ lang, t: DICTS[lang], setLang }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
