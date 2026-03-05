import { CodeBlock } from "@/components/code-block";

export default function InitializationPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Initialization</h1>

            <p className="text-lg text-muted-foreground">
                Before using any reporting feature, you must initialize Notaify once at the entryway of your application.
            </p>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Basic Initialization</h2>

                <p className="text-foreground">
                    Import and call <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">notaify.init()</code> using the credentials from your environment variables. Make sure this code runs <strong>before</strong> your main application logic or server starts.
                </p>

                <div className="not-prose mt-4">
                    <div className="not-prose mt-4">
                        <CodeBlock
                            language="javascript"
                            code={`import { notaify } from '@notaify/node';

notaify.init({
  apiKey: process.env.NOTAIFY_API_KEY,
  password: process.env.NOTAIFY_PASSWORD
});`}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Why is initialization required?</h2>

                <p className="text-foreground">
                    The <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">init()</code> method accomplishes several things:
                </p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>It authenticates your app with the Notaify servers.</li>
                    <li>It configures global settings like environment tags and custom app names.</li>
                    <li>It prepares the internal queue for efficiently buffering error events.</li>
                    <li><strong>Crucially:</strong> It enables global Auto-Capture (if used) to listen for uncaught exceptions and unhandled promise rejections.</li>
                </ul>
            </div>

            <div className="not-prose my-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-900/20">
                <div className="flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600 dark:text-blue-400"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300">Is this safe to run in development?</h3>
                </div>
                <div className="mt-2 text-sm space-y-2 text-blue-800 dark:text-blue-400">
                    <p>Yes. However, if you don&apos;t want to consume your quota during local testing, you can easily bypass initialization conditionally:</p>
                    <div className="mt-3">
                        <CodeBlock
                            language="javascript"
                            code={`if (process.env.NODE_ENV === 'production') {\n  notaify.init(...)\n}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
