import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { z } from "zod";
import {
  listDecisions,
  insertDecision,
  updateDecisionStatus,
  countDecisions,
} from "./db";

// ============================================================
// STARTSUITE BRAND HQ — SERVER ROUTERS
// ============================================================

const BRAND_CONTEXT = `You are a strategic brand advisor embedded in the StartSuite Brand HQ.
StartSuite is a brand intelligence company that builds living brand systems for early-stage, VC-backed founders.
The company was founded in 2025 by Reagan Renfroe (Creative Director) with Lucy Gonzalez as Strategic Partner and Eric Andreae as Brand Designer.
StartSuite is backed by 46Capital out of Tulsa, Oklahoma.
The brand tagline is "Creative Infrastructure for Founders."
The brand voice is: confident, direct, strategic, authoritative but never arrogant. Never corporate. Never performative.
StartSuite delivers 60-day foundation builds followed by ongoing retainer relationships, not one-off projects.
The model is senior-led, AI-accelerated, with an investor perspective that compounds brand value over time.
Core services: Brand Identity System, Asset Infrastructure, Website, Strategic Support, Pitch Materials.
Proof points: $16M+ capital raised by clients, 11+ startups supported, 4.74/5 satisfaction score.
Future vision: Platform-as-a-Service (PaaS) for brand infrastructure, launching self-serve beta in 2026.
All decisions logged here are strategic choices about brand, product, revenue, content, technology, partnerships, audience, or go-to-market.
When analyzing documents or shifts, focus on: what changed strategically, what decision was made or implied, and what the rationale and tradeoffs are.
Never use em dashes. Write in clear, direct prose.`;

// Helper to generate a slug like DEC-042
function makeSlug(count: number): string {
  return `DEC-${String(count + 1).padStart(3, "0")}`;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  decisions: router({
    // List all decisions from the database, newest first
    list: publicProcedure.query(async () => {
      const rows = await listDecisions();
      return rows.map((r) => ({
        ...r,
        alternativesConsidered: JSON.parse(r.alternativesConsidered || "[]") as string[],
        tags: JSON.parse(r.tags || "[]") as string[],
        reviewDate: r.reviewDate ?? undefined,
      }));
    }),

    // Seed the strategy-session decisions (idempotent)
    seed: publicProcedure
      .input(z.object({
        entries: z.array(z.object({
          title: z.string(),
          category: z.string(),
          status: z.enum(["Active", "Under Review", "Superseded", "Pending"]),
          owner: z.string(),
          date: z.string(),
          reviewDate: z.string().optional(),
          decision: z.string(),
          context: z.string(),
          rationale: z.string(),
          alternativesConsidered: z.array(z.string()),
          tradeoffs: z.string(),
          successMetric: z.string(),
          tags: z.array(z.string()),
        })),
      }))
      .mutation(async ({ input }) => {
        const existing = await countDecisions();
        if (existing > 0) {
          return { seeded: 0, message: "Already seeded" };
        }
        let count = 0;
        for (const entry of input.entries) {
          await insertDecision({
            slug: makeSlug(count),
            title: entry.title,
            category: entry.category,
            status: entry.status,
            owner: entry.owner,
            date: entry.date,
            reviewDate: entry.reviewDate ?? null,
            decision: entry.decision,
            context: entry.context,
            rationale: entry.rationale,
            alternativesConsidered: JSON.stringify(entry.alternativesConsidered),
            tradeoffs: entry.tradeoffs,
            successMetric: entry.successMetric,
            tags: JSON.stringify(entry.tags),
            isSeeded: 1,
          });
          count++;
        }
        return { seeded: count, message: `Seeded ${count} decisions` };
      }),

    // Update the status of a decision
    updateStatus: publicProcedure
      .input(z.object({
        slug: z.string(),
        status: z.enum(["Active", "Under Review", "Superseded", "Pending"]),
      }))
      .mutation(async ({ input }) => {
        await updateDecisionStatus(input.slug, input.status);
        return { success: true };
      }),

    // Summarize a document or shift and return a draft for approval
    summarize: publicProcedure
      .input(z.object({
        content: z.string().min(10).max(50000),
        contentType: z.enum(["document", "shift_description"]),
      }))
      .mutation(async ({ input }) => {
        const prompt = input.contentType === "document"
          ? `The user has uploaded a document to the StartSuite Brand HQ. Read it carefully and identify the most significant strategic decision or shift it implies or contains.

Document content:
---
${input.content}
---

Return a plain-language summary in this exact JSON format:
{
  "decisionTitle": "A clear, specific title for the strategic decision (max 12 words)",
  "suggestedCategory": "One of: Brand Strategy, Product, Revenue, Content, Technology, Partnerships, Audience, Go-to-Market",
  "summaryForApproval": "2-3 sentences describing what decision was made or implied, and why it matters for StartSuite. Write as if briefing the owner before they approve the full entry.",
  "keyShift": "One sentence: what specifically changed or was decided?",
  "affectedSections": ["list of Brand HQ sections this touches, e.g. Brand Identity, Product Strategy, Revenue Model"]
}`
          : `The user has described a strategic shift or decision for the StartSuite Brand HQ:

"${input.content}"

Return a plain-language summary in this exact JSON format:
{
  "decisionTitle": "A clear, specific title for the strategic decision (max 12 words)",
  "suggestedCategory": "One of: Brand Strategy, Product, Revenue, Content, Technology, Partnerships, Audience, Go-to-Market",
  "summaryForApproval": "2-3 sentences describing what decision was made or implied, and why it matters for StartSuite. Write as if briefing the owner before they approve the full entry.",
  "keyShift": "One sentence: what specifically changed or was decided?",
  "affectedSections": ["list of Brand HQ sections this touches, e.g. Brand Identity, Product Strategy, Revenue Model"]
}`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: BRAND_CONTEXT },
            { role: "user", content: prompt },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "decision_summary",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  decisionTitle: { type: "string" },
                  suggestedCategory: { type: "string" },
                  summaryForApproval: { type: "string" },
                  keyShift: { type: "string" },
                  affectedSections: { type: "array", items: { type: "string" } },
                },
                required: ["decisionTitle", "suggestedCategory", "summaryForApproval", "keyShift", "affectedSections"],
                additionalProperties: false,
              },
            },
          },
        });

        const rawContent = response.choices[0]?.message?.content;
        const raw = typeof rawContent === "string" ? rawContent : "{}";
        return JSON.parse(raw) as {
          decisionTitle: string;
          suggestedCategory: string;
          summaryForApproval: string;
          keyShift: string;
          affectedSections: string[];
        };
      }),

    // Generate the full structured decision entry after approval
    generateEntry: publicProcedure
      .input(z.object({
        originalContent: z.string().min(10).max(50000),
        approvedTitle: z.string(),
        approvedCategory: z.string(),
        approvedSummary: z.string(),
        userNotes: z.string().optional(),
        owner: z.string().default("Lucy"),
        date: z.string(),
      }))
      .mutation(async ({ input }) => {
        const prompt = `You are generating a full Decision Audit Log entry for the StartSuite Brand HQ.

The owner has approved this summary:
Title: ${input.approvedTitle}
Category: ${input.approvedCategory}
Summary: ${input.approvedSummary}
${input.userNotes ? `Owner notes: ${input.userNotes}` : ""}

Original source material:
---
${input.originalContent}
---

Generate a complete, detailed decision entry in this exact JSON format. Write with authority and specificity. Never use em dashes. Be direct and concrete:
{
  "context": "2-4 sentences explaining the situation, background, and what prompted this decision. What was happening at StartSuite that made this decision necessary?",
  "decision": "1-2 sentences stating exactly what was decided. Clear and unambiguous.",
  "rationale": "3-5 sentences explaining WHY this decision was made. What evidence, logic, or strategic reasoning supports it? What makes it the right call for StartSuite specifically?",
  "alternativesConsidered": [
    "Alternative 1 description and why it was not chosen",
    "Alternative 2 description and why it was not chosen",
    "Alternative 3 description and why it was not chosen"
  ],
  "tradeoffs": "2-3 sentences on what is being given up or risked by making this decision. Be honest about the downsides.",
  "successMetric": "2-3 sentences on how you will know this decision worked. What are the specific, measurable signals of success?",
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: BRAND_CONTEXT },
            { role: "user", content: prompt },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "decision_entry",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  context: { type: "string" },
                  decision: { type: "string" },
                  rationale: { type: "string" },
                  alternativesConsidered: { type: "array", items: { type: "string" } },
                  tradeoffs: { type: "string" },
                  successMetric: { type: "string" },
                  tags: { type: "array", items: { type: "string" } },
                },
                required: ["context", "decision", "rationale", "alternativesConsidered", "tradeoffs", "successMetric", "tags"],
                additionalProperties: false,
              },
            },
          },
        });

        const rawContent2 = response.choices[0]?.message?.content;
        const raw = typeof rawContent2 === "string" ? rawContent2 : "{}";
        const generated = JSON.parse(raw) as {
          context: string;
          decision: string;
          rationale: string;
          alternativesConsidered: string[];
          tradeoffs: string;
          successMetric: string;
          tags: string[];
        };

        // Persist to database
        const count = await countDecisions();
        const slug = makeSlug(count);
        const saved = await insertDecision({
          slug,
          title: input.approvedTitle,
          category: input.approvedCategory,
          status: "Active",
          owner: input.owner,
          date: input.date,
          reviewDate: null,
          decision: generated.decision,
          context: generated.context,
          rationale: generated.rationale,
          alternativesConsidered: JSON.stringify(generated.alternativesConsidered),
          tradeoffs: generated.tradeoffs,
          successMetric: generated.successMetric,
          tags: JSON.stringify(generated.tags),
          isSeeded: 0,
        });

        return {
          id: saved?.id ?? count + 1,
          slug,
          title: input.approvedTitle,
          category: input.approvedCategory,
          status: "Active" as const,
          date: input.date,
          owner: input.owner,
          reviewDate: undefined,
          ...generated,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
