import { useState } from "react";
import { SectionCard, KeyTakeaway, FieldRow } from "@/components/BrandUI";
import {
  CheckCircle2, Radar, Search, Rocket, RefreshCw, Megaphone,
  CircleDot, BookOpen,
} from "lucide-react";
import { brandData } from "@/data/brandData";

export default function JourneyTab() {
  const [activeStage, setActiveStage] = useState(0);
  const j = brandData.journey;
  const stageIconMap: Record<string, React.ReactNode> = {
    Radar: <Radar size={16} />,
    Search: <Search size={16} />,
    CheckCircle: <CheckCircle2 size={16} />,
    Rocket: <Rocket size={16} />,
    RefreshCw: <RefreshCw size={16} />,
    Megaphone: <Megaphone size={16} />,
  };

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={j.keyTakeaway} />

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
                  {stage.touchpoints.map((t, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-foreground">
                      <CircleDot size={11} className="text-blue-600 mt-0.5 shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              </SectionCard>
              <SectionCard>
                <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-3">Content Needed</p>
                <ul className="space-y-2">
                  {stage.contentNeeded.map((c, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-foreground">
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
          </div>
        )
      ))}
    </div>
  );
}
