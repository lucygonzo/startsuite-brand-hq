import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, SectionHeader, SubTabNav } from "@/components/BrandUI";
import {
  AlertTriangle, CheckCircle2, BarChart3, ExternalLink,
} from "lucide-react";
import { brandData } from "@/data/brandData";

export default function GTMTab() {
  const [sub, setSub] = useState("overview");
  const g = brandData.gtm;

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={g.keyTakeaway} />

      <SubTabNav
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "pillars", label: "GTM Pillars" },
          { id: "channels", label: "Channel Mix" },
          { id: "timeline", label: "Launch Timeline" },
          { id: "resources", label: "Resources" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {sub === "overview" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Current Stage", value: g.currentStage, color: "border-purple-200 bg-purple-50" },
              { label: "Primary Growth Motion", value: g.primaryGrowthMotion, color: "border-blue-200 bg-blue-50" },
              { label: "GTM Fit", value: g.gtmFitScore, color: "border-green-200 bg-green-50" },
            ].map((item, i) => (
              <SectionCard key={i} className={`border ${item.color}`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-foreground leading-snug">{item.value}</p>
              </SectionCard>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-3">GTM Strengths</p>
              <ul className="space-y-2">
                {g.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 size={13} className="text-green-600 mt-0.5 shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">GTM Gaps</p>
              <ul className="space-y-2">
                {g.gaps.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle size={13} className="text-amber-600 mt-0.5 shrink-0" />{gap}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        </div>
      )}

      {sub === "pillars" && (
        <div className="space-y-4">
          {g.pillars.map((pillar, i) => (
            <SectionCard key={i} className="card-lift">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg ss-gradient flex items-center justify-center text-white font-bold text-sm shrink-0">{i + 1}</div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-1">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {sub === "channels" && (
        <SectionCard>
          <SectionHeader icon={<BarChart3 size={16} />} title="Channel Mix" subtitle="Investment level, phase, and primary audience tier for each acquisition channel" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Channel</th>
                  <th className="text-left py-2 px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Primary Tier</th>
                  <th className="text-left py-2 px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Investment</th>
                  <th className="text-center py-2 pl-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Phase</th>
                </tr>
              </thead>
              <tbody>
                {g.channels.map((ch, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="py-3 pr-4 text-sm font-medium text-foreground">{ch.channel}</td>
                    <td className="py-3 px-4 text-xs text-purple-700 font-medium">{ch.tier}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{ch.investment}</td>
                    <td className="py-3 pl-4 text-center">
                      <Badge variant="outline" className={`text-xs ${
                        ch.status.includes("Phase 1") ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>{ch.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {sub === "timeline" && (
        <div className="space-y-4">
          {g.launchTimeline.map((phase, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                  i === 0 ? "ss-gradient" : "bg-muted-foreground/30"
                }`}>{i + 1}</div>
                {i < g.launchTimeline.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
              </div>
              <SectionCard className="flex-1 mb-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-display text-base font-semibold text-foreground">{phase.phase}</h3>
                  <Badge variant="outline" className="text-xs shrink-0">{phase.timing}</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{phase.deliverables}</p>
              </SectionCard>
            </div>
          ))}
        </div>
      )}

      {sub === "resources" && (
        <div className="space-y-4">
          {g.draftedResources.map((res, i) => (
            <SectionCard key={i} className="card-lift">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-base font-semibold text-foreground">{res.title}</h3>
                    <Badge variant="outline" className={`text-xs ${
                      res.status === "Live" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>{res.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{res.description}</p>
                </div>
                {res.url !== "#" && (
                  <a href={res.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-purple-700 hover:text-purple-900 font-medium shrink-0 mt-1">
                    <ExternalLink size={13} />Open
                  </a>
                )}
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
