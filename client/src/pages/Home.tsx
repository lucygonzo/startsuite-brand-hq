/*
 * DESIGN PHILOSOPHY: Clean-Room Modernism — "The Brand Studio"
 * Sora for display headings, DM Sans for body copy.
 * White cards on violet-tinted gray background.
 * StartSuite gradient (#6607E1 → #BC98FF) as precision punctuation.
 */

import Layout from "@/components/Layout";
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext";
import OverviewTab from "./tabs/OverviewTab";
import CompanyTab from "./tabs/CompanyTab";
import IdentityTab from "./tabs/IdentityTab";
import GapAnalysisTab from "./tabs/GapAnalysisTab";
import VisualTab from "./tabs/VisualTab";
import VerbalTab from "./tabs/VerbalTab";
import ServicesTab from "./tabs/ServicesTab";
import AudienceTab from "./tabs/AudienceTab";
import CompetitiveTab from "./tabs/CompetitiveTab";
import JourneyTab from "./tabs/JourneyTab";
import DigitalTab from "./tabs/DigitalTab";
import GTMTab from "./tabs/GTMTab";
import ProductTab from "./tabs/ProductTab";
import RevenueTab from "./tabs/RevenueTab";
import PortfolioTab from "./tabs/PortfolioTab";
import ActionsTab from "./tabs/ActionsTab";
import DecisionLogTab from "./tabs/DecisionLogTab";
import ReportCardTab from "./tabs/ReportCardTab";

function Home() {
  const { activeTab, setActiveTab } = useNavigation();

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "company" && <CompanyTab />}
      {activeTab === "identity" && <IdentityTab />}
      {activeTab === "gap-analysis" && <GapAnalysisTab />}
      {activeTab === "visual" && <VisualTab />}
      {activeTab === "verbal" && <VerbalTab />}
      {activeTab === "services" && <ServicesTab />}
      {activeTab === "audience" && <AudienceTab />}
      {activeTab === "competitive" && <CompetitiveTab />}
      {activeTab === "journey" && <JourneyTab />}
      {activeTab === "digital" && <DigitalTab />}
      {activeTab === "gtm" && <GTMTab />}
      {activeTab === "product" && <ProductTab />}
      {activeTab === "revenue" && <RevenueTab />}
      {activeTab === "portfolio" && <PortfolioTab />}
      {activeTab === "actions" && <ActionsTab />}
      {activeTab === "decisions" && <DecisionLogTab />}
      {activeTab === "report-card" && <ReportCardTab />}
    </Layout>
  );
}

export default function HomeWrapper() {
  return (
    <NavigationProvider>
      <Home />
    </NavigationProvider>
  );
}
