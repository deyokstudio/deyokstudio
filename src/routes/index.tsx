import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site";
import { webProjects } from "@/lib/site-data";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "DeyokStudio — Design digital și web design" },
    { name: "description", content: "Studio creativ pentru website-uri, branding, design grafic și social media." },
    { property: "og:title", content: "DeyokStudio — Design digital și web design" },
    { property: "og:description", content: "Transformăm ideile în experiențe digitale clare și memorabile." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    <>
      <section className="px-5 pb-24 pt-36 md:px-10 md:pb-32 md:pt-44">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div className="animate-reveal"><p className="mb-7 font-mono text-xs uppercase text-primary">Studio creativ / România</p><h1 className="text-5xl font-black leading-[.93] text-balance md:text-8xl">Design care transformă ideile în <span className="text-primary">experiențe digitale.</span></h1><p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">Creăm website-uri, identități vizuale și materiale digitale care ajută brandurile să arate profesionist și să se facă remarcate.</p><div className="mt-10 flex flex-wrap gap-3"><Link to="/portofoliu" className="bg-primary px-7 py-4 font-bold uppercase text-primary-foreground transition-transform hover:-translate-y-1">Vezi portofoliul</Link><Link to="/servicii" className="border border-border px-7 py-4 font-bold uppercase transition-colors hover:bg-surface">Descoperă serviciile</Link></div></div>
          <div className="hero-art animate-reveal overflow-hidden border border-border bg-surface p-5 [animation-delay:160ms]"><div className="grid h-full grid-cols-2 gap-3"><img src="/assets/deyok/logo/NEXIT.png" alt="Logo NEXIT realizat de DeyokStudio" className="h-full min-h-0 w-full bg-background object-contain" /><div className="grid min-h-0 grid-rows-2 gap-3"><img src="/assets/deyok/bannere/Frame 2.png" alt="Banner publicitar realizat de DeyokStudio" className="h-full min-h-0 w-full bg-background object-contain" /><img src="/assets/deyok/logo/YoungStar.png" alt="Logo Young Stars realizat de DeyokStudio" className="h-full min-h-0 w-full bg-background object-contain" /></div></div></div>
        </div>
      </section>
      <section className="border-y border-border px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><div className="mb-14 flex items-end justify-between gap-6"><p className="font-mono text-xs uppercase text-primary">01 / Servicii</p><Link to="/servicii" className="font-mono text-xs uppercase underline underline-offset-4 hover:text-primary">Vezi toate serviciile</Link></div><div className="grid border border-border bg-border sm:grid-cols-2 lg:grid-cols-4 lg:gap-px">{[["01","Web Design","Website-uri moderne, responsive și personalizate."],["02","Design Grafic","Materiale vizuale pentru promovarea brandului."],["03","Social Media Design","Postări, carousels, stories, bannere și template-uri."],["04","Branding","Elemente vizuale care construiesc o identitate coerentă."]].map(([n,t,d])=><article key={n} className="border-b border-border bg-background p-8 transition-colors hover:bg-surface sm:border-r lg:border-0"><span className="font-mono text-xs text-primary">{n}.</span><h2 className="mt-12 text-2xl font-bold">{t}</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">{d}</p></article>)}</div></div></section>
      <section className="px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><p className="font-mono text-xs uppercase text-primary">02 / Portofoliu</p><h2 className="mt-7 max-w-3xl text-4xl font-black md:text-6xl">Proiecte care vorbesc despre noi.</h2><p className="mt-6 max-w-2xl text-muted-foreground">O selecție de proiecte create pentru branduri și afaceri care vor să se prezinte mai bine online.</p><div className="mt-16 grid gap-14 md:grid-cols-2">{webProjects.map((project)=><article key={project.name} className="group"><a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Deschide website-ul ${project.name} într-un tab nou`} className="block overflow-hidden border border-border bg-surface"><img src={project.image} alt={`Preview website ${project.name}`} className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></a><div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-5"><div className="min-w-0"><p className="font-mono text-xs uppercase text-primary">{project.number} / {project.category}</p><h3 className="mt-2 text-2xl font-bold"><a href={project.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">{project.name}</a></h3><p className="mt-2 text-sm text-muted-foreground">{project.description}</p></div><a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Deschide website-ul ${project.name} într-un tab nou`} className="grid size-11 shrink-0 place-items-center border border-border transition-colors hover:border-primary hover:text-primary"><ArrowRight size={18}/></a></div></article>)}</div></div></section>
      <CtaBand />
    </>
  );
}
