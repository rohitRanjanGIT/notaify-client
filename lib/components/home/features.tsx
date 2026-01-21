export default function Features() {
    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Everything you need to debug faster
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Powerful features designed for modern engineering teams.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-600 dark:text-blue-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Real-time Analysis</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Get instant insights into what went wrong. No more waiting for logs to ingest or digging through gigabytes of text.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700">
                        <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center dark:bg-purple-900/30">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-purple-600 dark:text-purple-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                            </svg>
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">AI-Powered Solutions</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Notaifi doesn't just tell you there's an error. our AI suggests the exact fix you need to resolve it.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700">
                        <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center dark:bg-green-900/30">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-600 dark:text-green-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Seamless Integrations</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Works with your favorite tools. Send alerts to Slack, Discord, Microsoft Teams, or Jira with a single click.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
