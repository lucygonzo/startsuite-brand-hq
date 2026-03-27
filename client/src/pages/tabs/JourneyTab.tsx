import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, FieldRow } from "@/components/BrandUI";
import {
  CheckCircle2, Radar, Search, Rocket, RefreshCw, Megaphone,
  CircleDot, BookOpen, AlertTriangle, Users, Lightbulb, BarChart3,
} from "lucide-react";
import { brandData } from "@/data/brandData";

const severityColor = (s: string) => {
  if (s === "High") return "bg-red-100 text-red-800 border-red-200";
  if (s === "Medium") return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-green-100 text-green-800 border-green-200";
};

const severityDot = (s: string) => {
  if (s === "High") return "bg-red-500";
  if (s === "Medium") return "bg-amber-500";
  return "bg-green-500";
};

/** Match journey stage names (e.g. "Onboarding (Brand Discovery)") to segment stage names (e.g. "Onboarding") */
const stageMatches = (journeyStageName: string, segmentStageName: string) =>
  journeyStageName === segmentStageName || journeyStageName.startsWith(segmentStageName + " ");

export default function JourneyTab() {
  const [activeStage, setActiveStage] = useState(0);
  const [activeSegment, setActiveSegment] = useState("All");
  const j = brandData.journey;
  const segments = j.segmentFunnels;
  const gaps = j.crossSegmentGaps;

  const segmentOptions = [
    { id: "All", label: "All Segments" },
    ...segments.map((s) => ({ id: s.shortLabel, label: s.shortLabel })),
  ];

  const stageIconMap: Record<string, React.ReactNode> = {
    Radar: <Radar size={16} />,
    Search: <Search size={16} />,
    CheckCircle: <CheckCircle2 size={16} />,
    Rocket: <Rocket size={16} />,
    RefreshCw: <RefreshCw size={16} />,
    Megaphone: <Megaphone size={16} />,
  };

  const currentStage = j.stages[activeStage];
  const matchingSegmentData = segments
    .filter((seg) => activeSegment === "All" || seg.shortLabel === activeSegment)
    .map((seg) => {
      const stageData = seg.stages.find((s) => stageMatches(currentStage.stage, s.stage));
      return stageData ? { segment: seg.segment, shortLabel: seg.shortLabel, ...stageData } : null;
    })
    .filter(Boolean) as Array<{
      segment: string;
      shortLabel: string;
      stage: string;
      friction: string;
      severity: "High" | "Medium" | "Low";
      fix: string;
    }>;

  // Compute per-stage friction counts for the cross-segment summary
  const stageFrictionSummary = j.stages.map((stage) => {
    let high = 0;
    let medium = 0;
    let low = 0;
    for (const seg of segments) {
      const sd = seg.stages.find((s) => stageMatches(stage.stage, s.stage));
      if (sd) {
        if (sd.severity === "High") high++;
        else if (sd.severity === "Medium") medium++;
        else low++;
      }
    }
    return { stage: stage.stage, icon: stage.icon, high, medium, low, total: high + medium + low };
  });

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={j.keyTakeaway} />

      {/* Segment Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <Users size={14} />
          <span>View by:</span>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {segmentOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveSegment(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSegment === opt.id
                  ? "ss-gradient text-white shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {j.stages.map((stage, i) => (
          <button
            key={i}
            onClick={() => setActiveStage(i)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
              activeStage === i
                ? "ss-gradient text-white shadow-md"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {stageIconMap[stage.icon]}
            {stage.stage}
          </button>
        ))}
      </div>

      {j.stages.map((stage, i) => (
        activeStage === i && (
          <div key={i} className="space-y-5">
            <SectionCard>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl ss-gradient flex items-center justify-center text-white shrink-0">
                  {stageIconMap[stage.icon]}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{stage.stage}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{stage.description}</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-1">Founder Mindset</p>
                <p className="text-sm italic text-foreground">{stage.founderMindset}</p>
              </div>
              <FieldRow label="Success Metric" value={stage.successMetric} />
            </SectionCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <SectionCard>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">Touchpoints</p>
                <ul className="space-y-2">
                  {stage.touchpoints.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-foreground">
                      <CircleDot size={11} className="text-blue-600 mt-0.5 shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              </SectionCard>
              <SectionCard>
                <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-3">Content Needed</p>
                <ul className="space-y-2">
                  {stage.contentNeeded.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-foreground">
                      <BookOpen size={11} className="text-green-600 mt-0.5 shrink-0" />{c}
                    </li>
                  ))}
                </ul>
              </SectionCard>
              <SectionCard>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">Friction Points</p>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-xs text-foreground leading-relaxed">{stage.friction}</p>
                </div>
              </SectionCard>
            </div>

            {/* Segment-Specific Friction */}
            {matchingSegmentData.length > 0 && (
              <SectionCard>
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                    <AlertTriangle size={16} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      Segment Friction: {stage.stage}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activeSegment === "All"
                        ? "How friction varies by audience type at this stage"
                        : `Friction specific to ${activeSegment} segment`}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {matchingSegmentData.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-border space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center gap-2 shrink-0 min-w-[140px]">
                          <div className={`w-2.5 h-2.5 rounded-full ${severityDot(item.severity)}`} />
                          <span className="text-xs font-semibold text-foreground">{item.segment}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-foreground leading-relaxed">{item.friction}</p>
                        </div>
                        <Badge variant="outline" className={`text-xs shrink-0 ${severityColor(item.severity)}`}>
                          {item.severity}
                        </Badge>
                      </div>
                      {activeSegment !== "All" && item.fix && (
                        <div className="flex items-start gap-2 ml-[156px] p-2 rounded-md bg-emerald-50 border border-emerald-200">
                          <Lightbulb size={12} className="text-emerald-600 mt-0.5 shrink-0" />
                          <p className="text-xs text-emerald-800 leading-relaxed">{item.fix}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}
          </div>
        )
      ))}

      {/* Cross-Segment Gap Summary */}
      <SectionCard>
        <div className="flex items-start gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
            <BarChart3 size={16} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              Cross-Segment Gap Summary
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Which stages have the most friction across all segments
            </p>
          </div>
        </div>

        {/* Per-stage friction heatmap */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-semibold text-muted-foreground uppercase tracking-widest">Stage</th>
                <th className="text-center py-2 px-3 font-semibold text-red-700 uppercase tracking-widest">High</th>
                <th className="text-center py-2 px-3 font-semibold text-amber-700 uppercase tracking-widest">Medium</th>
                <th className="text-center py-2 px-3 font-semibold text-green-700 uppercase tracking-widest">Low</th>
                <th className="text-center py-2 pl-3 font-semibold text-muted-foreground uppercase tracking-widest">Total</th>
              </tr>
            </thead>
            <tbody>
              {stageFrictionSummary.map((row) => (
                <tr key={row.stage} className="border-b border-border/50">
                  <td className="py-2.5 pr-4 font-medium text-foreground flex items-center gap-2">
                    {stageIconMap[row.icon]}
                    {row.stage}
                  </td>
                  <td className="text-center py-2.5 px-3">
                    {row.high > 0 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-800 font-semibold">
                        {row.high}
                      </span>
                    )}
                  </td>
                  <td className="text-center py-2.5 px-3">
                    {row.medium > 0 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-semibold">
                        {row.medium}
                      </span>
                    )}
                  </td>
                  <td className="text-center py-2.5 px-3">
                    {row.low > 0 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800 font-semibold">
                        {row.low}
                      </span>
                    )}
                  </td>
                  <td className="text-center py-2.5 pl-3 font-semibold text-foreground">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key gaps */}
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Key Gaps Across Segments</p>
        <div className="space-y-2">
          {gaps.map((g, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-border">
              <Badge variant="outline" className={`text-xs shrink-0 ${severityColor(g.priority)}`}>
                {g.priority}
              </Badge>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{g.gap}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{g.impact}</p>
              </div>
              <div className="flex gap-1 flex-wrap shrink-0">
                {g.affectedStages.map((s) => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
