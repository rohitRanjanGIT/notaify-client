
"use client";

import { motion } from "framer-motion";

export default function CodeDemo() {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2"
                    >
                        <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                            Integration? It&apos;s just two lines of code.
                        </h2>
                        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                            No complex middleware routing. No polluting your try-catches. Just initialize the SDK once and let our auto-capture system map your unhandled exceptions instantly to the dashboard.
                        </p>

                        <div className="mt-10 space-y-6">
                            <div className="flex items-start group">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:border-white/10 dark:text-white font-bold transition-transform group-hover:scale-110">1</div>
                                <div className="ml-5">
                                    <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-200">Install the Package</h4>
                                    <p className="mt-1 text-zinc-600 dark:text-zinc-400">Run <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-sm text-pink-500 dark:bg-zinc-800 dark:text-pink-400 font-mono">npm install @notaify/node</code></p>
                                </div>
                            </div>
                            <div className="flex items-start group">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:border-white/10 dark:text-white font-bold transition-transform group-hover:scale-110">2</div>
                                <div className="ml-5">
                                    <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-200">Call init() globally</h4>
                                    <p className="mt-1 text-zinc-600 dark:text-zinc-400">Drop <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-sm text-pink-500 dark:bg-zinc-800 dark:text-pink-400 font-mono">notaify.init()</code> at your entry point.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2 w-full"
                    >
                        {/* Premium Code Window */}
                        <div className="relative rounded-2xl bg-[#0d1117] shadow-2xl overflow-hidden border border-white/10 ring-1 ring-white/5">
                            {/* Window Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 transition-all cursor-pointer"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 transition-all cursor-pointer"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 transition-all cursor-pointer"></div>
                                </div>
                                <div className="text-xs text-zinc-400 font-mono flex items-center gap-2 bg-[#0d1117] px-3 py-1 rounded-md border border-white/5">
                                    <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current text-blue-400"><path d="M14 6L14 10 11 10 11 6 14 6ZM10 10L10 6 6 6 6 10 10 10ZM5 10L5 6 2 6 2 10 5 10ZM14 5L11 5 11 1 14 1 14 5ZM10 5L10 1 6 1 6 5 10 5ZM5 5L5 1 2 1 2 5 5 5ZM14 15L11 15 11 11 14 11 14 15ZM10 15L10 11 6 11 6 15 10 15ZM5 15L5 11 2 11 2 15 5 15Z"></path></svg>
                                    app.js
                                </div>
                                <div className="w-12"></div> {/* Spacer for centering */}
                            </div>
                            {/* Code Area */}
                            <div className="p-6 overflow-x-auto text-[13px] sm:text-[14px]">
                                <pre className="font-mono leading-loose">
                                    <code className="text-[#c9d1d9] block">
                                        <span className="text-[#ff7b72]">import</span> express <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">&quot;express&quot;</span>;
                                        <span className="text-[#ff7b72]">import</span> {"{ "}notaify{" }"} <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">&quot;@notaify/node&quot;</span>;

                                        <span className="text-[#8b949e] italic">{"// 1. Initialize SDK"}</span>
                                        notaify.<span className="text-[#d2a8ff]">init</span>({"{ "}
                                        apiKey: process.env.<span className="text-[#79c0ff]">NOTAIFY_API_KEY</span>,
                                        password: process.env.<span className="text-[#79c0ff]">NOTAIFY_PASSWORD</span>
                                        {" }"});

                                        <span className="text-[#ff7b72]">const</span> app = <span className="text-[#d2a8ff]">express</span>();

                                        <span className="text-[#8b949e] italic">{"// 2. That's it! Every unhandled error is auto-captured."}</span>
                                        app.<span className="text-[#d2a8ff]">get</span>(<span className="text-[#a5d6ff]">&quot;/users&quot;</span>, <span className="text-[#ff7b72]">async</span> (req, res) =&gt; {"{"}
                                        <span className="text-[#ff7b72]">const</span> users = <span className="text-[#ff7b72]">await</span> db.<span className="text-[#d2a8ff]">findUsers</span>();
                                        res.<span className="text-[#d2a8ff]">json</span>(users);
                                        {"}"});

                                        app.<span className="text-[#d2a8ff]">listen</span>(<span className="text-[#79c0ff]">3000</span>);
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Glowing orb element */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 -z-10 opacity-30 dark:opacity-20 hidden lg:block">
                <div className="w-[800px] h-[800px] bg-blue-500 blur-[150px] rounded-full mix-blend-screen"></div>
            </div>
        </section>
    );
}
