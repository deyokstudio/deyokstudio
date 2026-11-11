import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/i18n/context";
import { CampaignProvider } from "@/hooks/use-campaign";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Offers, Packages } from "@/components/site/Offers";
import { Services, Why, Process, Faq, FinalCta } from "@/components/site/Sections";
import { ContactForm } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { en } from "@/i18n/en";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { lang?: "en" | "ro" | "ru" } => {
    const lang = search["lang"];
    return lang === "en" || lang === "ro" || lang === "ru" ? { lang } : {};
  },
  head: () => ({
    meta: [
      { title: en.meta.title },
      { name: "description", content: en.meta.description },
      { property: "og:title", content: en.meta.title },
      { property: "og:description", content: en.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://deyok.site/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: en.meta.title },
      { name: "twitter:description", content: en.meta.description },
    ],
    links: [
      { rel: "canonical", href: "https://deyok.site/" },
      { rel: "alternate", hrefLang: "en", href: "https://deyok.site/" },
      { rel: "alternate", hrefLang: "ro", href: "https://deyok.site/?lang=ro" },
      { rel: "alternate", hrefLang: "ru", href: "https://deyok.site/?lang=ru" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <I18nProvider>
      <CampaignProvider>
        <Header />
        <main>
          <Hero />
          <Packages />
          <Offers />
          <Services />
          <Why />
          <Process />
          <Faq />
          <ContactForm />
          <FinalCta />
        </main>
        <Footer />
      </CampaignProvider>
    </I18nProvider>
  );
}
