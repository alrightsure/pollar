"use client";

import { Toggle } from "@/components/ui/toggle";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Toggle aria-label="Toggle dark mode" defaultPressed={theme === "dark"} onPressedChange={e => setTheme(e ? "dark" : "light")}>
            <Moon className="h-4 w-4" />
        </Toggle>
    );
}
