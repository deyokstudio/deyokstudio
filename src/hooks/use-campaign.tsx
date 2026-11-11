import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CAMPAIGN, getCampaignPhase, type CampaignPhase } from "@/config/campaign";
import type { PackageId, ServiceId } from "@/config/campaign";

interface CampaignValue {
  phase: CampaignPhase;
  /** null until hydrated, so SSR and client markup match */
  now: Date | null;
  target: Date | null;
  selection: { service?: ServiceId; pkg?: PackageId; nonce: number };
  select: (s: { service?: ServiceId; pkg?: PackageId }) => void;
}

const Ctx = createContext<CampaignValue | null>(null);

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [now, setNow] = useState<Date | null>(null);
  const [selection, setSelection] = useState<CampaignValue["selection"]>({ nonce: 0 });

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Before hydration assume the phase from build/request time
  const phase = getCampaignPhase(now ?? new Date());
  const target = phase === "upcoming" ? CAMPAIGN.start : phase === "active" ? CAMPAIGN.end : null;

  const select: CampaignValue["select"] = (s) => {
    setSelection((prev) => ({ ...s, nonce: prev.nonce + 1 }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return <Ctx.Provider value={{ phase, now, target, selection, select }}>{children}</Ctx.Provider>;
}

export function useCampaign() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCampaign must be used inside CampaignProvider");
  return v;
}
