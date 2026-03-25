import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SectionCard, KeyTakeaway, SectionHeader, SubTabNav } from "@/components/BrandUI";
import {
  AlertTriangle, CheckCircle2, BarChart3, Zap,
} from "lucide-react";
import { brandData } from "@/data/brandData";

export default function CompetitiveTab() {
  const [sub, setSub] = useState("landscape");
  const comp = brandData.competitive;

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={comp.keyTakeaway} />

      <SubTabNav
        tabs={[
          { id: "landscape", label: "Market Landscape" },
          { id: "matrix", label: "Positioning Matrix" },
          { id: "swot", label: "SWOT" },
          { id: "recommendations", label: "Recommendations" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {sub === "landscape" && (<div className="space-y-4">

      {/* Competitive categories */}
      <div className="space-y-4">
        {comp.categories.map((cat, i) => (
          <SectionCard key={i} className="card-lift">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">{cat.category}</h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {cat.examples.map((ex, j) => (
                    <Badge key={j} variant="outline" className="text-xs">{ex}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">Strengths</p>
                <ul className="space-y-1">
                  {cat.strengths.map((s, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                      <CheckCircle2 size={11} className="text-green-600 mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-700 mb-2">Weaknesses</p>
                <ul className="space-y-1">
                  {cat.weaknesses.map((w, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                      <AlertTriangle size={11} className="text-amber-600 mt-0.5 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">StartSuite Advantage</p>
                <p className="text-xs text-foreground leading-relaxed">{cat.startSuiteAdvantage}</p>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>

      {/* White space */}
      <SectionCard>
        <div className="gradient-left-border pl-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">The White Space</p>
          <p className="text-sm text-foreground leading-relaxed">{comp.whitespace}</p>
        </div>
      </SectionCard>
      </div>)}

      {sub === "matrix" && (
        <SectionCard>
          <SectionHeader icon={<BarChart3 size={16} />} title="Positioning Matrix" subtitle="Speed vs. Strategic Depth — where StartSuite sits" />
          <div className="relative w-full aspect-square max-w-lg mx-auto bg-muted/30 rounded-xl border border-border overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-full h-px bg-border top-1/2" />
              <div className="absolute h-full w-px bg-border left-1/2" />
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-medium">Fast →</div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-medium">← Slow</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium" style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}>Strategy + Execution ↑</div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium" style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}>↓ Execution Only</div>
            <div className="absolute top-4 left-4 text-xs text-muted-foreground/50 font-medium">Slow + Strategic</div>
            <div className="absolute top-4 right-4 text-xs text-muted-foreground/50 font-medium text-right">Fast + Strategic</div>
            <div className="absolute bottom-8 left-4 text-xs text-muted-foreground/50 font-medium">Slow + Execution</div>
            <div className="absolute bottom-8 right-4 text-xs text-muted-foreground/50 font-medium text-right">Fast + Execution</div>
            {comp.positioningMatrix.competitors.map((c, i) => {
              const isStartSuite = c.name === "StartSuite";
              const left = `${c.x}%`;
              const top = `${100 - c.y}%`;
              return (
                <TooltipProvider key={i}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer ${isStartSuite ? "z-10" : "z-0"}`} style={{ left, top }}>
                        <div className={`rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-transform hover:scale-110 ${
                          isStartSuite ? "w-10 h-10 ss-gradient text-white" : "w-7 h-7 bg-white border-2 border-muted-foreground/30 text-muted-foreground"
                        }`}>
                          {isStartSuite ? "SS" : c.name[0]}
                        </div>
                        {isStartSuite && (
                          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-purple-700">StartSuite</div>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">Hover over dots for details. StartSuite occupies the fast + strategic white space.</p>
        </SectionCard>
      )}

      {sub === "swot" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SectionCard className="border-green-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-3">Strengths</p>
              <ul className="space-y-2">
                {comp.swot.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 size={13} className="text-green-600 mt-0.5 shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard className="border-amber-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">Weaknesses</p>
              <ul className="space-y-2">
                {comp.swot.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle size={13} className="text-amber-600 mt-0.5 shrink-0" />{w}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard className="border-blue-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">Opportunities</p>
              <ul className="space-y-2">
                {comp.swot.opportunities.map((o, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <Zap size={13} className="text-blue-600 mt-0.5 shrink-0" />{o}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard className="border-red-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-red-700 mb-3">Threats</p>
              <ul className="space-y-2">
                {comp.swot.threats.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle size={13} className="text-red-600 mt-0.5 shrink-0" />{t}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        </div>
      )}

      {sub === "recommendations" && (
        <div className="space-y-4">
          {comp.recommendations.map((rec, i) => (
            <SectionCard key={i} className="card-lift">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg ss-gradient flex items-center justify-center text-white font-bold text-sm shrink-0">{i + 1}</div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-1">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
