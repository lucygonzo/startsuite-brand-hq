import { useState } from "react";
import { KeyTakeaway, SectionCard } from "@/components/BrandUI";
import { brandData } from "@/data/brandData";

export default function PortfolioTab() {
  const [activeFilter, setActiveFilter] = useState("All");
  const p = brandData.portfolio;
  const filtered = activeFilter === "All"
    ? p.clients
    : p.clients.filter(c => c.services.includes(activeFilter));

  return (
    <div className="space-y-8">
      <KeyTakeaway text={p.keyTakeaway} />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {p.stats.map((s, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 text-center shadow-sm">
            <div className="text-2xl font-bold" style={{ background: "linear-gradient(135deg, #6607E1, #BC98FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2">
        {p.filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
              activeFilter === f
                ? "text-white border-transparent"
                : "bg-transparent border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
            style={activeFilter === f ? { background: "linear-gradient(135deg, #6607E1, #BC98FF)", border: "none" } : {}}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((client, i) => (
          <div key={i} className="rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col">
            {/* Color bar */}
            <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${client.accentColor}, #BC98FF)` }} />
            <div className="p-5 flex flex-col flex-1 gap-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-foreground text-base">{client.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{client.category} &middot; {client.stage}</p>
                </div>
                {client.placeholder && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border shrink-0">Placeholder</span>
                )}
              </div>

              {/* Headline */}
              <p className="text-sm text-foreground font-medium leading-snug">{client.headline}</p>

              {/* Services */}
              <div className="flex flex-wrap gap-1.5">
                {client.services.map((svc, j) => (
                  <span key={j} className="text-[11px] px-2 py-0.5 rounded-full border border-border text-muted-foreground bg-muted/50">{svc}</span>
                ))}
              </div>

              {/* Challenge / Outcome */}
              <div className="space-y-2 text-sm flex-1">
                {client.challenge && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Challenge</span>
                    <p className="text-muted-foreground mt-0.5 leading-relaxed">{client.challenge}</p>
                  </div>
                )}
                {client.outcome && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Outcome</span>
                    <p className="text-foreground mt-0.5 leading-relaxed">{client.outcome}</p>
                  </div>
                )}
              </div>

              {/* Result badge */}
              {client.result.label && (
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{client.result.label}</span>
                  <span className="text-sm font-semibold" style={{ color: client.accentColor === "#070322" ? "#6607E1" : client.accentColor }}>{client.result.value}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Note */}
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-5 text-center">
        <p className="text-sm text-muted-foreground">{p.caseStudyNote}</p>
      </div>
    </div>
  );
}
