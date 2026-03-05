"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface DocsSidebarProps {
    className?: string;
}

export function DocsSidebar({ className }: DocsSidebarProps) {
    const pathname = usePathname();

    const sections = [
        {
            title: "Getting Started",
            items: [
                { title: "Introduction", href: "/docs" },
                { title: "Installation & Setup", href: "/docs/installation" },
                { title: "Initialization", href: "/docs/initialization" },
            ],
        },
        {
            title: "Usage Guide",
            items: [
                { title: "Usage Patterns", href: "/docs/usage" },
                { title: "Framework Guides", href: "/docs/frameworks" },
            ],
        },
        {
            title: "Reference",
            items: [
                { title: "Configuration & Security", href: "/docs/configuration" },
            ],
        },
    ];

    return (
        <nav className={cn("sticky top-24 space-y-8", className)}>
            {sections.map((section, idx) => (
                <div key={idx}>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{section.title}</h4>
                    <ul className="space-y-1.5 flex flex-col border-l-2 border-muted pl-4">
                        {section.items.map((item, itemIdx) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={itemIdx}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "block text-sm py-1 transition-colors relative -left-[18px] pl-[18px]",
                                            isActive
                                                ? "text-primary font-medium border-l-2 border-primary"
                                                : "text-muted-foreground hover:text-foreground border-l-2 border-transparent"
                                        )}
                                    >
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
