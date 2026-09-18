import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { CtaBand, PageIntro } from "@/components/site";
import { bannerWorks, logoWorks, webProjects } from "@/lib/site-data";

export const Route = createFileRoute("/portofoliu")({
  head: () => ({ meta: [
    { title: "Portofoliu — DeyokStudio" },
    { name: "description", content: "Website-uri, identități vizuale și bannere realizate de DeyokStudio." },
    { property: "og:title", content: "Portofoliu — DeyokStudio" },
    { property: "og:description", content: "O selecție de proiecte digitale și identități vizuale." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: PortfolioPage,
});

function PortfolioPage() {
  return <><PageIntro eyebrow="03 / Portofoliu" title="Lucrări selectate, idei puse în formă."><p>Website-uri, identități și materiale publicitare create pentru contexte și obiective diferite.</p></PageIntro>
    <section className="border-y border-border px-5 py-24 md:px-10"><div className="mx-auto max-w-7xl"><h2 className="font-mono text-xs uppercase text-primary">Website-uri</h2><div className="mt-12 grid gap-16">{webProjects.map((p)=><article key={p.name} className="group"><a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Deschide website-ul ${p.name} într-un tab nou`} className="block"><img src={p.image} alt={`Website ${p.name}`} className="w-full border border-border object-cover transition-transform duration-700 group-hover:scale-[1.01]"/></a><div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr]"><div><p className="font-mono text-xs uppercase text-primary">{p.number} / {p.category}</p><h3 className="mt-3 text-3xl font-bold"><a href={p.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">{p.name}</a></h3><a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 border border-border px-5 py-3 font-mono text-xs uppercase transition-colors hover:border-primary hover:text-primary">Vizitează website-ul <ExternalLink size={14}/></a></div><p className="text-muted-foreground md:text-right">{p.description}</p></div></article>)}</div></div></section>
    <section className="px-5 py-24 md:px-10"><div className="mx-auto max-w-7xl"><h2 className="text-4xl font-black">Identități vizuale</h2><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">{logoWorks.map(w=><figure key={w.name} className="group border border-border bg-surface p-5"><img src={w.image} alt={`Logo ${w.name}`} loading="lazy" className="aspect-square w-full object-contain"/><figcaption className="mt-4 font-mono text-xs uppercase text-muted-foreground">{w.name} / Logo Design</figcaption></figure>)}</div></div></section>
    <section className="border-t border-border bg-surface px-5 py-24 md:px-10"><div className="mx-auto max-w-7xl"><p className="font-mono text-xs uppercase text-primary">Campanie publicitară</p><h2 className="mt-5 text-4xl font-black">Bannere digitale</h2><div className="mt-12 flex flex-wrap items-center justify-center gap-10 md:gap-14">{bannerWorks.map(w=><figure key={w.name} className="flex flex-col items-center gap-5"><div className="border border-border bg-background p-3"><img src={w.image} alt={`Banner ${w.label} ${w.size} realizat de DeyokStudio`} loading="lazy" className="h-auto max-h-[420px] w-auto max-w-full object-contain"/></div><figcaption className="text-center"><span className="font-mono text-xs uppercase text-primary">{w.label}</span><span className="mt-1 block font-mono text-xs text-muted-foreground">{w.size} px</span></figcaption></figure>)}</div></div></section><CtaBand /></>;
}