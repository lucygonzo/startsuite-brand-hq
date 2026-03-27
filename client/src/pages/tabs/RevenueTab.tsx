import { useState } from "react";
import { SectionCard, KeyTakeaway, SectionHeader } from "@/components/BrandUI";
import { revenueStreams } from "@/data/brandData";
import {
  DollarSign, TrendingUp, Target, Sparkles, Crown,
  ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Layers,
  Calendar, Coins, ArrowRight, Zap,
} from "lucide-react";

/* ── Static Data ─────────────────────────────────────────────────────────────── */

const tiers = [
  {
    name: "Brand Discovery",
    price: "$5K-8K",
    priceNote: "one-time (pricing TBD)",
    description: "Deep research process that produces the living Brand HQ — the North Star product and gateway to Foundations.",
    icon: <Sparkles size={16} />,
    accent: "border-t-violet-400",
    includes: [
      "Full competitive landscape analysis",
      "Audience segmentation and personas",
      "Brand positioning and messaging framework",
      "Visual and verbal identity audit",
      "Living Brand HQ deliverable",
      "Strategy presentation and roadmap",
    ],
  },
  {
    name: "Foundations",
    price: "$3,000/mo",
    priceNote: "recurring subscription",
    description: "Ongoing brand management, competitive research, reporting, strategy calls, and AI resource access. The core of the creative operating system.",
    icon: <Layers size={16} />,
    accent: "border-t-purple-600",
    isCore: true,
    includes: [
      "Brand HQ maintenance and updates",
      "Monthly competitive research reports",
      "Strategy calls and brand guidance",
      "AI resource access and workflows",
      "Quarterly brand health reviews",
      "Priority support and recommendations",
    ],
  },
  {
    name: "Add-On Services",
    price: "Modular",
    priceNote: "token/credit model (TBD)",
    description: "Content creation, paid ads, web development, AI automation, and brand refresh — layered on top of Foundations.",
    icon: <Target size={16} />,
    accent: "border-t-amber-400",
    includes: [
      "Content creation (social, video, blog)",
      "Paid media management",
      "Web development and design",
      "AI automation and n8n workflows",
      "Brand refresh and identity updates",
      "Custom project scoping",
    ],
  },
  {
    name: "Dream Client",
    price: "$10K+/mo",
    priceNote: "custom pricing",
    description: "Full-service custom engagements for select clients. Everything in Foundations plus dedicated creative resources and potential equity/revenue-share.",
    icon: <Crown size={16} />,
    accent: "border-t-emerald-400",
    includes: [
      "Everything in Foundations",
      "Dedicated creative team resources",
      "Custom strategy and execution",
      "Priority access to all add-on services",
      "Potential equity/revenue-share arrangement",
      "Direct access to senior leadership",
    ],
  },
];

const phaseTargets = [
  {
    phase: "Phase 1",
    period: "Q1-Q2 2026",
    label: "Now",
    color: "border-purple-500",
    bg: "bg-purple-50",
    tagColor: "bg-purple-100 text-purple-700",
    targets: [
      "5+ Brand Discoveries completed",
      "5+ Foundations subscribers active ($15K+ MRR)",
      "1 Dream Client (Steadwell)",
    ],
  },
  {
    phase: "Phase 2",
    period: "Q3-Q4 2026",
    label: "Scale",
    color: "border-violet-500",
    bg: "bg-violet-50",
    tagColor: "bg-violet-100 text-violet-700",
    targets: [
      "10+ Foundations subscribers ($30K+ MRR)",
      "Token/credit model live for add-ons",
      "Add-on attach rate measured and growing",
    ],
  },
  {
    phase: "Phase 3",
    period: "2027",
    label: "Expand",
    color: "border-indigo-500",
    bg: "bg-indigo-50",
    tagColor: "bg-indigo-100 text-indigo-700",
    targets: [
      "25+ Foundations subscribers ($75K+ MRR)",
      "2-3 Dream Client engagements ($20K+ from DCs)",
      "Accelerator partnerships driving cohort-level volume",
    ],
  },
];

const streamStrategies: Record<string, string> = {
  "Brand Discovery": "Elevate from pre-engagement step to standalone premium product. Each completed Discovery feeds the Foundations pipeline.",
  "Foundations (Brand HQ)": "Maintain as the largest stream while reducing over-reliance. Each subscriber = $36K ARR. Target 10+ by EOY 2026.",
  "Add-On Services": "Grow through token/credit model, clear service menu with pricing, and capacity expansion via first hire.",
  "Dream Client (Full-Service)": "Keep 2-3 active at premium pricing. High revenue per client but not scalable — protect senior capacity.",
};

/* ── Helpers ──────────────────────────────────────────────────────────────────── */

function mixBarColor(pct: number) {
  if (pct >= 40) return "#7c3aed";
  if (pct >= 20) return "#8b5cf6";
  return "#a78bfa";
}

function targetBarGradient(pct: number) {
  if (pct >= 40) return "linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%)";
  if (pct >= 20) return "linear-gradient(90deg, #8b5cf6 0%, #c4b5fd 100%)";
  return "linear-gradient(90deg, #a78bfa 0%, #ddd6fe 100%)";
}

/* ── Component ───────────────────────────────────────────────────────────────── */

export default function RevenueTab() {
  const [expandedStream, setExpandedStream] = useState<number | null>(null);

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text="StartSuite's revenue model is anchored by Foundations at $3,000/month — recurring revenue that compounds as context deepens. Brand Discovery is the gateway, add-ons capture flexible demand, and Dream Client engagements prove the full model at premium pricing." />

      {/* ── Pricing Tiers ─────────────────────────────────────────────────────── */}
      <SectionCard>
        <SectionHeader icon={<DollarSign size={16} />} title="Pricing Tiers" subtitle="Four-tier model from gateway to full-service" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`bg-card rounded-xl border border-border p-5 shadow-sm border-t-4 ${tier.accent} ${
                tier.isCore ? "ring-2 ring-purple-200" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  tier.isCore ? "ss-gradient text-white" : "bg-muted text-foreground"
                }`}>
                  {tier.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-base font-semibold text-foreground">{tier.name}</h4>
                    {tier.isCore && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">CORE</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{tier.priceNote}</p>
                </div>
              </div>

              <p className="font-display text-2xl font-bold ss-gradient-text mb-2">{tier.price}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{tier.description}</p>

              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Includes</p>
              <ul className="space-y-1.5">
                {tier.includes.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-green-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Revenue Mix Visualization ─────────────────────────────────────────── */}
      <SectionCard>
        <SectionHeader icon={<TrendingUp size={16} />} title="Revenue Mix" subtitle="Current vs. target allocation across streams" />

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {revenueStreams.map((stream, i) => {
            const delta = stream.targetMix - stream.currentMix;
            return (
              <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">{stream.name}</p>
                <p className="font-display text-lg font-bold text-foreground">{stream.currentMix}%</p>
                <p className={`text-xs font-medium ${delta > 0 ? "text-green-600" : delta < 0 ? "text-red-500" : "text-muted-foreground"}`}>
                  {delta > 0 ? "\u2191" : delta < 0 ? "\u2193" : "\u2192"} Target: {stream.targetMix}%
                </p>
              </div>
            );
          })}
        </div>

        {/* Side-by-side horizontal bars */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#8b5cf6" }} />
              <p className="font-mono text-xs text-muted-foreground">Current</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border-2 border-purple-400 bg-purple-100" />
              <p className="font-mono text-xs text-muted-foreground">Target</p>
            </div>
          </div>

          {revenueStreams.map((stream, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs font-medium text-foreground">{stream.name}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {stream.currentMix}% <ArrowRight size={10} className="inline" /> {stream.targetMix}%
                </p>
              </div>
              {/* Current bar */}
              <div className="relative h-5 rounded-md bg-muted/60 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-md transition-all duration-500"
                  style={{ width: `${stream.currentMix}%`, backgroundColor: mixBarColor(stream.currentMix) }}
                />
                <span className="absolute inset-y-0 left-2 flex items-center font-mono text-[10px] font-bold text-white drop-shadow-sm">
                  {stream.currentMix}%
                </span>
              </div>
              {/* Target bar */}
              <div className="relative h-5 rounded-md bg-muted/60 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-md transition-all duration-500"
                  style={{ width: `${stream.targetMix}%`, background: targetBarGradient(stream.targetMix) }}
                />
                <span className="absolute inset-y-0 left-2 flex items-center font-mono text-[10px] font-bold text-white drop-shadow-sm">
                  {stream.targetMix}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Per-Tier Strengths & Gaps ─────────────────────────────────────────── */}
      <SectionCard>
        <SectionHeader icon={<Target size={16} />} title="Per-Tier Strengths & Gaps" subtitle="Revenue stream health assessment with strategy notes" />

        <div className="space-y-5">
          {revenueStreams.map((stream, i) => {
            const isExpanded = expandedStream === i;
            const strategy = streamStrategies[stream.name] ?? "";
            return (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedStream(isExpanded ? null : i)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <h4 className="font-display text-sm font-semibold text-foreground">{stream.name}</h4>
                    <span className="font-mono text-xs text-muted-foreground">{stream.price}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {stream.currentMix}% &rarr; {stream.targetMix}%
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>

                {/* Mix bars (always visible) */}
                <div className="px-4 pb-4 space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-mono text-xs text-muted-foreground">Current</p>
                      <p className="font-mono text-xs font-bold text-foreground">{stream.currentMix}%</p>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full transition-all" style={{ width: `${stream.currentMix}%`, backgroundColor: mixBarColor(stream.currentMix) }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-mono text-xs text-muted-foreground">Target</p>
                      <p className="font-mono text-xs font-bold text-purple-600">{stream.targetMix}%</p>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full transition-all bg-purple-600" style={{ width: `${stream.targetMix}%` }} />
                    </div>
                  </div>
                </div>

                {/* Expanded: strengths, gaps, strategy */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-green-50/60 border border-green-100">
                        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Strengths</p>
                        <ul className="space-y-1.5">
                          {stream.strengths.map((s, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <CheckCircle2 size={11} className="text-green-500 shrink-0 mt-0.5" />
                              <p className="text-xs text-foreground leading-relaxed">{s}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-100">
                        <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">Gaps</p>
                        <ul className="space-y-1.5">
                          {stream.gaps.map((g, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <AlertTriangle size={11} className="text-amber-500 shrink-0 mt-0.5" />
                              <p className="text-xs text-foreground leading-relaxed">{g}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Strategy note */}
                    {strategy && (
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100">
                        <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-1">Strategy</p>
                        <p className="text-xs text-foreground leading-relaxed">{strategy}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* ── Phase Revenue Targets ─────────────────────────────────────────────── */}
      <SectionCard>
        <SectionHeader icon={<Calendar size={16} />} title="Phase Revenue Targets" subtitle="Growth milestones from foundation to scale" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phaseTargets.map((phase, i) => (
            <div key={i} className={`rounded-xl border-l-4 ${phase.color} ${phase.bg} p-5`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${phase.tagColor}`}>
                  {phase.label}
                </span>
                <p className="font-mono text-xs text-muted-foreground">{phase.period}</p>
              </div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-3">{phase.phase}</h4>
              <ul className="space-y-2">
                {phase.targets.map((t, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-purple-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground leading-relaxed">{t}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Connecting timeline line (visual flourish) */}
        <div className="hidden md:flex items-center justify-center gap-0 mt-4">
          <div className="h-0.5 flex-1 bg-gradient-to-r from-purple-300 to-violet-300 rounded-full" />
          <Zap size={14} className="text-purple-500 mx-2" />
          <div className="h-0.5 flex-1 bg-gradient-to-r from-violet-300 to-indigo-300 rounded-full" />
          <Zap size={14} className="text-indigo-500 mx-2" />
          <div className="h-0.5 flex-1 bg-gradient-to-r from-indigo-300 to-purple-400 rounded-full" />
        </div>
      </SectionCard>

      {/* ── Token/Credit Model ────────────────────────────────────────────────── */}
      <SectionCard>
        <SectionHeader icon={<Coins size={16} />} title="Token/Credit Model" subtitle="Flexible pricing for anti-retainer buyers" />

        <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 via-violet-50 to-white p-5 space-y-4">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-purple-600 mb-2">Why Credits?</p>
            <p className="text-sm text-foreground leading-relaxed">
              Clients like the Dunnick/Nicole archetype are anti-retainer and want flexibility. A token/credit model captures this segment without forcing a monthly commitment, while still keeping them inside the Brand HQ ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-lg bg-white border border-border shadow-sm">
              <div className="w-8 h-8 rounded-lg ss-gradient flex items-center justify-center text-white mb-3">
                <Coins size={14} />
              </div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">How It Works</p>
              <p className="text-xs text-foreground leading-relaxed">
                Clients purchase credit packs mapped to deliverable types (content, ads, web, AI automation). Credits are redeemed against the add-on service menu at published rates.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-border shadow-sm">
              <div className="w-8 h-8 rounded-lg ss-gradient flex items-center justify-center text-white mb-3">
                <ArrowRight size={14} />
              </div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Rollover Policy</p>
              <p className="text-xs text-foreground leading-relaxed">
                Unused credits roll over for up to 90 days. This reduces buyer friction ("use it or lose it" anxiety) while maintaining urgency to engage.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-border shadow-sm">
              <div className="w-8 h-8 rounded-lg ss-gradient flex items-center justify-center text-white mb-3">
                <Layers size={14} />
              </div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Eligible Tiers</p>
              <p className="text-xs text-foreground leading-relaxed">
                Applies to Add-On Services and can be bundled with Foundations. Dream Client engagements use custom pricing. Brand Discovery is a one-time purchase.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50/70 border border-amber-100">
            <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-700 mb-0.5">Status: Needs Research</p>
              <p className="text-xs text-foreground leading-relaxed">
                Token/credit model is a pending decision. Options under consideration: credits that roll over, pay-per-project with Brand HQ access, or a hybrid retainer + credits model.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
