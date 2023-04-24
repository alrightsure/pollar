import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter } from "next/font/google";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Providers } from "@/components/providers";
import { ThemeSwitch } from "@/components/themeSwitch";

export const runtime = "experimental-edge";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Pollar",
    description: "Create, answer polls"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-screen" suppressHydrationWarning>
            <body className={cn(inter.className, "h-full")}>
                <Providers>
                    <div className="relative flex min-h-screen flex-col h-full">
                        <Navbar />
                        <div className="flex-1">{children}</div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}

function Navbar() {
    return (
        <NavigationMenu className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur flex-grow-0 items-center">
            <div className="container">
                <NavigationMenuList className="flex items-center justify-between h-4">
                    <NavigationMenuItem className="mt-0">
                        <Link href="/" legacyBehavior>
                            <NavigationMenuLink className="font-bold text-xl">Pollar</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="mt-0">
                        <ThemeSwitch />
                    </NavigationMenuItem>
                </NavigationMenuList>
            </div>
        </NavigationMenu>
    );
}
