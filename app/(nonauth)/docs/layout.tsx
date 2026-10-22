import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DocsMobileNav, DocsPager, DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 lg:pt-12">
            <div className="mb-8 lg:hidden">
                <DocsMobileNav />
            </div>
            <div className="flex gap-12 xl:gap-16">
                <aside className="hidden w-56 shrink-0 lg:block">
                    <div className="sticky top-28 space-y-10">
                        <DocsSidebar />
                        <div className="panel space-y-3 p-4">
                            <p className="font-mono text-[11px] text-muted-foreground">@notaify/node</p>
                            <p className="text-sm leading-snug">Need API keys? Create a project in the dashboard.</p>
                            <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm font-medium text-signal">
                                Open dashboard <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </aside>
                <main className="min-w-0 max-w-3xl flex-1">
                    <article className="docs-content">{children}</article>
                    <DocsPager />
                </main>
            </div>
        </div>
    );
}
