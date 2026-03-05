export default function DocsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">@notaify/node — Documentation</h1>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2 mt-8">What is Notaify?</h2>

                <p className="text-lg text-muted-foreground">
                    Notaify is an error notification service for backend applications.
                    When an error occurs in your server, Notaify captures it, runs an AI-powered
                    analysis to help you understand what went wrong, and instantly sends you an
                    email alert — so you can fix issues before your users even notice.
                </p>
            </div>

            <div className="not-prose my-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-900/20">
                <div className="flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600 dark:text-blue-400"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300">Core Mission</h3>
                </div>
                <p className="mt-2 text-sm text-blue-800 dark:text-blue-400">
                    Notaify helps you know what broke, why it broke, and what to do next without having to dig through server logs.
                </p>
            </div>

            <div className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Why Notaify?</h2>
                <p className="text-foreground">
                    In real-world Node.js applications, errors are inevitable. From failed database calls to broken async logic, things go wrong.
                    Notaify is designed to <strong>observe, analyze, and notify</strong> — acting as your smart monitoring assistant without replacing your existing error handling structure.
                </p>
            </div>

            <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold tracking-tight">Key Features</h3>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li><strong>Universal Support</strong>: Works seamlessly with raw Node.js, Express, Fastify, NestJS, and Next.js APIs.</li>
                    <li><strong>Multiple Capture Modes</strong>: Global auto-capture, targeted manual capture, handler wrappers, or middleware.</li>
                    <li><strong>AI-Powered Explanations</strong>: Plain English explanations of what went wrong and suggested fixes using advanced LLMs.</li>
                    <li><strong>Developer-Friendly Notifications</strong>: Get rich email alerts with stack traces and actionable advice instantly.</li>
                    <li><strong>Zero-Friction Setup</strong>: Initialize with just two lines of code and your API keys.</li>
                </ul>
            </div>
        </div>
    );
}
