// ============================================================
// STARTSUITE BRAND HQ — Layout
// Layout: Fixed left sidebar (StartSuite purple) + main content
// ============================================================

import { useState } from "react";
import {
  LayoutDashboard,
  Fingerprint,
  Palette,
  MessageSquare,
  Globe,
  Users,
  Swords,
  Package,
  ListChecks,
  Menu,
  X,
  ChevronRight,
  Map,
  Building2,
  Rocket,
  Briefcase,
  Layers,
  BookMarked,
  Sun,
  Moon,
  Search,
  BarChart3,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { LOGO_URLS } from "@/data/brandData";

export type TabId =
  | "overview"
  | "company"
  | "identity"
  | "gap-analysis"
  | "visual"
  | "verbal"
  | "services"
  | "audience"
  | "competitive"
  | "journey"
  | "digital"
  | "gtm"
  | "product"
  | "revenue"
  | "portfolio"
  | "actions"
  | "decisions"
  | "report-card";

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    label: "FOUNDATION",
    items: [
      { id: "overview", label: "Overview", icon: <LayoutDashboard size={15} /> },
      { id: "company", label: "Company Profile", icon: <Building2 size={15} /> },
      { id: "identity", label: "Brand Identity", icon: <Fingerprint size={15} /> },
      { id: "gap-analysis", label: "Gap Analysis", icon: <Search size={15} /> },
    ],
  },
  {
    label: "BRAND",
    items: [
      { id: "visual", label: "Visual Identity", icon: <Palette size={15} /> },
      { id: "verbal", label: "Verbal Identity", icon: <MessageSquare size={15} /> },
      { id: "services", label: "Services", icon: <Layers size={15} /> },
    ],
  },
  {
    label: "MARKET",
    items: [
      { id: "audience", label: "Audience", icon: <Users size={15} /> },
      { id: "competitive", label: "Competitive", icon: <Swords size={15} /> },
      { id: "journey", label: "Customer Journey", icon: <Map size={15} /> },
    ],
  },
  {
    label: "BUSINESS",
    items: [
      { id: "digital", label: "Digital Ecosystem", icon: <Globe size={15} /> },
      { id: "gtm", label: "Go-to-Market", icon: <Rocket size={15} /> },
      { id: "product", label: "Product Strategy", icon: <Package size={15} /> },
      { id: "revenue", label: "Revenue Model", icon: <BarChart3 size={15} /> },
      { id: "portfolio", label: "Portfolio", icon: <Briefcase size={15} /> },
    ],
  },
  {
    label: "WORKSPACE",
    items: [
      { id: "actions", label: "Action Items", icon: <ListChecks size={15} /> },
      { id: "decisions", label: "Decision Log", icon: <BookOpen size={15} /> },
      { id: "report-card", label: "Report Card", icon: <ClipboardCheck size={15} /> },
    ],
  },
];

// Flat list for type checking
export const allNavItems: NavItem[] = navSections.flatMap((s) => s.items);

// StartSuite brand colors (purple palette)
const PURPLE_NAV = "oklch(0.22 0.08 285)";         // deep purple header
const PURPLE_SIDEBAR = "oklch(0.18 0.07 285)";     // darker sidebar
const PURPLE_HOVER = "oklch(0.28 0.08 285)";       // hover state
const ACCENT = "oklch(0.72 0.18 290)";             // #BC98FF light purple accent
const ACCENT_DIM = "oklch(0.72 0.18 290 / 0.18)";
const WHITE = "oklch(0.97 0.005 285)";
const WHITE_DIM = "oklch(0.75 0.03 285)";
const WHITE_MUTED = "oklch(0.55 0.03 285)";
const BORDER = "oklch(1 0 0 / 0.10)";

interface LayoutProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  children: React.ReactNode;
}

export default function Layout({ activeTab, onTabChange, children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top header bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-12 border-b"
        style={{ background: PURPLE_NAV, borderColor: "oklch(1 0 0 / 0.12)" }}
      >
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-1 rounded"
            style={{ color: WHITE_DIM }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          {/* StartSuite logo */}
          <img
            src={LOGO_URLS.horizLight}
            alt="StartSuite"
            className="h-6"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          {/* BRAND HQ label */}
          <div
            className="hidden sm:flex items-center gap-1.5 pl-3"
            style={{ borderLeft: `1px solid oklch(1 0 0 / 0.20)` }}
          >
            <span
              style={{
                color: WHITE_DIM,
                fontFamily: "'Sora', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
              }}
            >
              Brand HQ
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-xs hidden sm:block"
            style={{ color: WHITE_MUTED, fontFamily: "'DM Sans', sans-serif" }}
          >
            Updated: March 2026
          </span>
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs"
            style={{
              background: ACCENT_DIM,
              color: ACCENT,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.06em",
              border: `1px solid oklch(0.72 0.18 290 / 0.30)`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: ACCENT }} />
            INTERNAL
          </div>
          {/* Light / Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded transition-all duration-150"
            style={{
              background: isDark ? "oklch(1 0 0 / 0.08)" : "oklch(1 0 0 / 0.15)",
              color: WHITE_DIM,
              border: `1px solid oklch(1 0 0 / 0.15)`,
            }}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 pt-12">
        {/* Sidebar */}
        <aside
          className={`fixed top-12 left-0 bottom-0 z-40 w-52 border-r flex flex-col transition-transform duration-200 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ background: PURPLE_SIDEBAR, borderColor: BORDER }}
        >
          <nav className="flex-1 overflow-y-auto px-2 py-3">
            {navSections.map((section) => (
              <div key={section.label} className="mb-3">
                <div
                  className="px-3 pb-1.5 pt-1"
                  style={{
                    color: WHITE_MUTED,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    fontWeight: 600,
                  }}
                >
                  {section.label}
                </div>
                {section.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { onTabChange(item.id); setMobileOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-left mb-0.5 transition-all duration-150 relative"
                      style={{
                        background: isActive ? ACCENT_DIM : "transparent",
                        color: isActive ? ACCENT : WHITE_DIM,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12.5px",
                        fontWeight: isActive ? 500 : 400,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.background = PURPLE_HOVER;
                          (e.currentTarget as HTMLElement).style.color = WHITE;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.color = WHITE_DIM;
                        }
                      }}
                    >
                      {isActive && (
                        <span
                          className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r"
                          style={{ background: ACCENT }}
                        />
                      )}
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                      {isActive && (
                        <ChevronRight size={11} className="ml-auto opacity-60 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          <div
            className="px-4 py-3 border-t"
            style={{
              borderColor: BORDER,
              color: WHITE_MUTED,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
            }}
          >
            <div>StartSuite Brand HQ</div>
            <div style={{ color: "oklch(0.45 0.03 285)" }}>Powered by 46Capital</div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 lg:hidden"
            style={{ background: "oklch(0 0 0 / 0.6)" }}
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content */}
        <main
          className="flex-1 min-h-screen overflow-y-auto overflow-x-hidden lg:ml-52 bg-background"
        >
          <div className="tab-content-enter px-4 sm:px-6 lg:px-8 pt-6 pb-12 max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
