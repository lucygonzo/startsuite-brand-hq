import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionCard, KeyTakeaway, FieldRow, SectionHeader, SubTabNav, CopyButton } from "@/components/BrandUI";
import {
  MessageSquare, Layers, Copy, Check, Info, ExternalLink,
} from "lucide-react";
import { brandData, LOGO_URLS } from "@/data/brandData";

export default function VisualTab() {
  const [sub, setSub] = useState("logo");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const v = brandData.visualIdentity;

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={v.keyTakeaway} />

      <SubTabNav
        tabs={[
          { id: "logo", label: "Logo" },
          { id: "colors", label: "Color Palette" },
          { id: "typography", label: "Typography" },
          { id: "principles", label: "Design Principles" },
        ]}
        active={sub}
        onChange={setSub}
      />

      {sub === "logo" && (
        <div className="space-y-5">
          {/* Logo variants grid */}
          <SectionCard>
            <SectionHeader icon={<Layers size={16} />} title="Logo Variants" subtitle="All approved logo files and usage contexts" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {v.logo.variants.map((variant, i) => (
                <div key={i} className={`rounded-xl border border-border overflow-hidden`}>
                  <div className={`p-8 flex items-center justify-center ${variant.background.includes("Dark") ? "bg-[#070322]" : "bg-white"}`}>
                    <img
                      src={variant.url}
                      alt={variant.name}
                      className="max-h-20 object-contain"
                    />
                  </div>
                  <div className="p-4 border-t border-border bg-card">
                    <p className="text-sm font-semibold text-foreground">{variant.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{variant.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">{variant.background}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Icon anatomy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SectionCard>
              <h3 className="font-display text-base font-semibold mb-4">Icon Anatomy</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-xl ss-gradient flex items-center justify-center shrink-0">
                  <img src={LOGO_URLS.stackedDark} alt="StartSuite Icon" className="w-14 h-14 object-contain" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{v.logo.icon.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{v.logo.icon.symbolism}</p>
                </div>
              </div>
              <FieldRow label="Gradient" value={v.logo.icon.gradient} />
            </SectionCard>
            <SectionCard>
              <h3 className="font-display text-base font-semibold mb-4">Wordmark</h3>
              <FieldRow label="Font Family" value={v.logo.wordmark.font} />
              <FieldRow label="Weight" value={v.logo.wordmark.weight} />
              <FieldRow label="Color (Light BG)" value={v.logo.wordmark.color.split(";")[0]} />
              <FieldRow label="Color (Dark BG)" value={v.logo.wordmark.color.split(";")[1]?.trim() || "White (#FFFFFF)"} />
              <FieldRow label="Style" value={v.logo.wordmark.style} />
            </SectionCard>
          </div>

          {/* Usage guidelines */}
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Usage Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {v.logo.usageGuidelines.map((g, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg border border-border">
                  <Info size={13} className="text-purple-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-foreground leading-relaxed">{g}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {sub === "colors" && (
        <div className="space-y-5">
          {/* Primary colors */}
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Primary Brand Colors</h3>
            <p className="text-xs text-muted-foreground mb-4">From the original designer (Eric Andreae). These are the canonical StartSuite colors.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {v.colorPalette.primary.map((color, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border card-lift">
                  <button
                    onClick={() => handleCopyColor(color.hex)}
                    className="w-16 h-16 rounded-xl shrink-0 shadow-sm border border-border/50 relative group"
                    style={{ backgroundColor: color.hex }}
                    title={`Click to copy ${color.hex}`}
                  >
                    <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      {copiedColor === color.hex ? (
                        <Check size={16} className="text-white" />
                      ) : (
                        <Copy size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">{color.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs font-mono text-muted-foreground">{color.hex}</code>
                      <CopyButton text={color.hex} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{color.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Secondary colors */}
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Secondary / UI Colors</h3>
            <p className="text-xs text-muted-foreground mb-4">Extended palette for UI applications, dark mode surfaces, and subtle accents.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {v.colorPalette.secondary.map((color, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border card-lift">
                  <button
                    onClick={() => handleCopyColor(color.hex)}
                    className="w-16 h-16 rounded-xl shrink-0 shadow-sm border border-border/50 relative group"
                    style={{ backgroundColor: color.hex }}
                    title={`Click to copy ${color.hex}`}
                  >
                    <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      {copiedColor === color.hex ? (
                        <Check size={16} className={color.hex === "#EDEBF4" || color.hex === "#D4BEE8" ? "text-gray-600" : "text-white"} />
                      ) : (
                        <Copy size={14} className={`${color.hex === "#EDEBF4" || color.hex === "#D4BEE8" ? "text-gray-600" : "text-white"} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      )}
                    </div>
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">{color.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs font-mono text-muted-foreground">{color.hex}</code>
                      <CopyButton text={color.hex} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{color.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Gradients */}
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Gradients</h3>
            <div className="space-y-4">
              {v.colorPalette.gradients.map((g, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border">
                  <div
                    className="w-24 h-14 rounded-xl shrink-0 shadow-sm"
                    style={{ background: g.value }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">{g.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs font-mono text-muted-foreground truncate">{g.value}</code>
                      <CopyButton text={g.value} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{g.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Color usage rules */}
          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Color Usage Rules</h3>
            <div className="space-y-2">
              {v.colorPalette.colorUsageRules.map((rule, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border">
                  <span className="w-5 h-5 rounded-full ss-gradient flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-xs text-foreground leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {sub === "typography" && (
        <div className="space-y-5">
          <SectionCard>
            <SectionHeader icon={<MessageSquare size={16} />} title="Primary Typeface" subtitle="Plus Jakarta Sans — the only approved typeface" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-5">
              <div>
                <FieldRow label="Font Family" value={v.typography.primary.fontFamily} />
                <FieldRow label="Source" value="Google Fonts" />
                <FieldRow label="Characteristics" value={v.typography.primary.characteristics} />
                <FieldRow label="Usage" value={v.typography.primary.usage} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Approved Weights</p>
                <div className="space-y-2">
                  {v.typography.primary.weights.map((w, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg border border-border">
                      <span className="text-base text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: [400, 500, 600, 700, 800][i] }}>
                        Aa
                      </span>
                      <span className="text-xs text-muted-foreground">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <a href={v.typography.primary.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-purple-600 hover:underline">
              <ExternalLink size={13} />
              View on Google Fonts
            </a>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Type Hierarchy</h3>
            <div className="space-y-3">
              {v.typography.hierarchy.map((level, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg border border-border">
                  <div className="w-28 shrink-0">
                    <p className="text-xs font-semibold text-foreground">{level.level}</p>
                    <p className="text-xs text-muted-foreground">{level.size}</p>
                    <p className="text-xs text-muted-foreground">{level.weight}</p>
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-foreground leading-tight"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: i === 0 ? "28px" : i === 1 ? "22px" : i === 2 ? "18px" : i === 3 ? "15px" : i === 4 ? "14px" : "13px",
                        fontWeight: i <= 1 ? 700 : i <= 3 ? 600 : 400,
                      }}
                    >
                      StartSuite
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{level.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="font-display text-base font-semibold mb-4">Typography Rules</h3>
            <div className="space-y-2">
              {v.typography.rules.map((rule, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg border border-border">
                  <Info size={13} className="text-purple-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-foreground leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {sub === "principles" && (
        <div className="space-y-4">
          {v.designPrinciples.map((p, i) => (
            <SectionCard key={i} className="card-lift">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl ss-gradient flex items-center justify-center text-white font-display font-bold text-lg shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">{p.principle}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.description}</p>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
