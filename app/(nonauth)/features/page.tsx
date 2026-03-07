"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Zap,
    Shield,
    Search,
    BellRing,
    Terminal,
    Activity,
    BrainCircuit,
    Layers,
    Code,
    Network,
    Cpu,
    CheckCircle2
} from "lucide-react";

export default function FeaturesPage() {
    const coreFeatures = [
        {
            title: "Lightning Fast Alerts",
            description: "Receive critical error alerts in your inbox within 5-8 seconds of the crash occurring. Never be the last to know.",
            icon: <Zap className="w-8 h-8" />,
            color: "from-amber-400 to-orange-500",
            bgLight: "bg-amber-500/10",
            iconColor: "text-amber-500",
        },
        {
            title: "Bank-Grade Security",
            description: "Your API keys and passwords are AES-encrypted at rest. We securely process logs without ever exposing your sensitive infrastructure.",
            icon: <Shield className="w-8 h-8" />,
            color: "from-blue-400 to-indigo-500",
            bgLight: "bg-blue-500/10",
            iconColor: "text-blue-500",
        },
        {
            title: "Intelligent Parsing",
            description: "Stack traces are automatically parsed, formatting raw V8 outputs into highly readable mapped tables to find the culprit line instantly.",
            icon: <Search className="w-8 h-8" />,
            color: "from-emerald-400 to-green-500",
            bgLight: "bg-emerald-500/10",
            iconColor: "text-emerald-500",
        },
        {
            title: "Native Email rendering",
            description: "Forget configuring complex webhooks. Professional bug reports with full context injected directly into your engineering team's inbox.",
            icon: <BellRing className="w-8 h-8" />,
            color: "from-purple-400 to-pink-500",
            bgLight: "bg-purple-500/10",
            iconColor: "text-purple-500",
        },
        {
            title: "Pre-flight Config Test",
            description: "Validate your SMTP routing and LLM configurations independently through our dash before deploying into production environments.",
            icon: <Activity className="w-8 h-8" />,
            color: "from-rose-400 to-red-500",
            bgLight: "bg-rose-500/10",
            iconColor: "text-rose-500",
        },
        {
            title: "Universal Middleware",
            description: "Drop a single line of SDK code into your Express, Fastify, Next.js, or NestJS backend—it seamlessly self-wraps around endpoints.",
            icon: <Terminal className="w-8 h-8" />,
            color: "from-cyan-400 to-blue-500",
            bgLight: "bg-cyan-500/10",
            iconColor: "text-cyan-500",
        }
    ];

    const deepDives = [
        {
            title: "AI-Powered Diagnostics",
            subtitle: "Let LLMs find the bug before you even open your IDE.",
            description: "Connect your OpenAI or Anthropic API key to auto-diagnose errors. Our engine reads the stack trace, understands your framework context, and generates a plain-English explanation along with a fix suggestion.",
            icon: <BrainCircuit className="w-6 h-6" />,
            color: "from-violet-500 to-purple-600",
            visual: (
                <div className="w-full h-full bg-[#0d1117] rounded-2xl border border-zinc-800 p-6 font-mono text-sm flex flex-col gap-3 shadow-2xl relative overflow-hidden group">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-zinc-800">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-zinc-500 ml-2 text-xs">AI Diagnostics</span>
                    </div>
                    <div className="text-red-400 font-semibold">TypeError: Cannot read properties of undefined (reading 'map')</div>
                    <div className="text-zinc-400 pl-4 py-2 border-l-2 border-zinc-800">
                        <span className="text-purple-400">AI Analysis: </span>
                        The error occurs because <span className="text-rose-300">`userData.items`</span> is undefined when the API responds with a 404.
                        Add optional chaining or provide a fallback array.
                    </div>
                    <div className="mt-2 text-green-400 flex items-start gap-2 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                        <CheckCircle2 className="w-4 h-4 mt-0.5" />
                        <span>Fix applied: <span className="text-zinc-300">`userData?.items?.map(...) ?? []`</span></span>
                    </div>
                </div>
            )
        },
        {
            title: "Seamless Framework Integration",
            subtitle: "One SDK to rule them all.",
            description: "Whether you're building a monolith in Express, microservices in Fastify, or full-stack apps in Next.js, the @notaify/node package unifies your error tracking. No more jumping between different logging platforms.",
            icon: <Network className="w-6 h-6" />,
            color: "from-blue-500 to-cyan-500",
            visual: (
                <div className="w-full h-full grid grid-cols-2 gap-4 p-4">
                    {["Express.js", "Fastify", "NestJS", "Next.js"].map((framework, i) => (
                        <div key={i} className="bg-white/5 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center gap-3 backdrop-blur-md hover:bg-white/10 dark:hover:bg-zinc-700/50 transition-colors">
                            <Layers className="w-8 h-8 text-blue-500/80" />
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{framework}</span>
                        </div>
                    ))}
                </div>
            ),
            reverse: true
        },
        {
            title: "Real-time Dashboarding",
            subtitle: "Your command center for system health.",
            description: "Filter, sort, and analyze errors across multiple projects. View error spikes instantly and drill down into the exact geographical locale, user agent, and payload state the moment the crash happened.",
            icon: <Activity className="w-6 h-6" />,
            color: "from-emerald-500 to-teal-500",
            visual: (
                <div className="w-full h-full bg-white dark:bg-[#111113] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4 shadow-xl">
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-800">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Project Overview</span>
                        <div className="flex gap-2">
                            <div className="w-20 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full animate-pulse" />
                            <div className="w-16 h-6 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                        </div>
                    </div>
                    <div className="flex-1 flex items-end gap-2 pt-6">
                        {[40, 70, 45, 90, 65, 30, 85, 50, 100, 60, 40].map((h, i) => (
                            <div key={i} className={`w-full bg-emerald-500/80 rounded-t-sm`} style={{ height: `${h}%` }} />
                        ))}
                    </div>
                </div>
            )
        }
    ];



    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-500/10 dark:from-blue-500/5 to-transparent pointer-events-none" />
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] opacity-20 dark:opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0,transparent_50%)]" />

            <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-7xl">
                    {/* Heroes */}
                    <div className="relative text-center mb-24 max-w-3xl mx-auto">
                        {/* Decorative Icons in Empty Spaces */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="absolute -top-12 -left-12 lg:-left-24 hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-blue-500 shadow-2xl backdrop-blur-xl"
                        >
                            <Terminal className="w-8 h-8" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="absolute top-10 -right-12 lg:-right-24 hidden md:flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-500 shadow-2xl backdrop-blur-xl"
                        >
                            <Zap className="w-10 h-10" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 text-balance">
                                Power user capabilities.
                            </h1>
                            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed text-balance">
                                Discover the suite of advanced features that make Notaify the ultimate error resolution platform for high-velocity engineering teams.
                            </p>
                        </motion.div>
                    </div>

                    {/* Core Features Grid */}
                    <div className="mb-32">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                            {coreFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    {/* Glowing backdrop on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10 dark:opacity-0 dark:group-hover:opacity-30`} />

                                    <div className="h-full bg-white dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300">
                                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${feature.bgLight} text-zinc-900 dark:text-white border border-black/5 dark:border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                            <div className={`${feature.iconColor}`}>
                                                {feature.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Deep Dives Section */}
                    <div className="space-y-32 mb-32">
                        {deepDives.map((dive, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                                className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${dive.reverse ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-1 space-y-6">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${dive.color} text-white shadow-lg`}>
                                        {dive.icon}
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                        {dive.title}
                                    </h2>
                                    <h3 className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-zinc-500 to-zinc-400 dark:from-zinc-400 dark:to-zinc-500">
                                        {dive.subtitle}
                                    </h3>
                                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {dive.description}
                                    </p>
                                </div>
                                <div className="flex-1 w-full lg:w-auto h-[350px] md:h-[450px] relative">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${dive.color} opacity-20 blur-3xl -z-10 rounded-[3rem]`} />
                                    <div className="h-full w-full rounded-[2rem] border border-zinc-200/50 dark:border-white/10 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-3xl overflow-hidden shadow-2xl flex items-center justify-center p-4 md:p-8">
                                        {dive.visual}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>




                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center pb-24"
                    >
                        <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">Ready to supercharge your workflow?</h2>
                        <div className="inline-flex gap-4 items-center">
                            <Link
                                href="/register"
                                className="inline-flex h-14 items-center justify-center rounded-full bg-blue-600 px-10 py-3 text-base font-medium text-white transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                href="/docs"
                                className="inline-flex h-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 px-10 py-3 text-base font-medium text-zinc-900 dark:text-white transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800"
                            >
                                Read the Docs
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
