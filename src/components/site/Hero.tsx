import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { useCampaign } from "@/hooks/use-campaign";
import { CAMPAIGN } from "@/config/campaign";
import { PrimaryButton, GhostButton, scrollToId } from "./primitives";
const HeroScene = lazy(() => import("./HeroScene"));

function Countdown() {
  const { t } = useI18n();
  const { now, phase } = useCampaign();
  if (phase === "ended") return null;
  const diff = now ? Math.max(0, CAMPAIGN.end.getTime() - now.getTime()) : null;
  const parts = diff === null ? ["--", "--", "--", "--"] : [Math.floor(diff / 86400000), Math.floor(diff / 3600000) % 24, Math.floor(diff / 60000) % 60, Math.floor(diff / 1000) % 60].map(n => String(n).padStart(2, "0"));
  return <div className="hero-countdown">
    <p className="mb-3 text-xs uppercase text-muted-foreground">{t.hero.countdownActive}</p>
    <div className="flex gap-5" role="timer" aria-live="off">
      {[t.hero.days, t.hero.hours, t.hero.minutes, t.hero.seconds].map((label, i) => <div key={label} className="min-w-10"><span className="font-display text-3xl font-semibold tabular-nums">{parts[i]}</span><span className="mt-1 block text-[10px] uppercase text-muted-foreground">{label}</span></div>)}
    </div>
  </div>;
}

export function Hero() {
  const { t } = useI18n();
  const { phase } = useCampaign();
  const reduce = useReducedMotion();
  const entry = (delay: number) => ({ initial: reduce ? false as const : { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay } });
  return <section id="top" className="campaign-hero relative isolate overflow-hidden">
    <ClientOnly fallback={null}><Suspense fallback={null}><HeroScene /></Suspense></ClientOnly>
    <div className="hero-content relative z-10 mx-auto max-w-7xl px-5 md:px-8">
      <motion.div {...entry(0.05)} className="hero-eyebrow flex flex-wrap items-center gap-4 text-xs uppercase text-muted-foreground">
        <span className="h-2 w-2 bg-primary" /><span>{t.hero.eyebrow}</span><span className="text-foreground/40">/</span><span>{t.hero.dates}</span>
      </motion.div>
      <h1 className="hero-title mt-6 font-display font-bold uppercase">
        <motion.span {...entry(0.12)} className="block">{t.hero.line1}</motion.span>
        <motion.span {...entry(0.22)} className="block text-primary">{t.hero.line2}</motion.span>
        <motion.span {...entry(0.32)} className="hero-last-line block">{t.hero.line3}<ArrowDownRight className="hero-title-arrow inline-block text-primary" strokeWidth={1.3} /></motion.span>
      </h1>
      <motion.div {...entry(0.45)} className="hero-bottom mt-8">
        <div className="max-w-md">
          <p className="text-sm leading-relaxed text-muted-foreground">{phase === "ended" ? t.hero.endedText : t.hero.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton onClick={() => scrollToId(phase === "ended" ? "contact" : "offers")}>{phase === "ended" ? t.hero.endedCta : t.hero.primary}<ArrowUpRight className="h-4 w-4" /></PrimaryButton>
            <GhostButton onClick={() => scrollToId("packages")}>{t.hero.secondary}</GhostButton>
          </div>
        </div>
        <Countdown />
      </motion.div>
    </div>
    {phase !== "ended" && <div className="hero-discount absolute z-10"><span className="text-xs uppercase text-muted-foreground">{t.hero.upTo}</span><strong className="block font-display text-6xl leading-none">50<span className="text-primary">%</span></strong><span className="text-xs uppercase text-muted-foreground">{t.hero.off}</span></div>}
    <div className="hero-marquee pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden border-y border-border py-4" aria-hidden>
      <div className="flex w-max animate-marquee">{[0, 1].map(i => <span key={i} className="shrink-0 whitespace-nowrap pr-8 font-display text-2xl font-bold uppercase text-muted-foreground/30">{t.hero.marquee} · {t.hero.marquee} · </span>)}</div>
    </div>
  </section>;
}
