import { useState } from "react";
import { SectionCard, KeyTakeaway, SectionHeader, SubTabNav } from "@/components/BrandUI";
import {
  Fingerprint, MessageSquare, Layers, AlertTriangle, Target,
  Star, Search, Brain, Radar,
} from "lucide-react";
import { brandData } from "@/data/brandData";

export default function IdentityTab() {
  const [sub, setSub] = useState("core");
  const id = brandData.identity;

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={id.keyTakeaway} />

      <SubTabNav
        tabs={[
          { id: "core", label: "Core Identity" },
          { id: "perception", label: "Audience Perception" },
          { id: "personality", label: "Brand Personality" },
          { id: "gaps", label: "Messaging Gaps" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {sub === "core" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<Fingerprint size={16} />} title="Tagline" />
            <div className="p-5 rounded-xl ss-gradient text-white text-center">
              <p className="font-display text-2xl font-bold tracking-tight">{id.tagline}</p>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeader icon={<Star size={16} />} title="Brand Characteristics" subtitle="The defining attributes of the StartSuite brand" />
            <div className="flex flex-wrap gap-2">
              {id.characteristics.map((c, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-sm font-medium bg-purple-50 text-purple-800 border border-purple-200">{c}</span>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeader icon={<MessageSquare size={16} />} title="Approved Key Phrases" subtitle="Use these verbatim in all brand communications" />
            <div className="space-y-2">
              {id.keyPhrases.map((phrase, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-purple-300 transition-colors">
                  <div className="w-5 h-5 rounded-full ss-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">{i + 1}</div>
                  <p className="text-sm font-medium text-foreground italic">"{phrase}"</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeader icon={<Layers size={16} />} title="Messaging Hierarchy" subtitle="The order in which StartSuite communicates its value" />
            <div className="space-y-3">
              {id.messagingHierarchy.map((msg, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg ss-gradient flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                  <div className="flex-1 p-3 rounded-xl border border-border">
                    <p className="text-sm text-foreground leading-relaxed">{msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeader icon={<Target size={16} />} title="Competitive Positioning Statement" />
            <blockquote className="border-l-4 border-purple-500 pl-5 py-2">
              <p className="text-sm text-foreground leading-relaxed italic">{id.competitivePositioningStatement}</p>
            </blockquote>
          </SectionCard>
        </div>
      )}

      {sub === "perception" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<Radar size={16} />} title="First Impression" subtitle="What prospects across all 5 tiers experience in the first 10 seconds on start-suite.com" />
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
              <p className="text-sm text-foreground leading-relaxed">{id.audiencePerception.firstImpression}</p>
            </div>
          </SectionCard>
          <SectionCard>
            <SectionHeader icon={<Search size={16} />} title="Key Questions Across Audience Tiers" subtitle="What prospects from Day-Ones to Flagships are asking that the brand needs to answer" />
            <div className="space-y-2">
              {id.audiencePerception.keyQuestions.map((q, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <span className="text-amber-700 text-xs font-bold">?</span>
                  </div>
                  <p className="text-sm text-foreground">{q}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {sub === "personality" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<Brain size={16} />} title={`Brand Archetype: ${id.brandPersonality.archetype}`} />
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{id.brandPersonality.archetypeDescription}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-3">If StartSuite Were a Person</p>
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                  <p className="text-sm text-foreground leading-relaxed">{id.brandPersonality.ifBrandWereAPerson}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-700 mb-3">StartSuite Is NOT Like</p>
                <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                  <p className="text-sm text-foreground leading-relaxed">{id.brandPersonality.notLike}</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {sub === "gaps" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<AlertTriangle size={16} />} title="Messaging Gaps" subtitle="Current gaps in the StartSuite brand narrative that need to be addressed" />
            <div className="space-y-3">
              {id.messagingGaps.map((gap, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50">
                  <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground leading-relaxed">{gap}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
