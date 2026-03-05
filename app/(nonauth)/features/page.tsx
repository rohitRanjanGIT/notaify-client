"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Zap,
    Shield,
    Search,
    BellRing,
    Terminal,
    Activity
} from "lucide-react";

export default function FeaturesPage() {
    const features = [
        {
            title: "Lightning Fast Alerts",
            description: "Receive critical error alerts in your inbox within 5-8 seconds of the crash occurring. Never be the last to know.",
            icon: <Zap className="w-8 h-8" />,
            color: "from-amber-400 to-orange-500",
            bgLight: "bg-amber-500/10",
        },
        {
            title: "Bank-Grade Security",
            description: "Your API keys and passwords are AES-encrypted at rest. We securely process logs without ever exposing your sensitive infrastructure.",
            icon: <Shield className="w-8 h-8" />,
            color: "from-blue-400 to-indigo-500",
            bgLight: "bg-blue-500/10",
        },
        {
            title: "Intelligent Parsing",
            description: "Stack traces are automatically parsed, formatting raw V8 outputs into highly readable mapped tables to find the culprit line instantly.",
            icon: <Search className="w-8 h-8" />,
            color: "from-emerald-400 to-green-500",
            bgLight: "bg-emerald-500/10",
        },
        {
            title: "Native Email rendering",
            description: "Forget configuring complex webhooks. Professional bug reports with full context injected directly into your engineering team's inbox.",
            icon: <BellRing className="w-8 h-8" />,
            color: "from-purple-400 to-pink-500",
            bgLight: "bg-purple-500/10",
        },
        {
            title: "Pre-flight Config Test",
            description: "Validate your SMTP routing and LLM configurations independently through our dash before deploying into production environments.",
            icon: <Activity className="w-8 h-8" />,
            color: "from-rose-400 to-red-500",
            bgLight: "bg-rose-500/10",
        },
        {
            title: "Universal Middleware",
            description: "Drop a single line of SDK code into your Express, Fastify, Next.js, or NestJS backend—it seamlessly self-wraps around endpoints.",
            icon: <Terminal className="w-8 h-8" />,
            color: "from-cyan-400 to-blue-500",
            bgLight: "bg-cyan-500/10",
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-500/10 dark:from-blue-500/5 to-transparent pointer-events-none" />
            <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] opacity-30 dark:opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0,transparent_50%)]" />

            <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-24 max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 text-balance">
                            Power user capabilities.
                        </h1>
                        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed text-balance">
                            Discover the suite of advanced features that make Notaify the ultimate error resolution platform for high-velocity teams.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                        {features.map((feature, index) => (
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
                                        <div className={`bg-clip-text text-transparent bg-gradient-to-br ${feature.color}`}>
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

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-32 text-center"
                    >
                        <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 my-8">
                            <Link
                                href="/docs/installation"
                                className="inline-flex h-14 items-center justify-center rounded-full bg-zinc-50 dark:bg-black px-10 py-3 text-base font-medium text-zinc-900 dark:text-white transition-all hover:bg-transparent hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black"
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
