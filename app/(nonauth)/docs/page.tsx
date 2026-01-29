
export default function DocsPage() {
    return (
        <div>
            <h1>Introduction to Notaifi</h1>
            <p className="lead">
                Notaifi is a lightweight, AI-assisted error monitoring and notification system designed specifically for <strong>Express.js backends</strong>.
            </p>

            <div className="not-prose my-8 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20">
                <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">Core Mission</h3>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                    Notaifi helps you know what broke, why it broke, and what to do next.
                </p>
            </div>

            <h2>Why Notaifi?</h2>
            <p>
                In real-world Express applications, errors are inevitable. From failed database calls to broken async logic, things go wrong.
                Notaifi is designed to <strong>observe, understand, and notify</strong> — not replace — your existing error handling.
            </p>

            <h3>Key Features (V1)</h3>
            <ul>
                <li><strong>Centralized Error Capturing</strong>: One middleware to rule them all.</li>
                <li><strong>Async-Safe</strong>: Propagate errors correctly with our <code>asyncHandler</code>.</li>
                <li><strong>AI-Powered Explanations</strong>: Understand the <em>why</em> behind the crash.</li>
                <li><strong>Developer-Friendly Notifications</strong>: Get alerts on Slack, Email, or Discord.</li>
            </ul>

            <h2>How It Works</h2>
            <p>
                The flow is simple and non-intrusive:
            </p>
            <ol>
                <li><strong>Express Route</strong>: Your code runs normally.</li>
                <li><strong>Async Handler</strong>: Wraps your controller to catch any rejections.</li>
                <li><strong>Global Middleware</strong>: Catches the error if it bubbles up.</li>
                <li><strong>AI Analysis</strong>: (Optional) Sends context to an LLM provider.</li>
                <li><strong>Notification</strong>: Alert is dispatched to your configured channel.</li>
            </ol>

            <h2>Supported LLM Providers</h2>
            <p>Notaifi V1 allows you to bring your own keys for:</p>
            <ul>
                <li>Gemini (Google)</li>
                <li>OpenAI</li>
                <li>Claude (Anthropic)</li>
                <li>Groq (LLaMA/Mixtral)</li>
            </ul>
        </div>
    );
}
