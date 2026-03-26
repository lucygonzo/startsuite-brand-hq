import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SectionCard, KeyTakeaway, SectionHeader, SubTabNav } from "@/components/BrandUI";
import {
  AlertTriangle, CheckCircle2, BarChart3, Zap, ChevronDown, ChevronUp,
  Shield, Users, DollarSign, Calendar, Target, Swords,
  ArrowRight,
} from "lucide-react";
import { brandData } from "@/data/brandData";

/* ── Threat-level palette ─────────────────────────────────────────────────── */

const THREAT_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  High:     { bg: "bg-red-100",   text: "text-red-700",   border: "border-red-200",   dot: "bg-red-500" },
  Medium:   { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  Low:      { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" },
  Adjacent: { bg: "bg-blue-100",  text: "text-blue-700",  border: "border-blue-200",  dot: "bg-blue-500" },
  None:     { bg: "bg-gray-100",  text: "text-gray-500",  border: "border-gray-200",  dot: "bg-gray-400" },
};

const STRENGTH_COLORS: Record<string, { bg: string; text: string; bar: string }> = {
  Strong:   { bg: "bg-green-50", text: "text-green-700", bar: "bg-green-500" },
  Moderate: { bg: "bg-amber-50", text: "text-amber-700", bar: "bg-amber-500" },
  Emerging: { bg: "bg-blue-50",  text: "text-blue-700",  bar: "bg-blue-500" },
};

/* ── Head-to-head capability map ──────────────────────────────────────────── */

type Cap = "full" | "partial" | "basic" | "ai" | false;

const CAPABILITY_MAP: Record<string, { strategy: Cap; design: Cap; content: Cap; intel: Cap; compounds: Cap }> = {
  "Superside":           { strategy: false,  design: "full",    content: "partial", intel: false, compounds: false },
  "DesignJoy":           { strategy: false,  design: "full",    content: false,     intel: false, compounds: false },
  "Pentagram":           { strategy: "full", design: "full",    content: false,     intel: false, compounds: false },
  "Canva Teams / AI":    { strategy: false,  design: "full",    content: false,     intel: false, compounds: false },
  "Jasper":              { strategy: false,  design: false,     content: "full",    intel: false, compounds: false },
  "Looka / Brandmark":   { strategy: false,  design: "basic",   content: false,     intel: false, compounds: false },
  "Pilot (YC-backed)":   { strategy: false,  design: false,     content: false,     intel: false, compounds: false },
  "Moda":                { strategy: false,  design: "ai",      content: false,     intel: false, compounds: false },
};

function CapIcon({ value }: { value: Cap }) {
  if (value === "full")    return <CheckCircle2 size={14} className="text-green-600 mx-auto" />;
  if (value === "partial") return <span className="text-amber-500 text-xs font-mono mx-auto block text-center">~</span>;
  if (value === "basic")   return <span className="text-green-500/60 text-xs font-mono mx-auto block text-center">*</span>;
  if (value === "ai")      return <span className="text-blue-500 text-xs font-mono mx-auto block text-center">AI</span>;
  return <span className="text-muted-foreground/30 block text-center">&mdash;</span>;
}

/* ── Threat tiers (for "Where We Fit" summary) ────────────────────────────── */

interface ThreatEntry { name: string; level: "HIGH" | "MEDIUM" | "LOW" | "NONE"; note?: string }

const THREAT_TIERS: ThreatEntry[] = [
  { name: "Canva Teams / AI", level: "HIGH" },
  { name: "Jasper",           level: "MEDIUM" },
  { name: "Superside",        level: "MEDIUM" },
  { name: "DesignJoy",        level: "LOW" },
  { name: "Pentagram",        level: "LOW" },
  { name: "Looka / Brandmark",level: "LOW" },
  { name: "Pilot (YC-backed)",level: "LOW", note: "Adjacent market" },
];

const TIER_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  HIGH:   { bg: "bg-red-100",   text: "text-red-700",   label: "High" },
  MEDIUM: { bg: "bg-amber-100", text: "text-amber-700", label: "Medium" },
  LOW:    { bg: "bg-green-100", text: "text-green-700",  label: "Low" },
  NONE:   { bg: "bg-gray-100",  text: "text-gray-400 line-through", label: "None" },
};

/* ── Priority + owner for recommendations ─────────────────────────────────── */

const REC_META: { priority: "Urgent" | "High" | "Medium"; owner: string }[] = [
  { priority: "Urgent", owner: "Reagan" },
  { priority: "High",   owner: "Lucy" },
  { priority: "High",   owner: "Both" },
  { priority: "High",   owner: "Both" },
  { priority: "Medium", owner: "Both" },
];

const PRIORITY_STYLE: Record<string, { bg: string; text: string }> = {
  Urgent: { bg: "bg-red-100",   text: "text-red-700" },
  High:   { bg: "bg-amber-100", text: "text-amber-700" },
  Medium: { bg: "bg-blue-100",  text: "text-blue-700" },
};

/* ── Threat filter helper ─────────────────────────────────────────────────── */

const THREAT_ORDER: Record<string, number> = { High: 0, Medium: 1, Low: 2, Adjacent: 3 };

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function CompetitiveTab() {
  const [sub, setSub] = useState("where-we-fit");
  const [expandedCompetitors, setExpandedCompetitors] = useState<Set<number>>(new Set());
  const [threatFilter, setThreatFilter] = useState<string>("All");
  const comp = brandData.competitive;

  const toggleCompetitor = (index: number) => {
    setExpandedCompetitors((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  /* Sort + filter named competitors */
  const sortedCompetitors = [...comp.namedCompetitors]
    .sort((a, b) => (THREAT_ORDER[a.threatLevel] ?? 9) - (THREAT_ORDER[b.threatLevel] ?? 9));

  const filteredCompetitors = threatFilter === "All"
    ? sortedCompetitors
    : sortedCompetitors.filter((nc) => nc.threatLevel === threatFilter);

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={comp.keyTakeaway} />

      <SubTabNav
        tabs={[
          { id: "where-we-fit",  label: "Where We Fit" },
          { id: "competitors",   label: "Competitors" },
          { id: "moat",          label: "Our Moat" },
          { id: "actions",       label: "Strategic Actions" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {/* ══════════════════════════════════════════════════════════════════════
           TAB 1 — WHERE WE FIT
         ══════════════════════════════════════════════════════════════════════ */}
      {sub === "where-we-fit" && (
        <div className="space-y-6">

          {/* A — White Space Statement */}
          <div className="rounded-xl ss-gradient p-[1px]">
            <div className="rounded-[11px] bg-card p-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-purple-600 mb-2">The White Space</p>
              <p className="text-sm text-foreground leading-relaxed">{comp.whitespace}</p>
            </div>
          </div>

          {/* B — Positioning Matrix */}
          <SectionCard>
            <SectionHeader icon={<BarChart3 size={16} />} title="Positioning Matrix" subtitle="Speed vs. Strategic Depth — where StartSuite sits" />
            <div className="relative w-full aspect-square max-w-lg mx-auto bg-muted/30 rounded-xl border border-border overflow-hidden">
              {/* Grid lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-full h-px bg-border top-1/2" />
                <div className="absolute h-full w-px bg-border left-1/2" />
              </div>
              {/* Axis labels */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Fast &rarr;</div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">&larr; Slow</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-mono uppercase tracking-widest" style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}>Strategy + Execution &uarr;</div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-mono uppercase tracking-widest" style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}>&darr; Execution Only</div>
              {/* Quadrant labels */}
              <div className="absolute top-4 left-4 text-[10px] text-muted-foreground/40 font-mono">Slow + Strategic</div>
              <div className="absolute top-4 right-4 text-[10px] text-muted-foreground/40 font-mono text-right">Fast + Strategic</div>
              <div className="absolute bottom-8 left-4 text-[10px] text-muted-foreground/40 font-mono">Slow + Execution</div>
              <div className="absolute bottom-8 right-4 text-[10px] text-muted-foreground/40 font-mono text-right">Fast + Execution</div>
              {/* Dots */}
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
                            isStartSuite ? "w-10 h-10 ss-gradient text-white ring-2 ring-purple-300 ring-offset-2" : "w-7 h-7 bg-white border-2 border-muted-foreground/30 text-muted-foreground"
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
            <p className="text-xs text-muted-foreground text-center mt-4">No competitor combines startup speed, senior strategic depth, investor perspective, and compounding brand intelligence.</p>
          </SectionCard>

          {/* C — Market Categories (compact table) */}
          <SectionCard>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">Market Categories</p>
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <table className="w-full text-xs border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Category</th>
                    <th className="text-left py-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Examples</th>
                    <th className="text-left py-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Their Weakness</th>
                    <th className="text-left py-2 pl-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-purple-700">Our Edge</th>
                  </tr>
                </thead>
                <tbody>
                  {comp.categories.map((cat, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 pr-3 font-medium text-foreground">{cat.category}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{cat.examples.slice(0, 3).join(", ")}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{cat.weaknesses[0]}</td>
                      <td className="py-2.5 pl-3 text-purple-700 font-medium">{cat.startSuiteAdvantage.split(".")[0]}.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* D — Threat Summary */}
          <SectionCard>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">Threat Summary</p>
            <div className="space-y-3">
              {(["HIGH", "MEDIUM", "LOW", "NONE"] as const).map((level) => {
                const entries = THREAT_TIERS.filter((t) => t.level === level);
                if (entries.length === 0) return null;
                const style = TIER_STYLE[level];
                return (
                  <div key={level} className="flex items-start gap-3">
                    <Badge className={`text-xs shrink-0 w-16 justify-center ${style.bg} ${style.text} border border-current/10`}>
                      {style.label}
                    </Badge>
                    <div className="flex flex-wrap gap-1.5">
                      {entries.map((e, j) => (
                        <span key={j} className={`text-xs px-2 py-0.5 rounded-md border ${style.bg} ${style.text} ${e.level === "NONE" ? "line-through" : ""}`}>
                          {e.name}{e.note ? ` (${e.note})` : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
           TAB 2 — COMPETITORS
         ══════════════════════════════════════════════════════════════════════ */}
      {sub === "competitors" && (
        <div className="space-y-6">

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {["All", "High", "Medium", "Low", "Adjacent"].map((level) => (
              <button
                key={level}
                onClick={() => setThreatFilter(level)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  threatFilter === level
                    ? "bg-purple-100 text-purple-700 border-purple-300"
                    : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                {level === "All" ? "All Competitors" : `${level} Threat`}
              </button>
            ))}
          </div>

          {/* Competitor cards */}
          <div className="space-y-3">
            {filteredCompetitors.map((nc, _fi) => {
              const origIndex = comp.namedCompetitors.indexOf(nc);
              const isExpanded = expandedCompetitors.has(origIndex);
              const threatColor = THREAT_COLORS[nc.threatLevel] || THREAT_COLORS.Low;
              return (
                <SectionCard key={origIndex} className="card-lift">
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => toggleCompetitor(origIndex)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display text-base font-semibold text-foreground">{nc.name}</h3>
                          <span className="text-xs text-muted-foreground">{nc.category}</span>
                        </div>
                        <p className="text-xs italic text-muted-foreground mt-0.5">&ldquo;{nc.tagline}&rdquo;</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge className={`text-xs ${threatColor.bg} ${threatColor.text} ${threatColor.border} border`}>
                          {nc.threatLevel}
                        </Badge>
                        <span className="text-xs text-muted-foreground hidden sm:block">{nc.pricing}</span>
                        {isExpanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border space-y-4">
                      {/* 3-column top grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-1.5">
                            <Calendar size={12} className="text-muted-foreground mt-0.5 shrink-0" />
                            <div><p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Founded / HQ / Team</p><p className="text-xs font-medium text-foreground">{nc.founded} &middot; {nc.hq} &middot; {nc.teamSize}</p></div>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <DollarSign size={12} className="text-muted-foreground mt-0.5 shrink-0" />
                          <div><p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Pricing</p><p className="text-xs font-medium text-foreground">{nc.pricing}</p></div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Users size={12} className="text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Notable Clients</p>
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {nc.notableClients.map((client, j) => (
                                <Badge key={j} variant="outline" className="text-[10px]">{client}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Vulnerabilities + Advantage */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-2">Vulnerabilities</p>
                          <ul className="space-y-1">
                            {nc.vulnerabilities.map((v, j) => (
                              <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                                <AlertTriangle size={11} className="text-amber-600 mt-0.5 shrink-0" />
                                {v}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-purple-700 mb-2">StartSuite Advantage</p>
                          <p className="text-xs text-foreground leading-relaxed">{nc.startSuiteAdvantage}</p>
                        </div>
                      </div>

                      {nc.driveUrl && (
                        <div className="pt-3 border-t border-border">
                          <a
                            href={nc.driveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-purple-600 hover:text-purple-800 transition-colors inline-flex items-center gap-1"
                          >
                            View Full Profile <ArrowRight size={12} />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </SectionCard>
              );
            })}
          </div>

          {/* Head-to-Head Comparison Table */}
          <SectionCard>
            <SectionHeader icon={<Swords size={16} />} title="Head-to-Head Comparison" subtitle="Capability coverage across key dimensions" />
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <table className="w-full text-xs border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Competitor</th>
                    <th className="text-center py-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Strategy</th>
                    <th className="text-center py-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Design</th>
                    <th className="text-center py-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Content</th>
                    <th className="text-center py-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Intel</th>
                    <th className="text-center py-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Compounds</th>
                    <th className="text-left py-2 pl-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Threat</th>
                  </tr>
                </thead>
                <tbody>
                  {/* StartSuite row */}
                  <tr className="bg-purple-50 border-b-2 border-purple-200 font-medium">
                    <td className="py-2.5 pr-3"><span className="font-display font-semibold text-purple-700">StartSuite</span></td>
                    <td className="py-2.5 px-3 text-center"><CheckCircle2 size={14} className="text-green-600 mx-auto" /></td>
                    <td className="py-2.5 px-3 text-center"><CheckCircle2 size={14} className="text-green-600 mx-auto" /></td>
                    <td className="py-2.5 px-3 text-center"><CheckCircle2 size={14} className="text-green-600 mx-auto" /></td>
                    <td className="py-2.5 px-3 text-center"><CheckCircle2 size={14} className="text-green-600 mx-auto" /></td>
                    <td className="py-2.5 px-3 text-center"><CheckCircle2 size={14} className="text-green-600 mx-auto" /></td>
                    <td className="py-2.5 pl-3"><Badge className="text-xs bg-purple-100 text-purple-700 border border-purple-200">Us</Badge></td>
                  </tr>
                  {/* Competitor rows */}
                  {sortedCompetitors.map((nc, i) => {
                    const caps = CAPABILITY_MAP[nc.name] || { strategy: false, design: false, content: false, intel: false, compounds: false };
                    const threatColor = THREAT_COLORS[nc.threatLevel] || THREAT_COLORS.Low;
                    return (
                      <tr key={i} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-2.5 pr-3 font-medium text-foreground">{nc.name}</td>
                        <td className="py-2.5 px-3"><CapIcon value={caps.strategy} /></td>
                        <td className="py-2.5 px-3"><CapIcon value={caps.design} /></td>
                        <td className="py-2.5 px-3"><CapIcon value={caps.content} /></td>
                        <td className="py-2.5 px-3"><CapIcon value={caps.intel} /></td>
                        <td className="py-2.5 px-3"><CapIcon value={caps.compounds} /></td>
                        <td className="py-2.5 pl-3">
                          <Badge className={`text-xs ${threatColor.bg} ${threatColor.text} ${threatColor.border} border`}>{nc.threatLevel}</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              <span className="font-mono text-[10px]">KEY</span>&ensp;
              <CheckCircle2 size={10} className="inline text-green-600" /> Full&ensp;
              <span className="text-amber-500 font-mono">~</span> Partial&ensp;
              <span className="text-green-500/60 font-mono">*</span> Basic&ensp;
              <span className="text-blue-500 font-mono">AI</span> AI-only&ensp;
              &mdash; None.
              &ensp;No competitor has Intel or Compounds &mdash; that is the moat.
            </p>
          </SectionCard>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
           TAB 3 — OUR MOAT
         ══════════════════════════════════════════════════════════════════════ */}
      {sub === "moat" && (
        <div className="space-y-6">

          {/* Defensibility key takeaway */}
          <KeyTakeaway text={comp.defensibility.keyTakeaway} />

          {/* A — Moat Dimensions */}
          <div>
            <SectionHeader icon={<Shield size={16} />} title="Moat Dimensions" subtitle="How defensible is StartSuite across key competitive dimensions" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comp.defensibility.dimensions.map((dim, i) => {
                const strengthColor = STRENGTH_COLORS[dim.strength] || STRENGTH_COLORS.Emerging;
                const barWidth = dim.strength === "Strong" ? "w-full" : dim.strength === "Moderate" ? "w-2/3" : "w-1/3";
                return (
                  <SectionCard key={i} className={`card-lift border ${
                    dim.strength === "Strong" ? "border-green-200" : dim.strength === "Moderate" ? "border-amber-200" : "border-blue-200"
                  }`}>
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h4 className="font-display text-sm font-semibold text-foreground">{dim.dimension}</h4>
                      <Badge className={`text-[10px] ${strengthColor.bg} ${strengthColor.text} border shrink-0`}>
                        {dim.strength}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">{dim.description}</p>
                    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${strengthColor.bar} ${barWidth} transition-all duration-500`} />
                    </div>
                  </SectionCard>
                );
              })}
            </div>
          </div>

          {/* B — SWOT */}
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">SWOT Analysis</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strengths */}
              <SectionCard className="border-green-200">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-green-700 mb-0.5">Strengths</p>
                <p className="text-xs text-muted-foreground mb-3 italic">What makes us hard to replace</p>
                <ul className="space-y-1.5">
                  {comp.swot.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <CheckCircle2 size={12} className="text-green-600 mt-0.5 shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              {/* Weaknesses */}
              <SectionCard className="border-amber-200">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-0.5">Weaknesses</p>
                <p className="text-xs text-muted-foreground mb-3 italic">What we need to fix</p>
                <ul className="space-y-1.5">
                  {comp.swot.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <AlertTriangle size={12} className="text-amber-600 mt-0.5 shrink-0" />{w}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              {/* Opportunities */}
              <SectionCard className="border-blue-200">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-blue-700 mb-0.5">Opportunities</p>
                <p className="text-xs text-muted-foreground mb-3 italic">Where the market is opening up</p>
                <ul className="space-y-1.5">
                  {comp.swot.opportunities.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <Zap size={12} className="text-blue-600 mt-0.5 shrink-0" />{o}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              {/* Threats */}
              <SectionCard className="border-red-200">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-red-700 mb-0.5">Threats</p>
                <p className="text-xs text-muted-foreground mb-3 italic">What could undermine our position</p>
                <ul className="space-y-1.5">
                  {comp.swot.threats.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <AlertTriangle size={12} className="text-red-600 mt-0.5 shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
           TAB 4 — STRATEGIC ACTIONS
         ══════════════════════════════════════════════════════════════════════ */}
      {sub === "actions" && (
        <div className="space-y-4">
          <SectionHeader icon={<Target size={16} />} title="Strategic Recommendations" subtitle="Prioritized actions to strengthen StartSuite's competitive position" />
          {comp.recommendations.map((rec, i) => {
            const meta = REC_META[i] || { priority: "Medium" as const, owner: "Both" };
            const prioStyle = PRIORITY_STYLE[meta.priority] || PRIORITY_STYLE.Medium;
            return (
              <SectionCard key={i} className="card-lift">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg ss-gradient flex items-center justify-center text-white font-bold text-sm shrink-0">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-display text-base font-semibold text-foreground">{rec.title}</h3>
                      <Badge className={`text-[10px] ${prioStyle.bg} ${prioStyle.text} border border-current/10`}>{meta.priority}</Badge>
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Owner: {meta.owner}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
                  </div>
                </div>
              </SectionCard>
            );
          })}

          {/* Link to Actions tab */}
          <div className="pt-2">
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Track progress on these items in the Actions tab &rarr;
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
