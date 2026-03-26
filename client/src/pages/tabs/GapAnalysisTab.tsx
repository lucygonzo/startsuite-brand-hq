import { useState } from "react";
import { SectionCard, KeyTakeaway, SubTabNav, SectionHeader } from "@/components/BrandUI";
import { gapDimensions, brandData } from "@/data/brandData";
import {
  Search, Eye, TrendingDown, AlertTriangle, ArrowRight,
  CheckCircle2, Gauge, Users, ShoppingCart, Rocket,
} from "lucide-react";

const GAP_TAKEAWAY = "StartSuite has strong brand identity and positioning but critical gaps in market awareness, published proof points, and pricing transparency. The pivot to 'creative operating system' is internally clear but has not yet reached the market.";

const subTabs = [
  { id: "perception", label: "Perception" },
  { id: "funnels", label: "Funnels" },
  { id: "gaps", label: "Gaps" },
];

function severityColor(severity: string) {
  if (severity === "red") return { border: "border-l-red-500", bg: "bg-red-50", text: "text-red-700", bar: "#ef4444" };
  if (severity === "yellow") return { border: "border-l-amber-500", bg: "bg-amber-50", text: "text-amber-700", bar: "#f59e0b" };
  return { border: "border-l-green-500", bg: "bg-green-50", text: "text-green-700", bar: "#22c55e" };
}

function scoreColor(score: number) {
  if (score >= 7) return "#22c55e";
  if (score >= 4) return "#f59e0b";
  return "#ef4444";
}

// ── Perception Sub-tab ────────────────────────────────────────────────────────
function PerceptionView() {
  const avgScore = (gapDimensions.reduce((s, d) => s + d.score, 0) / gapDimensions.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-xl p-6 bg-gradient-to-r from-purple-600 to-violet-500 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-200 mb-1">Market Perception</p>
        <p className="font-display text-xl font-bold">
          A creative operating system with a <span className="text-3xl">{avgScore}</span>/10 market awareness score
        </p>
        <p className="text-sm text-purple-100 mt-2">
          Across {gapDimensions.length} dimensions, StartSuite has clear strengths in identity and positioning but critical gaps in awareness, proof points, and pricing clarity.
        </p>
      </div>

      {/* Dimension Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gapDimensions.map((d, i) => {
          const c = severityColor(d.severity);
          return (
            <div key={i} className={`bg-card rounded-xl border border-border p-5 shadow-sm border-l-4 ${c.border}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display text-sm font-semibold text-foreground">{d.dimension}</h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
                  {d.score}/{d.maxScore}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 rounded-full bg-muted mb-3">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(d.score / d.maxScore) * 100}%`, backgroundColor: scoreColor(d.score) }}
                />
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-2">{d.implication}</p>
              <div className="flex items-start gap-2 mt-2 p-2 rounded-lg bg-muted/50">
                <Rocket size={12} className="text-purple-600 shrink-0 mt-0.5" />
                <p className="text-xs text-foreground leading-relaxed">{d.action}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Funnels Sub-tab ───────────────────────────────────────────────────────────
const funnelStages = [
  {
    stage: "Awareness",
    icon: <Eye size={16} />,
    strength: 25,
    status: "leaky" as const,
    description: "Known primarily within 46Capital ecosystem. No consistent content cadence or external visibility yet.",
    actions: ["Launch LinkedIn 3x/week", "Secure first accelerator partnership", "Launch YouTube channel"],
  },
  {
    stage: "Consideration",
    icon: <Search size={16} />,
    strength: 45,
    status: "leaky" as const,
    description: "Prospects who discover StartSuite have no published case studies, unclear pricing, and limited proof points to evaluate.",
    actions: ["Publish 3 case studies by Q2 2026", "Finalize Brand Discovery pricing", "Update website with new positioning"],
  },
  {
    stage: "Decision",
    icon: <ShoppingCart size={16} />,
    strength: 70,
    status: "healthy" as const,
    description: "Once in conversation, the team closes well. The creative operating system pitch resonates with founders who meet the team.",
    actions: ["Create proposal templates", "Build Brand Discovery walkthrough deck", "Formalize referral incentives"],
  },
  {
    stage: "Adoption",
    icon: <Users size={16} />,
    strength: 80,
    status: "healthy" as const,
    description: "Active clients are highly satisfied (4.74 rating). Context compounds over time, creating natural retention. Empowerment model builds trust.",
    actions: ["Make compound value visible in Brand HQ", "Add monthly progress reporting", "Expand into add-on services"],
  },
];

function FunnelsView() {
  return (
    <div className="space-y-6">
      <KeyTakeaway text="StartSuite's funnel is top-heavy — strong retention and close rates, but awareness and consideration are the bottleneck. The priority is filling the top of the funnel with content, case studies, and partnerships." />

      <SectionCard>
        <SectionHeader icon={<TrendingDown size={16} />} title="Conversion Funnel" subtitle="From awareness to adoption — where prospects leak" />

        <div className="space-y-5">
          {funnelStages.map((f, i) => {
            const isLeaky = f.status === "leaky";
            const barColor = isLeaky ? "#ef4444" : "#22c55e";
            return (
              <div key={i}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isLeaky ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                    {f.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">{f.stage}</h4>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isLeaky ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                        {f.strength}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-muted mb-2">
                  <div className="h-full rounded-full transition-all" style={{ width: `${f.strength}%`, backgroundColor: barColor }} />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{f.description}</p>
                <div className="flex flex-wrap gap-2">
                  {f.actions.map((a, j) => (
                    <span key={j} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">{a}</span>
                  ))}
                </div>
                {i < funnelStages.length - 1 && (
                  <div className="flex justify-center my-3">
                    <ArrowRight size={14} className="text-muted-foreground rotate-90" />
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

// ── Gaps Sub-tab ──────────────────────────────────────────────────────────────
const gapCards = [
  {
    title: "Published Case Studies",
    current: "Proof points are verbal and relationship-based. No published case studies.",
    desired: "3+ published case studies (Steadwell, PhyCap, +1) with clear problem/process/outcome format.",
    severity: "red" as const,
    source: "CONFIRMED",
  },
  {
    title: "Brand Discovery Pricing",
    current: "Pricing is undefined. Estimated $5K-8K but not formalized or published.",
    desired: "Clear tiered pricing on website. Proposal templates ready. Conversion path to Foundations defined.",
    severity: "red" as const,
    source: "CONFIRMED",
  },
  {
    title: "Content Cadence",
    current: "LinkedIn and YouTube strategy defined but execution inconsistent. Monthly shoot day not yet operational.",
    desired: "3x/week LinkedIn cadence. Monthly shoot day producing YouTube content. Every piece passes expert insight test.",
    severity: "red" as const,
    source: "CONFIRMED",
  },
  {
    title: "First Hire — Creative Generalist",
    current: "Reagan and Lucy are the product. Capacity limited to 8-10 active engagements.",
    desired: "Creative generalist with AI fluency hired and delivering independently within 90 days.",
    severity: "red" as const,
    source: "CONFIRMED",
  },
  {
    title: "Token/Credit Model for Add-Ons",
    current: "Add-on services are ad hoc. No credit system for anti-retainer clients like Dunnick/Nicole.",
    desired: "Modular token/credit model that lets clients purchase add-on services flexibly without retainer commitment.",
    severity: "yellow" as const,
    source: "DISCOVERED",
  },
  {
    title: "Accelerator Partnerships",
    current: "No formal accelerator partnerships. Distribution relies on warm referrals within 46Capital network.",
    desired: "First accelerator partnership generating 10-20 qualified leads per cohort. Referral program formalized.",
    severity: "yellow" as const,
    source: "DISCOVERED",
  },
  {
    title: "Onboarding Standardization",
    current: "Each client onboarding is bespoke. Brand HQ template system is in progress but not repeatable yet.",
    desired: "Standardized Brand Discovery delivery process with repeatable templates and clear milestones.",
    severity: "yellow" as const,
    source: "DISCOVERED",
  },
  {
    title: "Website Positioning Update",
    current: "Website reflects previous positioning. Does not communicate creative operating system model clearly.",
    desired: "Website updated with new positioning, pricing tiers, case studies, and clear Brand Discovery entry point.",
    severity: "yellow" as const,
    source: "CONFIRMED",
  },
];

function GapsView() {
  return (
    <div className="space-y-6">
      <KeyTakeaway text="Eight gaps identified — four confirmed from the March 2026 board meeting, four discovered through competitive and market analysis. The most critical gaps block the sales pipeline directly." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gapCards.map((g, i) => {
          const c = severityColor(g.severity);
          return (
            <div key={i} className={`bg-card rounded-xl border border-border p-5 shadow-sm border-l-4 ${c.border}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display text-sm font-semibold text-foreground">{g.title}</h4>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
                    {g.severity === "red" ? "Critical" : "Important"}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                    {g.source}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-red-50/60 border border-red-100">
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-600 mb-1">Current State</p>
                  <p className="text-xs text-foreground leading-relaxed">{g.current}</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50/60 border border-green-100">
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-1">Desired State</p>
                  <p className="text-xs text-foreground leading-relaxed">{g.desired}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Tab ──────────────────────────────────────────────────────────────────
export default function GapAnalysisTab() {
  const [activeTab, setActiveTab] = useState("perception");

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={GAP_TAKEAWAY} />
      <SubTabNav tabs={subTabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "perception" && <PerceptionView />}
      {activeTab === "funnels" && <FunnelsView />}
      {activeTab === "gaps" && <GapsView />}
    </div>
  );
}
