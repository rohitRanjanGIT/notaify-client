import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export default function ConfigurationPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Configuration & Options</h1>

            <div className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Initialization Options</h2>

                <p className="text-foreground">
                    When calling <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">notaify.init(config)</code>, you can provide the following options to customize the behavior of the agent:
                </p>

                <div className="overflow-x-auto my-6 not-prose rounded-md border">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead className="bg-muted/50">
                            <tr className="border-b">
                                <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Option</th>
                                <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Type</th>
                                <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Required</th>
                                <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 align-middle"><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold">apiKeyId</code></td>
                                <td className="p-4 align-middle"><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs text-pink-600 dark:text-pink-400">string</code></td>
                                <td className="p-4 align-middle font-medium text-emerald-600 dark:text-emerald-500">Yes</td>
                                <td className="p-4 align-middle">Your Notaify API Key ID (public identifier for lookup)</td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 align-middle"><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold">apiKey</code></td>
                                <td className="p-4 align-middle"><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs text-pink-600 dark:text-pink-400">string</code></td>
                                <td className="p-4 align-middle font-medium text-emerald-600 dark:text-emerald-500">Yes</td>
                                <td className="p-4 align-middle">Your Notaify API Key (secret key for authentication)</td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 align-middle"><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold">environment</code></td>
                                <td className="p-4 align-middle"><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs text-pink-600 dark:text-pink-400">string</code></td>
                                <td className="p-4 align-middle text-muted-foreground">No</td>
                                <td className="p-4 align-middle">e.g. <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">&quot;production&quot;</code>, <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">&quot;staging&quot;</code> (default: <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">&quot;production&quot;</code>)</td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 align-middle"><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold">appName</code></td>
                                <td className="p-4 align-middle"><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs text-pink-600 dark:text-pink-400">string</code></td>
                                <td className="p-4 align-middle text-muted-foreground">No</td>
                                <td className="p-4 align-middle">Label your app in the dashboard and emails</td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 align-middle"><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold">silent</code></td>
                                <td className="p-4 align-middle"><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs text-pink-600 dark:text-pink-400">boolean</code></td>
                                <td className="p-4 align-middle text-muted-foreground">No</td>
                                <td className="p-4 align-middle">Suppress Notaify console logs (default: <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">false</code>)</td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 align-middle"><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold">serverUrl</code></td>
                                <td className="p-4 align-middle"><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs text-pink-600 dark:text-pink-400">string</code></td>
                                <td className="p-4 align-middle text-muted-foreground">No</td>
                                <td className="p-4 align-middle">Override the Notaify server URL (for self-hosted or local dev)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="not-prose mt-4">
                    <CodeBlock
                        language="javascript"
                        code={`notaify.init({
  apiKeyId: process.env.NOTAIFY_API_KEY_ID,
  apiKey: process.env.NOTAIFY_API_KEY,
  environment: 'production',
  appName: 'My API Server',
  silent: true,
})`}
                    />
                </div>
            </div>

            <div className="space-y-4 mt-12">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">What You Receive in the Email</h2>

                <p className="text-foreground">
                    When an error is captured, Notaify processes it and sends an email to the configured email channel containing:
                </p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-foreground">
                    <li><strong>Error message</strong> and <strong>stack trace</strong> for quick debugging.</li>
                    <li><strong>AI analysis</strong> — a plain-English explanation of what likely went wrong and suggested solutions.</li>
                    <li><strong>Timestamp</strong> and <strong>environment</strong> context.</li>
                    <li><strong>Extra context</strong> if you passed it via <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">notaify.capture(error, context)</code>.</li>
                    <li><strong>App name</strong> (if configured).</li>
                </ul>
            </div>

            <div className="space-y-4 mt-12">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Security Recommendations</h2>

                <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-foreground">
                    <li>Your <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">NOTAIFY_API_KEY_ID</code> and <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">NOTAIFY_API_KEY</code> are used only to authenticate with the Notaify ingest server.</li>
                    <li><strong>Never</strong> expose these in client-side code (e.g., <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">NEXT_PUBLIC_*</code>).</li>
                    <li><strong>Never</strong> commit these keys to version control (e.g., git).</li>
                    <li>Always load them safely from environment variables on your Node server.</li>
                </ul>
            </div>

            <div className="space-y-4 mt-12 mb-8">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Need Help?</h2>

                <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-foreground">
                    <li>Dashboard: <Link href="/dashboard" className="text-primary hover:underline underline-offset-4">notaify.vercel.app/dashboard</Link></li>
                    <li>Support: <a href="mailto:support@notaify.vercel.app" className="text-primary hover:underline underline-offset-4">support@notaify.vercel.app</a></li>
                    <li>GitHub: <a href="https://github.com/notaify/node" target="_blank" rel="noreferrer" className="text-primary hover:underline underline-offset-4">github.com/notaify/node</a></li>
                </ul>
            </div>
        </div>
    );
}
