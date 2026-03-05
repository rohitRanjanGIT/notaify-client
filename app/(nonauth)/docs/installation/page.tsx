import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export default function InstallationPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Installation & Setup</h1>

            <p className="text-lg text-muted-foreground">
                Getting started with Notaify takes less than a minute. First, install the package, and then set up your credentials.
            </p>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2 mt-8">1. Installation</h2>

                <p className="text-foreground">
                    Install the <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">@notaify/node</code> package using npm (or your preferred package manager):
                </p>

                <div className="not-prose mt-4">
                    <CodeBlock
                        language="bash"
                        code={`npm install @notaify/node`}
                    />
                </div>
            </div>

            <div className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">2. Setup Credentials</h2>

                <p className="text-foreground">
                    Add your Notaify credentials to your environment variables file (<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">.env</code>):
                </p>

                <div className="not-prose mt-4">
                    <CodeBlock
                        language="env"
                        code={`NOTAIFY_API_KEY=your_api_key\nNOTAIFY_PASSWORD=your_password`}
                    />
                </div>
            </div>

            <div className="not-prose my-8 rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/50 dark:bg-amber-900/20">
                <div className="flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-amber-600 dark:text-amber-400"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                    <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-300">Where do I get my credentials?</h3>
                </div>
                <p className="mt-2 text-sm text-amber-800 dark:text-amber-400">
                    You can get your API key and password directly from your <Link href="/dashboard" className="font-medium underline underline-offset-4 hover:text-amber-900 dark:hover:text-amber-200">Notaify Dashboard</Link> after creating a project.
                </p>
            </div>

            <div className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Next Steps</h2>
                <p className="text-foreground">
                    Once you have the package installed and your credentials ready, head over to the <Link href="/docs/initialization" className="font-medium text-primary underline underline-offset-4">Initialization</Link> guide to plug Notaify into your app.
                </p>
            </div>
        </div>
    );
}
