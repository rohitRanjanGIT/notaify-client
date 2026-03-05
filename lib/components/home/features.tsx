"use client";

import { motion } from "framer-motion";

export default function Features() {
    const features = [
        {
            title: "Real-time AI Diagnosis",
            description: "No more scrolling through infinite logs. Our integrated AI agents process the crash instantly and output a plain-English explanation of exactly what broke and how to solve it.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
            )
        },
        {
            title: "Automatic Stack Trace Parsing",
            description: "Errors are ingested directly from your V8 runtime, parsed out efficiently mapping line numbers, and formatted into beautiful tables that highlight the culprit files immediately.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
            )
        },
        {
            title: "Native Email rendering",
            description: "No need for external webhooks. Professional, detailed bug reports are beautifully crafted and pushed straight via SMTP to your engineering team's inbox directly.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
            )
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-[#050505] relative border-t border-black/5 dark:border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                        Designed for Developer Velocity
                    </h2>
                    <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">
                        Powerful features designed solely to shrink your mean-time-to-resolution to near zero.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="h-16 w-16 mb-8 rounded-2xl bg-zinc-100 text-zinc-900 shadow-sm flex items-center justify-center border border-black/5 dark:bg-zinc-900 dark:text-white dark:border-white/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:-translate-y-2">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
