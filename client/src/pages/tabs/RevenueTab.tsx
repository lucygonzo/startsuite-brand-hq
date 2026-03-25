import { useState } from "react";
import { SectionCard, KeyTakeaway, SectionHeader } from "@/components/BrandUI";
import { revenueStreams } from "@/data/brandData";
import {
  DollarSign, TrendingUp, Target, Sparkles, Crown,
  ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Layers,
} from "lucide-react";

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

function mixBarColor(pct: number) {
  if (pct >= 40) return "#8b5cf6";
  if (pct >= 20) return "#a78bfa";
  return "#c4b5fd";
}

export default function RevenueTab() {
  const [expandedStream, setExpandedStream] = useState<number | null>(null);

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text="StartSuite's revenue model is anchored by Foundations at $3,000/month — recurring revenue that compounds as context deepens. Brand Discovery is the gateway, add-ons capture flexible demand, and Dream Client engagements prove the full model at premium pricing." />

      {/* Pricing Tiers */}
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

      {/* Revenue Mix */}
      <SectionCard>
        <SectionHeader icon={<TrendingUp size={16} />} title="Revenue Mix" subtitle="Current vs. target allocation across streams" />

        <div className="space-y-5">
          {revenueStreams.map((stream, i) => {
            const isExpanded = expandedStream === i;
            return (
              <div key={i} className="border border-border rounded-xl p-4">
                <button
                  onClick={() => setExpandedStream(isExpanded ? null : i)}
                  className="w-full flex items-center justify-between mb-3"
                >
                  <div className="flex items-center gap-3">
                    <h4 className="font-display text-sm font-semibold text-foreground">{stream.name}</h4>
                    <span className="text-xs text-muted-foreground">{stream.price}</span>
                  </div>
                  {isExpanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>

                {/* Mix bars */}
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Current Mix</p>
                      <p className="text-xs font-bold text-foreground">{stream.currentMix}%</p>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full transition-all" style={{ width: `${stream.currentMix}%`, backgroundColor: mixBarColor(stream.currentMix) }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Target Mix</p>
                      <p className="text-xs font-bold text-purple-600">{stream.targetMix}%</p>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full transition-all bg-purple-600" style={{ width: `${stream.targetMix}%` }} />
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-border">
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
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
