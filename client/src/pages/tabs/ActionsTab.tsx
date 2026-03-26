import { useState } from "react";
import { SectionCard, SectionHeader, SubTabNav, KeyTakeaway } from "@/components/BrandUI";
import { brandData, actionPhases } from "@/data/brandData";
import { Rocket, ChevronDown, ChevronRight, Check } from "lucide-react";

const urgencyColors: Record<string, string> = {
  High: "bg-red-50 text-red-700 border border-red-200",
  Medium: "bg-amber-50 text-amber-700 border border-amber-200",
  Low: "bg-green-50 text-green-700 border border-green-200",
};

const priorityColors: Record<string, string> = {
  High: "bg-red-100 text-red-800 border-red-300",
  Medium: "bg-amber-100 text-amber-800 border-amber-300",
  Low: "bg-green-100 text-green-800 border-green-300",
};

export default function ActionsTab() {
  const [sub, setSub] = useState("plan");
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [stepStatus, setStepStatus] = useState<Record<string, string>>({});

  const w = brandData.workspace;

  const cycleStatus = (phaseIdx: number, stepIdx: number) => {
    const key = `${phaseIdx}-${stepIdx}`;
    setStepStatus((prev) => {
      const current = prev[key] || actionPhases[phaseIdx].steps[stepIdx].status;
      const next =
        current === "Not Started"
          ? "In Progress"
          : current === "In Progress"
            ? "Complete"
            : "Not Started";
      return { ...prev, [key]: next };
    });
  };

  const getStatus = (phaseIdx: number, stepIdx: number) => {
    const key = `${phaseIdx}-${stepIdx}`;
    return stepStatus[key] || actionPhases[phaseIdx].steps[stepIdx].status;
  };

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={w.keyTakeaway} />

      <SectionHeader
        icon={<Rocket size={18} />}
        title="Actions & Strategy"
        subtitle="Strategic execution plan, phase tracking, and open questions"
      />

      <SubTabNav
        tabs={[
          { id: "plan", label: "Strategic Plan" },
          { id: "questions", label: "Open Questions" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {sub === "plan" && (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Click a phase to expand. Click the status indicator on any step to cycle: Not Started → In Progress → Complete
          </p>

          {actionPhases.map((phase, phaseIdx) => {
            const isExpanded = expandedPhase === phaseIdx;
            const completedSteps = phase.steps.filter(
              (_, stepIdx) => getStatus(phaseIdx, stepIdx) === "Complete"
            ).length;
            const totalSteps = phase.steps.length;

            return (
              <SectionCard key={phaseIdx}>
                {/* Phase header — clickable */}
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : phaseIdx)}
                  className="w-full flex items-center justify-between gap-3 cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="text-muted-foreground shrink-0">
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate">{phase.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {phase.timeline} · {completedSteps}/{totalSteps} steps complete
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${urgencyColors[phase.urgency]}`}
                  >
                    {phase.urgency}
                  </span>
                </button>

                {/* Expanded steps */}
                {isExpanded && (
                  <div className="mt-4 space-y-2 pl-7">
                    {phase.steps.map((s, stepIdx) => {
                      const status = getStatus(phaseIdx, stepIdx);
                      const isComplete = status === "Complete";
                      const isInProgress = status === "In Progress";

                      return (
                        <div
                          key={stepIdx}
                          className="flex items-start gap-3 group"
                        >
                          {/* Clickable status indicator */}
                          <button
                            onClick={() => cycleStatus(phaseIdx, stepIdx)}
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-colors ${
                              isComplete
                                ? "bg-green-100 border-green-500"
                                : isInProgress
                                  ? "bg-purple-100 border-purple-500"
                                  : "bg-muted border-border"
                            }`}
                            title={`Status: ${status} (click to cycle)`}
                          >
                            {isComplete && <Check size={12} className="text-green-600" />}
                            {isInProgress && (
                              <div className="w-2 h-2 rounded-full bg-purple-500" />
                            )}
                          </button>

                          {/* Step content */}
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm ${
                                isComplete
                                  ? "line-through text-green-600"
                                  : isInProgress
                                    ? "text-purple-700 font-medium"
                                    : "text-foreground"
                              }`}
                            >
                              {s.step}
                            </p>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className="text-xs text-muted-foreground">
                                Owner: <span className="font-medium text-foreground">{s.owner}</span>
                              </span>
                              <span
                                className={`text-[11px] font-medium ${
                                  isComplete
                                    ? "text-green-600"
                                    : isInProgress
                                      ? "text-purple-600"
                                      : "text-muted-foreground"
                                }`}
                              >
                                {status}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </SectionCard>
            );
          })}
        </div>
      )}

      {sub === "questions" && (
        <div className="space-y-4">
          {w.openQuestions.map((q, i) => (
            <SectionCard key={i} className="card-lift">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <span className="text-amber-700 text-sm font-bold">?</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{q.question}</p>
                </div>
                <span
                  className={`shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    priorityColors[q.priority] || "bg-muted text-muted-foreground"
                  }`}
                >
                  {q.priority}
                </span>
              </div>
              <div className="ml-10 space-y-1">
                <p className="text-xs text-muted-foreground">
                  Owner: <span className="font-medium text-foreground">{q.owner}</span>
                </p>
                {q.notes && (
                  <p className="text-xs text-muted-foreground italic">{q.notes}</p>
                )}
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
