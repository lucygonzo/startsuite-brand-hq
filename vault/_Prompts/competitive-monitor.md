# Competitive Intelligence Monitor Prompt
> Copy this entire file into a new Claude session to run a weekly competitive scan.
> Replace [CLIENT NAME] and [WEEK OF] with the current client and date.
> Best run every Monday morning to catch weekend launches and Monday announcements.
> Last updated: March 2026

---

## HOW TO USE THIS PROMPT

1. Open a new Claude session with web search enabled
2. Paste this entire file
3. Fill in the client name and date
4. Attach the current versions of `vault/07-Competitive/landscape.md` and `vault/07-Competitive/swot.md`
5. Claude will scan the competitive landscape and produce a structured intelligence report
6. Review the output and update vault files where flagged

---

## THE PROMPT (copy everything below this line)

---

You are conducting a weekly competitive intelligence scan for [CLIENT NAME], a client of StartSuite. Your job is to check what changed in the competitive landscape this week and determine what, if anything, requires action.

**Week of:** [WEEK OF, e.g., March 24, 2026]

Most weeks, nothing significant changes. That is fine. The value of this process is catching the week something does change before it becomes a problem. Apply the Signal vs. Noise filter aggressively. Do not inflate minor activity into strategic threats.

---

## REQUIRED CONTEXT (attach these vault files)

- `vault/07-Competitive/landscape.md` - Current competitive landscape and positioning
- `vault/07-Competitive/swot.md` - Current SWOT analysis

If these files are not available, state what you need before proceeding.

---

## WHAT TO CHECK

### 1. Competitor Websites (check each named competitor in landscape.md)

For each competitor:
- Homepage: has the hero message, tagline, or primary CTA changed?
- Pricing page: any changes to tiers, pricing, or packaging?
- Product page: new features announced, new integrations, or repositioning?
- Blog/news: any announcements in the last 7 days?
- Careers page: new roles that signal strategic direction? (e.g., hiring an enterprise sales team = moving upmarket)

### 2. Competitor Social Activity (LinkedIn primary, Twitter/X secondary)

For each competitor:
- LinkedIn company page: any posts in the last 7 days? What are they talking about?
- Founder/CEO LinkedIn: any notable posts, articles, or engagement?
- Are they running ads? (check LinkedIn ad library if accessible)
- Any new partnerships, case studies, or client announcements?

### 3. New Entrants and AI Tools

- Search for new companies launched this week in [CLIENT NAME]'s space
- Check Product Hunt, Hacker News, and TechCrunch for new AI creative/brand tools
- Search for new funding rounds in adjacent categories
- Any notable acquisitions or mergers?

### 4. Industry News

- Search for industry news relevant to [CLIENT NAME]'s vertical
- Regulatory changes that could affect the market
- Market sizing reports or analyst coverage
- Trend pieces that signal where the market is heading

---

## COMPETITOR CATEGORIES TO MONITOR

Use the 6-category framework. Not all categories need weekly monitoring at the same depth:

| Category | Client Label | Monitoring Depth |
|---|---|---|
| Direct Competitors | Head-to-Head Market Players | **Deep** - check every source weekly |
| Adjacent Competitors | Alternative Solution Providers | **Medium** - check websites and major announcements |
| Industry Relatives | Industry Peers | **Light** - scan for major news only |
| Audience Relatives | Attention Competitors | **Light** - note if they are capturing attention in new ways |
| Sister-Business Models | Structural Parallels | **Quarterly** - skip unless flagged |
| Inspiration Companies | Messaging & Positioning Benchmarks | **Quarterly** - skip unless flagged |

---

## SIGNAL VS. NOISE FILTER

Before including anything in the report, run it through this filter:

**Is this a signal?** (include it)
- A direct competitor changed their pricing or positioning
- A new entrant raised funding and is targeting the same audience
- A competitor launched a feature that addresses a gap [CLIENT NAME] also has
- An industry trend is accelerating that validates or threatens [CLIENT NAME]'s strategy
- A competitor hired a key person from [CLIENT NAME]'s target talent pool
- A client or prospect publicly praised or complained about a competitor

**Is this noise?** (skip it)
- A competitor posted a generic LinkedIn update
- A competitor published a blog post that is just content marketing
- A minor feature update that does not change competitive dynamics
- An industry article that restates known trends without new data
- A competitor changed their website font or layout without changing messaging

**The test:** Would Lucy or the client change a decision or accelerate a priority based on this information? If no, it is noise.

---

## OUTPUT FORMAT

Structure the report exactly as follows:

```markdown
# Competitive Intelligence Report: [CLIENT NAME]
## Week of [DATE]

### Executive Summary
[2-3 sentences: what changed this week that matters. If nothing material changed, say so.]

---

### What Changed

#### Direct Competitors
| Competitor | Change | Significance | Source |
|---|---|---|---|
| [Name] | [What changed] | [High / Medium / Low] | [URL] |

#### Adjacent / New Entrants
| Company | What Happened | Why It Matters | Source |
|---|---|---|---|
| [Name] | [Description] | [Impact on CLIENT NAME] | [URL] |

#### Industry & Market
| Signal | Category | Relevance | Source |
|---|---|---|---|
| [Description] | [Trend / Regulation / Funding / Other] | [How it affects CLIENT NAME] | [URL] |

---

### New Threats
[List any new threats identified this week. For each: what it is, why it matters, how urgent it is. If none, write "No new threats identified this week."]

### New Opportunities
[List any new opportunities identified this week. For each: what it is, why it matters, how to act on it. If none, write "No new opportunities identified this week."]

### Recommended Actions
[Specific, actionable recommendations. Prioritized. Each should follow the problem + solution direction format.]

1. **[Priority: High/Medium/Low]** [Problem statement]. [Recommended action].
2. ...

---

### Vault Updates Required
[List specific vault files that should be updated based on this week's findings.]

| File | What to Update | Urgency |
|---|---|---|
| `07-Competitive/landscape.md` | [Specific change] | [Now / This week / Next review] |
| `07-Competitive/swot.md` | [Specific change] | [Now / This week / Next review] |

If no updates are needed, write "No vault updates required this week."

---

### Monitoring Notes
[Any changes to the monitoring list: new competitors to add, competitors to deprioritize, new sources to check.]
```

---

## RULES

1. **Do not inflate.** If nothing changed, the report should be short. A "nothing happened" report is still valuable because it confirms stability.
2. **Source everything.** Every claim needs a URL or specific source. No "I noticed that..." without evidence.
3. **Competitor perspective, not just inventory.** Do not just report what happened. Analyze why it matters for [CLIENT NAME].
4. **No em dashes.** Use commas, colons, or restructure.
5. **Be direct.** If a competitor made a smart move, say so. If they made a mistake, say that too. This is internal intelligence, not diplomacy.
6. **Flag update triggers.** If a finding is significant enough to change the competitive landscape or SWOT, explicitly flag which vault files need updating and what the update should be.

---

## FINAL INSTRUCTIONS

This is an intelligence report, not a research paper. Keep it sharp and actionable.

The goal is to catch one thing per month that actually matters, not to produce a weekly document that nobody reads. If the filter says everything this week is noise, the report should say "Nothing material changed. Here is what we checked." That is a good report.

Time spent: aim for thoroughness on direct competitors, efficiency on everything else. 80% of value comes from 20% of the monitoring.
