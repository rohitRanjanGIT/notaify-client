"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const docsSections = [
    {
        title: "Getting started",
        items: [
            { title: "Introduction", href: "/docs" },
            { title: "Installation & setup", href: "/docs/installation" },
            { title: "Initialization", href: "/docs/initialization" },
        ],
    },
    {
        title: "Usage guide",
        items: [
            { title: "Usage patterns", href: "/docs/usage" },
            { title: "Framework guides", href: "/docs/frameworks" },
        ],
    },
    {
        title: "Reference",
        items: [{ title: "Configuration & security", href: "/docs/configuration" }],
    },
];

const flat = docsSections.flatMap((s) => s.items.map((i) => ({ ...i, section: s.title })));

interface DocsSidebarProps {
    className?: string;
}

export function DocsSidebar({ className }: DocsSidebarProps) {
    const pathname = usePathname();

    return (
        <nav className={cn("space-y-8", className)} aria-label="Documentation">
            {docsSections.map((section) => (
                <div key={section.title}>
                    <h4 className="eyebrow mb-3 pl-3">{section.title}</h4>
                    <ul className="space-y-0.5">
                        {section.items.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={cn(
                                            "relative block rounded-lg px-3 py-1.5 text-sm transition-colors",
                                            isActive
                                                ? "bg-accent font-medium text-foreground"
                                                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                                        )}
                                    >
                                        {isActive && (
                                            <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-signal" />
                                        )}
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </nav>
    );
}

/** Horizontal, scrollable docs nav for small screens. */
export function DocsMobileNav() {
    const pathname = usePathname();
    return (
        <nav aria-label="Documentation" className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
            <ul className="flex w-max gap-1.5">
                {flat.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "block whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] transition-colors",
                                    isActive
                                        ? "border-foreground bg-foreground text-background"
                                        : "bg-card text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

/** Previous / next links at the bottom of every docs page. */
export function DocsPager() {
    const pathname = usePathname();
    const idx = flat.findIndex((i) => i.href === pathname);
    if (idx === -1) return null;
    const prev = flat[idx - 1];
    const next = flat[idx + 1];

    return (
        <div className="mt-16 grid gap-3 border-t pt-8 sm:grid-cols-2">
            {prev ? (
                <Link href={prev.href} className="group rounded-2xl border p-4 transition-colors hover:border-foreground/25">
                    <span className="eyebrow flex items-center gap-1.5">
                        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" /> Previous
                    </span>
                    <span className="mt-1.5 block font-medium">{prev.title}</span>
                </Link>
            ) : (
                <span />
            )}
            {next && (
                <Link href={next.href} className="group rounded-2xl border p-4 text-right transition-colors hover:border-foreground/25">
                    <span className="eyebrow flex items-center justify-end gap-1.5">
                        Next <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-1.5 block font-medium">{next.title}</span>
                </Link>
            )}
        </div>
    );
}
