export const facebookUrl = "https://www.facebook.com/profile.php?id=61591565903168";

export const webProjects = [
  {
    number: "01",
    name: "Mopul Zâmbitor",
    category: "Web Design",
    description: "Website de prezentare pentru o firmă de curățenie din Constanța.",
    image: "/assets/deyok/projects/Mopul Zambitor.png",
    url: "https://www.mopulzambitor.ro/",
  },
] as const;

export const logoWorks = ["Bakers", "FIRM", "NEXIT", "PEMELA", "YoungStar", "ZINA"].map(
  (name) => ({ name, image: `/assets/deyok/logo/${name}.png` }),
);

export const bannerWorks = [
  { name: "Frame 4", image: "/assets/deyok/bannere/Frame 4.jpg", size: "970 × 90", label: "Leaderboard" },
  { name: "Frame 13", image: "/assets/deyok/bannere/Frame 13.jpg", size: "300 × 250", label: "Dreptunghi mediu" },
  { name: "Frame 18", image: "/assets/deyok/bannere/Frame 18.jpg", size: "300 × 600", label: "Half page" },
] as const;

export const socialPrices = [
  ["Postare statică", "5 €"], ["Carousel 3–5 slide-uri", "10–15 €"],
  ["Carousel 6–10 slide-uri", "25–30 €"], ["Story", "7 €"],
  ["Cover Facebook", "10 €"], ["Cover LinkedIn", "10 €"],
  ["Banner social media", "10–15 €"], ["Thumbnail YouTube", "5–10 €"],
  ["Cover Reel", "5 €"], ["Set 5 postări", "20 €"], ["Set 10 postări", "45 €"],
  ["Set 10 stories", "40–50 €"], ["Template social media", "10 €/template"],
] as const;

export const graphicPrices = [
  ["Flyer", "10–15 €"], ["Poster", "15–20 €"], ["Broșură simplă", "25 €"],
  ["Catalog PDF", "45 €"], ["Carte de vizită", "10–15 €"], ["Design meniu", "15–20 €"],
  ["Meniu restaurant", "20–25 €"], ["Invitație", "5–10 €"],
  ["Banner publicitar", "10–15 €"], ["Design ambalaj simplu", "20–30 €"],
  ["Etichetă produs", "15–20 €"], ["Mockup", "10–30 €"],
  ["Prelucrare imagine", "5–20 €/imagine"], ["Eliminare background", "2–5 €/imagine"],
  ["Retușare foto simplă", "5–20 €"],
] as const;

export const webServices = [
  "Website de prezentare", "Landing page", "Website pentru servicii",
  "Website pentru cabane / pensiuni", "Website pentru restaurante",
  "Website pentru mici afaceri", "Redesign website", "Optimizare design responsive",
  "Integrare formulare de contact", "Publicare și configurare website",
] as const;