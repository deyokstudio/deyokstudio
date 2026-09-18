import { Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { facebookUrl } from "@/lib/site-data";

const nav = [
  ["Acasă", "/"], ["Despre", "/despre"], ["Servicii", "/servicii"],
  ["Portofoliu", "/portofoliu"], ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 md:h-24 md:px-10">
        <Link to="/" className="min-w-0 truncate text-xl font-black uppercase text-foreground">Deyok<span className="text-primary">Studio</span></Link>
        <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase text-muted-foreground md:flex" aria-label="Navigație principală">
          {nav.map(([label, to]) => <Link key={to} to={to} activeProps={{ className: "text-primary" }} className="transition-colors hover:text-foreground">{label}</Link>)}
        </nav>
        <button type="button" onClick={() => setOpen(!open)} className="grid size-11 place-items-center border border-border text-foreground md:hidden" aria-label={open ? "Închide meniul" : "Deschide meniul"} aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && <nav className="border-t border-border bg-background px-5 py-5 md:hidden" aria-label="Navigație mobilă">
        {nav.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="block border-b border-border py-4 font-mono text-sm uppercase text-foreground">{label}</Link>)}
      </nav>}
    </header>
  );
}

export function SiteFooter() {
  return <footer className="border-t border-border px-5 py-14 md:px-10">
    <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_auto]">
      <div><p className="text-2xl font-black uppercase">Deyok<span className="text-primary">Studio</span></p><p className="mt-3 font-mono text-xs uppercase text-muted-foreground">Design digital. Website-uri. Identitate vizuală.</p></div>
      <div className="grid grid-cols-2 gap-x-12 gap-y-3 font-mono text-xs uppercase">
        {nav.map(([label, to]) => <Link key={to} to={to} className="text-muted-foreground transition-colors hover:text-primary">{label}</Link>)}
        <a href={facebookUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"><Facebook size={14} /> Facebook</a>
      </div>
    </div>
    <div className="mx-auto mt-16 max-w-7xl border-t border-border pt-7 font-mono text-[10px] uppercase text-muted-foreground">© 2026 DeyokStudio. Toate drepturile rezervate.</div>
  </footer>;
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-48"><div className="mx-auto max-w-7xl">
    <p className="mb-7 font-mono text-xs uppercase text-primary">{eyebrow}</p>
    <h1 className="max-w-5xl text-5xl font-black leading-[0.95] text-balance md:text-8xl">{title}</h1>
    <div className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</div>
  </div></section>;
}

export function CtaBand() {
  return <section className="border-t border-border bg-surface px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl">
    <p className="font-mono text-xs uppercase text-primary">Ai un proiect în minte?</p>
    <div className="mt-7 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"><h2 className="max-w-3xl text-4xl font-black md:text-6xl">Hai să construim ceva care rămâne.</h2><Link to="/contact" className="inline-flex shrink-0 items-center gap-3 bg-primary px-7 py-4 font-bold uppercase text-primary-foreground transition-transform hover:-translate-y-1">Scrie-ne <ArrowRight size={18} /></Link></div>
  </div></section>;
}