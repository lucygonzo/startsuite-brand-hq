import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, FieldRow, SectionHeader, SubTabNav } from "@/components/BrandUI";
import {
  Globe, DollarSign, Handshake, Shield, CheckSquare, Ban,
  Video, ArrowRight, Mic, Users, Calendar, Zap, Star,
  CheckCircle, AlertTriangle, Eye,
} from "lucide-react";
import { brandData } from "@/data/brandData";

/* ── platform colour map ──────────────────────────────────────────────── */
const platformStyle: Record<string, { bg: string; border: string; icon: string; accent: string; badge: string }> = {
  LinkedIn: {
    bg: "bg-blue-50/60",
    border: "border-blue-300",
    icon: "bg-[#0A66C2] text-white",
    accent: "text-blue-700",
    badge: "bg-blue-100 text-blue-800 border-blue-300",
  },
  YouTube: {
    bg: "bg-red-50/60",
    border: "border-red-300",
    icon: "bg-[#FF0000] text-white",
    accent: "text-red-700",
    badge: "bg-red-100 text-red-800 border-red-300",
  },
  Instagram: {
    bg: "bg-gradient-to-br from-pink-50/60 via-purple-50/60 to-orange-50/60",
    border: "border-pink-300",
    icon: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white",
    accent: "text-pink-700",
    badge: "bg-pink-100 text-pink-800 border-pink-300",
  },
  TikTok: {
    bg: "bg-neutral-50/60",
    border: "border-neutral-400",
    icon: "bg-neutral-900 text-white",
    accent: "text-neutral-700",
    badge: "bg-neutral-200 text-neutral-800 border-neutral-400",
  },
};

const fallbackStyle = {
  bg: "bg-muted/40",
  border: "border-border",
  icon: "ss-gradient text-white",
  accent: "text-foreground",
  badge: "bg-muted text-foreground border-border",
};

export default function DigitalTab() {
  const [sub, setSub] = useState("website");
  const d = brandData.digital;

  const priorityColor = (p: number) => {
    if (p === 1) return "bg-green-50 text-green-700 border-green-200";
    if (p === 2) return "bg-blue-50 text-blue-700 border-blue-200";
    if (p === 3) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

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
          { id: "rules", label: "Platform Rules" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {/* ── WEBSITE ────────────────────────────────────────────────────────── */}
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

      {/* ── SOCIAL ─────────────────────────────────────────────────────────── */}
      {sub === "social" && (
        <div className="space-y-4">
          {d.socialChannels.map((channel, i) => {
            const ps = platformStyle[channel.platform] ?? fallbackStyle;
            return (
              <SectionCard key={i} className="card-lift">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${ps.icon} flex items-center justify-center font-bold text-sm shrink-0`}>
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
            );
          })}
        </div>
      )}

      {/* ── CONTENT STRATEGY ───────────────────────────────────────────────── */}
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

          {/* Expert Insight Standard */}
          <SectionCard>
            <SectionHeader icon={<Star size={16} />} title="Expert Insight Standard" subtitle="Every piece of content must pass this test before publishing" />
            <div className="space-y-2">
              {d.expertInsightStandard.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  <CheckSquare size={14} className="text-purple-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Monthly Shoot Day Model */}
          <SectionCard>
            <SectionHeader icon={<Calendar size={16} />} title="Monthly Shoot Day Model" subtitle="The content production engine that fuels all channels" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* First Half */}
              <div className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={16} className="text-purple-600" />
                  <h4 className="font-display font-semibold text-sm text-purple-800">First Half: {d.shootDay.firstHalf.title}</h4>
                </div>
                <div className="space-y-2 text-xs text-foreground mb-3">
                  <FieldRow label="Participants" value={d.shootDay.firstHalf.participants} />
                  <FieldRow label="Style" value={d.shootDay.firstHalf.style} />
                  <FieldRow label="Purpose" value={d.shootDay.firstHalf.purpose} />
                </div>
                {"activities" in d.shootDay.firstHalf && (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-purple-600 mb-2">Activities</p>
                    <div className="space-y-1.5">
                      {(d.shootDay.firstHalf as { activities: string[] }).activities.map((a: string, j: number) => (
                        <div key={j} className="flex items-start gap-2 text-xs text-purple-900">
                          <CheckCircle size={11} className="text-purple-500 mt-0.5 shrink-0" />
                          <span>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Second Half */}
              <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <Mic size={16} className="text-blue-600" />
                  <h4 className="font-display font-semibold text-sm text-blue-800">Second Half: {d.shootDay.secondHalf.title}</h4>
                </div>
                <div className="space-y-2 text-xs text-foreground mb-3">
                  <FieldRow label="Participants" value={d.shootDay.secondHalf.participants} />
                  <FieldRow label="Style" value={d.shootDay.secondHalf.style} />
                  <FieldRow label="Purpose" value={d.shootDay.secondHalf.purpose} />
                </div>
                {"activities" in d.shootDay.secondHalf && (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-blue-600 mb-2">Activities</p>
                    <div className="space-y-1.5">
                      {(d.shootDay.secondHalf as { activities: string[] }).activities.map((a: string, j: number) => (
                        <div key={j} className="flex items-start gap-2 text-xs text-blue-900">
                          <CheckCircle size={11} className="text-blue-500 mt-0.5 shrink-0" />
                          <span>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Output model */}
            <div className="p-4 rounded-xl bg-green-50 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <Zap size={16} className="text-green-700 shrink-0" />
                <p className="font-display font-bold text-sm text-green-800">
                  {"outputCount" in d.shootDay ? (d.shootDay as { outputCount: string }).outputCount : "1 shoot day → 15-20 pieces of content"}
                </p>
              </div>
              <p className="text-xs text-green-700 leading-relaxed">{d.shootDay.output}</p>
            </div>
          </SectionCard>

          {/* Hub-and-Spoke Distribution */}
          <SectionCard>
            <SectionHeader icon={<Video size={16} />} title="Hub-and-Spoke Distribution" subtitle="One long-form piece becomes multi-platform assets" />
            <div className="flex flex-col items-center">
              {/* Hub */}
              <div className="px-6 py-3.5 rounded-2xl ss-gradient text-white font-display font-bold text-sm shadow-lg mb-2">
                {d.hubAndSpoke.hub}
              </div>
              <div className="w-px h-6 bg-purple-300" />
              {/* Spokes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {d.hubAndSpoke.spokes.map((spoke, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-purple-200 bg-purple-50/40">
                    <ArrowRight size={14} className="text-purple-500 shrink-0" />
                    <span className="text-xs text-foreground font-medium">{spoke}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── PAID MEDIA ─────────────────────────────────────────────────────── */}
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

      {/* ── PARTNERSHIPS ───────────────────────────────────────────────────── */}
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

      {/* ── PLATFORM RULES ─────────────────────────────────────────────────── */}
      {sub === "rules" && (
        <div className="space-y-5">
          {/* Per-platform Rules of Engagement */}
          {d.platformRules.map((pr, i) => {
            const ps = platformStyle[pr.platform] ?? fallbackStyle;
            return (
              <div key={i} className={`p-5 rounded-xl border-2 ${ps.border} ${ps.bg} card-lift`}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${ps.icon} flex items-center justify-center font-bold text-sm shrink-0`}>
                      {pr.platform[0]}
                    </div>
                    <div>
                      <h3 className={`font-display text-base font-semibold ${ps.accent}`}>{pr.platform}</h3>
                      <p className="text-xs text-muted-foreground">{pr.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className={`text-xs ${priorityColor(pr.priority)}`}>
                      {pr.priority === 0 ? "OFF" : `P${pr.priority}`}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${ps.badge}`}>{pr.cadence}</Badge>
                  </div>
                </div>

                {pr.rules.length > 0 && (
                  <div className="mb-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-green-700 mb-2">Rules of Engagement</p>
                    <div className="space-y-1.5">
                      {pr.rules.map((rule, j) => (
                        <div key={j} className="flex items-start gap-2 text-xs text-foreground">
                          <CheckSquare size={11} className="text-green-600 mt-0.5 shrink-0" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pr.formats.length > 0 && (
                  <div className="mb-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-blue-700 mb-2">Content Formats</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pr.formats.map((f, j) => (
                        <Badge key={j} variant="secondary" className={`text-xs ${ps.badge}`}>{f}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {pr.doNot.length > 0 && (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-red-700 mb-2">Do Not Post</p>
                    <div className="space-y-1.5">
                      {pr.doNot.map((item, j) => (
                        <div key={j} className="flex items-start gap-2 text-xs text-foreground">
                          <Ban size={11} className="text-red-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* ── Discretion Principle ───────────────────────────────────────── */}
          <div className="p-5 rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50">
            <div className="flex items-start gap-3 mb-3">
              <Shield size={20} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-base font-bold text-amber-900">The Discretion Principle</h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber-600 mt-0.5">Applies to ALL platforms</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-amber-100/60 border border-amber-200 mb-4">
              <p className="text-sm font-semibold text-amber-900 italic leading-relaxed">
                &ldquo;Not everything needs to be shared. If sharing it serves StartSuite more than it serves the audience, don&rsquo;t share it.&rdquo;
              </p>
            </div>
            <div className="space-y-2">
              {d.discretionPrinciple.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-amber-900">
                  <AlertTriangle size={12} className="text-amber-600 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Content Quality Gate ───────────────────────────────────────── */}
          <SectionCard>
            <SectionHeader icon={<Eye size={16} />} title="Content Quality Gate" subtitle="5-question checklist — every piece of content must pass before publishing" />
            <div className="space-y-3">
              {d.qualityGate.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-green-50/30">
                  <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    <CheckCircle size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.question}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ── Monthly Shoot Day (compact repeat for rules context) ──────── */}
          <SectionCard>
            <SectionHeader icon={<Video size={16} />} title="Monthly Shoot Day Model" subtitle="The content production engine" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={16} className="text-purple-600" />
                  <h4 className="font-display font-semibold text-sm text-purple-800">First Half: {d.shootDay.firstHalf.title}</h4>
                </div>
                <div className="space-y-2 text-xs text-foreground">
                  <FieldRow label="Participants" value={d.shootDay.firstHalf.participants} />
                  <FieldRow label="Style" value={d.shootDay.firstHalf.style} />
                  <FieldRow label="Purpose" value={d.shootDay.firstHalf.purpose} />
                </div>
              </div>
              <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <Mic size={16} className="text-blue-600" />
                  <h4 className="font-display font-semibold text-sm text-blue-800">Second Half: {d.shootDay.secondHalf.title}</h4>
                </div>
                <div className="space-y-2 text-xs text-foreground">
                  <FieldRow label="Participants" value={d.shootDay.secondHalf.participants} />
                  <FieldRow label="Style" value={d.shootDay.secondHalf.style} />
                  <FieldRow label="Purpose" value={d.shootDay.secondHalf.purpose} />
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-start gap-2">
                <Zap size={14} className="text-green-700 mt-0.5 shrink-0" />
                <p className="text-xs text-green-800 leading-relaxed">{d.shootDay.output}</p>
              </div>
            </div>
          </SectionCard>

          {/* ── Hub-and-Spoke Distribution ────────────────────────────────── */}
          <SectionCard>
            <SectionHeader icon={<Video size={16} />} title="Hub-and-Spoke Distribution" subtitle="Long-form content becomes multi-platform assets" />
            <div className="flex flex-col items-center">
              <div className="px-6 py-3.5 rounded-2xl ss-gradient text-white font-display font-bold text-sm shadow-lg mb-2">
                {d.hubAndSpoke.hub}
              </div>
              <div className="w-px h-6 bg-purple-300" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {d.hubAndSpoke.spokes.map((spoke, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-purple-200 bg-purple-50/40">
                    <ArrowRight size={14} className="text-purple-500 shrink-0" />
                    <span className="text-xs text-foreground font-medium">{spoke}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
