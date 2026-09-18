import { createFileRoute } from "@tanstack/react-router";
import { Facebook, LoaderCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageIntro } from "@/components/site";
import { facebookUrl } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — DeyokStudio" },
    { name: "description", content: "Trimite-ne detaliile proiectului tău de web design, branding sau design digital." },
    { property: "og:title", content: "Contact — DeyokStudio" },
    { property: "og:description", content: "Hai să lucrăm împreună la următorul tău proiect." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ContactPage,
});

function ContactPage() {
  const [state,setState]=useState<"idle"|"loading"|"success"|"error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form=event.currentTarget; if(!form.reportValidity()) return; setState("loading"); try { const response=await fetch("https://formspree.io/f/xyeyqkna",{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}}); if(!response.ok) throw new Error("submit"); form.reset(); setState("success"); } catch { setState("error"); } }
  const field="mt-2 w-full border border-border bg-background px-4 py-3.5 text-foreground outline-none transition-colors focus:border-primary";
  return <><PageIntro eyebrow="04 / Contact" title="Hai să lucrăm împreună."><p>Ai o idee, un proiect nou sau vrei să îți îmbunătățești imaginea online? Spune-ne ce ai în minte și revenim cu mai multe detalii.</p></PageIntro>
    <section className="border-t border-border px-5 py-24 md:px-10"><div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.7fr_1.3fr]"><aside><p className="font-mono text-xs uppercase text-primary">Social</p><a href={facebookUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-4 border border-border p-5 transition-colors hover:border-primary hover:text-primary"><Facebook size={20}/><span>Urmărește DeyokStudio pe Facebook</span></a></aside><form onSubmit={submit} noValidate className="grid gap-6 sm:grid-cols-2">
      <label className="text-sm">Nume *<input className={field} name="name" required maxLength={100} autoComplete="name"/></label><label className="text-sm">Email *<input className={field} name="email" type="email" required maxLength={255} autoComplete="email"/></label><label className="text-sm">Telefon — opțional<input className={field} name="phone" type="tel" maxLength={30} autoComplete="tel"/></label><label className="text-sm">Tip proiect *<select className={field} name="projectType" required defaultValue=""><option value="" disabled>Alege serviciul</option><option>Web Design</option><option>Design Grafic</option><option>Social Media Design</option><option>Branding</option><option>Alt serviciu</option></select></label><label className="text-sm sm:col-span-2">Buget — opțional<input className={field} name="budget" maxLength={80}/></label><label className="text-sm sm:col-span-2">Mesaj *<textarea className={`${field} min-h-40 resize-y`} name="message" required maxLength={2000}/></label>
      <div className="sm:col-span-2"><button disabled={state==="loading"} className="inline-flex min-w-52 items-center justify-center gap-3 bg-primary px-7 py-4 font-bold uppercase text-primary-foreground disabled:opacity-60">{state==="loading"?<><LoaderCircle className="animate-spin" size={18}/> Se trimite</>:<><Send size={18}/> Trimite mesajul</>}</button>{state==="success"&&<p role="status" className="mt-5 border-l border-primary pl-4 text-primary">Mulțumim! Mesajul a fost trimis cu succes.</p>}{state==="error"&&<p role="alert" className="mt-5 border-l border-destructive pl-4 text-destructive">Mesajul nu a putut fi trimis. Te rugăm să încerci din nou.</p>}</div>
    </form></div></section></>;
}