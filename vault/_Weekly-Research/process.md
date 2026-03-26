# Weekly Research Process
> StartSuite Brand HQ — Recurring Research Workflow
> Last updated: March 26, 2026

---

## Purpose

Keep the StartSuite Brand HQ current by running structured research weekly. This ensures competitive intelligence stays fresh, content strategy adapts to performance data, and strategic decisions are informed by real signals rather than assumptions.

## Cadence

| Day | Activity | Time | Output |
|-----|----------|------|--------|
| **Monday** | Competitive Monitor | 30 min | `_Weekly-Research/YYYY-MM-DD-competitive.md` |
| **Wednesday** | Brand Health Check | 30 min | `_Weekly-Research/YYYY-MM-DD-brand-health.md` |
| **Friday** | Review + Flag | 15 min | Update vault files if needed, flag items for monthly call |
| **Monthly (last Friday)** | Full Vault Audit | 60 min | Update stale files, refresh gap scores, log decisions |

---

## Monday: Competitive Monitor

### How to Run
1. Open a new Claude session
2. Copy the prompt from `vault/_Prompts/competitive-monitor.md`
3. Paste and run
4. Save the output to `vault/_Weekly-Research/YYYY-MM-DD-competitive.md`
5. If significant changes found, update the relevant files in `vault/07-Competitive/`

### What to Look For
- Competitor pricing changes (especially startup-focused agencies and AI tools)
- New AI creative tools launching that could affect the "creative operating system" positioning
- Competitor LinkedIn content that's gaining traction
- Industry news about startup branding, VC ecosystem, or AI creative workflows
- Any competitor explicitly using "creative operating system" or similar language

### Signal vs Noise Filter
Only flag if it:
- Directly affects StartSuite's pricing or positioning
- Represents a new competitor entering the white space
- Shows a trend that could change audience behavior
- Impacts a confirmed strategic decision

---

## Wednesday: Brand Health Check

### How to Run
1. Open a new Claude session
2. Copy the prompt from `vault/_Prompts/weekly-research.md`
3. Paste and run
4. Save the output to `vault/_Weekly-Research/YYYY-MM-DD-brand-health.md`
5. If performance data suggests strategy changes, flag for monthly call

### What to Review
- LinkedIn post performance (Reagan + Lucy personal accounts, StartSuite company page)
- YouTube video performance (views, watch time, subscriber growth)
- Website traffic trends (if analytics access available)
- Client engagement signals (new inquiries, referrals, meeting requests)
- Content quality: did anything published this week pass the expert insight test?

### Escalation Rules
**Escalate immediately** (don't wait for monthly):
- A competitor launches something that directly threatens a confirmed decision
- A prospect references a competitor we haven't tracked
- A client churns or expresses dissatisfaction
- A piece of content goes viral (positive or negative)

**Save for monthly review:**
- Gradual performance trends (up or down)
- New content ideas from audience engagement
- Minor competitive positioning shifts
- Pricing feedback from prospects

---

## Friday: Review + Flag

### 15-Minute Checklist
- [ ] Read Monday's competitive report and Wednesday's brand health report
- [ ] Identify any items that need immediate vault updates
- [ ] Flag items for the monthly "state of the union" call agenda
- [ ] If vault files were updated, commit + push to git repo
- [ ] Copy any updated files to corresponding GDrive folders

---

## Monthly: Full Vault Audit

### 60-Minute Deep Review

#### Section-by-Section Check
Go through each vault folder and ask:
1. Is this information still accurate?
2. Has anything changed since it was last updated?
3. Are there new insights from the past month that should be added?
4. Does this section still align with confirmed strategic decisions?

#### Specific Updates
- [ ] **07-Competitive**: Refresh SWOT and landscape based on 4 weeks of competitive monitoring
- [ ] **14-Gap-Analysis**: Update perception scores based on any new data
- [ ] **15-Revenue-Model**: Update revenue mix if new clients onboarded or pricing changed
- [ ] **16-Decision-Log**: Log any new confirmed or pending decisions from the month
- [ ] **17-Report-Card**: Update section completion percentages
- [ ] **13-Workspace**: Update action items status (Not Started → In Progress → Complete)

#### Monthly Report Template
Save to `_Weekly-Research/YYYY-MM-monthly-summary.md`:
```
# Monthly Brand Health Summary — [Month Year]

## Wins
- [What went well this month]

## Concerns
- [What needs attention]

## Competitive Shifts
- [Key changes in the competitive landscape]

## Content Performance
- [Top performing content and why]

## Vault Updates Made
- [List of files updated and why]

## Decisions to Discuss
- [Items for the next strategy call]

## Next Month Priorities
- [What to focus on]
```

---

## Automation Path (Future)

Once this manual process is validated (run it for 4 weeks), automate with:
1. Claude Code scheduled task for Monday competitive monitor
2. Claude Code scheduled task for Wednesday brand health check
3. Auto-commit vault updates to git
4. Notification to Lucy when significant changes are detected

The manual phase validates that the prompts produce useful output before we automate.
