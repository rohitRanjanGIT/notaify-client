import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-800 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-200">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        v1.0 is now live
                    </div>

                    <h1 className="mt-8 max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
                        Fix Backend Errors <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400">
                            Before Users Notice.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Notaifi captures runtime errors, analyzes them with AI to explain the root cause, and instantly notifies your team so you can ship with confidence.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
                        <Link
                            href="/register"
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-black px-8 text-base font-medium text-white shadow-lg transition-all hover:bg-gray-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        >
                            Start for Free
                        </Link>
                        <Link
                            href="/demo"
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-200 bg-white px-8 text-base font-medium text-gray-900 shadow-sm transition-all hover:bg-gray-50 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 dark:border-gray-800 dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
                        >
                            View Live Demo
                        </Link>
                    </div>

                    {/* Abstract Background Elements */}
                    <div className="absolute top-0 right-0 -z-10 translate-x-1/2 -translate-y-1/2 opacity-30 dark:opacity-20">
                        <div className="h-[400px] w-[600px] rounded-full bg-gradient-to-br from-blue-500 to-purple-500 blur-3xl"></div>
                    </div>
                    <div className="absolute top-1/2 left-0 -z-10 -translate-x-1/2 translate-y-1/2 opacity-30 dark:opacity-20 hidden md:block">
                        <div className="h-[300px] w-[500px] rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 blur-3xl"></div>
                    </div>
                </div>
            </div>

            {/* Dashboard Preview Mockup (Optional - adding a placeholder for visual balance) */}
            <div className="mt-16 md:mt-24 relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-2xl border border-gray-200 bg-gray-100/50 p-2 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950 aspect-[16/9] flex items-center justify-center overflow-hidden">
                        <div className="text-gray-400 font-medium">Dashboard Preview Image</div>
                        {/* I'll leave this as a placeholder, later we can add a real image or a generated UI mockup */}
                    </div>
                </div>
                <div className="absolute inset-0 -z-20 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black"></div>
            </div>
        </section>
    );
}
