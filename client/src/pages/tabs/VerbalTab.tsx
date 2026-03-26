import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, SubTabNav } from "@/components/BrandUI";
import {
  AlertTriangle, CheckCircle2, Copy, Check, Info, ShieldAlert, XCircle, ArrowRight, HelpCircle, Users, MessageSquare,
} from "lucide-react";
import { brandData } from "@/data/brandData";

const TIER_COLORS: Record<string, { bg: string; border: string; text: string; pill: string; pillActive: string }> = {
  Universal: { bg: "bg-purple-50", border: "border-purple-300", text: "text-purple-700", pill: "bg-muted text-muted-foreground hover:bg-purple-100", pillActive: "ss-gradient text-white shadow-md" },
  Startups: { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700", pill: "bg-muted text-muted-foreground hover:bg-blue-100", pillActive: "bg-blue-600 text-white shadow-md" },
  "Growth Companies": { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700", pill: "bg-muted text-muted-foreground hover:bg-emerald-100", pillActive: "bg-emerald-600 text-white shadow-md" },
  "Established Businesses": { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700", pill: "bg-muted text-muted-foreground hover:bg-amber-100", pillActive: "bg-amber-600 text-white shadow-md" },
  "Large Orgs / Enterprise": { bg: "bg-slate-50", border: "border-slate-400", text: "text-slate-700", pill: "bg-muted text-muted-foreground hover:bg-slate-200", pillActive: "bg-slate-700 text-white shadow-md" },
  "Investors & Accelerators": { bg: "bg-rose-50", border: "border-rose-300", text: "text-rose-700", pill: "bg-muted text-muted-foreground hover:bg-rose-100", pillActive: "bg-rose-600 text-white shadow-md" },
};

export default function VerbalTab() {
  const [sub, setSub] = useState("voice");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [activeTier, setActiveTier] = useState("Universal");
  const vb = brandData.verbalIdentity;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const selectedAudience = vb.audienceMessaging.find((a) => a.tier === activeTier) ?? vb.audienceMessaging[0];
  const tierColor = TIER_COLORS[activeTier] ?? TIER_COLORS.Universal;

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={vb.keyTakeaway} />

      <SubTabNav
        tabs={[
          { id: "voice", label: "Voice & Tone" },
          { id: "messaging", label: "Messaging Pillars" },
          { id: "audience", label: "Audience Messaging" },
          { id: "copy", label: "Copy Blocks" },
          { id: "rules", label: "Language Rules" },
          { id: "whatnot", label: "What NOT to Say" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {sub === "voice" && (
        <div className="space-y-5">
          {/* Taglines */}
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Core Taglines</h3>
            <div className="space-y-3">
              {[
                { label: "Primary Tagline", text: vb.taglines.primary },
                { label: "Hero Headline", text: vb.taglines.hero },
                { label: "Hero Sub-Copy", text: vb.taglines.sub },
                { label: "Footer Tagline", text: vb.taglines.footer },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-border hover:border-purple-300 transition-colors group">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{item.label}</p>
                    <button
                      onClick={() => handleCopy(item.text, i)}
                      className="text-xs text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                    >
                      {copiedIdx === i ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                      {copiedIdx === i ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p className="text-sm font-medium text-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Tone attributes */}
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Tone Attributes</h3>
            <div className="space-y-4">
              {vb.toneAttributes.map((attr, i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 bg-muted/30">
                    <div className="w-6 h-6 rounded-full ss-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">{i + 1}</div>
                    <p className="font-semibold text-sm text-foreground">{attr.attribute}</p>
                    <p className="text-xs text-muted-foreground">— {attr.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2 flex items-center gap-1">
                        <CheckCircle2 size={11} /> Do say
                      </p>
                      <p className="text-xs text-foreground leading-relaxed italic bg-green-50 border border-green-200 rounded-lg p-3">"{attr.doExample}"</p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-red-700 mb-2 flex items-center gap-1">
                        <AlertTriangle size={11} /> Don't say
                      </p>
                      <p className="text-xs text-foreground leading-relaxed italic bg-red-50 border border-red-200 rounded-lg p-3">"{attr.dontExample}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {sub === "messaging" && (
        <div className="space-y-4">
          {vb.messagingPillars.map((pillar, i) => (
            <SectionCard key={i} className="card-lift">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl ss-gradient flex items-center justify-center text-white font-display font-bold text-lg shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold text-foreground">{pillar.pillar}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{pillar.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {pillar.keyPhrases.map((phrase, j) => (
                      <Badge key={j} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200 cursor-pointer hover:bg-purple-100 transition-colors"
                        onClick={() => handleCopy(phrase, 100 + i * 10 + j)}>
                        {copiedIdx === 100 + i * 10 + j ? "Copied!" : phrase}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {/* ── AUDIENCE MESSAGING ─────────────────────────────────────────────────── */}
      {sub === "audience" && (
        <div className="space-y-5">
          {/* Intro callout */}
          <div className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50/40">
            <div className="flex items-start gap-3">
              <Users size={20} className="text-purple-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-purple-900 mb-1">One Voice, Five Dials</p>
                <p className="text-xs text-purple-800 leading-relaxed">StartSuite has one umbrella brand voice, but the messaging dials turn depending on the audience tier. Select a tier below to see how headline, tone, sample copy, and guardrails adapt.</p>
              </div>
            </div>
          </div>

          {/* Tier selector pills */}
          <div className="flex flex-wrap gap-2">
            {vb.audienceMessaging.map((a) => {
              const colors = TIER_COLORS[a.tier] ?? TIER_COLORS.Universal;
              const isActive = activeTier === a.tier;
              return (
                <button
                  key={a.tier}
                  onClick={() => setActiveTier(a.tier)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${isActive ? colors.pillActive : colors.pill}`}
                >
                  {a.tier}
                </button>
              );
            })}
          </div>

          {/* Headline + subline */}
          <SectionCard>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Headline</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">{selectedAudience.headline}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{selectedAudience.subline}</p>
          </SectionCard>

          {/* Tone guidance */}
          <div className={`p-4 rounded-xl border ${tierColor.border} ${tierColor.bg}`}>
            <div className="flex items-start gap-3">
              <MessageSquare size={16} className={`${tierColor.text} mt-0.5 shrink-0`} />
              <div>
                <p className={`text-xs font-semibold uppercase tracking-widest ${tierColor.text} mb-1`}>Tone Guidance</p>
                <p className="text-sm text-foreground leading-relaxed">{selectedAudience.tone}</p>
              </div>
            </div>
          </div>

          {/* Sample post — social card style */}
          <SectionCard className="card-lift">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full ss-gradient flex items-center justify-center text-white text-xs font-bold">SS</div>
                <div>
                  <p className="text-xs font-semibold text-foreground">StartSuite</p>
                  <p className="text-[10px] text-muted-foreground font-mono">LinkedIn &middot; Sample Post</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(selectedAudience.samplePost, 600)}
                className="text-xs text-purple-600 flex items-center gap-1 hover:text-purple-800 transition-colors"
              >
                {copiedIdx === 600 ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                {copiedIdx === 600 ? "Copied" : "Copy post"}
              </button>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{selectedAudience.samplePost}</p>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 font-mono">Tier: {selectedAudience.tier} &middot; Ready-to-post with minor personalization</p>
          </SectionCard>

          {/* What NOT to say — tier-specific */}
          <div>
            <h3 className="font-display text-base font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-600" />
              What NOT to Say to {selectedAudience.tier === "Universal" ? "Any Audience" : selectedAudience.tier}
            </h3>
            <div className="space-y-2">
              {selectedAudience.avoid.map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-300">
                  <XCircle size={13} className="text-amber-700 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick comparison — all tiers at a glance */}
          {activeTier === "Universal" && (
            <SectionCard>
              <h3 className="font-display text-base font-semibold mb-4">All Tiers at a Glance</h3>
              <div className="space-y-3">
                {vb.audienceMessaging.filter((a) => a.tier !== "Universal").map((a, i) => {
                  const c = TIER_COLORS[a.tier] ?? TIER_COLORS.Universal;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveTier(a.tier)}
                      className={`w-full text-left p-4 rounded-xl border ${c.border} ${c.bg} hover:shadow-sm transition-all`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-xs font-semibold uppercase tracking-widest ${c.text}`}>{a.tier}</p>
                        <ArrowRight size={14} className={c.text} />
                      </div>
                      <p className="text-sm font-semibold text-foreground">{a.headline}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{a.subline}</p>
                    </button>
                  );
                })}
              </div>
            </SectionCard>
          )}
        </div>
      )}

      {sub === "copy" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Pre-written copy blocks for different contexts. Click any block to copy.</p>
          {vb.copyBlocks.map((block, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-border hover:border-purple-300 transition-colors cursor-pointer group card-lift"
              onClick={() => handleCopy(block.text, 200 + i)}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{block.label}</p>
                <span className="text-xs text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  {copiedIdx === 200 + i ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                  {copiedIdx === 200 + i ? "Copied!" : "Click to copy"}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{block.text}</p>
            </div>
          ))}
        </div>
      )}

      {sub === "rules" && (
        <div className="space-y-5">
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Voice Don't List</h3>
            <div className="space-y-2">
              {vb.voiceDontList.map((rule, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                  <AlertTriangle size={13} className="text-red-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-red-900 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Naming Conventions</h3>
            <div className="space-y-2">
              {vb.namingConventions.map((rule, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg border border-border">
                  <Info size={13} className="text-purple-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-foreground leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {sub === "whatnot" && vb.whatNotToSay && (
        <div className="space-y-5">
          {/* Key takeaway for this section */}
          <div className="p-4 rounded-xl border-2 border-red-300 bg-red-50/50">
            <div className="flex items-start gap-3">
              <ShieldAlert size={20} className="text-red-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-900 mb-1">Post-Pivot Positioning Guardrails</p>
                <p className="text-xs text-red-800 leading-relaxed">{vb.whatNotToSay.keyTakeaway}</p>
              </div>
            </div>
          </div>

          {/* Tier-specific avoids cross-reference */}
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-3 flex items-center gap-2">
              <Users size={16} className="text-purple-600" />
              Audience-Specific Guardrails
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Each audience tier has its own avoid list. See the Audience Messaging tab for full context, or review the tier-specific rules below.</p>
            <div className="space-y-3">
              {vb.audienceMessaging.map((a, i) => (
                <div key={i} className="p-3 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-foreground mb-2">{a.tier}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {a.avoid.map((item, j) => (
                      <span key={j} className="text-[11px] px-2 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Anti-patterns */}
          {vb.whatNotToSay.antiPatterns.map((pattern, i) => (
            <SectionCard key={i}>
              <div className="flex items-center gap-2 mb-2">
                <XCircle size={16} className="text-red-500" />
                <h3 className="font-display text-base font-semibold text-foreground">{pattern.category}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{pattern.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2 flex items-center gap-1">
                    <CheckCircle2 size={11} /> Say this instead
                  </p>
                  <div className="space-y-1.5">
                    {pattern.doSay.map((phrase, j) => (
                      <p key={j} className="text-xs text-green-900 leading-relaxed">• {phrase}</p>
                    ))}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-700 mb-2 flex items-center gap-1">
                    <XCircle size={11} /> Never say
                  </p>
                  <div className="space-y-1.5">
                    {pattern.dontSay.map((phrase, j) => (
                      <p key={j} className="text-xs text-red-900 leading-relaxed line-through decoration-red-300">• {phrase}</p>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>
          ))}

          {/* Retired Language */}
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4 flex items-center gap-2">
              <ArrowRight size={16} className="text-amber-600" />
              Retired Pre-Pivot Language
            </h3>
            <div className="space-y-3">
              {vb.whatNotToSay.retiredLanguage.map((item, i) => (
                <div key={i} className="p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 line-through">{item.old}</span>
                    <ArrowRight size={12} className="text-muted-foreground" />
                    <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 font-medium">{item.new}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.reason}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Positioning Litmus Test */}
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4 flex items-center gap-2">
              <HelpCircle size={16} className="text-purple-600" />
              Positioning Litmus Test
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Run every piece of external communication through these 5 questions:</p>
            <div className="space-y-2">
              {vb.whatNotToSay.litmusTest.map((question, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-purple-200 bg-purple-50/50">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-bold shrink-0">{i + 1}</div>
                  <p className="text-xs text-purple-900 leading-relaxed">{question}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
