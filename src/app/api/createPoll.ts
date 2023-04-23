"use server";

import { z } from "zod";
import { zact } from "zact/server";
import { db } from "@/lib/db";
import { options, polls } from "@/lib/db/schema";

const createPollSchema = z.object({
    question: z.string(),
    options: z.array(z.string())
});

export type CreatePollInput = z.infer<typeof createPollSchema>;

export const createPoll = zact(createPollSchema)(async input => {
    const id = await db.transaction(async tx => {
        const returnedPolls = await tx
            .insert(polls)
            .values({
                question: input.question
            })
            .returning();
        const id = returnedPolls[0].id;
        await tx.insert(options).values(input.options.map(text => ({ text: text, pollId: id })));

        return id;
    });

    return id;
});
