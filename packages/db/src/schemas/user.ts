
import { serial, text, timestamp, pgTable, pgSchema, pgEnum, numeric, integer } from "drizzle-orm/pg-core";

export const authEnum = pgEnum("auth_type", ["email", "google", "github"]);
export const onRampStatus = pgEnum("onramp_status", ["Success", "Failure", "Processing"]);
export type OnRampStatusType = "Success" | "Failure" | "Processing";

export const usersSchema = pgSchema("users")

export const usersTable = usersSchema.table("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  name: text("name"),
  number: text("number").unique().notNull(),
  password: text("password").notNull(),
  authType: authEnum("auth_type").default("email").notNull(),
})

export type UserTable = typeof usersTable.$inferSelect

export const onRampTransactionsTable = usersSchema.table("onramp_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }).notNull(),
  status: onRampStatus("status").notNull(),
  token: text("token").unique().notNull(),
  provider: text("provider").notNull(),
  amount: integer("amount").notNull(),
  startTime: timestamp("start_time", { mode: "date", withTimezone: true }).notNull()
})

export type OnRampTransactionsTable = typeof onRampTransactionsTable.$inferSelect

export const balancesTable = usersSchema.table("balance", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }).unique().notNull(),
  amount: integer("amount").notNull(),
  locked: integer("locked").notNull(),
})
export type BalancesTable = typeof balancesTable.$inferSelect

export const p2pTransfersTable = usersSchema.table("p2p_transfers", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  timestamp: timestamp("timestamp", { mode: "date", withTimezone: true }).notNull(),
  fromUserId: integer("from_user_id").notNull().references(() => usersTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }).notNull(),
  toUserId: integer("to_user_id").notNull().references(() => usersTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }).notNull(),
})
export type P2PTransfersTable = typeof p2pTransfersTable.$inferInsert