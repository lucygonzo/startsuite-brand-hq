import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, SubTabNav } from "@/components/BrandUI";
import { brandData } from "@/data/brandData";

/* ── Colour Maps ──────────────────────────────────────────────────────────── */

const priorityColors: Record<string, string> = {
  Critical: "bg-rose-100 text-rose-800 border-rose-300",
  High: "bg-blue-100 text-blue-800 border-blue-300",
  Medium: "bg-amber-100 text-amber-800 border-amber-300",
  Secondary: "bg-purple-100 text-purple-800 border-purple-300",
};

const priorityBorder: Record<string, string> = {
  Critical: "border-l-rose-500",
  High: "border-l-blue-500",
  Medium: "border-l-amber-500",
  Secondary: "border-l-purple-500",
};

const tierTabIds = ["startups", "growth", "established", "enterprise", "investors"] as const;

const tierTabLabels: Record<string, string> = {
  startups: "Startups",
  growth: "Growth Companies",
  established: "Established",
  enterprise: "Enterprise",
  investors: "Investors",
};

/* ── Helper: typed access to new tier fields ──────────────────────────────── */

type TierData = (typeof brandData.audience.tiers)[number];

function tierEmpathy(t: TierData) {
  return (t as TierData & { empathy?: { dailyLife: string; howTheyFind: string; howTheyDecide: string; frustrations: string[]; trustSignals: string[] } }).empathy;
}
function tierJourney(t: TierData) {
  return (t as TierData & { journeyStages?: { stage: string; action: string; startSuiteRole: string; leak?: string }[] }).journeyStages;
}
function tierWin(t: TierData) {
  return (t as TierData & { winFactors?: string[] }).winFactors;
}
function tierLoss(t: TierData) {
  return (t as TierData & { lossFactors?: string[] }).lossFactors;
}
function tierLeaks(t: TierData) {
  return (t as TierData & { funnelLeaks?: string[] }).funnelLeaks;
}
function tierContent(t: TierData) {
  return (t as TierData & { contentPreferences?: string[] }).contentPreferences;
}
function tierDataSource(t: TierData) {
  return (t as TierData & { dataSource?: string }).dataSource;
}

/* ── Component ────────────────────────────────────────────────────────────── */

export default function AudienceTab() {
  const [sub, setSub] = useState("overview");

  const tiers = brandData.audience.tiers;
  const overlays = brandData.audience.overlays;

  const subTabs = [
    { id: "overview", label: "Overview" },
    ...tierTabIds.map((id) => ({ id, label: tierTabLabels[id] })),
  ];

  /* find tier by tab id */
  const activeTier = tiers.find((t) => t.id === sub);

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={brandData.audience.keyTakeaway} />

      <SubTabNav tabs={subTabs} active={sub} onChange={setSub} />

      {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
      {sub === "overview" && <OverviewPanel tiers={tiers} overlays={overlays} />}

      {/* ── TIER DETAIL ──────────────────────────────────────────────────── */}
      {activeTier && <TierDetail tier={activeTier} overlays={overlays} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   OVERVIEW PANEL
   ═══════════════════════════════════════════════════════════════════════════ */

function OverviewPanel({
  tiers,
  overlays,
}: {
  tiers: TierData[];
  overlays: typeof brandData.audience.overlays;
}) {
  return (
    <div className="space-y-6">
      {/* ── Priority Matrix ─────────────────────────────── */}
      <SectionCard>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          PRIORITY MATRIX
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Tier", "Size", "Revenue", "Priority", "Entry Product", "Year 1 LTV", "Sales Cycle"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left py-2 px-2 first:pl-0 text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {tiers.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-3 pr-2">
                    <p className="font-medium text-foreground text-xs">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground italic">{t.internalName}</p>
                  </td>
                  <td className="py-3 px-2 text-xs text-foreground font-mono">{t.companySize}</td>
                  <td className="py-3 px-2 text-xs text-foreground font-mono">{t.revenue}</td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className={`text-xs ${priorityColors[t.priority]}`}>
                      {t.priority}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-xs text-foreground">{t.entryProduct}</td>
                  <td className="py-3 px-2 text-xs font-mono font-bold text-purple-700">{t.yearOneLTV}</td>
                  <td className="py-3 px-2 text-xs font-mono text-foreground">{t.salesCycle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* ── Product-Market Fit Quick Reference ──────────── */}
      <SectionCard>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          PRODUCT-MARKET FIT
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-2 font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                  Product
                </th>
                {tiers.map((t) => (
                  <th key={t.id} className="text-center py-2 px-1 font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                    {t.name.replace(" & Accelerators", "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { product: "Brand Discovery ($2.5K\u2013$5K)", row: ["PRIMARY", "secondary", "rare", "\u2014", "cohort module"] },
                { product: "Foundations ($3K/mo)", row: ["upgrade", "PRIMARY", "PRIMARY", "bundled", "portfolio license"] },
                { product: "Content Add-ons ($1K\u2013$3K/mo)", row: ["upsell", "upsell", "common", "bundled", "per-company"] },
                { product: "Dream Client ($10K+/mo)", row: ["aspirational", "rare", "upsell", "PRIMARY", "\u2014"] },
                { product: "Portfolio License", row: ["\u2014", "\u2014", "\u2014", "\u2014", "PRIMARY"] },
              ].map((r) => (
                <tr key={r.product} className="border-b border-border last:border-0">
                  <td className="py-2 pr-2 font-medium text-foreground">{r.product}</td>
                  {r.row.map((cell, j) => (
                    <td key={j} className="text-center py-2 px-1">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] ${
                          cell === "PRIMARY"
                            ? "bg-purple-100 text-purple-800 font-bold"
                            : cell === "\u2014"
                              ? "text-muted-foreground/40"
                              : "text-muted-foreground"
                        }`}
                      >
                        {cell}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* ── Overlays Summary ──────────────────────────────── */}
      <SectionCard>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          PSYCHOGRAPHIC OVERLAYS
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {overlays.map((o) => {
            const colors: Record<string, { border: string; bg: string }> = {
              "agency-burned": { border: "border-l-red-500", bg: "bg-red-50" },
              "ai-overwhelmed": { border: "border-l-blue-500", bg: "bg-blue-50" },
              "time-starved": { border: "border-l-amber-500", bg: "bg-amber-50" },
              "credibility-seeking": { border: "border-l-purple-500", bg: "bg-purple-50" },
            };
            const c = colors[o.id] || { border: "border-l-gray-400", bg: "bg-gray-50" };
            return (
              <div key={o.id} className={`border-l-4 ${c.border} ${c.bg} rounded-r-lg p-4`}>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-foreground mb-1">
                  {o.name}
                </p>
                <p className="text-xs text-foreground italic mb-2">&ldquo;{o.signal}&rdquo;</p>
                <p className="text-[10px] text-muted-foreground">
                  <span className="font-semibold">Strongest in:</span> {o.strongestIn}
                </p>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* ── Key Insight ─────────────────────────────────── */}
      <div className="p-5 rounded-xl border border-amber-200 bg-amber-50">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
          KEY INSIGHT
        </p>
        <p className="text-sm text-foreground leading-relaxed">
          Nobody ever says &ldquo;I need brand strategy.&rdquo; They describe symptoms. Lead with the pain, surface the
          root cause through conversation.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TIER DETAIL PANEL
   ═══════════════════════════════════════════════════════════════════════════ */

function TierDetail({
  tier,
  overlays,
}: {
  tier: TierData;
  overlays: typeof brandData.audience.overlays;
}) {
  const empathy = tierEmpathy(tier);
  const journey = tierJourney(tier);
  const wins = tierWin(tier);
  const losses = tierLoss(tier);
  const leaks = tierLeaks(tier);
  const content = tierContent(tier);
  const dataSource = tierDataSource(tier);

  return (
    <div className="space-y-6">
      {/* ── Section 1: Overview Card ─────────────────────── */}
      <SectionCard className={`border-l-4 ${priorityBorder[tier.priority]}`}>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground leading-tight">{tier.name}</h2>
            <p className="text-sm text-muted-foreground italic">{tier.internalName}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={`text-xs ${priorityColors[tier.priority]}`}>
              {tier.priority}
            </Badge>
            {dataSource && (
              <Badge variant="outline" className="text-[10px] font-mono bg-gray-50 text-gray-500 border-gray-200">
                {dataSource}
              </Badge>
            )}
          </div>
        </div>

        {/* Problem callout */}
        <div className="p-4 rounded-lg bg-amber-50 border-l-4 border-l-amber-400 mb-5">
          <p className="text-sm text-foreground font-medium italic">&ldquo;{tier.problem}&rdquo;</p>
        </div>

        {/* 2-col data grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 mb-5">
          {[
            { label: "Company Size", value: tier.companySize },
            { label: "Revenue", value: tier.revenue },
            { label: "Stage", value: tier.stage },
            { label: "Entry Product", value: tier.entryProduct },
            { label: "Year 1 LTV", value: tier.yearOneLTV },
            { label: "Sales Cycle", value: tier.salesCycle },
            { label: "Decision Maker", value: tier.decisionMaker },
          ].map((d) => (
            <div key={d.label}>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {d.label}
              </p>
              <p className="text-xs font-medium text-foreground mt-0.5">{d.value}</p>
            </div>
          ))}
        </div>

        {/* Messaging angle banner */}
        <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 mb-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-purple-200 mb-0.5">
            MESSAGING ANGLE
          </p>
          <p className="text-sm text-white font-medium leading-snug">{tier.messagingAngle}</p>
        </div>

        {/* What to avoid */}
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 mb-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-0.5">
            WHAT TO AVOID
          </p>
          <p className="text-xs text-foreground">{tier.avoid}</p>
        </div>

        {/* Real examples + Channels */}
        <div className="flex flex-wrap gap-4">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
              REAL EXAMPLES
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tier.realExamples.map((ex, i) => (
                <Badge key={i} variant="outline" className="text-xs bg-white">
                  {ex}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
              CHANNELS
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tier.channels.map((ch, i) => (
                <span key={i} className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
                  {ch}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ── Section 2: Empathy Profile ────────────────────── */}
      {empathy && (
        <div className="space-y-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            EMPATHY PROFILE
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Daily Life */}
            <SectionCard className="border-l-4 border-l-purple-400">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-purple-700 mb-2">
                DAILY LIFE
              </p>
              <p className="text-xs text-foreground leading-relaxed">{empathy.dailyLife}</p>
            </SectionCard>

            {/* How They Find Us */}
            <SectionCard className="border-l-4 border-l-blue-400">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-blue-700 mb-2">
                HOW THEY FIND US
              </p>
              <p className="text-xs text-foreground leading-relaxed">{empathy.howTheyFind}</p>
            </SectionCard>

            {/* How They Decide */}
            <SectionCard className="border-l-4 border-l-indigo-400">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-indigo-700 mb-2">
                HOW THEY DECIDE
              </p>
              <p className="text-xs text-foreground leading-relaxed">{empathy.howTheyDecide}</p>
            </SectionCard>

            {/* Trust Signals */}
            <SectionCard className="border-l-4 border-l-green-400">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-green-700 mb-2">
                WHAT EARNS THEIR TRUST
              </p>
              <ul className="space-y-1.5">
                {empathy.trustSignals.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-green-500 mt-0.5 shrink-0">&#9679;</span>
                    {s}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          {/* Frustrations */}
          <SectionCard className="border-l-4 border-l-orange-400">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-orange-700 mb-2">
              FRUSTRATIONS
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
              {empathy.frustrations.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                  <span className="text-orange-500 mt-0.5 shrink-0">&#9679;</span>
                  {f}
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      )}

      {/* ── Section 3: Decision Journey ──────────────────── */}
      {journey && journey.length > 0 && (
        <div className="space-y-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            DECISION JOURNEY
          </p>
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-3 min-w-max">
              {journey.map((s, i) => {
                const hasLeak = !!s.leak;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`w-56 rounded-lg border-l-4 p-4 ${
                        hasLeak
                          ? "border-l-orange-400 bg-orange-50 border border-orange-200"
                          : "border-l-purple-400 bg-white border border-border"
                      }`}
                    >
                      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                        {s.stage}
                      </p>
                      <p className="text-xs font-semibold text-foreground mb-1">{s.action}</p>
                      <p className="text-[10px] text-muted-foreground leading-snug mb-1">{s.startSuiteRole}</p>
                      {hasLeak && (
                        <div className="mt-2 p-2 rounded bg-orange-100 border border-orange-200">
                          <p className="text-[10px] text-orange-800 leading-snug">
                            <span className="font-bold">LEAK:</span> {s.leak}
                          </p>
                        </div>
                      )}
                    </div>
                    {i < journey.length - 1 && (
                      <span className="text-muted-foreground text-lg shrink-0">&rarr;</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Section 4: Win/Loss Grid ─────────────────────── */}
      {(wins || losses || leaks || content) && (
        <div className="space-y-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            WIN / LOSS ANALYSIS
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Where We Win */}
            {wins && (
              <SectionCard className="border-l-4 border-l-green-500">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-green-700 mb-2">
                  WHERE WE WIN
                </p>
                <ul className="space-y-1.5">
                  {wins.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <span className="text-green-500 mt-0.5 shrink-0">&#9650;</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* Where We Lose */}
            {losses && (
              <SectionCard className="border-l-4 border-l-orange-500">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-orange-700 mb-2">
                  WHERE WE LOSE
                </p>
                <ul className="space-y-1.5">
                  {losses.map((l, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <span className="text-orange-500 mt-0.5 shrink-0">&#9660;</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* Funnel Leaks */}
            {leaks && (
              <SectionCard className="border-l-4 border-l-red-500">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-red-700 mb-2">
                  FUNNEL LEAKS
                </p>
                <ul className="space-y-1.5">
                  {leaks.map((l, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <span className="text-red-500 mt-0.5 shrink-0">&#9679;</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* Content That Resonates */}
            {content && (
              <SectionCard className="border-l-4 border-l-emerald-500">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-700 mb-2">
                  CONTENT THAT RESONATES
                </p>
                <ul className="space-y-1.5">
                  {content.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <span className="text-emerald-500 mt-0.5 shrink-0">&#9679;</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}
          </div>
        </div>
      )}

      {/* ── Section 5: Applicable Overlays ────────────────── */}
      <OverlaySection tierId={tier.id} overlays={overlays} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   OVERLAY SECTION — maps overlays to tiers via explicit intensity data
   ═══════════════════════════════════════════════════════════════════════════ */

/* Overlay intensity by tier from the master summary */
const overlayIntensity: Record<string, Record<string, string>> = {
  "agency-burned": { startups: "Low", growth: "Medium", established: "High", enterprise: "High", investors: "Low" },
  "ai-overwhelmed": { startups: "Low", growth: "High", established: "High", enterprise: "Medium", investors: "Low" },
  "time-starved": { startups: "High", growth: "High", established: "Medium", enterprise: "Medium", investors: "Medium" },
  "credibility-seeking": { startups: "High", growth: "Medium", established: "Low", enterprise: "Low", investors: "High" },
};

function OverlaySection({
  tierId,
  overlays,
}: {
  tierId: string;
  overlays: typeof brandData.audience.overlays;
}) {
  const relevant = overlays.filter((o) => {
    const intensity = overlayIntensity[o.id]?.[tierId];
    return intensity && intensity !== "Low";
  });

  const overlayColors: Record<string, string> = {
    "agency-burned": "border-l-red-400 bg-red-50",
    "ai-overwhelmed": "border-l-blue-400 bg-blue-50",
    "time-starved": "border-l-amber-400 bg-amber-50",
    "credibility-seeking": "border-l-purple-400 bg-purple-50",
  };

  return (
    <div className="space-y-4">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        APPLICABLE OVERLAYS
      </p>
      {relevant.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">No overlays are strongly associated with this tier.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {relevant.map((o) => {
            const intensity = overlayIntensity[o.id]?.[tierId] || "";
            return (
              <div key={o.id} className={`border-l-4 ${overlayColors[o.id] || "border-l-gray-400 bg-gray-50"} rounded-r-lg p-4`}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground">
                    {o.name}
                  </p>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    intensity === "High" ? "bg-red-100 text-red-700 font-bold" : "bg-amber-100 text-amber-700"
                  }`}>
                    {intensity}
                  </span>
                </div>
                <p className="text-xs text-foreground italic mb-1">&ldquo;{o.signal}&rdquo;</p>
                <p className="text-[10px] text-muted-foreground leading-snug">{o.messagingShift}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
