import { useState } from "react";
import { SectionCard, KeyTakeaway } from "@/components/BrandUI";
import {
  TrendingUp, ChevronRight, ChevronDown, AlertTriangle, CheckCircle2, Target, Zap,
  Search, Lightbulb, Eye, Building2, Users, CalendarDays, Layers,
  Gavel, CircleDot, ArrowRight, Quote, Shield, Rocket, Brain,
} from "lucide-react";
import { brandData } from "@/data/brandData";
import { useNavigation } from "@/contexts/NavigationContext";

// ── Priority helpers ────────────────────────────────────────────────────────
const PRIORITY_ORDER: Record<string, number> = { High: 0, Medium: 1, Low: 2 };
const PRIORITY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  High: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  Medium: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  Low: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
};

// ── Team data ───────────────────────────────────────────────────────────────
const TEAM = [
  { name: "Reagan Renfroe", title: "Founder & Creative Director", focus: "Brand strategy, client relationships, creative vision", icon: Rocket },
  { name: "Lucy Gonzalez", title: "Strategic Partner", focus: "Brand HQ architecture, AI automation, competitive intelligence", icon: Brain },
  { name: "Sarah", title: "Operations", focus: "Client onboarding, documentation, process systems", icon: Shield },
];

// ── Cross-nav link component ────────────────────────────────────────────────
function ExploreLink({ label, tabId }: { label: string; tabId: Parameters<ReturnType<typeof useNavigation>["setActiveTab"]>[0] }) {
  const { setActiveTab } = useNavigation();
  return (
    <button
      onClick={() => setActiveTab(tabId)}
      className="flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-800 transition-colors mt-3"
    >
      Explore in {label} <ArrowRight size={12} />
    </button>
  );
}

export default function OverviewTab() {
  const { setActiveTab } = useNavigation();
  const [expandedPriority, setExpandedPriority] = useState<number | null>(null);
  const [strengthsOpen, setStrengthsOpen] = useState(false);
  const [challengesOpen, setChallengesOpen] = useState(false);

  // Sort open questions by priority
  const sortedQuestions = [...brandData.workspace.openQuestions].sort(
    (a, b) => (PRIORITY_ORDER[a.priority] ?? 99) - (PRIORITY_ORDER[b.priority] ?? 99)
  );

  // Top 4 confirmed decisions
  const topDecisions = brandData.confirmedDecisions.slice(0, 4);

  return (
    <div className="space-y-6 tab-content-enter">

      {/* ── 1. Engagement Context Card ──────────────────────────────────── */}
      <SectionCard className="border-purple-200 bg-gradient-to-r from-purple-50/60 to-violet-50/40">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg ss-gradient flex items-center justify-center text-white shrink-0">
            <Building2 size={16} />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">Engagement Context</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Strategic command center for the StartSuite brand engagement</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">Company</p>
            <p className="text-sm font-semibold text-foreground">{brandData.companyName}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">Contact</p>
            <p className="text-sm font-semibold text-foreground">{brandData.clientContact}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">Engagement Phase</p>
            <p className="text-sm font-semibold text-foreground">Post-Pivot Execution (Q1 2026)</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">Last Updated</p>
            <p className="text-sm font-semibold text-foreground">{brandData.updatedDate}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">Brand Stage</p>
            <p className="text-sm font-semibold ss-gradient-text">Creative operating system — redefining category</p>
          </div>
        </div>
      </SectionCard>

      {/* ── Key Takeaway ───────────────────────────────────────────────── */}
      <KeyTakeaway text={brandData.keyTakeaway} />

      {/* ── 4. Team Profile Cards ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TEAM.map((member) => {
          const IconComp = member.icon;
          return (
            <SectionCard key={member.name} className="flex items-start gap-3 !p-4">
              <div className="w-9 h-9 rounded-lg ss-gradient flex items-center justify-center text-white shrink-0">
                <IconComp size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{member.name}</p>
                <p className="text-[11px] text-purple-600 font-medium">{member.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{member.focus}</p>
              </div>
            </SectionCard>
          );
        })}
      </div>

      {/* ── What We Learned — Orientation Cards ────────────────────────── */}
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

      {/* ── 2. Top Decisions Summary ───────────────────────────────────── */}
      <SectionCard>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg ss-gradient flex items-center justify-center text-white shrink-0">
              <Gavel size={14} />
            </div>
            <h3 className="font-display text-base font-semibold">Top Decisions</h3>
          </div>
          <button
            onClick={() => setActiveTab("decisions")}
            className="flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-800 transition-colors"
          >
            View All <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topDecisions.map((d, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-gradient-to-b from-green-50/40 to-transparent hover:border-green-200 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-foreground leading-snug">{d.title}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-100 px-2 py-0.5 rounded-full shrink-0">
                  {d.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">{d.rationale}</p>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><Users size={10} /> {d.owner}</span>
                <span className="flex items-center gap-1"><CalendarDays size={10} /> {d.date}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Executive Summary ──────────────────────────────────────────── */}
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

      {/* ── Key Highlights ─────────────────────────────────────────────── */}
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

      {/* ── Proof Points ───────────────────────────────────────────────── */}
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

      {/* ── 5. Collapsible Strengths + Challenges ──────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <SectionCard>
          <button
            onClick={() => setStrengthsOpen(!strengthsOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="font-display text-base font-semibold text-green-700">Strengths</h3>
            <ChevronDown
              size={16}
              className={`text-green-600 transition-transform duration-200 ${strengthsOpen ? "rotate-180" : ""}`}
            />
          </button>
          {/* Always show titles; descriptions expand */}
          <ul className={`space-y-3 mt-4`}>
            {brandData.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={15} className="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  {strengthsOpen && (
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ExploreLink label="Competitive" tabId="competitive" />
        </SectionCard>

        {/* Challenges */}
        <SectionCard>
          <button
            onClick={() => setChallengesOpen(!challengesOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="font-display text-base font-semibold text-amber-700">Challenges</h3>
            <ChevronDown
              size={16}
              className={`text-amber-600 transition-transform duration-200 ${challengesOpen ? "rotate-180" : ""}`}
            />
          </button>
          <ul className={`space-y-3 mt-4`}>
            {brandData.challenges.map((c, i) => (
              <li key={i} className="flex items-start gap-3">
                <AlertTriangle size={15} className="text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.title}</p>
                  {challengesOpen && (
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{c.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ExploreLink label="Gap Analysis" tabId="gap-analysis" />
        </SectionCard>
      </div>

      {/* ── 3. Open Priorities (expandable, sorted by priority) ─────────── */}
      <SectionCard>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg ss-gradient flex items-center justify-center text-white shrink-0">
            <CircleDot size={14} />
          </div>
          <h3 className="font-display text-base font-semibold">Open Priorities</h3>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-auto">
            {sortedQuestions.length} open
          </span>
        </div>
        <div className="space-y-2">
          {sortedQuestions.map((q, idx) => {
            const isExpanded = expandedPriority === idx;
            const colors = PRIORITY_COLORS[q.priority] ?? PRIORITY_COLORS.Medium;
            return (
              <div key={idx} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedPriority(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <ChevronRight
                      size={14}
                      className={`text-muted-foreground shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                    />
                    <p className="text-sm text-foreground truncate">{q.question}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {q.priority}
                  </span>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 bg-muted/20 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="font-semibold uppercase tracking-widest text-[10px] text-muted-foreground mb-1">Owner</p>
                        <p className="text-foreground">{q.owner}</p>
                      </div>
                      <div>
                        <p className="font-semibold uppercase tracking-widest text-[10px] text-muted-foreground mb-1">Priority</p>
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                          {q.priority}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold uppercase tracking-widest text-[10px] text-muted-foreground mb-1">Notes</p>
                        <p className="text-muted-foreground leading-relaxed">{q.notes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <ExploreLink label="Actions" tabId="actions" />
      </SectionCard>

      {/* ── Critical Question ──────────────────────────────────────────── */}
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
            <ExploreLink label="Services" tabId="services" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
