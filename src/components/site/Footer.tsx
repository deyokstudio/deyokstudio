import { ArrowUp } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { LangSwitch, NAV_IDS, Wordmark } from "./Header";
import { SocialIcons } from "./Contact";
import { scrollToId } from "./primitives";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border pb-10 pt-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t.footer.tagline}</p>
            <SocialIcons className="mt-6" />
          </div>
          <nav className="md:col-span-4" aria-label="Footer">
            <ul className="grid grid-cols-2 gap-3">
              {[...NAV_IDS, "contact" as const].map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id); }} className="link-underline pb-0.5 text-sm text-muted-foreground hover:text-foreground">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col items-start gap-6 md:col-span-3 md:items-end">
            <LangSwitch className="text-sm" />
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group inline-flex items-center gap-2 border border-border px-4 py-2.5 font-display text-xs uppercase tracking-wider transition-colors hover:border-primary hover:text-primary-glow">
              {t.footer.top} <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>{t.footer.rights}</p>
          <p className="font-display uppercase tracking-[0.2em]">Black November · 2026</p>
        </div>
      </div>
    </footer>
  );
}
