import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CAMPAIGN, PACKAGES, SERVICE_IDS, getCampaignPhase } from "@/config/campaign";

export const inquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  country: z.string().trim().min(2).max(100),
  service: z.enum(SERVICE_IDS as [string, ...string[]]),
  pkg: z
    .string()
    .max(80)
    .optional()
    .refine((v) => !v || PACKAGES.some((p) => p.id === v)),
  budget: z.string().trim().max(80).optional(),
  description: z.string().trim().min(10).max(5000),
  reference: z
    .string()
    .trim()
    .max(500)
    .optional()
    .refine((v) => !v || /^https?:\/\/\S+\.\S+/i.test(v)),
  lang: z.enum(["en", "ro", "ru"]),
  // Spam protection: honeypot must stay empty, form must be open ≥ 3 seconds
  website: z.string().max(0).optional(),
  openedAt: z.number(),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website || Date.now() - data.openedAt < 3000) {
      // Silently reject bots without storing anything
      return { ok: false as const, reason: "rejected" as const };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("inquiries").insert({
      full_name: data.fullName,
      email: data.email,
      country: data.country,
      service_type: data.service,
      selected_package: data.pkg || null,
      budget: data.budget || null,
      description: data.description,
      reference_url: data.reference || null,
      language: data.lang,
      campaign_active: getCampaignPhase(new Date()) === "active" && Date.now() <= CAMPAIGN.end.getTime(),
    });
    if (error) {
      console.error("inquiry insert failed", error);
      return { ok: false as const, reason: "error" as const };
    }
    return { ok: true as const };
  });
