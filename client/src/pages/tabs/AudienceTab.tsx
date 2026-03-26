import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, SectionHeader, SubTabNav } from "@/components/BrandUI";
import {
  TrendingUp, ChevronRight, AlertTriangle, CheckCircle2, Target,
  BarChart3, Star, Brain, Heart, Newspaper, Lightbulb, Users,
  Layers, Eye, MessageSquare, Clock, Shield, Zap,
} from "lucide-react";
import { brandData } from "@/data/brandData";

const priorityColors: Record<string, string> = {
  Critical: "bg-red-100 text-red-800 border-red-300",
  High: "bg-blue-100 text-blue-800 border-blue-300",
  Medium: "bg-amber-100 text-amber-800 border-amber-300",
  Secondary: "bg-purple-100 text-purple-800 border-purple-300",
};

const priorityIcons: Record<string, React.ReactNode> = {
  Critical: <Zap size={12} className="text-red-700" />,
  High: <TrendingUp size={12} className="text-blue-700" />,
  Medium: <Star size={12} className="text-amber-700" />,
  Secondary: <Layers size={12} className="text-purple-700" />,
};

const tierGradients = [
  "from-red-500 to-orange-500",
  "from-blue-500 to-cyan-500",
  "from-indigo-500 to-violet-500",
  "from-amber-500 to-yellow-500",
  "from-purple-500 to-pink-500",
];

export default function AudienceTab() {
  const [sub, setSub] = useState("overview");
  const [expandedTier, setExpandedTier] = useState<number | null>(null);

  const tiers = brandData.audience.tiers;
  const personas = brandData.audience.personas;
  const overlays = brandData.audience.overlays;
  const psychographics = brandData.audienceExpanded.psychographics;

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={brandData.audience.keyTakeaway} />

      <SubTabNav
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "tiers", label: "Company Tiers" },
          { id: "personas", label: "Personas" },
          { id: "overlays", label: "Overlays" },
          { id: "psychographics", label: "Psychographics" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {/* ── OVERVIEW ──────────────────────────────────────────────────────── */}
      {sub === "overview" && (
        <div className="space-y-5">
          {/* Tier cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiers.map((tier, i) => (
              <SectionCard key={tier.id} className="card-lift">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-bold text-foreground">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground italic">{tier.internalName}</p>
                  </div>
                  <Badge variant="outline" className={`text-xs ${priorityColors[tier.priority]}`}>
                    {priorityIcons[tier.priority]}<span className="ml-1">{tier.priority}</span>
                  </Badge>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Company Size</span>
                    <span className="font-medium text-foreground">{tier.companySize}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-medium text-foreground">{tier.revenue}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Entry Product</span>
                    <span className="font-medium text-foreground">{tier.entryProduct}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Year 1 LTV</span>
                    <span className="font-medium text-purple-700">{tier.yearOneLTV}</span>
                  </div>
                </div>
                <div className={`p-2.5 rounded-lg bg-gradient-to-r ${tierGradients[i]} bg-opacity-10`}>
                  <p className="text-xs text-white font-medium leading-snug">{tier.messagingAngle}</p>
                </div>
              </SectionCard>
            ))}
          </div>

          {/* ICP */}
          <SectionCard>
            <SectionHeader icon={<Target size={16} />} title="Ideal Client Profile" subtitle="The primary target for all StartSuite marketing and sales" />
            <div className="p-4 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 mb-5">
              <p className="text-sm text-foreground leading-relaxed">{brandData.audience.icp.description}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">ICP Signals</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {brandData.audience.icp.signals.map((signal, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg border border-border">
                    <CheckCircle2 size={13} className="text-green-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-foreground">{signal}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Product-market fit quick reference */}
          <SectionCard>
            <SectionHeader icon={<BarChart3 size={16} />} title="Product-Market Fit Quick Reference" subtitle="Entry product, sales cycle, and LTV by tier" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tier</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Entry Product</th>
                    <th className="text-center py-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Sales Cycle</th>
                    <th className="text-center py-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Year 1 LTV</th>
                    <th className="text-center py-2 pl-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {tiers.map((tier) => (
                    <tr key={tier.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="py-3 pr-4">
                        <p className="font-medium text-foreground text-xs">{tier.name}</p>
                        <p className="text-xs text-muted-foreground">{tier.companySize}</p>
                      </td>
                      <td className="py-3 px-2 text-xs text-foreground">{tier.entryProduct}</td>
                      <td className="text-center py-3 px-2 text-xs font-mono text-foreground">{tier.salesCycle}</td>
                      <td className="text-center py-3 px-2">
                        <span className="font-display font-bold text-purple-700 text-xs">{tier.yearOneLTV}</span>
                      </td>
                      <td className="text-center py-3 pl-2">
                        <Badge variant="outline" className={`text-xs ${priorityColors[tier.priority]}`}>{tier.priority}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* TAM/SAM/OAM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "TAM", sub: "Total Addressable Market", value: brandData.audienceExpanded.tam, color: "border-purple-200 bg-purple-50" },
              { label: "SAM", sub: "Serviceable Addressable Market", value: brandData.audienceExpanded.sam, color: "border-blue-200 bg-blue-50" },
              { label: "OAM", sub: "Obtainable Addressable Market", value: brandData.audienceExpanded.oam, color: "border-green-200 bg-green-50" },
            ].map((m, i) => (
              <SectionCard key={i} className={`border ${m.color}`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{m.label} &mdash; {m.sub}</p>
                <p className="font-display text-base font-bold text-foreground leading-snug">{m.value}</p>
              </SectionCard>
            ))}
          </div>
        </div>
      )}

      {/* ── COMPANY TIERS ─────────────────────────────────────────────────── */}
      {sub === "tiers" && (
        <div className="space-y-3">
          {tiers.map((tier, i) => (
            <div key={tier.id} className="rounded-xl border border-border overflow-hidden card-lift">
              <button
                onClick={() => setExpandedTier(expandedTier === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 bg-card hover:bg-muted/30 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tierGradients[i]} flex items-center justify-center text-white font-display font-bold text-lg shrink-0`}>
                    {tier.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-foreground">{tier.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{tier.internalName} &middot; {tier.companySize} &middot; {tier.revenue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant="outline" className={`text-xs ${priorityColors[tier.priority]}`}>
                    {priorityIcons[tier.priority]}<span className="ml-1">{tier.priority}</span>
                  </Badge>
                  <ChevronRight size={16} className={`text-muted-foreground transition-transform ${expandedTier === i ? "rotate-90" : ""}`} />
                </div>
              </button>
              {expandedTier === i && (
                <div className="p-5 border-t border-border bg-card space-y-5">
                  {/* Problem + Messaging Angle */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                      <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">Core Problem</p>
                      <p className="text-sm text-foreground font-medium italic">&ldquo;{tier.problem}&rdquo;</p>
                    </div>
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                      <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">Messaging Angle</p>
                      <p className="text-sm text-foreground font-medium">{tier.messagingAngle}</p>
                    </div>
                  </div>

                  {/* What to Avoid */}
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                    <p className="text-xs font-semibold uppercase tracking-widest text-red-700 mb-2">What to Avoid</p>
                    <p className="text-sm text-foreground">{tier.avoid}</p>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Closing Proof</p>
                      <p className="text-xs text-foreground leading-relaxed">{tier.closingProof}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Decision Maker</p>
                      <p className="text-xs text-foreground leading-relaxed">{tier.decisionMaker}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Sales Cycle</p>
                      <p className="text-xs text-foreground leading-relaxed">{tier.salesCycle}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Entry Product</p>
                      <p className="text-xs text-foreground leading-relaxed">{tier.entryProduct}</p>
                    </div>
                  </div>

                  {/* Real examples */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Real Examples</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tier.realExamples.map((ex, j) => (
                        <Badge key={j} variant="outline" className="text-xs bg-white">{ex}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Channels */}
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                    <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">Acquisition Channels</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tier.channels.map((ch, j) => (
                        <Badge key={j} variant="outline" className="text-xs bg-white">{ch}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── PERSONAS ──────────────────────────────────────────────────────── */}
      {sub === "personas" && (
        <div className="space-y-6">
          {personas.map((persona, i) => (
            <SectionCard key={persona.id} className="card-lift">
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tierGradients[i]} flex items-center justify-center text-white font-display font-bold text-2xl shrink-0`}>
                  {persona.name[0]}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{persona.name}</h3>
                  <p className="text-sm font-medium text-purple-700">{persona.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Age: {persona.age} &middot; Primary Tier: {persona.primaryTier}</p>
                  <p className="text-xs text-muted-foreground">Based on: {persona.basedOn}</p>
                </div>
              </div>

              {/* Core emotion + Quote */}
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-1">Core Emotion</p>
                <p className="text-sm text-foreground">{persona.coreEmotion}</p>
              </div>

              <blockquote className="border-l-4 border-purple-400 pl-4 italic text-sm text-foreground mb-5">&ldquo;{persona.quote}&rdquo;</blockquote>

              {/* Day in the Life */}
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">A Day in the Life</p>
                <p className="text-xs text-foreground leading-relaxed">{persona.dayInTheLife}</p>
              </div>

              {/* Frustrations + Trust Signals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">Frustrations</p>
                  <ul className="space-y-1.5">
                    {persona.frustrations.map((f, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                        <AlertTriangle size={11} className="text-amber-600 mt-0.5 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">Trust Signals</p>
                  <ul className="space-y-1.5">
                    {persona.trustSignals.map((t, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                        <CheckCircle2 size={11} className="text-green-600 mt-0.5 shrink-0" />{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* How StartSuite Helps */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">How StartSuite Helps</p>
                <p className="text-sm text-foreground leading-relaxed">{persona.howStartSuiteHelps}</p>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {/* ── OVERLAYS ──────────────────────────────────────────────────────── */}
      {sub === "overlays" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<Layers size={16} />} title="Behavioral Overlays" subtitle="Cross-tier emotional states that modify messaging strategy. These are not segments — they are filters that apply on top of any tier." />
          </SectionCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {overlays.map((overlay) => {
              const overlayIcons: Record<string, React.ReactNode> = {
                "agency-burned": <Shield size={16} className="text-red-600" />,
                "ai-overwhelmed": <Brain size={16} className="text-blue-600" />,
                "time-starved": <Clock size={16} className="text-amber-600" />,
                "credibility-seeking": <Eye size={16} className="text-purple-600" />,
              };
              const overlayBorders: Record<string, string> = {
                "agency-burned": "border-red-200",
                "ai-overwhelmed": "border-blue-200",
                "time-starved": "border-amber-200",
                "credibility-seeking": "border-purple-200",
              };
              return (
                <SectionCard key={overlay.id} className={`card-lift border ${overlayBorders[overlay.id] || ""}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {overlayIcons[overlay.id]}
                    <h3 className="font-display font-bold text-foreground">{overlay.name}</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Signal Phrase</p>
                      <p className="text-sm text-foreground italic">&ldquo;{overlay.signal}&rdquo;</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Strongest In</p>
                      <p className="text-xs text-foreground">{overlay.strongestIn}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
                      <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-1">Messaging Shift</p>
                      <p className="text-xs text-foreground leading-relaxed">{overlay.messagingShift}</p>
                    </div>
                  </div>
                </SectionCard>
              );
            })}
          </div>

          {/* Overlay Intensity Matrix */}
          <SectionCard>
            <SectionHeader icon={<BarChart3 size={16} />} title="Overlay Intensity Matrix" subtitle="How strongly each overlay applies to each company tier" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Overlay</th>
                    {tiers.map((tier) => (
                      <th key={tier.id} className="text-center py-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{tier.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const intensityData: { overlay: string; values: Record<string, "High" | "Medium" | "Low"> }[] = [
                      { overlay: "Agency-Burned", values: { startups: "Low", growth: "Medium", established: "High", enterprise: "High", investors: "Low" } },
                      { overlay: "AI-Overwhelmed", values: { startups: "Low", growth: "High", established: "High", enterprise: "Medium", investors: "Low" } },
                      { overlay: "Time-Starved", values: { startups: "High", growth: "High", established: "Medium", enterprise: "Medium", investors: "Medium" } },
                      { overlay: "Credibility-Seeking", values: { startups: "High", growth: "Medium", established: "Low", enterprise: "Low", investors: "High" } },
                    ];
                    const cellColors: Record<string, string> = {
                      High: "bg-red-100 text-red-800 font-medium",
                      Medium: "bg-amber-100 text-amber-800",
                      Low: "bg-gray-100 text-gray-500",
                    };
                    return intensityData.map((row) => (
                      <tr key={row.overlay} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="py-3 pr-4 text-xs font-medium text-foreground">{row.overlay}</td>
                        {tiers.map((tier) => (
                          <td key={tier.id} className="text-center py-3 px-2">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs ${cellColors[row.values[tier.id]]}`}>
                              {row.values[tier.id]}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── PSYCHOGRAPHICS ────────────────────────────────────────────────── */}
      {sub === "psychographics" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<Brain size={16} />} title="Psychographic Profile" subtitle={psychographics.keyTakeaway} />
          </SectionCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-3">Core Values</p>
              <ul className="space-y-2">
                {psychographics.values.map((v, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <Star size={13} className="text-purple-600 mt-0.5 shrink-0" />{v}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">Core Beliefs</p>
              <ul className="space-y-2">
                {psychographics.beliefs.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <Lightbulb size={13} className="text-blue-600 mt-0.5 shrink-0" />{b}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">Core Fears</p>
              <ul className="space-y-2">
                {psychographics.fears.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle size={13} className="text-amber-600 mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-3">Media Habits</p>
              <ul className="space-y-2">
                {psychographics.mediaHabits.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <Newspaper size={13} className="text-green-600 mt-0.5 shrink-0" />{m}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        </div>
      )}
    </div>
  );
}
