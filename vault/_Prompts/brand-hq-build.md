# Brand HQ Build Prompt
> Copy this entire file into a new Claude Code session to build a Brand HQ app for any client.
> Replace everything in [BRACKETS] with client-specific information.
> This is the authoritative, consolidated version. Do not use older REUSABLE_BRAND_HQ_PROMPT.md files.
> Last updated: March 2026

---

## HOW TO USE THIS PROMPT

1. Open a new Claude Code session
2. Paste this entire file
3. Fill in the CLIENT BRIEF section
4. Attach the completed research output from brand-hq-research.md (or paste discovery call transcript)
5. Claude will build the full Brand HQ app: React + Vite + TypeScript, 18 pages, Google Drive vault
6. Deploy to GitHub Pages

---

## THE PROMPT (copy everything below this line)

---

I need you to build a Brand HQ for [CLIENT NAME] ([CLIENT WEBSITE]). This is a React + Vite + TypeScript single-page application that serves as both a brand reference tool and a strategic intelligence center. We have proven templates you should reference for architecture, component patterns, and methodology.

## WHAT THIS IS

A living strategic operating system with two functions:
1. **Brand reference tool**: Anyone communicating about [CLIENT NAME] can find voice, visual, messaging, and audience guidance
2. **Strategic intelligence center**: Tracks audiences, competitors, campaigns, market position, funnel health, decisions, revenue modeling, and action items

---

## CLIENT INFORMATION

### Company
- **Name**: [CLIENT NAME]
- **Website**: [CLIENT WEBSITE]
- **Industry**: [INDUSTRY]
- **Founded**: [YEAR]
- **Headquarters**: [CITY, STATE]
- **Tagline**: [CURRENT TAGLINE]
- **Employee count**: [NUMBER]
- **Key contact**: [CMO/CONTACT NAME], [TITLE]
- **Contact background**: [RELEVANT CAREER HISTORY]
- **Engagement style**: [PROJECT-BASED / RETAINER / ETC]

### Subsidiaries / Sub-brands (if applicable)
- [SUB-BRAND 1]: [SECTOR], [STATUS: independent/merging/core]
- [SUB-BRAND 2]: [SECTOR], [STATUS]
- [ADD MORE AS NEEDED]

### Known Competitors
- Direct: [COMPETITOR 1], [COMPETITOR 2], [COMPETITOR 3]
- Adjacent: [COMPETITOR 4], [COMPETITOR 5]
- Inspiration: [COMPETITOR 6], [COMPETITOR 7]

### Discovery Call Notes / Transcript
[PASTE TRANSCRIPT OR KEY NOTES HERE. Include direct quotes, pain points, confirmed decisions, and strategic priorities. The more specific, the better the Brand HQ output.]

---

## ARCHITECTURE

Reference these repos for architecture patterns (in priority order):

### 1. StartSuite Brand HQ (PRIMARY) - `/Users/lucygonzalez/startsuite-brand-hq/`

The most current pattern. Clone this structure:

| File | Purpose |
|---|---|
| `client/src/components/Layout.tsx` | Fixed sidebar + header layout with 5-section nav |
| `client/src/components/BrandUI.tsx` | Shared UI primitives (SectionCard, KeyTakeaway, FieldRow, SectionHeader, SubTabNav, CopyButton) |
| `client/src/pages/Home.tsx` | Slim routing shell (~60 lines, imports all tabs) |
| `client/src/pages/tabs/` | 18 modular tab files (one per page) |
| `client/src/data/brandData.ts` | Centralized data model (all content in one file, tabs read from it) |
| `client/src/contexts/NavigationContext.tsx` | Tab navigation state |
| `client/src/contexts/ThemeContext.tsx` | Light/dark mode toggle |

### 2. Duininck Brand HQ (SECONDARY) - `/Users/lucygonzalez/Duininch-brand-hq/`

Reference for methodology and Drive vault:

| File | Purpose |
|---|---|
| `src/components/ui.tsx` | Component library with design tokens |
| `scripts/drive-vault/` | Google Drive API vault creator with methodology engine |
| `scripts/drive-vault/methodology.mjs` | Proprietary competitive framework + prompt rules |

### 3. 247 Sports Brand HQ (TERTIARY) - `github.com/lucygonzo/247sports-brand-hq`

Reference for backend pattern:

| File | Purpose |
|---|---|
| Express + tRPC backend | `server/_core/` shared infrastructure |
| Decision audit log | LLM-powered summarization |
| Drizzle ORM | Database integration |

---

## KEY ARCHITECTURE RULES

These are non-negotiable. Every Brand HQ follows them.

1. **One tab = one file.** Every page lives in `pages/tabs/[TabName]Tab.tsx`. No monolithic components. No putting multiple tabs in one file.
2. **Data lives in brandData.ts.** All content is centralized. Tabs import and render. This makes pivots easy and keeps content separate from presentation.
3. **Shared UI in BrandUI.tsx.** SectionCard, KeyTakeaway, FieldRow, SectionHeader, SubTabNav, CopyButton are reusable across all tabs. Do not recreate these.
4. **Layout.tsx owns navigation.** Fixed sidebar with 5 sections, header with logo + dark mode toggle + internal badge. The sidebar is the primary navigation.
5. **Home.tsx is just routing.** ~60 lines max. Imports tabs, renders based on activeTab from NavigationContext. No logic, no data, no layout.
6. **Adapt colors, preserve structure.** Adapt the color tokens to [CLIENT NAME]'s brand palette. Keep the StartSuite purple as a reference for how gradient accents work as precision punctuation (not wallpaper).

---

## RESEARCH METHODOLOGY

### 11 Global Rules (apply to every research prompt and every piece of content)

1. **No generic advice.** Every insight must be specific to this company, this industry, and this competitive landscape.
2. **Surface what others miss.** We need insights that set the client above and beyond competition.
3. **Strategy serves action.** Every recommendation must be in service of answering key questions, gathering insights, or closing leaky funnels.
4. **No em dashes.** Do not use em dashes. Do not use "--" in place of em dashes. Use commas, colons, or restructure.
5. **Creative sentence structure.** Avoid patterns like "It's not XX. It's Y." or "This isn't about X. This is about Y."
6. **Root everything in evidence.** Reference what stakeholders and clients have told us. Use the contact's insights, quotes, and confirmed decisions.
7. **Be smart with tokens.** Use what we already have before researching externally. Only go to the web for new context.
8. **Parent before parts.** Research the core company first, then each sub-brand.
9. **Precision on brand elements.** Pull specific hex codes and exact taglines. No approximations.
10. **Publicly observable data only.** Websites, social profiles, job postings, press releases, regulatory filings, trade publications. Do not fabricate.
11. **Strategy should never exist for its own sake.** If a finding does not help the client make a better decision, close a gap, or see an opportunity, cut it.

### Competitive Framework (6 categories, proprietary)

Client-facing files use the "Client Label" (not the internal name):

| # | Internal Name | Client Label | Definition |
|---|---|---|---|
| 1 | Direct Competitors | Head-to-Head Market Players | Same problem, similar solution |
| 2 | Adjacent Competitors | Alternative Solution Providers | Same problem, different solution |
| 3 | Industry Relatives | Industry Peers | Same industry, not direct competitors |
| 4 | Audience Relatives | Attention Competitors | Competing for attention from same audience |
| 5 | Sister-Business Models | Structural Parallels | Different industry, similar business model |
| 6 | Inspiration Companies | Messaging & Positioning Benchmarks | Similar challenges, excellent execution |

### Research Order (non-negotiable)

1. Company Profile (core company first, then sub-brands)
2. Target Audience Research (BEFORE competitive)
3. Competitive Landscape (filtered through audience needs)
4. Digital Ecosystem (SEO, GEO, social, tech stack)
5. Visual Identity Audit (web-rip colors, fonts, logos)
6. Verbal Identity Inventory (scrape all current language)
7. Industry Landscape (macro trends, parallel industries)
8. Strategy Development (only after research is complete)

---

## PAGES TO BUILD (18 total, across 5 nav sections)

### FOUNDATION (Nav Section 1)

**1. Overview** (`OverviewTab.tsx`)
- Key takeaway banner
- "What We Learned" orientation cards: What We Researched / What Surprised Us / What Needs Your Eyes On
- Executive summary with expandable context
- Key highlights with proof point stat boxes
- Strengths and challenges in side-by-side layout
- Critical question callout
- Opportunity / Risk / Success analysis

**2. Company Profile** (`CompanyTab.tsx`)
- Legal details, team highlights with role descriptions and key quotes
- Backer/investor relationship
- Founding story
- "How We Talk About Ourselves" section with direct quotes from leadership

**3. Brand Identity** (`IdentityTab.tsx`)
- Archetype, brand anchor, core narrative
- Personality traits, characteristics
- Key phrases with copy buttons
- Messaging hierarchy, messaging gaps
- Audience perception (first impression + key questions)
- Competitive positioning statement

**4. Gap Analysis** (`GapAnalysisTab.tsx`)
- Perception banner: "A [X]/10 company with a [Y]/10 brand awareness score"
- Dimension breakdown with color-coded progress bars (green >= 6, amber 4-6, red < 4)
- Sub-tabs: Perception | Funnels | Gaps
- Funnels: leaky funnel audits per audience segment (Awareness > Consideration > Decision > Adoption) with severity
- Gaps: Current State > Desired State with severity and action guidance

### BRAND (Nav Section 2)

**5. Visual Identity** (`VisualTab.tsx`)
- Hero color swatch
- Full palette with HEX/RGB/OKLCH (click-to-copy)
- Gradients with usage rules
- Typography hierarchy with specimens
- Logo variants with preview images and usage guidelines
- Design principles

**6. Verbal Identity** (`VerbalTab.tsx`)
- Core message with audience toggle (messaging adapts per audience segment)
- Taglines at multiple lengths
- Messaging pillars with key phrases
- Tone attributes with do/don't examples
- Copy blocks: one-liner, two-sentence, LinkedIn bio, pitch intro, investor description
- Naming conventions
- "What NOT to Say" section

**7. Services** (`ServicesTab.tsx`)
- Product tiers with clear scope (included/not included)
- Pricing where confirmed
- Deliverables lists
- Phase labels, timeline indicators

### MARKET (Nav Section 3)

**8. Audience** (`AudienceTab.tsx`)
- Per-segment cards with demographics, psychographics, pain points, needs, priority badges
- TAM/SAM/OAM
- Detailed segment profiles with scoring (revenue/strategic/productFit/acquisition)
- Personas with day-in-the-life stories
- Psychographic profiles (values, beliefs, fears, media habits)
- Real client examples mapped to segments

**9. Competitive** (`CompetitiveTab.tsx`)
- Category-based competitor analysis (6-category framework)
- Positioning matrix with labeled axes and plotted competitors
- White space analysis
- SWOT
- Strategic recommendations with priority ordering

**10. Customer Journey** (`JourneyTab.tsx`)
- 6-stage journey: Awareness > Consideration > Decision > Onboarding > Retention > Advocacy
- Each stage: icon, description, touchpoints, content needed, customer mindset quote, friction points, success metrics

### BUSINESS (Nav Section 4)

**11. Digital Ecosystem** (`DigitalTab.tsx`)
- Website audit (structure, CTAs, tech stack)
- Social channel inventory with status and frequency
- Content strategy (pillars + formats)
- Paid media channels with targeting and status
- Partnership tiers

**12. Go-to-Market** (`GTMTab.tsx`)
- Current stage, primary growth motion, GTM fit score
- Strategy pillars, strengths/gaps
- Channel prioritization with investment levels
- Launch timeline by phase
- Drafted resources

**13. Product Strategy** (`ProductTab.tsx`)
- Current model with phases
- Product vision
- Roadmap by phase with status badges
- Key differentiators, future capabilities

**14. Revenue Model** (`RevenueTab.tsx`)
- Revenue streams with current vs. target mix percentages
- Pricing tiers
- Strengths and gaps per stream
- Alternative pricing models (token/credit if applicable)

**15. Portfolio** (`PortfolioTab.tsx`)
- Client showcase with real names
- Category/stage/services tags
- Headline + challenge + outcome narrative
- Result metrics, accent colors per client
- Case study status note

### WORKSPACE (Nav Section 5)

**16. Action Items** (`ActionItemsTab.tsx`)
- Phased strategic steps with problem + solution direction headlines
- Each phase: name, timeline, summary, urgency flag
- Nested steps with owner/status (Not Started / In Progress / Complete)
- Seeded from discovery call and board meeting decisions

**17. Decision Log** (`DecisionLogTab.tsx`)
- Sub-tabs: Confirmed | Pending
- Confirmed: green border, title, context, rationale with direct quotes, owner, date, status badge
- Pending: title, context, options array (A/B/C), owner, status

**18. Report Card** (`ReportCardTab.tsx`)
- Overall completion percentage
- Section-by-section progress bars with color coding (green > 75%, amber 50-75%, red < 50%)
- Biggest jumps, still needs work
- Per-section notes

---

## DATA MODEL (brandData.ts structure)

The centralized data file includes these top-level properties:

```typescript
export const brandData = {
  // HEADER
  companyName, tagline, domain, updatedDate, clientContact, agency,

  // OVERVIEW
  keyTakeaway, executiveSummary, keyHighlights[], strengths[], challenges[],
  criticalQuestion, opportunity, opportunityPoints[], risk, riskPoints[],
  successLooks, successPoints[],

  // COMPANY
  company: { legalName, operatingName, founded, type, industry, employees,
    primaryLocation, secondaryLocation, website, linkedin, notes,
    teamHighlights[], backer },

  // VISUAL IDENTITY
  visualIdentity: { keyTakeaway, logo: { icon, wordmark, variants[], usageGuidelines[] },
    colorPalette: { primary[], secondary[], gradients[], colorUsageRules[] },
    typography: { primary, hierarchy[], rules[] }, designPrinciples[] },

  // VERBAL IDENTITY
  verbalIdentity: { keyTakeaway, taglines, messagingPillars[], toneAttributes[],
    voiceDontList[], copyBlocks[], namingConventions[] },

  // SERVICES
  services[], howItWorks[], proofPoints[],

  // AUDIENCE
  audience: { keyTakeaway, primarySegments[], icp },
  audienceExpanded: { keyTakeaway, tam, sam, oam, founderSegments[],
    ecosystemSegments[], personas[], psychographics },

  // COMPETITIVE
  competitive: { keyTakeaway, categories[], positioningMatrix, whitespace,
    swot, recommendations[] },

  // DIGITAL
  digital: { keyTakeaway, website, socialChannels[], contentStrategy,
    paidMedia, partnerships },

  // IDENTITY
  identity: { keyTakeaway, tagline, characteristics[], keyPhrases[],
    messagingHierarchy[], messagingGaps[], audiencePerception,
    brandPersonality, competitivePositioningStatement },

  // GTM
  gtm: { keyTakeaway, currentStage, primaryGrowthMotion, gtmFitScore,
    pillars[], strengths[], gaps[], channels[], launchTimeline[],
    draftedResources[] },

  // JOURNEY
  journey: { keyTakeaway, stages[] },

  // PRODUCT
  product: { keyTakeaway, currentModel, productVision,
    roadmap[], differentiators[] },

  // PORTFOLIO
  portfolio: { keyTakeaway, stats[], filters[], clients[], caseStudyNote },

  // WORKSPACE
  workspace: { keyTakeaway, openQuestions[], actionItems[] },

  // STRATEGIC DATA
  confirmedDecisions[],   // { title, context, rationale, owner, date, status, source }
  pendingDecisions[],     // { title, context, options[], owner, status }
  actionPhases[],         // { name, timeline, summary, urgency, steps[] }
  gapDimensions[],        // { dimension, score, implication, recommendation, severity }
  revenueStreams[],       // { name, currentMix, targetMix, pricing, strengths[], gaps[] }
  sectionCompletion[],    // { section, percentage, status, notes }
};
```

---

## GOOGLE DRIVE VAULT

Set up the Google Drive API vault creator (reference `scripts/drive-vault/` from Duininck):
1. OAuth2 authentication with stored token
2. Create folder structure matching the tab sections (00-Overview through 17-ReportCard)
3. Create markdown files with hybrid prompts (AI-executable + human brief)
4. Proprietary methodology baked into prompt engine (not visible in client files)
5. `npm run create-vault` creates everything in Drive
6. `npm run update-vault` pushes research output to Drive

Credentials are already at `scripts/drive-vault/credentials.json` (reuse from Duininck project).

---

## ACTION ITEM FRAMING

Every action headline follows: **problem + solution direction**
- "Every Google impression tells the wrong story. One CMS edit fixes it."
- "9 employee reviews vs. 114 for the competitor. The culture is strong; the evidence is invisible."
- "Brand Discovery pricing is undefined and blocks the sales pipeline. One pricing one-pager unblocks it."

Solutions lean toward building custom systems the client's team OWNS rather than subscribing to tools that own them. We are not recommending Buffer or Sprout Social. We are building workflows, automations, and templates the team runs internally. Empowerment over dependency.

---

## WHAT NOT TO DO

- Do not fabricate data. Use labeled placeholders where data is missing.
- Do not present confirmed decisions as discoveries. Present them as "confirmed, and here's what we built on top."
- Do not include the Research Pipeline or internal methodology in client-facing walkthrough.
- Do not use em dashes anywhere.
- Do not be generic. Every insight must be specific to this client and their competitive landscape.
- Do not put all tabs in one monolithic file. One tab = one file in `pages/tabs/`.
- Do not hardcode content in components. All data lives in brandData.ts.
- Do not position StartSuite as an agency. We are a creative operating system. Brand Discovery is the entry point.
- Do not recommend third-party subscription tools. Build systems the client owns.
- Do not skip the research order. Audience comes before competitive, always.

---

## FIRST STEPS

1. Create the project directory: `[client-slug]-brand-hq/`
2. Clone Layout.tsx and BrandUI.tsx from StartSuite (adapt colors to client palette)
3. Set up `brandData.ts` with client information from discovery call
4. Build the app shell (Home.tsx with all tab imports, Layout.tsx with nav sections)
5. Create NavigationContext.tsx and ThemeContext.tsx
6. Process the discovery call transcript into structured data
7. Begin research in order: Company Profile > Audience > Competitive > Digital > Visual > Verbal > Industry
8. Build tab files as research completes (one file per tab in `pages/tabs/`)
9. Create Drive vault with `npm run create-vault`
10. Deploy to GitHub Pages
11. Seed Decision Log with confirmed decisions from discovery call
12. Seed Action Items with phased steps from discovery call

Ask me any questions before starting.
