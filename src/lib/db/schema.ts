import { InferModel } from "drizzle-orm";
import { serial, int, timestamp, text, mysqlTable } from "drizzle-orm/mysql-core";

export const polls = mysqlTable("polls", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    question: text("question").notNull()
});

export const options = mysqlTable("options", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    text: text("text").notNull(),
    pollId: int("poll_id").notNull()
});
export type Option = InferModel<typeof options>;

export const responses = mysqlTable("responses", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    optionId: int("option_id").notNull()
});
