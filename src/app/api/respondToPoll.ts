"use server";

import { z } from "zod";
import { zact } from "zact/server";
import { db } from "@/lib/db";
import { responses } from "@/lib/db/schema";

const respondSchema = z.object({
    optionId: z.number()
});

export type RespondInput = z.infer<typeof respondSchema>;

export const respondToPoll = zact(respondSchema)(async input => {
    await db.insert(responses).values({
        optionId: input.optionId
    });

    return true;
});
