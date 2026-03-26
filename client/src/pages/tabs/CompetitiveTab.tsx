import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SectionCard, KeyTakeaway, SectionHeader, SubTabNav } from "@/components/BrandUI";
import {
  AlertTriangle, CheckCircle2, BarChart3, Zap, ChevronDown, ChevronUp,
  Shield, Building2, Users, DollarSign, MapPin, Calendar, Target, Swords,
} from "lucide-react";
import { brandData } from "@/data/brandData";

const THREAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  High: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
  Medium: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
  Low: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
  Adjacent: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
};

const STRENGTH_COLORS: Record<string, { bg: string; text: string; bar: string }> = {
  Strong: { bg: "bg-green-50", text: "text-green-700", bar: "bg-green-500" },
  Moderate: { bg: "bg-amber-50", text: "text-amber-700", bar: "bg-amber-500" },
  Emerging: { bg: "bg-blue-50", text: "text-blue-700", bar: "bg-blue-500" },
};

export default function CompetitiveTab() {
  const [sub, setSub] = useState("landscape");
  const [expandedCompetitors, setExpandedCompetitors] = useState<Set<number>>(new Set());
  const comp = brandData.competitive;

  const toggleCompetitor = (index: number) => {
    setExpandedCompetitors((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={comp.keyTakeaway} />

      <SubTabNav
        tabs={[
          { id: "landscape", label: "Market Landscape" },
          { id: "competitors", label: "Competitors" },
          { id: "matrix", label: "Positioning Matrix" },
          { id: "swot", label: "SWOT" },
          { id: "defensibility", label: "Defensibility" },
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

      {/* ── NAMED COMPETITORS ────────────────────────────────────────────── */}
      {sub === "competitors" && (
        <div className="space-y-6">
          {/* Competitor profile cards */}
          <div className="space-y-4">
            <SectionHeader icon={<Target size={16} />} title="Named Competitor Profiles" subtitle="Individual competitors mapped by threat level" />
            {comp.namedCompetitors.map((nc, i) => {
              const isExpanded = expandedCompetitors.has(i);
              const threatColor = THREAT_COLORS[nc.threatLevel] || THREAT_COLORS.Low;
              return (
                <SectionCard key={i} className="card-lift">
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => toggleCompetitor(i)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display text-base font-semibold text-foreground">{nc.name}</h3>
                          <Badge className={`text-xs ${threatColor.bg} ${threatColor.text} ${threatColor.border} border`}>
                            {nc.threatLevel} Threat
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{nc.category}</p>
                        <p className="text-xs italic text-muted-foreground mt-0.5">"{nc.tagline}"</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs font-medium text-foreground">{nc.pricing}</p>
                          <p className="text-xs text-muted-foreground">{nc.teamSize} people</p>
                        </div>
                        {isExpanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border space-y-4">
                      {/* Details grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="flex items-start gap-1.5">
                          <Calendar size={12} className="text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Founded</p>
                            <p className="text-xs font-medium text-foreground">{nc.founded}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <MapPin size={12} className="text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">HQ</p>
                            <p className="text-xs font-medium text-foreground">{nc.hq}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Users size={12} className="text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Team Size</p>
                            <p className="text-xs font-medium text-foreground">{nc.teamSize}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <DollarSign size={12} className="text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Pricing</p>
                            <p className="text-xs font-medium text-foreground">{nc.pricing}</p>
                          </div>
                        </div>
                      </div>

                      {/* Notable clients */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">Notable Clients</p>
                        <div className="flex flex-wrap gap-1.5">
                          {nc.notableClients.map((client, j) => (
                            <Badge key={j} variant="outline" className="text-xs">{client}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Vulnerabilities + Advantage */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-red-700 mb-2">Vulnerabilities</p>
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
                          <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">StartSuite Advantage</p>
                          <p className="text-xs text-foreground leading-relaxed">{nc.startSuiteAdvantage}</p>
                        </div>
                      </div>

                      {nc.driveUrl && (
                        <div className="pt-3 border-t border-border">
                          <a
                            href={nc.driveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-purple-600 hover:text-purple-800 transition-colors"
                          >
                            View Full Profile &rarr;
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
            <SectionHeader icon={<Swords size={16} />} title="Head-to-Head Comparison" subtitle="StartSuite vs. named competitors across key dimensions" />
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <table className="w-full text-xs border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-3 font-semibold text-muted-foreground uppercase tracking-widest">Competitor</th>
                    <th className="text-left py-2 px-3 font-semibold text-muted-foreground uppercase tracking-widest">Category</th>
                    <th className="text-left py-2 px-3 font-semibold text-muted-foreground uppercase tracking-widest">Pricing</th>
                    <th className="text-center py-2 px-3 font-semibold text-muted-foreground uppercase tracking-widest">Strategy</th>
                    <th className="text-center py-2 px-3 font-semibold text-muted-foreground uppercase tracking-widest">Design</th>
                    <th className="text-center py-2 px-3 font-semibold text-muted-foreground uppercase tracking-widest">Content</th>
                    <th className="text-center py-2 px-3 font-semibold text-muted-foreground uppercase tracking-widest">Intel</th>
                    <th className="text-center py-2 px-3 font-semibold text-muted-foreground uppercase tracking-widest">Compounds</th>
                    <th className="text-left py-2 pl-3 font-semibold text-muted-foreground uppercase tracking-widest">Threat</th>
                  </tr>
                </thead>
                <tbody>
                  {/* StartSuite row - highlighted */}
                  <tr className="bg-purple-50 border-b-2 border-purple-200 font-medium">
                    <td className="py-2.5 pr-3">
                      <span className="font-display font-semibold text-purple-700">StartSuite</span>
                    </td>
                    <td className="py-2.5 px-3 text-foreground">Creative Operating System</td>
                    <td className="py-2.5 px-3 text-foreground">$3K/mo</td>
                    <td className="py-2.5 px-3 text-center"><CheckCircle2 size={14} className="text-green-600 mx-auto" /></td>
                    <td className="py-2.5 px-3 text-center"><CheckCircle2 size={14} className="text-green-600 mx-auto" /></td>
                    <td className="py-2.5 px-3 text-center"><CheckCircle2 size={14} className="text-green-600 mx-auto" /></td>
                    <td className="py-2.5 px-3 text-center"><CheckCircle2 size={14} className="text-green-600 mx-auto" /></td>
                    <td className="py-2.5 px-3 text-center"><CheckCircle2 size={14} className="text-green-600 mx-auto" /></td>
                    <td className="py-2.5 pl-3">
                      <Badge className="text-xs bg-purple-100 text-purple-700 border border-purple-200">Us</Badge>
                    </td>
                  </tr>
                  {/* Competitor rows */}
                  {comp.namedCompetitors.map((nc, i) => {
                    const threatColor = THREAT_COLORS[nc.threatLevel] || THREAT_COLORS.Low;
                    // Determine capabilities based on category
                    const hasStrategy = ["Superside", "Pentagram"].includes(nc.name) ? false : nc.name === "Jasper" ? false : nc.name === "Pilot (YC-backed)" ? false : false;
                    const hasDesign = ["Superside", "DesignJoy", "Pentagram", "Canva Teams / AI", "Looka / Brandmark"].includes(nc.name);
                    const hasContent = ["Jasper"].includes(nc.name);
                    const hasIntel = false;
                    const hasCompounding = false;
                    return (
                      <tr key={i} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-2.5 pr-3 font-medium text-foreground">{nc.name}</td>
                        <td className="py-2.5 px-3 text-muted-foreground">{nc.category}</td>
                        <td className="py-2.5 px-3 text-muted-foreground">{nc.pricing}</td>
                        <td className="py-2.5 px-3 text-center">
                          {hasStrategy ? <CheckCircle2 size={14} className="text-green-600 mx-auto" /> : <span className="text-muted-foreground/40">—</span>}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {hasDesign ? <CheckCircle2 size={14} className="text-green-600 mx-auto" /> : <span className="text-muted-foreground/40">—</span>}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {hasContent ? <CheckCircle2 size={14} className="text-green-600 mx-auto" /> : <span className="text-muted-foreground/40">—</span>}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {hasIntel ? <CheckCircle2 size={14} className="text-green-600 mx-auto" /> : <span className="text-muted-foreground/40">—</span>}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {hasCompounding ? <CheckCircle2 size={14} className="text-green-600 mx-auto" /> : <span className="text-muted-foreground/40">—</span>}
                        </td>
                        <td className="py-2.5 pl-3">
                          <Badge className={`text-xs ${threatColor.bg} ${threatColor.text} ${threatColor.border} border`}>
                            {nc.threatLevel}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Strategy = strategic brand guidance. Design = visual/creative output. Content = copy/content creation. Intel = competitive intelligence. Compounds = value increases over time.</p>
          </SectionCard>
        </div>
      )}

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

      {/* ── DEFENSIBILITY ────────────────────────────────────────────────── */}
      {sub === "defensibility" && (
        <div className="space-y-5">
          <KeyTakeaway text={comp.defensibility.keyTakeaway} />

          <SectionHeader icon={<Shield size={16} />} title="Moat Dimensions" subtitle="How defensible is StartSuite across key competitive dimensions" />

          <div className="space-y-4">
            {comp.defensibility.dimensions.map((dim, i) => {
              const strengthColor = STRENGTH_COLORS[dim.strength] || STRENGTH_COLORS.Emerging;
              const barWidth = dim.strength === "Strong" ? "w-full" : dim.strength === "Moderate" ? "w-2/3" : "w-1/3";
              return (
                <SectionCard key={i} className={`card-lift border ${
                  dim.strength === "Strong" ? "border-green-200" : dim.strength === "Moderate" ? "border-amber-200" : "border-blue-200"
                }`}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-display text-sm font-semibold text-foreground">{dim.dimension}</h3>
                    </div>
                    <Badge className={`text-xs ${strengthColor.bg} ${strengthColor.text} border shrink-0`}>
                      {dim.strength}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{dim.description}</p>
                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${strengthColor.bar} ${barWidth} transition-all duration-500`} />
                  </div>
                </SectionCard>
              );
            })}
          </div>

          {/* Summary card */}
          <SectionCard>
            <div className="gradient-left-border pl-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">The Moat Summary</p>
              <p className="text-sm text-foreground leading-relaxed">
                StartSuite has three strong moat dimensions (context accumulation, senior creative judgment, and client relationships), one moderate dimension (investor perspective), and one emerging dimension (category creation). The primary risk is that "creative operating system" language gets adopted by competitors before StartSuite owns the category. Speed of positioning is critical.
              </p>
            </div>
          </SectionCard>
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
