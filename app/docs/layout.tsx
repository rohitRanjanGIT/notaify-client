import Link from "next/link";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-10">
            <aside className="w-full md:w-64 shrink-0">
                <nav className="sticky top-24 space-y-8">
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Getting Started</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/docs" className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                    Introduction
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/installation" className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                    Installation
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Configuration</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/docs/configuration" className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                    LLM Providers
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">API Reference</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/docs/api" className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                    Middleware
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>
            <main className="flex-1 max-w-4xl">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    {children}
                </div>
            </main>
        </div>
    );
}
