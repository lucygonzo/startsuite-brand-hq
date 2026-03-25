import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, FieldRow, SectionHeader, SubTabNav } from "@/components/BrandUI";
import {
  Building2, Briefcase, ChevronRight, ExternalLink, ArrowRight,
} from "lucide-react";
import { brandData } from "@/data/brandData";

export default function CompanyTab() {
  const [sub, setSub] = useState("info");
  const c = brandData.company;

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text="StartSuite is a creative operating system built by Reagan Renfroe, backed by 46Capital, with Lucy Gonzalez as strategic partner and Sarah providing operations and community perspective. The team is small, senior-led, AI-accelerated, and built for the startup ecosystem." />

      <SubTabNav
        tabs={[{ id: "info", label: "Company Info" }, { id: "team", label: "Team" }, { id: "backer", label: "Backer — 46Capital" }]}
        active={sub}
        onChange={setSub}
      />

      {sub === "info" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<Building2 size={16} />} title="Company Overview" subtitle="Legal structure, locations, and operational focus" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Legal & Structure</p>
                <FieldRow label="Legal Name" value={c.legalName} />
                <FieldRow label="Operating Name" value={c.operatingName} />
                <FieldRow label="Founded" value={c.founded} />
                <FieldRow label="Type" value={c.type} />
                <FieldRow label="Industry" value={c.industry} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Scale & Reach</p>
                <FieldRow label="Team" value={c.employees} />
                <FieldRow label="Primary Location" value={c.primaryLocation} />
                <FieldRow label="Secondary" value={c.secondaryLocation} />
                <FieldRow label="Website" value={c.website} />
              </div>
            </div>
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-xs text-purple-800 leading-relaxed"><span className="font-semibold">Note:</span> {c.notes}</p>
            </div>
          </SectionCard>
          <SectionCard>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Online Presence</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a href={`https://${c.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-purple-300 transition-colors">
                <ExternalLink size={16} className="text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Website</p>
                  <p className="text-xs text-muted-foreground">{c.website}</p>
                </div>
                <ArrowRight size={14} className="text-muted-foreground ml-auto" />
              </a>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <ExternalLink size={16} className="text-purple-600" />
                <div>
                  <p className="text-sm font-medium">LinkedIn</p>
                  <p className="text-xs text-muted-foreground">{c.linkedin}</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {sub === "team" && (
        <div className="space-y-4">
          {c.teamHighlights.map((member, i) => (
            <SectionCard key={i}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl ss-gradient flex items-center justify-center text-white font-display font-bold text-xl shrink-0">
                  {member.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-display font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.title}</p>
                    </div>
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-xs text-purple-600 hover:underline shrink-0">{member.email}</a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{member.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Expertise</p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.expertise.map((e, j) => (
                          <Badge key={j} variant="secondary" className="text-xs bg-purple-50 text-purple-700 border-purple-200">{e}</Badge>
                        ))}
                      </div>
                    </div>
                    {member.previousRoles.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Previous Roles</p>
                        <ul className="space-y-1">
                          {member.previousRoles.map((r, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-foreground">
                              <ChevronRight size={12} className="text-muted-foreground mt-0.5 shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {sub === "backer" && (
        <SectionCard>
          <SectionHeader icon={<Briefcase size={16} />} title="46Capital" subtitle="Venture Capital Backer & Strategic Partner" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-5">
            <div>
              <FieldRow label="Name" value={c.backer.name} />
              <FieldRow label="Type" value={c.backer.type} />
              <FieldRow label="Location" value={c.backer.location} />
              <FieldRow label="Website" value={c.backer.website} />
            </div>
            <div className="flex flex-col justify-center">
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">Why This Matters</p>
                <p className="text-sm text-foreground leading-relaxed">{c.backer.description}</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/30">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Investor Perspective Advantage</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The 46Capital relationship gives StartSuite a unique lens that most creative partners lack — an understanding of what investors look for in a brand, pitch deck, and narrative. This is built into every StartSuite engagement, not offered as an add-on.
            </p>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
