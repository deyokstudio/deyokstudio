import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Facebook, Instagram, Linkedin, Loader2, Mail, Music2, Palette } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { useCampaign } from "@/hooks/use-campaign";
import { CONTACT_EMAIL, PACKAGES, SERVICE_IDS, SOCIAL_LINKS, type PackageId, type ServiceId } from "@/config/campaign";
import { FORMSPREE_ENDPOINT, invalidInquiryFields } from "@/lib/inquiry-validation";
import { cn } from "@/lib/utils";
import { PrimaryButton, Reveal, SectionHeading, scrollToId } from "./primitives";

type Field = "fullName" | "email" | "country" | "service" | "description" | "reference";
const fieldCls =
  "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary focus:outline-none focus:ring-0";

function Label({ htmlFor, children, required, t }: { htmlFor: string; children: string; required?: boolean; t: { required: string; optional: string } }) {
  return (
    <label htmlFor={htmlFor} className="flex items-center justify-between font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span>{children}{required && <span className="text-primary" aria-hidden> *</span>}</span>
      <span className="text-[10px] normal-case tracking-normal text-muted-foreground/60">{required ? t.required : t.optional}</span>
    </label>
  );
}

export function ContactForm() {
  const { t, lang } = useI18n();
  const { phase, selection } = useCampaign();
  const [service, setService] = useState<ServiceId | "">("");
  const [pkg, setPkg] = useState<PackageId | "">("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const openedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!selection.nonce) return;
    if (selection.service) setService(selection.service);
    setPkg(selection.pkg ?? "");
    setStatus((s) => (s === "success" ? "idle" : s));
    setErrors(({ service: _s, ...rest }) => rest);
  }, [selection]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const data = {
      fullName: v("fullName"),
      email: v("email"),
      country: v("country"),
      service,
      pkg: pkg || undefined,
      budget: v("budget") || undefined,
      description: v("description"),
      reference: v("reference") || undefined,
      website: v("website"),
      lang,
      openedAt: openedAt.current,
    };
    const errs: Partial<Record<Field, string>> = {};
    const messages = { fullName: t.form.errors.name, email: t.form.errors.email, country: t.form.errors.country, service: t.form.errors.service, description: t.form.errors.description, reference: t.form.errors.reference };
    for (const field of invalidInquiryFields({ ...data, reference: data.reference ?? "" })) errs[field] = messages[field];
    setErrors(errs);
    setFormError("");
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (data.website || Date.now() - openedAt.current < 3000) {
      setStatus("error");
      setFormError(t.form.errors.rate);
      return;
    }
    setStatus("sending");
    try {
      fd.set("service", t.offers.items[service as ServiceId].name);
      fd.set("package", pkg ? t.packages.items[pkg].name : "");
      fd.set("language", lang);
      fd.set("_gotcha", data.website);
      fd.set("_subject", "DeyokStudio — Black November inquiry");
      fd.delete("website");
      const res = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
        setService("");
        setPkg("");
      } else {
        setStatus("error");
        setFormError(res.status === 429 ? t.form.errors.rate : t.form.errors.generic);
      }
    } catch {
      setStatus("error");
      setFormError(t.form.errors.generic);
    }
  };

  const err = (f: Field) =>
    errors[f] ? <p id={`${f}-err`} className="mt-2 text-sm text-primary-glow" role="alert">{errors[f]}</p> : null;
  const aria = (f: Field) => ({ "aria-invalid": !!errors[f], "aria-describedby": errors[f] ? `${f}-err` : undefined });

  return (
    <section id="contact" className="relative border-t border-border bg-background-2 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={t.form.eyebrow} title={t.form.title} subtitle={phase === "ended" ? t.form.subtitleEnded : t.form.subtitle} />
          <SocialBlock />
        </div>
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[420px] flex-col justify-center border border-primary bg-card p-10"
                role="status"
              >
                <span className="h-1 w-12 bg-primary" aria-hidden />
                <h3 className="mt-6 text-4xl font-bold uppercase tracking-tight md:text-5xl">{t.form.successTitle}</h3>
                <p className="mt-4 max-w-md text-muted-foreground">{t.form.successText}</p>
                <button onClick={() => { setStatus("idle"); scrollToId("offers"); }} className="link-underline mt-8 self-start pb-1 font-display text-sm font-semibold uppercase tracking-wider text-primary-glow">
                  {t.form.successBack} →
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" ref={formRef} action={FORMSPREE_ENDPOINT} method="POST" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-x-8 gap-y-8 md:grid-cols-2">
                {/* honeypot */}
                <div className="absolute -left-[9999px]" aria-hidden>
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div>
                  <Label htmlFor="fullName" required t={t.form}>{t.form.name}</Label>
                  <input id="fullName" name="fullName" autoComplete="name" maxLength={120} className={fieldCls} {...aria("fullName")} />
                  {err("fullName")}
                </div>
                <div>
                  <Label htmlFor="email" required t={t.form}>{t.form.email}</Label>
                  <input id="email" name="email" type="email" autoComplete="email" maxLength={255} className={fieldCls} {...aria("email")} />
                  {err("email")}
                </div>
                <div>
                  <Label htmlFor="country" required t={t.form}>{t.form.country}</Label>
                  <input id="country" name="country" autoComplete="country-name" maxLength={100} className={fieldCls} {...aria("country")} />
                  {err("country")}
                </div>
                <div>
                  <Label htmlFor="service" required t={t.form}>{t.form.service}</Label>
                  <select id="service" name="service" value={service} onChange={(e) => setService(e.target.value as ServiceId)} className={cn(fieldCls, "cursor-pointer [&>option]:bg-card")} {...aria("service")}>
                    <option value="">{t.form.servicePlaceholder}</option>
                    {SERVICE_IDS.map((id) => <option key={id} value={id}>{t.offers.items[id].name}</option>)}
                  </select>
                  {err("service")}
                </div>
                <div>
                  <Label htmlFor="pkg" t={t.form}>{t.form.package}</Label>
                  <select id="pkg" name="pkg" value={pkg} onChange={(e) => setPkg(e.target.value as PackageId)} className={cn(fieldCls, "cursor-pointer [&>option]:bg-card")}>
                    <option value="">{t.form.packageNone}</option>
                    {PACKAGES.map((p) => <option key={p.id} value={p.id}>{p.number} — {t.packages.items[p.id].name}</option>)}
                  </select>
                </div>
                <div>
                  <Label htmlFor="budget" t={t.form}>{t.form.budget}</Label>
                  <input id="budget" name="budget" maxLength={80} placeholder={t.form.budgetPlaceholder} className={fieldCls} />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description" required t={t.form}>{t.form.description}</Label>
                  <textarea id="description" name="description" rows={5} maxLength={5000} placeholder={t.form.descriptionPlaceholder} className={cn(fieldCls, "resize-y")} {...aria("description")} />
                  {err("description")}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="reference" t={t.form}>{t.form.reference}</Label>
                  <input id="reference" name="reference" type="url" inputMode="url" maxLength={500} placeholder={t.form.referencePlaceholder} className={fieldCls} {...aria("reference")} />
                  {err("reference")}
                </div>
                <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
                  <p className="min-h-5 text-sm text-primary-glow" role="alert">{status === "error" ? formError : ""}</p>
                  <PrimaryButton type="submit" disabled={status === "sending"} className="md:min-w-56">
                    {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> {t.form.sending}</> : <>{t.form.submit} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
                  </PrimaryButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const ICONS = { instagram: Instagram, facebook: Facebook, linkedin: Linkedin, behance: Palette, tiktok: Music2 };
const NAMES = { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn", behance: "Behance", tiktok: "TikTok" };

export function SocialIcons({ className }: { className?: string }) {
  const links = SOCIAL_LINKS.filter((s) => s.url);
  if (!links.length) return null;
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((s) => {
        const I = ICONS[s.platform];
        return (
          <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={NAMES[s.platform]} className="flex h-11 w-11 items-center justify-center border border-border transition-colors hover:border-primary hover:text-primary-glow">
            <I className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

function SocialBlock() {
  const { t } = useI18n();
  const hasSocial = SOCIAL_LINKS.some((s) => s.url);
  return (
    <Reveal delay={0.1} className="mt-14 border-t border-border pt-8">
      <h3 className="text-xl font-bold uppercase tracking-tight">{t.social.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{hasSocial || CONTACT_EMAIL ? t.social.text : t.social.none}</p>
      <SocialIcons className="mt-5" />
      {CONTACT_EMAIL && (
        <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline mt-5 inline-flex items-center gap-2 pb-1 text-sm">
          <Mail className="h-4 w-4 text-primary" /> {CONTACT_EMAIL}
        </a>
      )}
    </Reveal>
  );
}
