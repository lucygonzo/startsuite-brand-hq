// ============================================================
// NavigationContext
// Shared cross-tab navigation state — allows any tab to
// trigger a tab switch and optionally set a sub-selection
// ============================================================
import { createContext, useContext, useState, type ReactNode } from "react";
import type { TabId } from "@/components/Layout";

interface NavigationContextValue {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  /** Pre-selected segment code for the Journey tab */
  pendingJourneySegment: string | null;
  setPendingJourneySegment: (code: string | null) => void;
  /** Navigate to Journey tab with a specific segment pre-selected */
  jumpToJourney: (segmentCode: string) => void;
  /** Pre-selected segment code for the Audience tab */
  pendingAudienceSegment: string | null;
  setPendingAudienceSegment: (code: string | null) => void;
  /** Navigate to Audience tab with a specific segment pre-selected */
  jumpToAudience: (segmentCode: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({
  children,
  defaultTab = "overview",
}: {
  children: ReactNode;
  defaultTab?: TabId;
}) {
  const [activeTab, setActiveTab] = useState<TabId>(defaultTab);
  const [pendingJourneySegment, setPendingJourneySegment] = useState<string | null>(null);
  const [pendingAudienceSegment, setPendingAudienceSegment] = useState<string | null>(null);

  const jumpToJourney = (segmentCode: string) => {
    setPendingJourneySegment(segmentCode);
    setActiveTab("journey");
  };

  const jumpToAudience = (segmentCode: string) => {
    setPendingAudienceSegment(segmentCode);
    setActiveTab("audience");
  };

  return (
    <NavigationContext.Provider
      value={{
        activeTab,
        setActiveTab,
        pendingJourneySegment,
        setPendingJourneySegment,
        jumpToJourney,
        pendingAudienceSegment,
        setPendingAudienceSegment,
        jumpToAudience,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useNavigation must be used within NavigationProvider");
  return ctx;
}
