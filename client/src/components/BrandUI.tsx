import { useState } from "react";
import { Lightbulb, Copy, Check } from "lucide-react";

// ── Shared UI Primitives ──────────────────────────────────────────────────────

export function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card rounded-xl border border-border p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function KeyTakeaway({ text }: { text: string }) {
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

export function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 border-b border-border last:border-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

export function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
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

export function SubTabNav({ tabs, active, onChange }: { tabs: { id: string; label: string }[]; active: string; onChange: (id: string) => void }) {
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

export function CopyButton({ text }: { text: string }) {
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
