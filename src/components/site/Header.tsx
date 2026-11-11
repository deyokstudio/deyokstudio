import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n, LANGS, type Lang } from "@/i18n/context";
import { useCampaign } from "@/hooks/use-campaign";
import { cn } from "@/lib/utils";
import { PrimaryButton, scrollToId } from "./primitives";

export const NAV_IDS = ["packages", "offers", "services", "about", "faq"] as const;

export function Wordmark() {
  return (
    <span className="font-display text-lg font-bold tracking-tight">
      DEYOK<span className="text-muted-foreground">STUDIO</span>
      <span className="ml-0.5 inline-block h-1.5 w-1.5 bg-primary" aria-hidden />
    </span>
  );
}

export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t.nav.language} className={cn("flex items-center gap-1 font-display text-xs", className)}>
      {LANGS.map((l: Lang, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-border" aria-hidden>/</span>}
          <button
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={cn(
              "px-1 py-1 uppercase tracking-wider transition-colors hover:text-foreground",
              lang === l ? "text-primary" : "text-muted-foreground",
            )}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

function Ticker() {
  const { t } = useI18n();
  const { phase } = useCampaign();
  const text = t.ticker[phase];
  const items = Array.from({ length: 6 });
  return (
    <div className="overflow-hidden border-b border-border bg-background-2 py-2" aria-label={text}>
      <div className="flex w-max animate-marquee" aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {items.map((_, i) => (
              <span key={i} className="flex items-center gap-6 px-6 font-display text-[11px] font-medium tracking-[0.25em] text-muted-foreground">
                {text}
                <span className="h-1 w-1 rotate-45 bg-primary" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Ticker />
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Main">
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="DeyokStudio — home">
            <Wordmark />
          </a>
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); go(id); }}
                  className={cn("link-underline pb-1 text-sm transition-colors hover:text-foreground", active === id ? "text-primary" : "text-muted-foreground")}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden items-center gap-5 lg:flex">
            <LangSwitch />
            <PrimaryButton onClick={() => go("contact")} className="px-5 py-2.5 text-xs">{t.nav.cta}</PrimaryButton>
          </div>
          <div className="flex items-center gap-3 lg:hidden"><LangSwitch />
          <button className="p-2" onClick={() => setOpen(true)} aria-label={t.nav.menu} aria-expanded={open}>
            <Menu className="h-6 w-6" />
          </button></div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <Wordmark />
              <button className="p-2" onClick={() => setOpen(false)} aria-label={t.nav.close}><X className="h-6 w-6" /></button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-5">
              {[...NAV_IDS, "contact" as const].map((id, i) => (
                <motion.li key={id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>
                  <a href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} className="block py-2 font-display text-4xl font-bold uppercase hover:text-primary">
                    {t.nav[id]}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-border p-5">
              <LangSwitch className="text-sm" />
              <PrimaryButton onClick={() => go("contact")} className="py-3 text-xs">{t.nav.cta}</PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
