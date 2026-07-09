import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzjnejk";

const formMessages = {
  ro: {
    success: "Mesajul a fost trimis cu succes! Voi reveni cât mai curând.",
    error: "A apărut o eroare. Te rog încearcă din nou.",
    invalidEmail: "Te rog introdu o adresă de email validă.",
    required: "Te rog completează toate câmpurile obligatorii.",
    sending: "Se trimite...",
  },
  en: {
    success: "Your message has been sent successfully! I'll get back to you soon.",
    error: "Something went wrong. Please try again.",
    invalidEmail: "Please enter a valid email address.",
    required: "Please fill in all required fields.",
    sending: "Sending...",
  },
  ru: {
    success: "Ваше сообщение успешно отправлено! Я свяжусь с вами как можно скорее.",
    error: "Произошла ошибка. Пожалуйста, попробуйте ещё раз.",
    invalidEmail: "Пожалуйста, введите корректный email.",
    required: "Пожалуйста, заполните все обязательные поля.",
    sending: "Отправка...",
  },
} as const;
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Star,
  Plus,
  Instagram as InstaIcon,
  Twitter,
  Linkedin,
  Dribbble,
} from "lucide-react";
import { translations, type Lang } from "@/lib/i18n";
import heroPortrait from "@/assets/hero-portrait.png";
import teamOffice from "@/assets/team-office.png";
import teamSmile from "@/assets/team-smile.png";
import teamWork from "@/assets/team-work.png";
import projBrandIdentity from "@/assets/proj-brand-identity.jpg";
import projLogoDesign from "@/assets/proj-logo-design.jpg";
import projWebDesign from "@/assets/proj-web-design.jpg";
import projSocial from "@/assets/proj-social.jpg";
import projPresentation from "@/assets/proj-presentation.jpg";
import projPrintCampaign from "@/assets/proj-print-campaign.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DeyokStudio — Design that turns ideas into identity" },
      {
        name: "description",
        content:
          "DeyokStudio is a graphic and web design studio crafting modern brand identities, websites and visual systems.",
      },
      { property: "og:title", content: "DeyokStudio — Visual Identity Studio" },
      {
        property: "og:description",
        content: "Branding, web design, social media visuals and presentations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Each image used exactly once across the whole page.
const projectImages = [
  projBrandIdentity,
  projWebDesign,
  projSocial,
  projLogoDesign,
  projPresentation,
  projPrintCampaign,
];

function Index() {
  const [lang, setLang] = useState<Lang>("ro");
  const t = translations[lang];
  const [openService, setOpenService] = useState<number>(0);
  const [formData, setFormData] = useState({ name: "", email: "", project: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState<string>("");
  const fm = formMessages[lang];

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === "loading") return;
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus("error");
      setFormMessage(fm.required);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setFormStatus("error");
      setFormMessage(fm.invalidEmail);
      return;
    }
    setFormStatus("loading");
    setFormMessage("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ name: "", email: "", project: "", message: "" });
        setFormStatus("success");
        setFormMessage(fm.success);
      } else {
        setFormStatus("error");
        setFormMessage(fm.error);
      }
    } catch {
      setFormStatus("error");
      setFormMessage(fm.error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <div className="sticky top-4 z-50 px-3 sm:px-6">
        <header className="mx-auto max-w-6xl rounded-full bg-black/80 backdrop-blur-xl border border-white/10 px-3 sm:px-5 py-2.5 flex items-center gap-3">
          <a href="#" className="flex items-center shrink-0 pl-2">
            <span className="font-display font-bold tracking-tight text-white text-lg">
              DeyokStudio
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-1 mx-auto text-sm text-white/70">
            {(["about", "services", "projects", "process", "contact"] as const).map((k) => (
              <a
                key={k}
                href={`#${k}`}
                className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
              >
                {t.nav[k]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            <div className="flex items-center rounded-full bg-white/5 border border-white/10 p-0.5 text-xs">
              {(["ro", "ru", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full transition-all font-medium uppercase ${
                    lang === l ? "bg-lime text-lime-foreground" : "text-white/60 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-lime text-lime-foreground text-xs font-semibold px-4 py-2 hover:brightness-110 transition"
            >
              {t.cta.start}
            </a>
          </div>
        </header>
      </div>

      {/* HERO */}
      <section className="px-3 sm:px-6 pt-6">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-white text-neutral-900 p-6 sm:p-10 md:p-14 relative overflow-hidden">
          <Sparkles className="absolute left-6 top-6 h-8 w-8 text-lime" strokeWidth={2.5} />
          <div className="grid md:grid-cols-[1.15fr_1fr] gap-8 items-center">
            <div className="relative z-10">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[1.02] tracking-tight">
                {t.hero.title}
                <Sparkles className="inline-block ml-2 h-8 w-8 text-lime rotate-12" />
              </h1>
              <p className="mt-6 text-neutral-600 max-w-md text-[15px] leading-relaxed">
                {t.hero.sub}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium hover:bg-neutral-100 transition"
                >
                  {t.hero.badge} <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-neutral-100 scale-90 -translate-y-2" />
              <img
                src={heroPortrait}
                alt="DeyokStudio creative lead"
                className="relative z-10 w-full max-w-md mx-auto rounded-[2rem] object-cover aspect-[4/5]"
              />
              <div className="absolute -right-2 top-6 z-20 flex flex-col items-end">
                <div className="flex gap-0.5 text-lime">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-lime" />
                  ))}
                </div>
                <div className="mt-1 text-right">
                  <div className="font-display text-2xl font-black leading-none">Studio</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wide">
                    {t.hero.rating}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 hidden md:flex items-center gap-2 bg-neutral-900 rounded-full p-1.5">
            <a
              href="#contact"
              className="rounded-full bg-lime text-lime-foreground px-5 py-2 text-sm font-semibold"
            >
              {t.cta.startYours}
            </a>
            <a href="#services" className="rounded-full text-white px-5 py-2 text-sm font-medium">
              {t.cta.discuss}
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="px-3 sm:px-6 mt-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-surface border border-white/5 p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-radial-lime" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.stats.map((s, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="font-display text-3xl sm:text-4xl font-black text-white">
                  {s.k}
                  <span className="text-lime">+</span>
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="about" className="px-3 sm:px-6 mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight">
              {t.story.title}
            </h2>
            <p className="text-white/60 leading-relaxed text-[15px] max-w-md md:mt-3">
              {t.story.body}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-10">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] group">
              <img
                src={teamOffice}
                alt="Team at work"
                className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center bg-lime text-lime-foreground rounded-full px-4 py-2 font-display font-bold text-xs uppercase tracking-wide">
                  {t.story.badge}
                </div>
              </div>
              <Sparkles className="absolute top-4 left-4 text-lime h-6 w-6" strokeWidth={2.5} />
            </div>
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] group">
              <img
                src={teamSmile}
                alt="Creative collaboration"
                className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
              />
              <svg
                className="absolute top-4 right-4 h-10 w-10 text-lime"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M20 5 Q25 15 20 20 Q15 25 20 35"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="5" r="2.5" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-3 sm:px-6 mt-24">
        <div className="mx-auto max-w-6xl relative">
          <div className="absolute -inset-4 bg-radial-lime opacity-60 pointer-events-none" />
          <div className="relative rounded-[2.5rem] bg-surface border border-white/5 p-6 sm:p-10">
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8">
              <div>
                <div className="inline-block bg-lime text-lime-foreground px-3 py-1 rounded-full text-[10px] font-black tracking-widest mb-6">
                  {t.services.kicker}
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-black leading-[1.05]">
                  <span className="text-white">{t.services.titlePre} </span>
                  <span className="bg-lime text-lime-foreground px-3 rounded-lg inline-block">
                    {t.services.titleAccent}
                  </span>
                </h2>
                <p className="text-white/60 mt-4 max-w-md text-[15px]">{t.services.sub}</p>

                {/* ACCORDION */}
                <div className="mt-8 space-y-3">
                  {t.services.items.map((item, i) => {
                    const isOpen = openService === i;
                    return (
                      <div
                        key={item.title}
                        className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                          isOpen
                            ? "bg-surface-2 border-lime/40 shadow-[0_0_40px_-8px_var(--lime-glow)]"
                            : "bg-surface-2 border-white/5 hover:border-lime/20"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenService(isOpen ? -1 : i)}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
                          aria-expanded={isOpen}
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <span className="text-lime font-mono text-sm font-bold w-6 shrink-0">
                              0{i + 1}
                            </span>
                            <span className="font-medium text-white text-[15px] truncate">
                              {item.title}
                            </span>
                          </div>
                          <span
                            className={`h-8 w-8 shrink-0 rounded-full grid place-items-center transition-all duration-300 ${
                              isOpen
                                ? "bg-lime text-lime-foreground rotate-45"
                                : "bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white"
                            }`}
                          >
                            <Plus className="h-4 w-4" strokeWidth={2.5} />
                          </span>
                        </button>
                        <div
                          className={`grid transition-all duration-300 ease-out ${
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-5 pb-5 pt-1 pl-16">
                              <p className="text-white/70 text-sm leading-relaxed">
                                {item.desc}
                              </p>
                              <ul className="mt-3 grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                                {item.bullets.map((b) => (
                                  <li
                                    key={b}
                                    className="flex items-center gap-2 text-white/60 text-sm"
                                  >
                                    <span className="h-1 w-1 rounded-full bg-lime shrink-0" />
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5]">
                  <img
                    src={teamWork}
                    alt="Design in progress"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <a
                  href="#process"
                  className="block rounded-3xl bg-surface-2 border border-white/5 p-5 hover:border-lime/30 transition group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[15px] font-semibold text-white leading-tight">
                        {t.services.card1}
                      </div>
                      <div className="text-xs text-white/50 mt-1">{t.services.card1sub}</div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-white/50 group-hover:text-lime transition" />
                  </div>
                </a>
                <a
                  href="#contact"
                  className="block rounded-3xl bg-lime text-lime-foreground p-5 hover:brightness-110 transition group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[15px] font-bold leading-tight">{t.services.card2}</div>
                      <div className="text-xs opacity-70 mt-1">{t.services.card2sub}</div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-black text-lime grid place-items-center shrink-0">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE BANNER */}
      <section className="mt-24 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 3 }).map((_, r) => (
            <div key={r} className="flex items-center gap-8 pr-8">
              {t.banner.map((w, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span className="font-display text-5xl sm:text-7xl font-black tracking-tight text-white">
                    {w}
                  </span>
                  <Sparkles className="h-8 w-8 text-lime" strokeWidth={2.5} />
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-6xl px-6 mt-8 border-t border-white/10 pt-6 flex justify-center">
          <Sparkles className="h-5 w-5 text-lime" />
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="px-3 sm:px-6 mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-[1.05]">
              {t.process.title}
            </h2>
            <p className="text-white/60 max-w-sm text-[15px]">{t.process.sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.process.steps.map((s, i) => (
              <div
                key={s.t}
                className="rounded-3xl bg-surface border border-white/5 p-6 hover:border-lime/30 transition group relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 bg-radial-lime opacity-0 group-hover:opacity-100 transition" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs text-lime font-bold">0{i + 1}</span>
                    <div className="h-9 w-9 rounded-full bg-lime/10 border border-lime/30 grid place-items-center text-lime">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="font-display text-2xl font-black text-white">{s.t}</div>
                  <div className="text-white/50 text-sm mt-2 leading-relaxed">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-3 sm:px-6 mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-block bg-lime text-lime-foreground px-3 py-1 rounded-full text-[10px] font-black tracking-widest mb-3">
                {t.projects.kicker}
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black leading-[1.05]">
                {t.projects.title}
              </h2>
            </div>
            <p className="text-white/60 max-w-sm text-[15px]">{t.projects.sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.projects.list.map((p, i) => (
              <div
                key={i}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-surface"
              >
                <img
                  src={projectImages[i]}
                  alt={p.t}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 bg-lime text-lime-foreground text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full">
                  {p.c}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="font-display text-2xl font-black text-white leading-tight">
                    {p.t}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur border border-white/20 grid place-items-center text-white group-hover:bg-lime group-hover:text-lime-foreground transition">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="px-3 sm:px-6 mt-24">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-surface border border-white/5 p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-lime opacity-40" />
          <div className="relative">
            <div className="inline-block bg-lime text-lime-foreground px-3 py-1 rounded-full text-[10px] font-black tracking-widest mb-6">
              {t.testimonial.kicker}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black leading-[1.1] max-w-4xl mx-auto">
              {t.testimonial.title}
            </h2>
            <p className="text-white/60 mt-6 max-w-xl mx-auto text-[15px]">
              {t.testimonial.sub}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-3 sm:px-6 mt-24">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-surface border border-white/5 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 sm:p-12">
              <h2 className="font-display text-4xl sm:text-5xl font-black leading-[1.05]">
                {t.contact.title}
              </h2>
              <p className="text-white/60 mt-4 text-[15px]">{t.contact.sub}</p>

              <form className="mt-8 space-y-3" onSubmit={handleContactSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={formStatus === "loading"}
                    maxLength={100}
                    placeholder={t.contact.name}
                    className="w-full rounded-2xl bg-surface-2 border border-white/5 px-5 py-3.5 text-white placeholder:text-white/40 focus:border-lime/50 outline-none transition disabled:opacity-60"
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={formStatus === "loading"}
                    maxLength={255}
                    placeholder={t.contact.email}
                    className="w-full rounded-2xl bg-surface-2 border border-white/5 px-5 py-3.5 text-white placeholder:text-white/40 focus:border-lime/50 outline-none transition disabled:opacity-60"
                  />
                </div>
                <input
                  name="project"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  disabled={formStatus === "loading"}
                  maxLength={150}
                  placeholder={t.contact.typePh}
                  className="w-full rounded-2xl bg-surface-2 border border-white/5 px-5 py-3.5 text-white placeholder:text-white/40 focus:border-lime/50 outline-none transition disabled:opacity-60"
                />
                <textarea
                  required
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={formStatus === "loading"}
                  maxLength={2000}
                  placeholder={t.contact.messagePh}
                  className="w-full rounded-2xl bg-surface-2 border border-white/5 px-5 py-3.5 text-white placeholder:text-white/40 focus:border-lime/50 outline-none transition resize-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="inline-flex items-center gap-2 rounded-full bg-lime text-lime-foreground font-bold px-6 py-3.5 hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === "loading" ? (
                    <>
                      {fm.sending} <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      {t.cta.send} <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                {formMessage && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`mt-3 rounded-2xl px-4 py-3 text-sm border ${
                      formStatus === "success"
                        ? "bg-lime/10 border-lime/30 text-lime"
                        : "bg-red-500/10 border-red-500/30 text-red-300"
                    }`}
                  >
                    {formMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Right side — decorative panel (no photo, each image used once elsewhere) */}
            <div className="relative min-h-[300px] md:min-h-0 bg-black overflow-hidden flex flex-col justify-between p-8 sm:p-12">
              <div className="absolute inset-0 bg-radial-lime opacity-70" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,oklch(0.9_0.24_130/0.15)_50%,transparent_60%)]" />

              <div className="relative flex items-start justify-between">
                <div className="text-[10px] uppercase tracking-widest text-lime font-black">
                  {t.contact.sideKicker}
                </div>
                <Sparkles className="h-6 w-6 text-lime" strokeWidth={2.5} />
              </div>

              <div className="relative">
                <div className="font-display text-4xl sm:text-5xl font-black text-white leading-[1.05] break-all">
                  {t.contact.sideEmail}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {t.banner.map((w) => (
                    <span
                      key={w}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
                    >
                      {w}
                    </span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime text-lime-foreground px-4 py-2 text-xs font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
                  {t.contact.sideNote}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-3 sm:px-6 mt-16 pb-6">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-lime text-lime-foreground p-8 sm:p-12">
          <div className="grid md:grid-cols-[1.3fr_1fr_1fr_1.4fr] gap-8">
            <div>
              <div className="font-display text-4xl font-black">DeyokStudio</div>
              <p className="mt-3 text-sm text-lime-foreground/70 max-w-xs">{t.footer.tagline}</p>
              <div className="flex items-center gap-2 mt-6">
                {[InstaIcon, Twitter, Linkedin, Dribbble].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="h-9 w-9 rounded-full bg-black/10 hover:bg-black hover:text-lime grid place-items-center transition"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-4">
                {t.footer.colServices}
              </div>
              <ul className="space-y-2 text-sm">
                {t.services.items.slice(0, 5).map((s) => (
                  <li key={s.title}>
                    <a href="#services" className="hover:underline">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-4">
                {t.footer.colNav}
              </div>
              <ul className="space-y-2 text-sm">
                {(["about", "services", "projects", "process", "contact"] as const).map((k) => (
                  <li key={k}>
                    <a href={`#${k}`} className="hover:underline">
                      {t.nav[k]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-4">
                {t.footer.newsletter}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  (e.currentTarget as HTMLFormElement).reset();
                }}
                className="flex items-center gap-2 bg-black/10 rounded-full p-1"
              >
                <input
                  type="email"
                  required
                  placeholder={t.footer.emailPh}
                  className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-lime-foreground/50"
                />
                <button className="rounded-full bg-black text-lime px-4 py-2 text-sm font-bold hover:brightness-125 transition">
                  {t.footer.subscribe}
                </button>
              </form>
              <div className="mt-6 text-xs">
                <div className="font-bold">{t.footer.colContact}</div>
                <div className="opacity-70 mt-1">hello@deyokstudio.com</div>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>© {new Date().getFullYear()} DeyokStudio. {t.footer.rights}</div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> Design + Strategy + Identity
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Suppress unused-import warnings for icons intentionally left in the toolbox for future variants.
void ArrowRight;
