import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, FieldRow, SectionHeader, SubTabNav } from "@/components/BrandUI";
import {
  Globe, DollarSign, Handshake,
} from "lucide-react";
import { brandData } from "@/data/brandData";

export default function DigitalTab() {
  const [sub, setSub] = useState("website");
  const d = brandData.digital;

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={d.keyTakeaway} />

      <SubTabNav
        tabs={[
          { id: "website", label: "Website" },
          { id: "social", label: "Social" },
          { id: "content", label: "Content Strategy" },
          { id: "paid", label: "Paid Media" },
          { id: "partnerships", label: "Partnerships" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {sub === "website" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<Globe size={16} />} title="Website Overview" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div>
                <FieldRow label="URL" value={d.website.url} />
                <FieldRow label="Primary CTA" value={d.website.primaryCTA} />
                <FieldRow label="Tech Stack" value={d.website.techStack} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Secondary CTAs</p>
                <div className="flex flex-wrap gap-1.5">
                  {d.website.secondaryCTAs.map((cta, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{cta}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Site Structure</h3>
            <div className="space-y-2">
              {d.website.structure.map((page, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <code className="text-xs font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{page.split(" ")[0]}</code>
                  <p className="text-xs text-muted-foreground">{page.split(" ").slice(1).join(" ")}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {sub === "social" && (
        <div className="space-y-4">
          {d.socialChannels.map((channel, i) => (
            <SectionCard key={i} className="card-lift">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl ss-gradient flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {channel.platform[0]}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">{channel.platform}</p>
                    <p className="text-xs text-muted-foreground">{channel.url}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">{channel.status}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldRow label="Content Focus" value={channel.contentFocus} />
                <FieldRow label="Frequency" value={channel.frequency} />
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {sub === "content" && (
        <div className="space-y-5">
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Content Pillars</h3>
            <div className="space-y-3">
              {d.contentStrategy.pillars.map((pillar, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  <div className="w-6 h-6 rounded-full ss-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">{i + 1}</div>
                  <p className="text-sm text-foreground">{pillar}</p>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Content Formats</h3>
            <div className="flex flex-wrap gap-2">
              {d.contentStrategy.formats.map((format, i) => (
                <Badge key={i} variant="secondary" className="text-sm bg-purple-50 text-purple-700 border-purple-200">{format}</Badge>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {sub === "paid" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<DollarSign size={16} />} title="Paid Media Strategy" subtitle={d.paidMedia.keyTakeaway} />
          </SectionCard>
          {d.paidMedia.channels.map((ch, i) => (
            <SectionCard key={i} className="card-lift">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">{ch.channel}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{ch.objective}</p>
                </div>
                <Badge variant="outline" className={`text-xs shrink-0 ${
                  ch.status === "Phase 1" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                }`}>{ch.status}</Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Targeting</p>
                  <p className="text-xs text-foreground leading-relaxed">{ch.targeting}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Formats</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ch.formats.map((f, j) => (
                      <Badge key={j} variant="outline" className="text-xs">{f}</Badge>
                    ))}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <p className="text-xs text-foreground leading-relaxed">{ch.notes}</p>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {sub === "partnerships" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<Handshake size={16} />} title="Partnership Strategy" subtitle={d.partnerships.keyTakeaway} />
          </SectionCard>
          {d.partnerships.tiers.map((tier, i) => (
            <SectionCard key={i} className="card-lift">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-display text-base font-semibold text-foreground">{tier.tier}</h3>
                <Badge variant="outline" className={`text-xs shrink-0 ${
                  tier.status === "Active" ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200"
                }`}>{tier.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{tier.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {tier.examples.map((ex, j) => (
                  <Badge key={j} variant="outline" className="text-xs">{ex}</Badge>
                ))}
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
