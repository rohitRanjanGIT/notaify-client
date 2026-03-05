"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 lg:pt-40 bg-zinc-50 dark:bg-black w-full min-h-screen flex flex-col items-center">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-[50%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/10 dark:bg-blue-600/20 blur-[120px]" />
                <div className="absolute top-[20%] left-1/4 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/10 dark:bg-violet-600/20 blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-6xl">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-black/5 dark:border-white/10 bg-white/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-800 backdrop-blur-md dark:bg-white/5 dark:text-zinc-300"
                    >
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Notaify v1.0 is Live
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-8 max-w-5xl text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl md:text-7xl lg:text-8xl dark:text-white"
                        style={{ lineHeight: 1.1 }}
                    >
                        Fix Backend Errors <br />
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 drop-shadow-sm">
                            Before Users Notice.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8 max-w-2xl text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
                    >
                        Notaify captures runtime errors, analyzes them with AI to explain the root cause, and instantly emails your team so you can ship with zero fear.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/register"
                            className="group relative inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-zinc-900 px-8 text-sm font-medium text-white shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all hover:bg-zinc-800 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:hover:shadow-[0_0_30px_rgba(96,165,250,0.3)]"
                        >
                            Start for Free
                            <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/docs"
                            className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl border border-zinc-200 bg-white/50 px-8 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur-sm transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:bg-zinc-900/80"
                        >
                            Read Documentation
                        </Link>
                    </motion.div>
                </div>

                {/* Premium Bento Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-20 md:mt-32 w-full"
                >
                    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4 sm:gap-6 auto-rows-auto">

                        {/* Box 1: AI Instant */}
                        <div className="md:col-span-4 rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 lg:p-10 shadow-lg transition-transform hover:-translate-y-1 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Lightning Fast Alerts</h3>
                            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
                                Get notified with full contextual stack traces in your inbox within <span className="text-zinc-900 dark:text-zinc-200 font-semibold">5-8 seconds</span> of the crash.
                            </p>
                        </div>

                        {/* Box 2: Secure Keys */}
                        <div className="md:col-span-2 rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 shadow-lg transition-transform hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between">
                            <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Bank-Grade Security</h3>
                                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                                    LLM and SMTP keys are strictly encrypted at rest for maximum safety.
                                </p>
                            </div>
                        </div>

                        {/* Box 3: Dashboard */}
                        <div className="md:col-span-3 rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 shadow-lg transition-transform hover:-translate-y-1 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75A2.25 2.25 0 0 1 15.75 13.5H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">Centralized Analytics</h3>
                            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                                Easily view, sort, and search across thousands of unified error logs natively from your dedicated project dashboard.
                            </p>
                        </div>

                        {/* Box 4: Test Configs */}
                        <div className="md:col-span-3 rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 shadow-lg transition-transform hover:-translate-y-1 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">Pre-flight Config testing</h3>
                            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                                Out-of-the-box tools let you rapidly test your SMTP connections and LLM routes before going to production.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
