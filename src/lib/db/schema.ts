import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// Enums
export const guideStatusEnum = pgEnum("guide_status", [
  "published",
  "in_development",
  "proposed",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "pending",
  "approved",
  "rejected",
  "info_requested",
]);

export const userRoleEnum = pgEnum("user_role", ["admin", "editor"]);

// NextAuth required tables
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  role: userRoleEnum("role").default("editor").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// Application tables
export const guides = pgTable("guides", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  country: text("country").notNull(),
  status: guideStatusEnum("status").default("proposed").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const applications = pgTable("applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  countries: text("countries").array().notNull(),
  languages: text("languages").notNull(),
  interestedGuideIds: uuid("interested_guide_ids").array(),
  proposeNewGuide: text("propose_new_guide"),
  background: text("background").notNull(),
  markdownFamiliarity: varchar("markdown_familiarity", { length: 50 }).notNull(),
  githubFamiliarity: varchar("github_familiarity", { length: 50 }).notNull(),
  status: applicationStatusEnum("status").default("pending").notNull(),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Types
export type Guide = typeof guides.$inferSelect;
export type NewGuide = typeof guides.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
export type User = typeof users.$inferSelect;
