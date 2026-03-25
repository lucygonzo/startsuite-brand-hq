import { SectionCard, SectionHeader } from "@/components/BrandUI";
import { sectionCompletion } from "@/data/brandData";
import {
  ClipboardList, CheckCircle2, AlertTriangle, TrendingUp, Award,
} from "lucide-react";

function completionColor(pct: number) {
  if (pct >= 70) return { bar: "#22c55e", bg: "bg-green-50", text: "text-green-700", label: "Strong" };
  if (pct >= 40) return { bar: "#f59e0b", bg: "bg-amber-50", text: "text-amber-700", label: "In Progress" };
  return { bar: "#ef4444", bg: "bg-red-50", text: "text-red-700", label: "Needs Work" };
}

export default function ReportCardTab() {
  const totalSections = sectionCompletion.length;
  const avgCompletion = Math.round(sectionCompletion.reduce((s, c) => s + c.completion, 0) / totalSections);
  const avgColor = completionColor(avgCompletion);

  const strongSections = sectionCompletion.filter((s) => s.completion >= 70);
  const weakSections = sectionCompletion.filter((s) => s.completion < 50);

  return (
    <div className="space-y-6 tab-content-enter">
      {/* Overall Completion Banner */}
      <div className="rounded-xl p-6 bg-gradient-to-r from-purple-600 to-violet-500 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-200 mb-2">Overall Brand Completeness</p>
        <div className="flex items-end gap-4">
          <p className="font-display text-5xl font-bold">{avgCompletion}%</p>
          <div className="pb-2">
            <p className="text-sm text-purple-100">
              Across {totalSections} sections of the Brand HQ
            </p>
            <p className="text-xs text-purple-200 mt-1">
              {strongSections.length} sections are strong, {weakSections.length} still need work
            </p>
          </div>
        </div>
        <div className="h-3 rounded-full bg-white/20 mt-4">
          <div className="h-full rounded-full bg-white transition-all" style={{ width: `${avgCompletion}%` }} />
        </div>
      </div>

      {/* Section Progress Grid */}
      <SectionCard>
        <SectionHeader icon={<ClipboardList size={16} />} title="Section Progress" subtitle="Completion status for each Brand HQ section" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectionCompletion.map((s, i) => {
            const c = completionColor(s.completion);
            return (
              <div key={i} className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display text-sm font-semibold text-foreground">{s.section}</h4>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
                    {s.completion}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted mb-2">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${s.completion}%`, backgroundColor: c.bar }}
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.notes}</p>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Biggest Jumps */}
        <SectionCard>
          <SectionHeader icon={<Award size={16} />} title="Strongest Sections" subtitle="Sections at 70% or above" />
          {strongSections.length === 0 ? (
            <p className="text-xs text-muted-foreground">No sections at 70% or above yet.</p>
          ) : (
            <ul className="space-y-3">
              {strongSections.map((s, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-green-50/60 border border-green-100">
                  <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{s.section}</p>
                      <span className="text-xs font-bold text-green-700">{s.completion}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.notes}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        {/* Still Needs Work */}
        <SectionCard>
          <SectionHeader icon={<TrendingUp size={16} />} title="Still Needs Work" subtitle="Sections below 50% completion" />
          {weakSections.length === 0 ? (
            <p className="text-xs text-muted-foreground">All sections are above 50%!</p>
          ) : (
            <ul className="space-y-3">
              {weakSections.map((s, i) => {
                const c = completionColor(s.completion);
                return (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/60 border border-amber-100">
                    <AlertTriangle size={14} className={`shrink-0 mt-0.5 ${c.text}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{s.section}</p>
                        <span className={`text-xs font-bold ${c.text}`}>{s.completion}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.notes}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
