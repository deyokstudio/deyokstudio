import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeading, PrimaryButton, scrollToId } from "./primitives";

/* Abstract compositions instead of stock photos */
function WebVisual() {
  return (
    <div className="relative h-full w-full p-6" aria-hidden>
      <div className="h-full border border-border bg-background">
        <div className="flex gap-1.5 border-b border-border p-2.5">
          <span className="h-2 w-2 rounded-full bg-primary" /><span className="h-2 w-2 rounded-full bg-border" /><span className="h-2 w-2 rounded-full bg-border" />
        </div>
        <div className="space-y-3 p-4">
          <div className="h-3 w-2/3 bg-foreground/80 transition-all duration-500 group-hover:w-4/5" />
          <div className="h-2 w-1/2 bg-muted-foreground/40" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="h-12 bg-primary/80" /><div className="h-12 bg-card" /><div className="h-12 bg-card" />
          </div>
          <div className="h-2 w-3/4 bg-muted-foreground/25" />
        </div>
      </div>
    </div>
  );
}
function BrandVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-hidden>
      <div className="relative h-28 w-28">
        <div className="absolute inset-0 rounded-full border border-border" />
        <div className="absolute inset-4 bg-primary transition-transform duration-700 group-hover:rotate-45" />
        <div className="absolute inset-10 rounded-full bg-background" />
      </div>
      <div className="absolute bottom-6 left-6 flex gap-1.5">
        <span className="h-6 w-6 bg-primary" /><span className="h-6 w-6 bg-foreground" /><span className="h-6 w-6 bg-muted-foreground" /><span className="h-6 w-6 border border-border bg-background" />
      </div>
      <span className="absolute right-6 top-6 font-display text-4xl font-bold">Aa</span>
    </div>
  );
}
function GraphicVisual() {
  return (
    <div className="relative grid h-full w-full grid-cols-3 gap-2 p-6" aria-hidden>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`border border-border transition-transform duration-500 group-hover:-translate-y-1 ${i === 1 ? "bg-primary" : i === 3 ? "bg-foreground/90" : "bg-background"}`} style={{ transitionDelay: `${i * 40}ms` }} />
      ))}
    </div>
  );
}

export function Services() {
  const { t } = useI18n();
  const visuals = [WebVisual, BrandVisual, GraphicVisual];
  return (
    <section id="services" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} />
        <div className="mt-16 divide-y divide-border border-y border-border">
          {t.services.items.map((s, i) => {
            const V = visuals[i] ?? WebVisual;
            return (
              <Reveal key={s.name}>
                <article className="group grid gap-8 py-10 md:grid-cols-12 md:items-center md:py-14">
                  <span className="font-display text-sm text-primary md:col-span-1">0{i + 1}</span>
                  <div className="md:col-span-5">
                    <h3 className="text-3xl font-bold uppercase leading-none tracking-tight md:text-4xl">{s.name}</h3>
                    <p className="mt-4 max-w-md text-muted-foreground">{s.desc}</p>
                  </div>
                  <ul className="space-y-2 md:col-span-3">
                    {s.list.map((l) => (
                      <li key={l} className="flex items-center gap-3 text-sm">
                        <span className="h-px w-4 bg-primary" aria-hidden />{l}
                      </li>
                    ))}
                  </ul>
                  <div className="aspect-[4/3] overflow-hidden border border-border bg-card md:col-span-3">
                    <V />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Why() {
  const { t } = useI18n();
  return (
    <section id="about" className="relative border-t border-border bg-background-2 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />
            <p className="mt-10 select-none font-display text-[9rem] font-bold leading-none text-primary/15" aria-hidden>05</p>
          </div>
        </div>
        <ol className="lg:col-span-7">
          {t.why.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.05}>
              <li className="group flex gap-6 border-b border-border py-8 first:pt-0">
                <span className="font-display text-4xl font-bold text-muted-foreground/40 transition-colors group-hover:text-primary">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight md:text-2xl">{it.name}</h3>
                  <p className="mt-2 text-muted-foreground">{it.desc}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Process() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} />
        <div ref={ref} className="relative mt-16">
          {/* desktop horizontal line */}
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-border lg:block" aria-hidden>
            <motion.div style={{ scaleX: scale }} className="h-full origin-left bg-primary" />
          </div>
          {/* mobile vertical line */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-border lg:hidden" aria-hidden>
            <motion.div style={{ scaleY: scale }} className="h-full origin-top bg-primary" />
          </div>
          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {t.process.steps.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08}>
                <li className="relative pl-16 lg:pl-0">
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center border border-primary bg-background font-display text-sm font-bold text-primary lg:relative">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight lg:mt-8">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { t } = useI18n();
  return (
    <section id="faq" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
        </div>
        <Reveal className="lg:col-span-8">
          <Accordion type="single" collapsible className="border-t border-border">
            {t.faq.items.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="faq-glass mb-2 border border-border px-5">
                <AccordionTrigger className="py-6 text-left font-display text-base font-semibold hover:text-primary-glow hover:no-underline md:text-lg [&[data-state=open]]:text-primary">
                  <span className="flex gap-4"><span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>{f.q}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-10 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta() {
  const { t } = useI18n();
  return (
    <section className="relative isolate overflow-hidden border-t border-border py-28 md:py-40">

      <div className="absolute inset-x-0 top-1/2 -z-10 h-px overflow-hidden bg-border" aria-hidden>
        <span className="absolute inset-y-0 w-1/4 animate-scanline bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <Reveal>
          <h2 className="text-5xl font-bold uppercase leading-[0.9] tracking-tight text-balance md:text-8xl">
            {t.final.line1}
            <br />
            <span className="text-primary">{t.final.line2}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-lg text-lg text-muted-foreground">{t.final.text}</p>
          <PrimaryButton onClick={() => scrollToId("contact")} className="mt-10 px-10 py-5 text-base">
            {t.final.cta} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </PrimaryButton>
          <p className="mt-8 font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">{t.final.sub}</p>
        </Reveal>
      </div>
    </section>
  );
}
