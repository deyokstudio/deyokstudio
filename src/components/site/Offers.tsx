import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Asterisk, Orbit, Layers3, Aperture } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { useCampaign } from "@/hooks/use-campaign";
import { OFFERS, PACKAGES, discountPercent, formatEUR, type Offer } from "@/config/campaign";
import { cn } from "@/lib/utils";
import { TiltCard } from "./TiltCard";
import { Reveal, SectionHeading, PrimaryButton, GhostButton } from "./primitives";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{v}</span>;
}

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  const { t } = useI18n();
  const { phase, select } = useCampaign();
  const copy = t.offers.items[offer.id];
  const unit = offer.unit === "post" ? t.offers.perPost : offer.unit === "banner" ? t.offers.perBanner : "";
  const pct = discountPercent(offer.regular, offer.campaign);
  const ended = phase === "ended";
  const cta = ended ? t.offers.ctaEnded : phase === "upcoming" ? t.offers.ctaUpcoming : t.offers.cta;

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <TiltCard className="border border-border p-7 transition-colors hover:border-primary/60">
        <div className="flex items-start justify-between gap-4">
          <span className="font-display text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
          {!ended && (
            <span className="bg-primary px-2.5 py-1 font-display text-xs font-bold text-primary-foreground">
              −<CountUp to={pct} />%
            </span>
          )}
        </div>
        <h3 className="mt-6 text-2xl font-bold uppercase tracking-tight">{copy.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{copy.desc}</p>

        <div className="mt-8 border-t border-border pt-6">
          {ended ? (
            <p className="font-display text-4xl font-bold tracking-tight">
              {offer.regularFrom && <span className="mr-1.5 text-base font-medium text-muted-foreground">{t.offers.from}</span>}
              {formatEUR(offer.regular)}
              <span className="text-base text-muted-foreground">{unit}</span>
            </p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                <span className="sr-only">{t.offers.regularLabel}: </span>
                <s className="decoration-primary decoration-2">
                  {offer.regularFrom && `${t.offers.from} `}
                  {formatEUR(offer.regular)}
                  {unit}
                </s>
              </p>
              <p className="mt-1 font-display text-5xl font-bold tracking-tight">
                {offer.campaignFrom && <span className="mr-1.5 text-base font-medium text-muted-foreground">{t.offers.from}</span>}
                {formatEUR(offer.campaign)}
                <span className="text-base font-medium text-muted-foreground">{unit}</span>
              </p>
            </>
          )}
          <p className="mt-2 font-display text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {(ended ? offer.regularFrom : offer.campaignFrom) ? t.offers.starting : t.offers.fixed}
          </p>
          <GhostButton
            onClick={() => select({ service: offer.id })}
            className="mt-6 flex w-full items-center justify-between border-t border-border pt-5 font-display text-sm font-semibold uppercase tracking-wider transition-colors group-hover:text-primary-glow"
          >
            {cta}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </GhostButton>
        </div>
      </TiltCard>
    </Reveal>
  );
}

export function Offers() {
  const { t } = useI18n();
  const { phase } = useCampaign();
  return (
    <section id="offers" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow={t.offers.eyebrow} title={t.offers.title} subtitle={t.offers.subtitle} />
          {phase !== "active" && (
            <Reveal>
              <p className="max-w-xs border-l-2 border-primary pl-4 text-sm text-muted-foreground">
                {phase === "upcoming" ? t.offers.upcomingNote : t.offers.endedNote}
              </p>
            </Reveal>
          )}
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map((o, i) => (
            <OfferCard key={o.id} offer={o} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Packages() {
  const { t } = useI18n();
  const { phase, select } = useCampaign();
  const ended = phase === "ended";
  return (
    <section id="packages" className="relative overflow-hidden border-t border-border bg-background-2 py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={t.packages.eyebrow} title={t.packages.title} subtitle={t.packages.subtitle} />
        {ended && <p className="mt-6 max-w-xl border-l-2 border-primary pl-4 text-sm text-muted-foreground">{t.packages.endedNote}</p>}
        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((p, i) => {
            const copy = t.packages.items[p.id];
            const pct = discountPercent(p.reference, p.campaign);
            const Glyph = [Asterisk, Orbit, Layers3, Aperture][i] ?? Asterisk;
            return (
              <Reveal key={p.id} delay={i * 0.08} className="h-full">
                <TiltCard
                  className={cn(
                    "group relative flex h-full flex-col border bg-card p-7 transition-all duration-300 hover:shadow-glow",
                    p.featured ? "border-primary" : "border-border hover:border-primary/60",
                  )}
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-7 bg-primary px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                      {t.packages.featured}
                    </span>
                  )}
                  <p className="font-display text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {t.packages.package} {p.number}
                  </p>
                  <Glyph className="package-glyph" strokeWidth={1.1} aria-hidden />
                  <h3 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-tight">{copy.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.desc}</p>

                  <p className="mt-7 font-display text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{t.packages.includes}</p>
                  <ul className="mt-3 flex-1 space-y-2.5">
                    {p.includes.map((inc) => (
                      <li key={inc.service} className="flex gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <span>{inc.qty > 1 ? `${inc.qty} × ` : ""}{t.packages.deliverables[inc.service]}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-border pt-6">
                    {ended ? (
                      <p className="text-sm text-muted-foreground">{t.packages.reference}: {formatEUR(p.reference)}</p>
                    ) : (
                      <>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{t.packages.reference}</span>
                          <s className="decoration-primary decoration-2">{formatEUR(p.reference)}</s>
                        </div>
                        <div className="mt-2 flex items-end justify-between">
                          <p className="font-display text-5xl font-bold tracking-tight">{formatEUR(p.campaign)}</p>
                          <span className="mb-1.5 font-display text-sm font-bold text-primary">−{pct}%</span>
                        </div>
                        <p className="mt-1 font-display text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          {t.packages.youSave} {formatEUR(p.reference - p.campaign)}
                        </p>
                      </>
                    )}
                    <PrimaryButton
                      onClick={() => select({ pkg: p.id, service: "custom" })}
                      className={cn(
                        "mt-6 flex w-full items-center justify-center gap-2 py-3.5 font-display text-sm font-semibold uppercase tracking-wider transition-all active:scale-[0.97]",
                        p.featured ? "bg-primary text-primary-foreground hover:bg-primary-glow" : "border border-border bg-transparent hover:bg-transparent hover:border-primary hover:text-primary-glow",
                      )}
                    >
                      {ended ? t.packages.ctaEnded : t.packages.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </PrimaryButton>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { motion };
