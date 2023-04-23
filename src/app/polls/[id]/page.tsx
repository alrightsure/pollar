import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { PollForm } from "./pollForm";
import { options } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime ="experimental-edge";

async function getOptions(pollId: number) {
    return await db.select().from(options).where(eq(options.pollId, pollId));
}

export default async function PollSubmission({ params }: { params: { id: number } }) {
    const options = await getOptions(params.id);
    return <PollForm pollId={params.id} options={options} />;
}
