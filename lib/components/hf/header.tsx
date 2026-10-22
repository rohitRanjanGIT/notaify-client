"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ArrowRight, ArrowUpRight, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import BrandMark from "./brand-mark";

const navItems = [
    { name: "Features", href: "/features" },
    { name: "Docs", href: "/docs" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "npm", href: "https://www.npmjs.com/package/notaify", external: true },
];

function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Auth pages carry their own full-screen layout with branding.
    if (pathname === "/login" || pathname === "/register") return null;

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-[padding] duration-300",
                scrolled ? "pt-2" : "pt-3 sm:pt-4"
            )}
        >
            <div className="mx-auto max-w-6xl px-3 sm:px-6">
                <div
                    className={cn(
                        "flex h-14 items-center justify-between rounded-full border pl-3 pr-2 transition-all duration-300",
                        scrolled
                            ? "border-border bg-background/80 shadow-[0_8px_30px_-12px_color-mix(in_oklch,var(--primary)_25%,transparent)] backdrop-blur-xl"
                            : "border-transparent bg-transparent"
                    )}
                >
                    <Link href="/" className="group flex items-center gap-2.5 rounded-full pr-2" aria-label="Notaify home">
                        <BrandMark className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[-6deg]" />
                        <span className="font-display text-[1.15rem] font-semibold tracking-tight">Notaify</span>
                    </Link>

                    <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
                        {navItems.map((item) => {
                            const active = !item.external && isActive(pathname, item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    target={item.external ? "_blank" : undefined}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                        "relative inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                                        active
                                            ? "bg-foreground/[0.06] text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {item.name}
                                    {item.external && <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-1.5">
                        <ThemeToggle />

                        <SignedOut>
                            <Link
                                href="/login"
                                className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
                            >
                                Log in
                            </Link>
                            <Link href="/register" className="btn-signal hidden !h-9 !px-4 sm:inline-flex">
                                Get started
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </SignedOut>

                        <SignedIn>
                            <div className="pl-1">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "h-8 w-8 ring-2 ring-border",
                                        },
                                    }}
                                />
                            </div>
                        </SignedIn>

                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="flex w-[300px] flex-col gap-0 border-l bg-background p-0 sm:w-[340px]">
                                <SheetHeader className="border-b p-5">
                                    <SheetTitle className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
                                        <BrandMark className="h-7 w-7" />
                                        Notaify
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-1 p-3" aria-label="Mobile">
                                    {[{ name: "Home", href: "/" }, ...navItems].map((item) => {
                                        const active = !item.external && isActive(pathname, item.href);
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                target={item.external ? "_blank" : undefined}
                                                rel={item.external ? "noopener noreferrer" : undefined}
                                                className={cn(
                                                    "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                                                    active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                                )}
                                            >
                                                {item.name}
                                                {item.external ? (
                                                    <ArrowUpRight className="h-4 w-4 opacity-60" />
                                                ) : active ? (
                                                    <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                                                ) : null}
                                            </Link>
                                        );
                                    })}
                                </nav>
                                <div className="mt-auto border-t p-5">
                                    <SignedOut>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link href="/login" onClick={() => setIsOpen(false)} className="btn-ghost !h-11">
                                                Log in
                                            </Link>
                                            <Link href="/register" onClick={() => setIsOpen(false)} className="btn-signal !h-11">
                                                Sign up
                                            </Link>
                                        </div>
                                    </SignedOut>
                                    <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                                        © {new Date().getFullYear()} Notaify
                                    </p>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
