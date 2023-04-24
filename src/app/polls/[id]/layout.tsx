import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";
import { polls } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function getPoll(pollId: number) {
    const pollResp = await db.select().from(polls).where(eq(polls.id, pollId));
    return pollResp[0];
}

export default async function Poll({ children, params }: { children: React.ReactNode; params: { id: number } }) {
    const poll = await getPoll(params.id);

    return (
        <div className="container flex flex-col justify-center items-center h-full gap-4">
            <h1>{poll.question}</h1>
            <Card className="lg:w-1/2 w-full p-4">
                <CardContent className="pt-2">{children}</CardContent>
            </Card>
        </div>
    );
}
