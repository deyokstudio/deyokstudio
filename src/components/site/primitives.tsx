import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className, y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 font-display text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground", className)}>
      <span className="h-px w-8 bg-primary" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, className }: { eyebrow: string; title: string; subtitle?: string; className?: string }) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-balance md:text-6xl">{title}</h2>
      {subtitle && <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

export function PrimaryButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "group inline-flex items-center justify-center gap-2 bg-primary px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all duration-200 hover:bg-primary-glow hover:shadow-glow active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "group inline-flex items-center justify-center gap-2 border border-border px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-foreground transition-all duration-200 hover:border-primary hover:text-primary-glow active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
