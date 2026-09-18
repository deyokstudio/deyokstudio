import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageIntro } from "@/components/site";
import { logoWorks } from "@/lib/site-data";

export const Route = createFileRoute("/despre")({
  head: () => ({ meta: [
    { title: "Despre DeyokStudio — Studio creativ digital" },
    { name: "description", content: "Descoperă abordarea DeyokStudio pentru design digital modern, atent și personalizat." },
    { property: "og:title", content: "Despre DeyokStudio" },
    { property: "og:description", content: "Creativitate, claritate și atenție la detalii în fiecare proiect." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AboutPage,
});

function AboutPage() {
  return <><PageIntro eyebrow="01 / Despre" title="Despre DeyokStudio"><p>DeyokStudio este un studio creativ dedicat designului digital și experiențelor vizuale moderne.</p></PageIntro>
    <section className="border-y border-border px-5 py-24 md:px-10 md:py-32"><div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2"><div><p className="text-3xl font-bold leading-tight md:text-5xl">Transformăm ideile în proiecte clare, atractive și funcționale.</p></div><div className="space-y-7 text-lg leading-8 text-muted-foreground"><p>De la website-uri și identități vizuale până la materiale pentru social media și promovare, fiecare proiect este construit în jurul unei nevoi reale.</p><p>Combinăm creativitatea cu atenția la detalii, designul modern cu funcționalitatea și o colaborare profesionistă cu soluții personalizate.</p></div></div></section>
    <section className="px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><p className="font-mono text-xs uppercase text-primary">Principii de lucru</p><div className="mt-14 grid border border-border md:grid-cols-2 lg:grid-cols-4">{["Creativitate cu scop","Atenție la detalii","Soluții personalizate","Profesionalism constant"].map((item,i)=><div key={item} className="border-b border-border p-8 md:border-r"><span className="font-mono text-xs text-primary">0{i+1}</span><h2 className="mt-16 text-2xl font-bold">{item}</h2></div>)}</div><div className="mt-20 grid grid-cols-2 gap-3 md:grid-cols-3">{logoWorks.map((work)=><figure key={work.name} className="aspect-square border border-border bg-surface p-4"><img src={work.image} alt={`Identitate vizuală ${work.name}`} loading="lazy" className="h-full w-full object-contain" /></figure>)}</div></div></section><CtaBand /></>;
}