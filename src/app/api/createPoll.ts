"use server";

import { z } from "zod";
import { zact } from "zact/server";
import { db } from "@/lib/db";
import { options, polls } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

const createPollSchema = z.object({
    question: z.string(),
    options: z.array(z.string())
});

export type CreatePollInput = z.infer<typeof createPollSchema>;

export const createPoll = zact(createPollSchema)(async input => {
    const id = await db.transaction(async tx => {
        await tx.insert(polls).values({
            question: input.question
        });

        const pollsResp = await tx.select({ id: sql<number>`LAST_INSERT_ID()` }).from(polls);
        const id = pollsResp[0].id;

        await tx.insert(options).values(input.options.map(text => ({ text: text, pollId: id })));
        return id;
    });

    return id;
});
