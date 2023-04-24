import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { options, responses } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { eq, sql } from "drizzle-orm";

export const runtime ="experimental-edge";

async function getResults(pollId: number) {
    return await db
        .select({
            id: options.id,
            text: options.text,
            responses: sql<number>`count(${responses.id})`
        })
        .from(options)
        .leftJoin(responses, eq(responses.optionId, options.id))
        .where(eq(options.pollId, pollId))
        .groupBy(options.id, options.text);
}

export default async function PollResults({ params }: { params: { id: number } }) {
    const options = await getResults(params.id);
    const totalResponses = options.reduce((acc, option) => acc + parseInt(option.responses.toString()), 0);

    return (
        <div className="space-y-4">
            {options.map(option => {
                const percentage = (option.responses / totalResponses) * 100;

                return (
                    <div key={option.id}>
                        <Label>{option.text}</Label>
                        <div className="relative group">
                            <Progress value={percentage} className="h-8" />
                            <div className={cn("absolute inset-y-0 left-4 flex items-center font-extrabold", percentage > 3 && "dark:text-black text-white")}>
                                {option.responses}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
