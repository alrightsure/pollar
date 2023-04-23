import Link from "next/link";
import { Button } from "@/components/ui/button";

export const runtime ="experimental-edge";

export default function Index() {
    return (
        <div className="h-full flex flex-col gap-4 justify-center items-center">
            <h1>Pollar</h1>
            <Link href="/polls/create">
                <Button size="lg">Create a Poll</Button>
            </Link>
        </div>
    );
}
