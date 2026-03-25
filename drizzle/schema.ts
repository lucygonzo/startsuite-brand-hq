import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================================
// DECISION AUDIT LOG
// Persists strategic decisions with full context, rationale,
// alternatives, tradeoffs, and success metrics.
// ============================================================

export const decisions = mysqlTable("decisions", {
  id: int("id").autoincrement().primaryKey(),
  /** Human-readable ID like DEC-001, DEC-002 */
  slug: varchar("slug", { length: 32 }).notNull().unique(),
  title: varchar("title", { length: 512 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  status: mysqlEnum("status", ["Active", "Under Review", "Superseded", "Pending"]).default("Active").notNull(),
  owner: varchar("owner", { length: 128 }).notNull().default("Lucy"),
  /** Display date string e.g. "March 2026" */
  date: varchar("date", { length: 64 }).notNull(),
  /** Optional next review date string */
  reviewDate: varchar("reviewDate", { length: 64 }),
  /** The decision statement */
  decision: text("decision").notNull(),
  /** Background and situation that prompted the decision */
  context: text("context").notNull(),
  /** Why this decision was made */
  rationale: text("rationale").notNull(),
  /** JSON array of alternative options that were considered */
  alternativesConsidered: text("alternativesConsidered").notNull(),
  /** What is being given up or risked */
  tradeoffs: text("tradeoffs").notNull(),
  /** How success will be measured */
  successMetric: text("successMetric").notNull(),
  /** JSON array of tag strings */
  tags: text("tags").notNull(),
  /** Whether this was seeded from the strategy session (not AI-generated) */
  isSeeded: int("isSeeded").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Decision = typeof decisions.$inferSelect;
export type InsertDecision = typeof decisions.$inferInsert;
