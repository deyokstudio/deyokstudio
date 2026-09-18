import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site";
import { graphicPrices, socialPrices, webServices } from "@/lib/site-data";

export const Route = createFileRoute("/servicii")({
  head: () => ({ meta: [
    { title: "Servicii și prețuri — DeyokStudio" },
    { name: "description", content: "Web design, social media design, branding și design grafic cu prețuri transparente." },
    { property: "og:title", content: "Servicii și prețuri — DeyokStudio" },
    { property: "og:description", content: "Servicii creative pentru o prezență vizuală clară și profesionistă." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ServicesPage,
});

function PriceList({ items }: { items: readonly (readonly [string,string])[] }) { return <div className="grid gap-x-12 md:grid-cols-2">{items.map(([name,price])=><div key={name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-5 border-b border-border py-5"><span className="min-w-0">{name}</span><strong className="shrink-0 font-mono text-sm text-primary">{price}</strong></div>)}</div>; }

function ServicesPage() {
  return <><PageIntro eyebrow="02 / Servicii" title="Design construit pentru a face diferența."><p>Soluții digitale și vizuale adaptate brandului tău, prezentate clar și fără pachete inutile.</p></PageIntro>
    <section className="border-y border-border px-5 py-24 md:px-10"><div className="mx-auto max-w-7xl"><p className="font-mono text-xs uppercase text-primary">Social Media Design</p><h2 className="mt-5 text-4xl font-black">Conținut vizual coerent.</h2><div className="mt-12"><PriceList items={socialPrices}/></div>
      <div className="mt-20 grid gap-px border border-border bg-border md:grid-cols-3">{[["Basic","80 €/lună",["10 postări","Design unitar"]],["Standard","130 €/lună",["15 postări","Stories","Carousel-uri"]],["Premium","200 €/lună",["20+ materiale","Stories","Carousel-uri","Bannere","Template-uri"]]].map(([name,price,features])=><article key={String(name)} className="bg-background p-8"><p className="font-mono text-xs uppercase text-primary">Abonament</p><h3 className="mt-5 text-3xl font-bold">{String(name)}</h3><p className="mt-2 text-xl text-primary">{String(price)}</p><ul className="mt-10 space-y-3 text-muted-foreground">{(features as string[]).map(x=><li key={x}>— {x}</li>)}</ul></article>)}</div>
      <p className="mt-8 border-l border-primary pl-5 text-sm text-muted-foreground">Administrarea conturilor nu este inclusă în prețurile de mai sus și se negociază separat.</p></div></section>
    <section className="px-5 py-24 md:px-10"><div className="mx-auto max-w-7xl"><p className="font-mono text-xs uppercase text-primary">Design Grafic</p><h2 className="mt-5 text-4xl font-black">Materiale create cu precizie.</h2><div className="mt-12"><PriceList items={graphicPrices}/></div></div></section>
    <section className="border-t border-border bg-surface px-5 py-24 md:px-10"><div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-mono text-xs uppercase text-primary">Web Design</p><h2 className="mt-5 text-4xl font-black">Experiențe digitale care lucrează pentru tine.</h2><p className="mt-7 text-muted-foreground">Prețul se stabilește în funcție de complexitatea proiectului.</p><Link to="/contact" className="mt-9 inline-block bg-primary px-7 py-4 font-bold uppercase text-primary-foreground">Solicită o ofertă</Link></div><div className="grid gap-px border border-border bg-border sm:grid-cols-2">{webServices.map((s,i)=><div key={s} className="bg-surface p-6"><span className="font-mono text-xs text-primary">{String(i+1).padStart(2,"0")}</span><h3 className="mt-8 text-lg font-bold">{s}</h3></div>)}</div></div></section>
  </>;
}