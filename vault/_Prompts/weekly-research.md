# Weekly Brand Health Check Prompt
> Copy this entire file into a new Claude session to run a weekly brand health review.
> Replace [CLIENT NAME] and [WEEK OF] with the current client and date.
> Best run every Friday afternoon to capture the full week's performance.
> Last updated: March 2026

---

## HOW TO USE THIS PROMPT

1. Open a new Claude session with web search enabled
2. Paste this entire file
3. Fill in the client name and date
4. Attach or paste the relevant vault files listed in "Required Context"
5. Paste any analytics screenshots, LinkedIn stats, or YouTube Studio data you have
6. Claude will produce a "State of the Brand" weekly summary
7. Review, update vault files where flagged, and save to `vault/_Weekly-Research/`

---

## THE PROMPT (copy everything below this line)

---

You are conducting a weekly brand health check for [CLIENT NAME], a client of StartSuite. Your job is to review how the brand performed this week, identify what is working, what is not, and produce a summary that feeds into the monthly strategic review.

**Week of:** [WEEK OF, e.g., March 24, 2026]

This is a health check, not an audit. Keep it focused and actionable. The monthly call is where deep strategy happens. This weekly review ensures nothing falls through the cracks between calls.

---

## REQUIRED CONTEXT (attach these vault files)

- `vault/08-Digital/content-strategy.md` - Current content pillars and platform strategy
- `vault/14-Gap-Analysis/perception-scores.md` - Current brand perception scores and dimensions

**Also helpful (attach if available):**
- `vault/08-Digital/platform-rules.md` - Platform-specific engagement rules
- `vault/06-Audience/segmentation.md` - Audience segments for context
- Previous week's report from `vault/_Weekly-Research/` (for trend comparison)
- LinkedIn analytics screenshot or export
- YouTube Studio dashboard screenshot
- Website analytics (Google Analytics, Plausible, etc.)
- Any client feedback or communications from the week

---

## WHAT TO REVIEW

### 1. Content Performance

**LinkedIn:**
- Posts published this week: count, topics, formats
- Engagement metrics: impressions, reactions, comments, shares, click-through
- Which post performed best and why (analyze the content, not just the numbers)
- Which post underperformed and why
- Comment quality: are the right people engaging? Or is it vanity engagement?
- Profile views and connection requests trend

**YouTube (if active):**
- Videos published: count, topics, length
- Watch time (the metric that matters, not views or subscribers)
- Average view duration: are people staying or dropping off?
- Click-through rate on thumbnails
- Top traffic sources

**Email (if active):**
- Emails sent: count, topics
- Open rate and click rate
- Unsubscribes
- Reply rate (the most honest engagement metric)

**Website:**
- Traffic trend: up, down, or flat vs. previous week
- Top pages visited
- Time on site
- Referral sources: where is traffic coming from?
- Any notable search queries driving traffic

### 2. Client Engagement Signals

- Any inbound inquiries or leads this week?
- Client feedback received (positive or negative)
- Discovery calls scheduled or completed
- Proposals sent or contracts signed
- Any public mentions, tags, or shares by clients or prospects?
- NPS or satisfaction signals

### 3. Competitive Signals (light check, not the full monitor)

- Did any direct competitor do something notable this week?
- Any industry news that affects [CLIENT NAME]'s positioning?
- Cross-reference with the competitive-monitor.md report if it was run this week

### 4. Brand Consistency Check

- Was all published content on-voice? (Spot check against voice-guidelines.md)
- Were platform-specific rules followed?
- Any content that felt off-brand or inconsistent?
- Any external communications (press, partnerships, client-facing) that need alignment?

---

## ESCALATION FRAMEWORK

Not everything needs to be flagged immediately. Use this framework:

### Escalate Immediately (notify Lucy/team same day)
- A client publicly complained about [CLIENT NAME] or the service
- A major competitor launched something that directly threatens positioning
- A piece of content went viral for the wrong reasons
- A significant lead or partnership opportunity appeared
- Website is down or a major technical issue is visible
- A media inquiry or press opportunity arrived

### Flag for Monthly Review (include in the report, discuss at monthly call)
- Content performance trends shifting (up or down)
- Audience engagement patterns changing
- Gap Analysis scores need adjustment based on new evidence
- New audience segment emerging in engagement data
- Content pillar performing consistently better or worse than others
- Competitive positioning shift that is gradual, not sudden

### Note and Monitor (track, do not act yet)
- Minor fluctuations in engagement metrics
- Single underperforming post (one data point is not a trend)
- Competitor hires or small product updates
- Industry commentary that is interesting but not actionable

---

## OUTPUT FORMAT

Structure the report exactly as follows. Save as `vault/_Weekly-Research/[YYYY-MM-DD]-weekly.md`.

```markdown
# State of the Brand: [CLIENT NAME]
## Week of [DATE]

### One-Line Summary
[Single sentence: how did the brand do this week? Be honest.]

---

### Wins
[What went well this week. Be specific: which content, which metric, which client interaction.]

1. **[Win]**: [What happened and why it matters]
2. ...

### Concerns
[What did not go well or needs attention. Be direct, not alarmist.]

1. **[Concern]**: [What happened, how significant it is, and whether it needs immediate action or monitoring]
2. ...

---

### Content Performance

#### LinkedIn
| Metric | This Week | Last Week | Trend |
|---|---|---|---|
| Posts Published | [#] | [#] | [up/down/flat] |
| Total Impressions | [#] | [#] | [up/down/flat] |
| Engagement Rate | [%] | [%] | [up/down/flat] |
| Profile Views | [#] | [#] | [up/down/flat] |

**Best Performing Post:** [Title/topic] - [Why it worked]
**Worst Performing Post:** [Title/topic] - [Why it underperformed]

#### YouTube
| Metric | This Week | Last Week | Trend |
|---|---|---|---|
| Watch Time (hours) | [#] | [#] | [up/down/flat] |
| Avg View Duration | [time] | [time] | [up/down/flat] |
| New Subscribers | [#] | [#] | [up/down/flat] |
| CTR | [%] | [%] | [up/down/flat] |

#### Website
| Metric | This Week | Last Week | Trend |
|---|---|---|---|
| Visitors | [#] | [#] | [up/down/flat] |
| Avg Time on Site | [time] | [time] | [up/down/flat] |
| Top Referral Source | [source] | [source] | [change?] |

[If data is not available for any section, write "Data not provided this week" rather than guessing.]

---

### Competitive Signals
[Brief: anything notable from competitors this week. If nothing, say "No notable competitive activity."]

---

### Recommended Actions for Monthly Call
[Items to discuss at the next monthly strategic review. Prioritized.]

1. **[Topic]**: [Why it should be discussed and what decision is needed]
2. ...

---

### What to Update

Map findings to specific vault files. Only list updates that are actually warranted.

| Vault File | What Changed | Update Description |
|---|---|---|
| `08-Digital/content-strategy.md` | [What changed] | [Specific update to make] |
| `14-Gap-Analysis/perception-scores.md` | [What changed] | [Specific score adjustment and why] |
| `06-Audience/segmentation.md` | [What changed] | [New insight about a segment] |
| `07-Competitive/landscape.md` | [What changed] | [Competitive shift to record] |

If no updates are warranted, write "No vault updates needed this week."

---

### Data Gaps
[What data was missing this week that would have made this report better? This helps improve the process.]

- [e.g., "No LinkedIn analytics provided. Request screenshot export from Lucy."]
- [e.g., "Website analytics not connected yet. Need Google Analytics access."]
```

---

## RULES

1. **Trends over snapshots.** One week's data means almost nothing. Always compare to last week and note whether something is a trend or a blip.
2. **Do not spin.** If it was a bad week, say it was a bad week. Honest assessment is more valuable than optimistic framing.
3. **Actionable or skip it.** If a finding does not lead to a decision, an update, or a monitoring note, leave it out.
4. **No em dashes.** Use commas, colons, or restructure.
5. **Data gaps are part of the report.** If you do not have data for a section, say so. The gap itself is useful information because it tells us what to set up.
6. **Respect the escalation framework.** Do not bury urgent items in a weekly summary. Flag them clearly.
7. **Keep it under 2 pages when printed.** This should take 5 minutes to read, not 30.

---

## FINAL INSTRUCTIONS

This weekly check is a habit, not a project. The reports should be consistent in format so they are easy to scan over time.

The most important output is the "Recommended Actions for Monthly Call" section. Everything else feeds into it. When Lucy opens the monthly call, she should be able to pull the last 4 weekly reports and have a clear picture of what happened, what changed, and what to decide.

Save every report to `vault/_Weekly-Research/` with the filename format `YYYY-MM-DD-weekly.md`. Over time, this becomes the brand's memory.
