/*
 * DESIGN PHILOSOPHY: Clean-Room Modernism — "The Brand Studio"
 * Sora for display headings, DM Sans for body copy.
 * White cards on violet-tinted gray background.
 * StartSuite gradient (#6607E1 → #BC98FF) as precision punctuation.
 * Tabs: Overview | Company | Visual | Verbal | Services | Audience | Competitive | Digital
 */

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  TrendingUp, Building2, Palette, MessageSquare, Globe, Users, Briefcase, Target,
  ChevronRight, AlertTriangle, CheckCircle2, Copy, Check, ExternalLink, Lightbulb,
  Layers, BarChart3, Zap, ArrowRight, Info
} from "lucide-react";
import { brandData, LOGO_URLS } from "@/data/brandData";

// ── Shared UI Primitives ──────────────────────────────────────────────────────

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card rounded-xl border border-border p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function KeyTakeaway({ text }: { text: string }) {
  return (
    <div className="flex gap-3 p-5 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 mb-6">
      <Lightbulb size={18} className="text-purple-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-1">Key Takeaway</p>
        <p className="text-sm text-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 border-b border-border last:border-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="w-8 h-8 rounded-lg ss-gradient flex items-center justify-center text-white shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function SubTabNav({ tabs, active, onChange }: { tabs: { id: string; label: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex gap-1 border-b border-border flex-wrap mb-6">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
            active === t.id
              ? "border-purple-600 text-purple-700"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-purple-600 transition-colors"
    >
      {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ── Tab: Overview ─────────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={brandData.keyTakeaway} />

      {/* Executive Summary */}
      <SectionCard>
        <SectionHeader icon={<TrendingUp size={16} />} title="Executive Summary" />
        <p className="text-sm text-muted-foreground leading-relaxed">{brandData.executiveSummary}</p>
      </SectionCard>

      {/* Key Highlights */}
      <SectionCard>
        <h3 className="font-display text-base font-semibold mb-4">Key Highlights</h3>
        <ul className="space-y-3">
          {brandData.keyHighlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full ss-gradient flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
              <p className="text-sm text-foreground leading-relaxed">{h}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Proof Points */}
      <SectionCard>
        <h3 className="font-display text-base font-semibold mb-4">By the Numbers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brandData.proofPoints.slice(0, 4).map((p, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-gradient-to-b from-purple-50 to-violet-50 border border-purple-100">
              <p className="font-display text-2xl font-bold ss-gradient-text">{p.stat}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-tight">{p.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {brandData.proofPoints.slice(4).map((p, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <div className="w-8 h-8 rounded-lg ss-gradient flex items-center justify-center shrink-0">
                <Zap size={14} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{p.stat}</p>
                <p className="text-xs text-muted-foreground">{p.label}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Strengths + Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard>
          <h3 className="font-display text-base font-semibold mb-4 text-green-700">Strengths</h3>
          <ul className="space-y-4">
            {brandData.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={15} className="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard>
          <h3 className="font-display text-base font-semibold mb-4 text-amber-700">Challenges</h3>
          <ul className="space-y-4">
            {brandData.challenges.map((c, i) => (
              <li key={i} className="flex items-start gap-3">
                <AlertTriangle size={15} className="text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{c.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Critical Question */}
      <SectionCard>
        <div className="flex items-start gap-3 mb-5">
          <Target size={18} className="text-purple-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-display text-base font-semibold">The Critical Question</h3>
            <p className="text-sm text-foreground mt-1 leading-relaxed italic">{brandData.criticalQuestion}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="gradient-left-border pl-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">The Opportunity</p>
            <p className="text-sm text-muted-foreground mb-3">{brandData.opportunity}</p>
            <ul className="space-y-1.5">
              {brandData.opportunityPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                  <ChevronRight size={12} className="text-green-600 mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l-4 border-amber-400 pl-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">The Risk</p>
            <p className="text-sm text-muted-foreground mb-3">{brandData.risk}</p>
            <ul className="space-y-1.5">
              {brandData.riskPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                  <AlertTriangle size={12} className="text-amber-600 mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l-4 border-purple-400 pl-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">What Success Looks Like</p>
            <p className="text-sm text-muted-foreground mb-3">{brandData.successLooks}</p>
            <ul className="space-y-1.5">
              {brandData.successPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                  <ChevronRight size={12} className="text-purple-600 mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ── Tab: Company ──────────────────────────────────────────────────────────────

function CompanyTab() {
  const [sub, setSub] = useState("info");
  const c = brandData.company;

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text="StartSuite is a creative infrastructure company built by Reagan Renfroe, backed by 46Capital, with Lucy Gonzalez as strategic partner. The team is small, senior-led, and built for the startup ecosystem." />

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
                    <a href={`mailto:${member.email}`} className="text-xs text-purple-600 hover:underline shrink-0">{member.email}</a>
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

// ── Tab: Visual Identity ──────────────────────────────────────────────────────

function VisualTab() {
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

// ── Tab: Verbal Identity ──────────────────────────────────────────────────────

function VerbalTab() {
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

// ── Tab: Services ─────────────────────────────────────────────────────────────

function ServicesTab() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text="StartSuite offers five core services organized into two phases: a 60-day Foundation Build and an ongoing Retainer. Every service is designed to compound — each one builds on the last." />

      {/* How it works */}
      <SectionCard>
        <SectionHeader icon={<Zap size={16} />} title="How It Works" subtitle="The four phases of every StartSuite engagement" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {brandData.howItWorks.map((step) => (
            <div key={step.step} className="relative">
              {step.step < 4 && (
                <div className="hidden md:block absolute top-5 left-full w-full h-px bg-gradient-to-r from-purple-300 to-transparent z-10" />
              )}
              <div className="p-4 rounded-xl border border-border bg-card h-full">
                <div className="w-8 h-8 rounded-full ss-gradient flex items-center justify-center text-white font-bold text-sm mb-3">{step.step}</div>
                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200 mb-2">{step.label}</Badge>
                <p className="text-sm font-semibold text-foreground mb-1">{step.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Services */}
      <div className="space-y-4">
        {/* Foundation phase header */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <Badge className="ss-gradient text-white border-0 text-xs">Foundation Build — 60 Days</Badge>
          <div className="h-px flex-1 bg-border" />
        </div>

        {brandData.services.filter(s => s.phase === "Foundation").map((service, i) => (
          <div
            key={i}
            className="rounded-xl border border-border overflow-hidden card-lift"
          >
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 bg-card hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl ss-gradient flex items-center justify-center text-white shrink-0">
                  <Layers size={16} />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">{service.name}</p>
                  <p className="text-xs text-muted-foreground">{service.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 hidden md:flex">{service.timeline}</Badge>
                <ChevronRight size={16} className={`text-muted-foreground transition-transform ${expanded === i ? "rotate-90" : ""}`} />
              </div>
            </button>
            {expanded === i && (
              <div className="px-5 pb-5 border-t border-border bg-muted/20">
                <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-4">{service.description}</p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Deliverables</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                    {service.deliverables.map((d, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-foreground">
                        <CheckCircle2 size={12} className="text-green-600 shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Retainer phase header */}
        <div className="flex items-center gap-3 mt-6">
          <div className="h-px flex-1 bg-border" />
          <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">Ongoing Retainer</Badge>
          <div className="h-px flex-1 bg-border" />
        </div>

        {brandData.services.filter(s => s.phase === "Retainer").map((service, i) => (
          <div
            key={i + 3}
            className="rounded-xl border border-border overflow-hidden card-lift"
          >
            <button
              onClick={() => setExpanded(expanded === i + 3 ? null : i + 3)}
              className="w-full flex items-center justify-between gap-4 p-5 bg-card hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <Briefcase size={16} />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">{service.name}</p>
                  <p className="text-xs text-muted-foreground">{service.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200 hidden md:flex">{service.timeline}</Badge>
                <ChevronRight size={16} className={`text-muted-foreground transition-transform ${expanded === i + 3 ? "rotate-90" : ""}`} />
              </div>
            </button>
            {expanded === i + 3 && (
              <div className="px-5 pb-5 border-t border-border bg-muted/20">
                <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-4">{service.description}</p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Deliverables</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                    {service.deliverables.map((d, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-foreground">
                        <CheckCircle2 size={12} className="text-green-600 shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Audience ─────────────────────────────────────────────────────────────

function AudienceTab() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const a = brandData.audience;
  const priorityColors: Record<string, string> = {
    Highest: "bg-green-100 text-green-800 border-green-300",
    High: "bg-blue-100 text-blue-800 border-blue-300",
    Medium: "bg-amber-100 text-amber-800 border-amber-300",
  };

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={a.keyTakeaway} />

      {/* ICP */}
      <SectionCard>
        <SectionHeader icon={<Target size={16} />} title={a.icp.title} subtitle="The primary target for all StartSuite marketing and sales" />
        <div className="p-4 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 mb-4">
          <p className="text-sm text-foreground leading-relaxed">{a.icp.description}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">ICP Signals — When to Reach Out</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {a.icp.signals.map((signal, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg border border-border">
                <CheckCircle2 size={13} className="text-green-600 mt-0.5 shrink-0" />
                <p className="text-xs text-foreground">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Audience segments */}
      <div className="space-y-3">
        {a.primarySegments.map((seg, i) => (
          <div key={i} className="rounded-xl border border-border overflow-hidden card-lift">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 bg-card hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full ss-gradient flex items-center justify-center text-white font-display font-bold text-lg shrink-0">
                  {seg.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-foreground">{seg.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{seg.demographics}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge variant="outline" className={`text-xs ${priorityColors[seg.priority]}`}>{seg.priority}</Badge>
                <ChevronRight size={16} className={`text-muted-foreground transition-transform ${expanded === i ? "rotate-90" : ""}`} />
              </div>
            </button>
            {expanded === i && (
              <div className="p-5 border-t border-border bg-card space-y-5">
                <p className="text-sm text-muted-foreground leading-relaxed">{seg.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Demographics</p>
                    <p className="text-xs text-foreground leading-relaxed">{seg.demographics}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Psychographics</p>
                    <p className="text-xs text-foreground leading-relaxed">{seg.psychographics}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Pain Points</p>
                    <ul className="space-y-1">
                      {seg.painPoints.map((p, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                          <AlertTriangle size={11} className="text-amber-600 mt-0.5 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">What They Need</p>
                  <ul className="space-y-1.5">
                    {seg.needs.map((n, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-foreground">
                        <CheckCircle2 size={12} className="text-green-600 mt-0.5 shrink-0" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Competitive ──────────────────────────────────────────────────────────

function CompetitiveTab() {
  const comp = brandData.competitive;

  return (
    <div className="space-y-6 tab-content-enter">
      <KeyTakeaway text={comp.keyTakeaway} />

      {/* Positioning matrix visual */}
      <SectionCard>
        <SectionHeader icon={<BarChart3 size={16} />} title="Positioning Matrix" subtitle="Speed vs. Strategic Depth — where StartSuite sits" />
        <div className="relative w-full aspect-square max-w-lg mx-auto bg-muted/30 rounded-xl border border-border overflow-hidden">
          {/* Axes */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-px bg-border top-1/2" />
            <div className="absolute h-full w-px bg-border left-1/2" />
          </div>
          {/* Axis labels */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-medium">Fast →</div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-medium">← Slow</div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium" style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}>Strategy + Execution ↑</div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium" style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}>↓ Execution Only</div>

          {/* Quadrant labels */}
          <div className="absolute top-4 left-4 text-xs text-muted-foreground/50 font-medium">Slow + Strategic</div>
          <div className="absolute top-4 right-4 text-xs text-muted-foreground/50 font-medium text-right">Fast + Strategic</div>
          <div className="absolute bottom-8 left-4 text-xs text-muted-foreground/50 font-medium">Slow + Execution</div>
          <div className="absolute bottom-8 right-4 text-xs text-muted-foreground/50 font-medium text-right">Fast + Execution</div>

          {/* Competitor dots */}
          {comp.positioningMatrix.competitors.map((c, i) => {
            const isStartSuite = c.name === "StartSuite";
            const left = `${c.x}%`;
            const top = `${100 - c.y}%`;
            return (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer ${isStartSuite ? "z-10" : "z-0"}`}
                      style={{ left, top }}
                    >
                      <div className={`rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-transform hover:scale-110 ${
                        isStartSuite
                          ? "w-10 h-10 ss-gradient text-white"
                          : "w-7 h-7 bg-white border-2 border-muted-foreground/30 text-muted-foreground"
                      }`}>
                        {isStartSuite ? "SS" : c.name[0]}
                      </div>
                      {isStartSuite && (
                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-purple-700">StartSuite</div>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">Hover over dots for details. StartSuite occupies the fast + strategic white space.</p>
      </SectionCard>

      {/* Competitive categories */}
      <div className="space-y-4">
        {comp.categories.map((cat, i) => (
          <SectionCard key={i} className="card-lift">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">{cat.category}</h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {cat.examples.map((ex, j) => (
                    <Badge key={j} variant="outline" className="text-xs">{ex}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">Strengths</p>
                <ul className="space-y-1">
                  {cat.strengths.map((s, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                      <CheckCircle2 size={11} className="text-green-600 mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-700 mb-2">Weaknesses</p>
                <ul className="space-y-1">
                  {cat.weaknesses.map((w, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-foreground">
                      <AlertTriangle size={11} className="text-amber-600 mt-0.5 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">StartSuite Advantage</p>
                <p className="text-xs text-foreground leading-relaxed">{cat.startSuiteAdvantage}</p>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>

      {/* White space */}
      <SectionCard>
        <div className="gradient-left-border pl-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-700 mb-2">The White Space</p>
          <p className="text-sm text-foreground leading-relaxed">{comp.whitespace}</p>
        </div>
      </SectionCard>
    </div>
  );
}

// ── Tab: Digital ──────────────────────────────────────────────────────────────

function DigitalTab() {
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
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const tabs = [
    { value: "overview", label: "Overview", icon: <TrendingUp size={15} /> },
    { value: "company", label: "Company", icon: <Building2 size={15} /> },
    { value: "visual", label: "Visual", icon: <Palette size={15} /> },
    { value: "verbal", label: "Verbal", icon: <MessageSquare size={15} /> },
    { value: "services", label: "Services", icon: <Layers size={15} /> },
    { value: "audience", label: "Audience", icon: <Users size={15} /> },
    { value: "competitive", label: "Competitive", icon: <BarChart3 size={15} /> },
    { value: "digital", label: "Digital", icon: <Globe size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_URLS.horizLight} alt="StartSuite" className="h-8 object-contain" />
            <div className="w-px h-6 bg-border" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Brand HQ</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Updated: {brandData.updatedDate}</p>
            <p className="text-xs text-muted-foreground">Powered by 46Capital</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="ss-gradient text-white py-14">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <Badge className="mb-3 bg-white/20 text-white border-white/30 text-xs">
                <Briefcase size={11} className="mr-1" />
                Creative Infrastructure for Founders
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">StartSuite Brand HQ</h1>
              <p className="text-white/80 text-base max-w-xl">
                The complete brand reference for StartSuite — visual identity, verbal identity, services, audience, and competitive positioning.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {brandData.proofPoints.slice(0, 4).map((p, i) => (
                <div key={i} className="text-center p-3 bg-white/15 rounded-xl border border-white/20">
                  <p className="font-display text-xl font-bold text-white">{p.stat}</p>
                  <p className="text-xs text-white/70 mt-0.5 leading-tight">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-8 pb-16">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex flex-wrap w-full gap-1 h-auto p-1.5 bg-white rounded-xl shadow-sm mb-8 border border-border">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview"><OverviewTab /></TabsContent>
          <TabsContent value="company"><CompanyTab /></TabsContent>
          <TabsContent value="visual"><VisualTab /></TabsContent>
          <TabsContent value="verbal"><VerbalTab /></TabsContent>
          <TabsContent value="services"><ServicesTab /></TabsContent>
          <TabsContent value="audience"><AudienceTab /></TabsContent>
          <TabsContent value="competitive"><CompetitiveTab /></TabsContent>
          <TabsContent value="digital"><DigitalTab /></TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={LOGO_URLS.horizLight} alt="StartSuite" className="h-6 object-contain" />
            <p className="text-xs text-muted-foreground">Brand HQ — Confidential</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Creative strategy, design, and storytelling for companies that can't afford to be overlooked.
          </p>
          <p className="text-xs text-muted-foreground">Updated {brandData.updatedDate}</p>
        </div>
      </footer>
    </div>
  );
}
