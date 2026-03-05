
"use client";

import { motion } from "framer-motion";

export default function Workflow() {
    const steps = [
        {
            title: "1. Capture",
            description: "Initialize once to auto-capture all unhandled errors, or drop in our middleware for your framework. We intercept errors safely without crashing your server.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
            ),
            color: "from-blue-500/20 to-cyan-500/20",
            iconColor: "text-blue-500 dark:text-cyan-400"
        },
        {
            title: "2. Analyze",
            description: "Notaify securely sends the error context to your chosen AI model (Gemini, OpenAI, Claude) to diagnose the root cause.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
            ),
            color: "from-violet-500/20 to-purple-500/20",
            iconColor: "text-violet-500 dark:text-purple-400"
        },
        {
            title: "3. Notify",
            description: "Get instant, beautiful email alerts containing AI explanations, stack traces, and environment context so you know exactly what broke.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
            ),
            color: "from-amber-500/20 to-orange-500/20",
            iconColor: "text-amber-500 dark:text-orange-400"
        }
    ];

    return (
        <section className="py-24 bg-zinc-50 dark:bg-[#0a0a0a]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-20 text-balance">
                    <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                        A seamless recovery pipeline.
                    </h2>
                    <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
                        From error detection to resolution, we&apos;ve optimized every millisecond of the triage process to get your API back up efficiently.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-start">
                    {/* Connecting line (Desktop) */}
                    <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative flex flex-col items-center"
                        >
                            <div className="relative group">
                                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50 dark:opacity-100`} />
                                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-xl z-10 transition-transform duration-500 group-hover:scale-110">
                                    <div className={step.iconColor}>
                                        {step.icon}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 text-center px-4">
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-balance">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
