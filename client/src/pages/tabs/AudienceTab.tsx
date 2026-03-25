import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, SectionHeader, SubTabNav } from "@/components/BrandUI";
import {
  TrendingUp, ChevronRight, AlertTriangle, CheckCircle2, Target,
  BarChart3, Info, Star, Brain, Heart, Newspaper, Lightbulb,
} from "lucide-react";
import { brandData } from "@/data/brandData";

export default function AudienceTab() {
  const [sub, setSub] = useState("overview");
  const [expandedFounder, setExpandedFounder] = useState<number | null>(0);
  const [expandedEco, setExpandedEco] = useState<number | null>(null);
  const a = brandData.audienceExpanded;
  const priorityColors: Record<string, string> = {
    Highest: "bg-green-100 text-green-800 border-green-300",
    High: "bg-blue-100 text-blue-800 border-blue-300",
    Medium: "bg-amber-100 text-amber-800 border-amber-300",
  };
  const stageIcons: Record<string, React.ReactNode> = {
    Highest: <Star size={12} className="text-green-700" />,
    High: <TrendingUp size={12} className="text-blue-700" />,
    Medium: <Info size={12} className="text-amber-700" />,
  };

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={a.keyTakeaway} />

      <SubTabNav
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "founders", label: "Founder Segments" },
          { id: "ecosystem", label: "Ecosystem Segments" },
          { id: "personas", label: "Personas" },
          { id: "psychographics", label: "Psychographics" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {sub === "overview" && (
        <div className="space-y-5">
          {/* ICP */}
          <SectionCard>
            <SectionHeader icon={<Target size={16} />} title="Ideal Client Profile" subtitle="The primary target for all StartSuite marketing and sales" />
            <div className="p-4 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 mb-5">
              <p className="text-sm text-foreground leading-relaxed">{brandData.audience.icp.description}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">ICP Signals — When to Reach Out</p>
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

          {/* TAM/SAM/OAM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "TAM", sub: "Total Addressable Market", value: a.tam, color: "border-purple-200 bg-purple-50" },
              { label: "SAM", sub: "Serviceable Addressable Market", value: a.sam, color: "border-blue-200 bg-blue-50" },
              { label: "OAM", sub: "Obtainable Addressable Market", value: a.oam, color: "border-green-200 bg-green-50" },
            ].map((m, i) => (
              <SectionCard key={i} className={`border ${m.color}`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{m.label} — {m.sub}</p>
                <p className="font-display text-base font-bold text-foreground leading-snug">{m.value}</p>
              </SectionCard>
            ))}
          </div>

          {/* Segment scoring table */}
          <SectionCard>
            <SectionHeader icon={<BarChart3 size={16} />} title="Segment Priority Scoring" subtitle="Revenue potential, strategic fit, product fit, acquisition ease (1–5 each)" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Segment</th>
                    <th className="text-center py-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Revenue</th>
                    <th className="text-center py-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Strategic</th>
                    <th className="text-center py-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Product Fit</th>
                    <th className="text-center py-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Acquisition</th>
                    <th className="text-center py-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Total</th>
                    <th className="text-center py-2 pl-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {[...a.founderSegments, ...a.ecosystemSegments].map((seg, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="py-3 pr-4">
                        <p className="font-medium text-foreground text-xs">{seg.name}</p>
                        <p className="text-xs text-muted-foreground">{seg.track}</p>
                      </td>
                      <td className="text-center py-3 px-2 text-xs font-mono text-foreground">{seg.score.revenue}/5</td>
                      <td className="text-center py-3 px-2 text-xs font-mono text-foreground">{seg.score.strategic}/5</td>
                      <td className="text-center py-3 px-2 text-xs font-mono text-foreground">{seg.score.productFit}/5</td>
                      <td className="text-center py-3 px-2 text-xs font-mono text-foreground">{seg.score.acquisition}/5</td>
                      <td className="text-center py-3 px-2">
                        <span className="font-display font-bold text-purple-700">{seg.score.total}/20</span>
                      </td>
                      <td className="text-center py-3 pl-2">
                        <Badge variant="outline" className={`text-xs ${priorityColors[seg.priority]}`}>{seg.priority}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      )}

      {sub === "founders" && (
        <div className="space-y-3">
          {a.founderSegments.map((seg, i) => (
            <div key={i} className="rounded-xl border border-border overflow-hidden card-lift">
              <button
                onClick={() => setExpandedFounder(expandedFounder === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 bg-card hover:bg-muted/30 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full ss-gradient flex items-center justify-center text-white font-display font-bold text-lg shrink-0">{seg.name[0]}</div>
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-foreground">{seg.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{seg.demographics}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant="outline" className={`text-xs ${priorityColors[seg.priority]}`}>{stageIcons[seg.priority]}<span className="ml-1">{seg.priority}</span></Badge>
                  <ChevronRight size={16} className={`text-muted-foreground transition-transform ${expandedFounder === i ? "rotate-90" : ""}`} />
                </div>
              </button>
              {expandedFounder === i && (
                <div className="p-5 border-t border-border bg-card space-y-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{seg.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Demographics</p>
                      <p className="text-xs text-foreground leading-relaxed">{seg.demographics}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Psychographics</p>
                      <p className="text-xs text-foreground leading-relaxed">{seg.psychographics}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">Pain Points</p>
                      <ul className="space-y-1.5">
                        {seg.painPoints.map((p, j) => (
                          <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                            <AlertTriangle size={11} className="text-amber-600 mt-0.5 shrink-0" />{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">What They Need</p>
                      <ul className="space-y-1.5">
                        {seg.needs.map((n, j) => (
                          <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                            <CheckCircle2 size={11} className="text-green-600 mt-0.5 shrink-0" />{n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                    <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">Acquisition Channels</p>
                    <div className="flex flex-wrap gap-1.5">
                      {seg.acquisitionChannels.map((ch, j) => (
                        <Badge key={j} variant="outline" className="text-xs bg-white">{ch}</Badge>
                      ))}
                    </div>
                  </div>
                  <blockquote className="border-l-4 border-purple-400 pl-4 italic text-sm text-muted-foreground">"{seg.quote}"</blockquote>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {sub === "ecosystem" && (
        <div className="space-y-3">
          {a.ecosystemSegments.map((seg, i) => (
            <div key={i} className="rounded-xl border border-border overflow-hidden card-lift">
              <button
                onClick={() => setExpandedEco(expandedEco === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 bg-card hover:bg-muted/30 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full ss-gradient flex items-center justify-center text-white font-display font-bold text-lg shrink-0">{seg.name[0]}</div>
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-foreground">{seg.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{seg.demographics}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant="outline" className={`text-xs ${priorityColors[seg.priority]}`}>{seg.priority}</Badge>
                  <ChevronRight size={16} className={`text-muted-foreground transition-transform ${expandedEco === i ? "rotate-90" : ""}`} />
                </div>
              </button>
              {expandedEco === i && (
                <div className="p-5 border-t border-border bg-card space-y-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{seg.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">Pain Points</p>
                      <ul className="space-y-1.5">
                        {seg.painPoints.map((p, j) => (
                          <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                            <AlertTriangle size={11} className="text-amber-600 mt-0.5 shrink-0" />{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">What They Need</p>
                      <ul className="space-y-1.5">
                        {seg.needs.map((n, j) => (
                          <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                            <CheckCircle2 size={11} className="text-green-600 mt-0.5 shrink-0" />{n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                    <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">Acquisition Channels</p>
                    <div className="flex flex-wrap gap-1.5">
                      {seg.acquisitionChannels.map((ch, j) => (
                        <Badge key={j} variant="outline" className="text-xs bg-white">{ch}</Badge>
                      ))}
                    </div>
                  </div>
                  <blockquote className="border-l-4 border-purple-400 pl-4 italic text-sm text-muted-foreground">"{seg.quote}"</blockquote>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {sub === "personas" && (
        <div className="space-y-6">
          {a.personas.map((persona, i) => (
            <SectionCard key={i} className="card-lift">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl ss-gradient flex items-center justify-center text-white font-display font-bold text-2xl shrink-0">{persona.name[0]}</div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{persona.name}</h3>
                  <p className="text-sm font-medium text-purple-700">{persona.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{persona.demographics}</p>
                </div>
              </div>
              <blockquote className="border-l-4 border-purple-400 pl-4 italic text-sm text-foreground mb-5">"{persona.quote}"</blockquote>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Story</p>
                  <p className="text-xs text-foreground leading-relaxed">{persona.story}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">A Day in the Life</p>
                  <p className="text-xs text-foreground leading-relaxed">{"dayInTheLife" in persona ? persona.dayInTheLife : "—"}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-2">Goals</p>
                  <ul className="space-y-1.5">
                    {persona.goals.map((g, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                        <Target size={11} className="text-blue-600 mt-0.5 shrink-0" />{g}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">Challenges</p>
                  <ul className="space-y-1.5">
                    {persona.challenges.map((c, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                        <AlertTriangle size={11} className="text-amber-600 mt-0.5 shrink-0" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">Motivations</p>
                  <ul className="space-y-1.5">
                    {persona.motivations.map((m, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                        <Heart size={11} className="text-purple-600 mt-0.5 shrink-0" />{m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">How StartSuite Helps</p>
                <p className="text-sm text-foreground leading-relaxed">{persona.howStartSuiteHelps}</p>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {sub === "psychographics" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<Brain size={16} />} title="Psychographic Profile" subtitle={a.psychographics.keyTakeaway} />
          </SectionCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-3">Core Values</p>
              <ul className="space-y-2">
                {a.psychographics.values.map((v, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <Star size={13} className="text-purple-600 mt-0.5 shrink-0" />{v}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">Core Beliefs</p>
              <ul className="space-y-2">
                {a.psychographics.beliefs.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <Lightbulb size={13} className="text-blue-600 mt-0.5 shrink-0" />{b}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">Core Fears</p>
              <ul className="space-y-2">
                {a.psychographics.fears.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle size={13} className="text-amber-600 mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-3">Media Habits</p>
              <ul className="space-y-2">
                {a.psychographics.mediaHabits.map((m, i) => (
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
