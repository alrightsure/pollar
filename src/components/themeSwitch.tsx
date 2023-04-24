"use client";

import { Toggle } from "@/components/ui/toggle";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    return (
        <Toggle aria-label="Toggle dark mode" pressed={mounted ? theme === "dark" : undefined} onPressedChange={e => setTheme(e ? "dark" : "light")}>
            <Moon className="h-4 w-4" />
        </Toggle>
    );
}
