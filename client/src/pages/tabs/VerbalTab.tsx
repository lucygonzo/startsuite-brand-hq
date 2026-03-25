import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, SubTabNav } from "@/components/BrandUI";
import {
  AlertTriangle, CheckCircle2, Copy, Check, Info,
} from "lucide-react";
import { brandData } from "@/data/brandData";

export default function VerbalTab() {
  const [sub, setSub] = useState("voice");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const vb = brandData.verbalIdentity;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={vb.keyTakeaway} />

      <SubTabNav
        tabs={[
          { id: "voice", label: "Voice & Tone" },
          { id: "messaging", label: "Messaging Pillars" },
          { id: "copy", label: "Copy Blocks" },
          { id: "rules", label: "Language Rules" },
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
    </div>
  );
}
