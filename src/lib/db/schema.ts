import { InferModel } from "drizzle-orm";
import { pgTable, serial, integer, timestamp, text } from "drizzle-orm/pg-core";

export const polls = pgTable("polls", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    question: text("question").notNull()
});

export const options = pgTable("options", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    text: text("text").notNull(),
    pollId: integer("poll_id")
        .references(() => polls.id)
        .notNull()
});
export type Option = InferModel<typeof options>;

export const responses = pgTable("responses", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    optionId: integer("option_id")
        .references(() => options.id)
        .notNull()
});
