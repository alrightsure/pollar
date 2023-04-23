"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createPoll, type CreatePollInput } from "@/app/api/createPoll";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function CreatePoll() {
    const [options, setOptions] = useState(["", ""]);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<CreatePollInput>();

    const onSubmit = handleSubmit(async data => {
        const pollId = await createPoll(data);
        return router.push(`/polls/${pollId}`);
    });

    return (
        <div className="container flex flex-col justify-center items-center h-full gap-4">
            <h1>Create a Poll</h1>
            <form className="w-full flex justify-center" onSubmit={onSubmit}>
                <Card className="w-1/2">
                    <CardHeader className="border-b-2">
                        <Label htmlFor="question">Question</Label>
                        <Input {...register("question")} />
                    </CardHeader>
                    <CardContent className="pt-2 flex flex-col gap-2">
                        {options.map((option, index) => (
                            <div key={index} className="relative group">
                                <Input placeholder={`Option ${index + 1}`} {...register(`options.${index}` as const)} />
                                {index > 1 && (
                                    <div
                                        className="absolute inset-y-0 z-10 right-0 pr-3 flex items-center cursor-pointer invisible group-hover:visible"
                                        onClick={() => setOptions(prevOptions => [...prevOptions.slice(0, index), ...prevOptions.slice(index + 1)])}
                                    >
                                        <XCircle />
                                    </div>
                                )}
                            </div>
                        ))}
                        <Button variant="ghost" onClick={() => setOptions([...options, ""])} type="button">
                            Add Option
                        </Button>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" loading={isSubmitting}>
                            Create
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
