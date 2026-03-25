# Reusable Brand HQ Prompt
> Copy this into a new Claude Code session to spin up a Brand HQ for any client.
> Replace everything in [BRACKETS] with client-specific information.
> Last updated: March 2026

---

## THE PROMPT (copy everything below this line)

---

I need you to build a Brand HQ for [CLIENT NAME] ([CLIENT WEBSITE]). This is a React + Vite + TypeScript single-page application that serves as both a brand reference tool and a strategic intelligence center. We have a proven template at /Users/lucygonzalez/Duininch-brand-hq/ that you should reference for architecture, component patterns, and methodology.

## WHAT THIS IS

A living strategic operating system with two functions:
1. **Brand reference tool**: Anyone communicating about [CLIENT NAME] can find voice, visual, messaging, and audience guidance
2. **Strategic intelligence center**: Tracks audiences, competitors, campaigns, market position, and funnel health

## ARCHITECTURE (clone from Duininck)

Reference the existing Brand HQ at `/Users/lucygonzalez/Duininch-brand-hq/` for:
- `src/components/ui.tsx` (component library: 18 components, design tokens, color system)
- `src/App.tsx` (navigation structure with research progress badges)
- `src/data/brandData.ts` (centralized data model pattern)
- `scripts/drive-vault/` (Google Drive API vault creator with methodology engine)
- `scripts/drive-vault/methodology.mjs` (proprietary competitive framework + prompt rules)

Clone the ui.tsx component library directly. Adapt the color tokens to [CLIENT NAME]'s brand palette.

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
- Golf/Niche (if applicable): [COMPETITOR 6], [COMPETITOR 7]

### Discovery Call Notes / Transcript
[PASTE TRANSCRIPT OR KEY NOTES HERE. Include direct quotes, pain points, confirmed decisions, and strategic priorities. The more specific, the better.]

## RESEARCH METHODOLOGY (from methodology.mjs)

### Global Rules (apply to every research prompt and every piece of content)
1. Do not give generic advice. Every insight must be specific to this company, this industry, and this competitive landscape.
2. We need insights that set the client above and beyond competition. Surface what others miss.
3. Strategy should never exist for its own sake. Every recommendation must be in service of answering key questions, gathering insights, or closing leaky funnels.
4. Do not use em dashes. Do not use "--" in place of em dashes.
5. Use creative sentence structure. Avoid patterns like "It's not XX. It's Y." or "This isn't about X. This is about Y."
6. Root all strategy and thought in what stakeholders and clients have told us. Reference the contact's insights, quotes, and confirmed decisions.
7. Be smart with token usage. Use what we already have before researching externally. Only go to the web for new context, insights, or updates we lack.
8. Research the core company first, then each sub-brand. We need to understand the parent before the parts.
9. When referencing colors or brand elements, pull specific hex codes and exact taglines. No approximations.
10. Pull from publicly observable data: websites, social profiles, job postings, press releases, regulatory filings, trade publications. Do not fabricate data points.

### Competitive Framework (6 categories, proprietary)
Use these categories to structure competitive analysis. Client-facing files use the "Client Label" (not the internal name):

1. **Direct Competitors** (Client Label: "Head-to-Head Market Players") - Same problem, similar solution
2. **Adjacent Competitors** (Client Label: "Alternative Solution Providers") - Same problem, different solution
3. **Industry Relatives** (Client Label: "Industry Peers") - Same industry, not direct competitors
4. **Audience Relatives** (Client Label: "Attention Competitors") - Competing for attention from same audience
5. **Sister-Business Models** (Client Label: "Structural Parallels") - Different industry, similar business model
6. **Inspiration Companies** (Client Label: "Messaging & Positioning Benchmarks") - Similar challenges, excellent execution

### Research Order (non-negotiable)
1. Company Profile (core company first, then sub-brands)
2. Target Audience Research (BEFORE competitive)
3. Competitive Landscape (filtered through audience needs)
4. Digital Ecosystem (SEO, GEO, social, tech stack)
5. Visual Identity Audit (web-rip colors, fonts, logos)
6. Verbal Identity Inventory (scrape all current language)
7. Industry Landscape (macro trends, parallel industries)
8. Strategy Development (only after research is complete)

## PAGES TO BUILD (17 total)

### Foundation Group
1. **Overview** - Company snapshot, CMO profile, team structure, confirmed decisions, open priorities with expandable context, meeting agenda toggle
2. **Company Profile** - Mission/vision with editorial annotations, founding story, generational timeline, portfolio companies with sub-brand detail views, values
3. **Industry Landscape** - Macro trends, IIJA/funding, labor market, technology, parallel industries, timing windows, growth opportunities

### Brand Group
4. **Brand Identity** - Archetype, brand anchor, untouchable wedge, core narrative, personality traits, language guidelines
5. **Brand Architecture** - House-of-brands vs branded-house framing, confirmed architecture, sub-brand tabs with divergence points, unification timeline
6. **Visual Identity** - Hero color swatch, full palette with RGB/HEX/CMYK/PMS (click-to-copy), surfaces palette, audience color emphasis, competitive color landscape, action color concept, typography, logos with download links, photography guidelines, social standards per platform, content type templates, partnership lockups with mockups and rules, sponsorship phrases, sub-brand palettes, gaps
7. **Verbal Identity** - Core message with audience toggle (messaging adapts per audience), taglines at multiple lengths, boilerplate copy, pinned "how to talk about us" panel, voice guidelines, verbal inventory (scraped from live sites), values conflicts, language patterns, sub-brand voice tabs

### Market Group
8. **Audience** - Per-segment subtabs (not expandable cards), each with: overview card, empathy profile (daily life, how they find/decide, frustrations, trust signals), visual journey map with funnel leak indicators, win/loss factors, content preferences, Drive links
9. **Competitive** - Head-to-head comparison matrix, expandable competitor profiles with stat boxes, white space analysis, unification benchmarks, heritage context
10. **Gap Analysis** - Perception score (lead with implication: "A X/10 company with a Y/10 brand"), dimension breakdown (meaning first, score second), leaky funnel audits, best-in-class benchmarks, identified gaps with severity

### GTM Group
11. **Digital Ecosystem** - Web property inventory, social media audit with competitor benchmarks, content performance data, SEO baseline with keyword gaps, GEO scorecard, platform connection placeholders
12. **Go-to-Market** - Strategy pillars with timing, performance dashboard placeholders, campaign library, steering decision log (log-only vs action-required), weekly synthesis placeholder
13. **Live News Feed** - Featured/pinnable items, internal posts, industry articles, competitor activity, social mentions, people to watch, timeline filter

### Workspace Group
14. **Research Pipeline** - Step tracker with Claude prompts, status badges, Drive file references
15. **Action Items** - Phased strategic steps (problem + solution direction headlines), expandable context, meeting agenda toggle at top
16. **Decision Log** - Confirmed decisions with rationale and quotes, pending decisions with options and owners
17. **Report Card** - Section-by-section completion with progress bars, biggest jumps, still needs work

## GOOGLE DRIVE VAULT

Set up the Google Drive API vault creator (reference `scripts/drive-vault/` from Duininck):
1. OAuth2 authentication with stored token
2. Create folder structure with 10+ top-level folders
3. Create markdown files with hybrid prompts (AI-executable + human brief)
4. Proprietary methodology baked into prompt engine (not visible in client files)
5. `npm run create-vault` creates everything in Drive
6. `npm run update-vault` pushes research output to Drive

Credentials are already at `scripts/drive-vault/credentials.json` (reuse from Duininck project).

## ACTION ITEM FRAMING

Every action headline follows: **problem + solution direction**
- "Every Google impression tells the wrong story. One CMS edit fixes it."
- "9 employee reviews vs. 114 for the competitor. The culture is strong; the evidence is invisible."

Solutions lean toward building custom systems the client's team OWNS rather than subscribing to tools that own them. We are not recommending Buffer or Sprout Social. We are building workflows, automations, and templates the team runs internally.

## WHAT NOT TO DO
- Do not fabricate data. Use labeled placeholders where data is missing.
- Do not present confirmed decisions as discoveries. Present them as "confirmed, and here's what we built on top."
- Do not include the Research Pipeline or internal methodology in client-facing walkthrough.
- Do not use em dashes anywhere.
- Do not be generic. Every insight must be specific to this client and their competitive landscape.

## FIRST STEPS

1. Create the project directory: `[client-slug]-brand-hq/`
2. Clone `ui.tsx` from Duininck (adapt colors)
3. Set up `brandData.ts` with client information from discovery call
4. Build the app shell (App.tsx with all nav groups)
5. Process the discovery call transcript into structured data
6. Begin research in order: Company Profile > Audience > Competitive > Digital > Visual > Verbal > Industry
7. Create Drive vault with `npm run create-vault`
8. Build pages as research completes
9. Deploy to GitHub Pages

Ask me any questions before starting.
