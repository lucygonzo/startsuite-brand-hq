import { useState } from "react";
import { SectionCard, SectionHeader, SubTabNav, KeyTakeaway } from "@/components/BrandUI";
import { confirmedDecisions, pendingDecisions } from "@/data/brandData";
import { BookOpen } from "lucide-react";

const statusBadge: Record<string, string> = {
  "Needs Recommendation": "bg-amber-50 text-amber-700 border border-amber-200",
  "Discovery Complete": "bg-blue-50 text-blue-700 border border-blue-200",
  "To Discuss": "bg-red-50 text-red-700 border border-red-200",
  "Needs Research": "bg-amber-50 text-amber-700 border border-amber-200",
  "Needs Outreach": "bg-amber-50 text-amber-700 border border-amber-200",
  "Needs Design": "bg-amber-50 text-amber-700 border border-amber-200",
  "Needs Legal Review": "bg-red-50 text-red-700 border border-red-200",
};

export default function DecisionLogTab() {
  const [sub, setSub] = useState("confirmed");

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text="Every strategic decision is logged with context, rationale, and ownership. This is the audit trail that ensures the brand evolves with intention, not drift." />

      <SectionHeader
        icon={<BookOpen size={18} />}
        title="Decision Log"
        subtitle="Strategic decisions — confirmed and pending — with rationale and ownership"
      />

      <SubTabNav
        tabs={[
          { id: "confirmed", label: "Confirmed" },
          { id: "pending", label: "Pending" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {sub === "confirmed" && (
        <div className="space-y-4">
          {confirmedDecisions.map((d) => (
            <SectionCard key={d.id}>
              <div className="border-l-4 border-green-500 pl-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="text-sm font-semibold text-foreground">{d.title}</h4>
                  <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                    Confirmed
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{d.context}</p>

                <div className="bg-muted/50 border border-border rounded-lg px-4 py-3 mb-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Rationale</p>
                  <p className="text-sm text-foreground/80 italic">{d.rationale}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Owner: <span className="font-medium text-foreground">{d.owner}</span></span>
                  <span>{d.date}</span>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {sub === "pending" && (
        <div className="space-y-4">
          {pendingDecisions.map((d) => (
            <SectionCard key={d.id}>
              <div className="border-l-4 border-amber-500 pl-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="text-sm font-semibold text-foreground">{d.title}</h4>
                  <span
                    className={`shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      statusBadge[d.status] || "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {d.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{d.context}</p>

                <div className="space-y-2 mb-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Options</p>
                  {d.options.map((opt, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 bg-muted/40 border border-border rounded-lg px-3 py-2"
                    >
                      <span className="text-xs font-bold text-purple-600 mt-px">{i + 1}.</span>
                      <p className="text-sm text-foreground/80">{opt}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">
                  Owner: <span className="font-medium text-foreground">{d.owner}</span>
                </p>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
