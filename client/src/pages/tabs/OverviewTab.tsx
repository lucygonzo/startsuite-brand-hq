import { SectionCard, KeyTakeaway } from "@/components/BrandUI";
import {
  TrendingUp, ChevronRight, AlertTriangle, CheckCircle2, Target, Zap,
  Search, Lightbulb, Eye,
} from "lucide-react";
import { brandData } from "@/data/brandData";

export default function OverviewTab() {
  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={brandData.keyTakeaway} />

      {/* What We Learned — Orientation Cards */}
      <SectionCard>
        <h3 className="font-display text-base font-semibold mb-4">What We Learned</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-purple-200 bg-gradient-to-b from-purple-50 to-violet-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg ss-gradient flex items-center justify-center text-white shrink-0">
                <Search size={14} />
              </div>
              <p className="text-sm font-semibold text-foreground">What We Researched</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Competitive landscape, audience segmentation, brand positioning, verbal and visual identity, product-market fit, go-to-market channels, and the March 2026 pivot from creative agency to creative operating system. Sources include the StartSuite website, pitch deck drafts, board meeting transcripts, and client engagement data.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-blue-200 bg-gradient-to-b from-blue-50 to-indigo-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg ss-gradient flex items-center justify-center text-white shrink-0">
                <Lightbulb size={14} />
              </div>
              <p className="text-sm font-semibold text-foreground">What Surprised Us</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The creative operating system positioning is genuinely unoccupied. No competitor combines startup speed, senior strategic depth, investor perspective, AI-accelerated execution, and a living intelligence layer that compounds. The context-as-moat thesis is stronger than expected and is the most defensible positioning we found.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 bg-gradient-to-b from-amber-50 to-orange-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg ss-gradient flex items-center justify-center text-white shrink-0">
                <Eye size={14} />
              </div>
              <p className="text-sm font-semibold text-foreground">What Needs Your Eyes On</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Brand Discovery pricing is undefined and blocks the sales pipeline. No published case studies exist yet. The first hire (creative generalist with AI fluency) is critical to scaling without diluting quality. LinkedIn content cadence needs to reach 3x/week consistently before paid media launches.
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Executive Summary */}
      <SectionCard>
        <div className="flex items-start gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg ss-gradient flex items-center justify-center text-white shrink-0">
            <TrendingUp size={16} />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">Executive Summary</h3>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{brandData.executiveSummary}</p>
      </SectionCard>

      {/* Key Highlights */}
      <SectionCard>
        <h3 className="font-display text-base font-semibold mb-4">Key Highlights</h3>
        <ul className="space-y-3">
          {brandData.keyHighlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full ss-gradient flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
              <p className="text-sm text-foreground leading-relaxed">{h}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Proof Points */}
      <SectionCard>
        <h3 className="font-display text-base font-semibold mb-4">By the Numbers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brandData.proofPoints.slice(0, 4).map((p, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-gradient-to-b from-purple-50 to-violet-50 border border-purple-100">
              <p className="font-display text-2xl font-bold ss-gradient-text">{p.stat}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-tight">{p.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {brandData.proofPoints.slice(4).map((p, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <div className="w-8 h-8 rounded-lg ss-gradient flex items-center justify-center shrink-0">
                <Zap size={14} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{p.stat}</p>
                <p className="text-xs text-muted-foreground">{p.label}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Strengths + Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard>
          <h3 className="font-display text-base font-semibold mb-4 text-green-700">Strengths</h3>
          <ul className="space-y-4">
            {brandData.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={15} className="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard>
          <h3 className="font-display text-base font-semibold mb-4 text-amber-700">Challenges</h3>
          <ul className="space-y-4">
            {brandData.challenges.map((c, i) => (
              <li key={i} className="flex items-start gap-3">
                <AlertTriangle size={15} className="text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{c.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Critical Question */}
      <SectionCard>
        <div className="flex items-start gap-3 mb-5">
          <Target size={18} className="text-purple-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-display text-base font-semibold">The Critical Question</h3>
            <p className="text-sm text-foreground mt-1 leading-relaxed italic">{brandData.criticalQuestion}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="gradient-left-border pl-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">The Opportunity</p>
            <p className="text-sm text-muted-foreground mb-3">{brandData.opportunity}</p>
            <ul className="space-y-1.5">
              {brandData.opportunityPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                  <ChevronRight size={12} className="text-green-600 mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l-4 border-amber-400 pl-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">The Risk</p>
            <p className="text-sm text-muted-foreground mb-3">{brandData.risk}</p>
            <ul className="space-y-1.5">
              {brandData.riskPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                  <AlertTriangle size={12} className="text-amber-600 mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l-4 border-purple-400 pl-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">What Success Looks Like</p>
            <p className="text-sm text-muted-foreground mb-3">{brandData.successLooks}</p>
            <ul className="space-y-1.5">
              {brandData.successPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                  <ChevronRight size={12} className="text-purple-600 mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
