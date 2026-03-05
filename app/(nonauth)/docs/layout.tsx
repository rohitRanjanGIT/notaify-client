import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col min-[800px]:flex-row gap-8">
            <aside className="w-full min-[800px]:w-64 shrink-0 min-[800px]:border-r min-[800px]:pr-6">
                <DocsSidebar />
            </aside>
            <main className="flex-1 max-w-4xl min-w-0">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    {children}
                </div>
            </main>
        </div>
    );
}
