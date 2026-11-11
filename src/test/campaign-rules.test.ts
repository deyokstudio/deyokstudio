import { describe, expect, it } from "vitest";
import { CAMPAIGN, OFFERS, PACKAGES, getCampaignPhase } from "@/config/campaign";
import { FORMSPREE_ENDPOINT, invalidInquiryFields } from "@/lib/inquiry-validation";

describe("Black November requirements", () => {
  it("runs November 11 through November 30 in Bucharest", () => {
    expect(CAMPAIGN.start.toISOString()).toBe("2026-11-10T22:00:00.000Z");
    expect(CAMPAIGN.end.toISOString()).toBe("2026-11-30T21:59:59.000Z");
    expect(getCampaignPhase(new Date("2026-11-10T21:59:59Z"))).toBe("upcoming");
    expect(getCampaignPhase(CAMPAIGN.start)).toBe("active");
    expect(getCampaignPhase(CAMPAIGN.end)).toBe("active");
    expect(getCampaignPhase(new Date("2026-11-30T22:00:00Z"))).toBe("ended");
  });
  it("preserves the four specified package prices", () => {
    expect(PACKAGES.map(p => [p.reference, p.campaign])).toEqual([[99, 69], [178, 119], [243, 179], [384, 279]]);
    expect(PACKAGES.filter(p => p.featured).map(p => p.id)).toEqual(["digitalLaunch"]);
  });
  it("preserves all requested package deliverables", () => {
    expect(PACKAGES.map(p => p.includes.map(i => [i.service, i.qty]))).toEqual([
      [["logo", 1], ["miniBrand", 1], ["social", 3]],
      [["landing", 1], ["logo", 1], ["miniBrand", 1], ["social", 3]],
      [["business", 1], ["completeBrand", 1], ["social", 3]],
      [["advanced", 1], ["completeBrand", 1], ["social", 5], ["banner", 2]],
    ]);
  });
  it("preserves individual service campaign prices", () => {
    expect(OFFERS.map(o => o.campaign)).toEqual([59, 99, 199, 19, 45, 79, 2.5, 2.5, 159]);
    expect(OFFERS.find(o => o.id === "brandWebsite")?.campaignFrom).toBe(true);
  });
  it("sends orders to the specified Formspree form", () => {
    expect(FORMSPREE_ENDPOINT).toBe("https://formspree.io/f/moeezqqb");
  });
  it("rejects missing required fields and accepts a complete inquiry", () => {
    expect(invalidInquiryFields({ fullName: "", email: "invalid", country: "", service: "", description: "short", reference: "invalid" })).toEqual(["fullName", "email", "country", "service", "description", "reference"]);
    expect(invalidInquiryFields({ fullName: "Test Person", email: "test@example.com", country: "Romania", service: "landing", description: "A custom website for our studio.", reference: "https://example.com" })).toEqual([]);
  });
});