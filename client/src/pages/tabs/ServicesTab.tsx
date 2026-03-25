import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, SectionHeader } from "@/components/BrandUI";
import {
  Zap, ChevronRight, CheckCircle2, Layers, Briefcase, Star, Plus, Crown,
} from "lucide-react";
import { brandData } from "@/data/brandData";

const phaseConfig: Record<string, { label: string; badgeClass: string; icon: React.ReactNode }> = {
  "Entry Point": { label: "Entry Point", badgeClass: "ss-gradient text-white border-0", icon: <Star size={16} /> },
  "Subscription": { label: "Core Subscription", badgeClass: "bg-purple-100 text-purple-700 border-purple-200", icon: <Layers size={16} /> },
  "Add-On": { label: "Add-On Services", badgeClass: "bg-blue-100 text-blue-700 border-blue-200", icon: <Plus size={16} /> },
  "Premium": { label: "Premium Tier", badgeClass: "bg-amber-100 text-amber-800 border-amber-200", icon: <Crown size={16} /> },
};

const phaseOrder = ["Entry Point", "Subscription", "Add-On", "Premium"];

export default function ServicesTab() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text="StartSuite is a creative operating system with a four-tier product model: Brand Discovery (entry point), Foundations at $3K/month (core subscription), modular add-on services, and Dream Client engagements at $10K+/month. Every tier compounds on the one before it." />

      {/* How it works */}
      <SectionCard>
        <SectionHeader icon={<Zap size={16} />} title="How It Works" subtitle="The four phases of every StartSuite engagement" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {brandData.howItWorks.map((step) => (
            <div key={step.step} className="relative">
              {step.step < 4 && (
                <div className="hidden md:block absolute top-5 left-full w-full h-px bg-gradient-to-r from-purple-300 to-transparent z-10" />
              )}
              <div className="p-4 rounded-xl border border-border bg-card h-full">
                <div className="w-8 h-8 rounded-full ss-gradient flex items-center justify-center text-white font-bold text-sm mb-3">{step.step}</div>
                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200 mb-2">{step.label}</Badge>
                <p className="text-sm font-semibold text-foreground mb-1">{step.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Services grouped by phase */}
      <div className="space-y-4">
        {phaseOrder.map((phase) => {
          const services = brandData.services.filter(s => s.phase === phase);
          if (services.length === 0) return null;
          const config = phaseConfig[phase];
          return (
            <div key={phase} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <Badge className={`text-xs ${config.badgeClass}`}>{config.label}</Badge>
                <div className="h-px flex-1 bg-border" />
              </div>

              {services.map((service) => {
                const globalIdx = brandData.services.indexOf(service);
                const isExpanded = expanded === globalIdx;
                return (
                  <div
                    key={globalIdx}
                    className="rounded-xl border border-border overflow-hidden card-lift"
                  >
                    <button
                      onClick={() => setExpanded(isExpanded ? null : globalIdx)}
                      className="w-full flex items-center justify-between gap-4 p-5 bg-card hover:bg-muted/30 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 ${
                          phase === "Entry Point" ? "ss-gradient" :
                          phase === "Subscription" ? "bg-purple-600" :
                          phase === "Add-On" ? "bg-blue-600" : "bg-amber-600"
                        }`}>
                          {config.icon}
                        </div>
                        <div>
                          <p className="font-display font-semibold text-foreground">{service.name}</p>
                          <p className="text-xs text-muted-foreground">{service.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 hidden md:flex">{service.timeline}</Badge>
                        <ChevronRight size={16} className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-border bg-muted/20">
                        <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-4">{service.description}</p>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Deliverables</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                            {service.deliverables.map((d, j) => (
                              <div key={j} className="flex items-center gap-2 text-xs text-foreground">
                                <CheckCircle2 size={12} className="text-green-600 shrink-0" />
                                {d}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
