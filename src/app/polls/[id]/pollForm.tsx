"use client"

import { Button } from "@/components/ui/button";
import type { Option } from "@/lib/db/schema";
import { useState } from "react";
import { respondToPoll } from "@/app/api/respondToPoll";
import { useRouter } from "next/navigation";

export const runtime ="experimental-edge";

interface PollFormProps {
    pollId: number;
    options: Option[];
}

export function PollForm({ pollId, options }: PollFormProps) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (optionId: number) => {
        setSubmitting(true);
        await respondToPoll({ optionId });
        setSubmitting(false);
        router.push(`/polls/${pollId}/results`);
    };

    return (
        <div className="flex flex-col gap-4">
            {options.map(option => (
                <Button key={option.id} onClick={() => onSubmit(option.id)}>
                    {option.text}
                </Button>
            ))}
        </div>
    );
}
