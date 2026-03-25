import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, FieldRow, SectionHeader, SubTabNav } from "@/components/BrandUI";
import {
  Briefcase, CheckCircle2, Package, Zap,
} from "lucide-react";
import { brandData } from "@/data/brandData";

export default function ProductTab() {
  const [sub, setSub] = useState("model");
  const p = brandData.product;

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={p.keyTakeaway} />

      <SubTabNav
        tabs={[
          { id: "model", label: "Current Model" },
          { id: "paas", label: "PaaS Vision" },
          { id: "roadmap", label: "Roadmap" },
          { id: "differentiators", label: "Differentiators" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {sub === "model" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<Briefcase size={16} />} title={p.currentModel.type} subtitle={p.currentModel.description} />
          </SectionCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {p.currentModel.phases.map((phase, i) => (
              <SectionCard key={i} className={i === 0 ? "border-purple-200" : "border-blue-200"}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg ss-gradient flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
                  <h3 className="font-display text-base font-semibold text-foreground">{phase.name}</h3>
                </div>
                <FieldRow label="Duration" value={phase.duration} />
                <FieldRow label="Pricing" value={phase.pricing} />
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Deliverables</p>
                  <p className="text-xs text-foreground leading-relaxed">{phase.deliverables}</p>
                </div>
              </SectionCard>
            ))}
          </div>
        </div>
      )}

      {sub === "paas" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<Package size={16} />} title="PaaS Product Vision" />
            <div className="p-4 rounded-xl ss-gradient text-white mb-5">
              <p className="text-sm font-semibold">{p.paasVision.corePrinciple}</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.paasVision.description}</p>
            <FieldRow label="Target User" value={p.paasVision.targetUser} />
          </SectionCard>
          <SectionCard>
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-3">Core PaaS Capabilities</p>
            <div className="space-y-2">
              {p.paasVision.keyCapabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  <div className="w-6 h-6 rounded-full ss-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">{i + 1}</div>
                  <p className="text-sm text-foreground">{cap}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {sub === "roadmap" && (
        <div className="space-y-4">
          {p.roadmap.map((phase, i) => (
            <SectionCard key={i} className={`card-lift border-l-4 ${
              phase.status === "Active" ? "border-l-green-500" :
              phase.status === "Planned" ? "border-l-blue-500" : "border-l-muted-foreground/30"
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">{phase.phase}</h3>
                  <p className="text-xs text-muted-foreground">{phase.focus}</p>
                </div>
                <Badge variant="outline" className={`text-xs shrink-0 ${
                  phase.status === "Active" ? "bg-green-50 text-green-700 border-green-200" :
                  phase.status === "Planned" ? "bg-blue-50 text-blue-700 border-blue-200" :
                  "bg-muted text-muted-foreground"
                }`}>{phase.status}</Badge>
              </div>
              <ul className="space-y-1.5">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-foreground">
                    <CheckCircle2 size={12} className={`mt-0.5 shrink-0 ${
                      phase.status === "Active" ? "text-green-600" :
                      phase.status === "Planned" ? "text-blue-500" : "text-muted-foreground/50"
                    }`} />{item}
                  </li>
                ))}
              </ul>
            </SectionCard>
          ))}
        </div>
      )}

      {sub === "differentiators" && (
        <SectionCard>
          <SectionHeader icon={<Zap size={16} />} title="Product Differentiators" subtitle="What makes StartSuite's model impossible to replicate" />
          <div className="space-y-3">
            {p.differentiators.map((d, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-purple-200 bg-purple-50">
                <div className="w-7 h-7 rounded-full ss-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">{i + 1}</div>
                <p className="text-sm text-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
