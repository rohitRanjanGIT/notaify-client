"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Cta({
    title = "Know what broke before anyone files a ticket.",
    body = "Create a project, drop in two environment variables, and let the next crash explain itself.",
}: {
    title?: string;
    body?: string;
}) {
    return (
        <section className="px-4 py-24 sm:px-6 sm:py-28">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grain relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[oklch(0.22_0.05_264)] px-6 py-16 text-[oklch(0.96_0.008_80)] sm:px-14 sm:py-20 dark:bg-[oklch(0.24_0.045_264)] dark:ring-1 dark:ring-white/10"
            >
                {/* Signal arcs, bottom-right */}
                <svg aria-hidden viewBox="0 0 400 400" className="absolute -bottom-40 -right-32 h-[34rem] w-[34rem] text-signal" fill="none">
                    {[60, 110, 160, 210].map((r, i) => (
                        <path
                            key={r}
                            d={`M ${200 - r} 200 A ${r} ${r} 0 0 1 200 ${200 - r}`}
                            stroke="currentColor"
                            strokeWidth={i === 0 ? 14 : 10}
                            strokeLinecap="round"
                            strokeOpacity={i === 0 ? 0.95 : 0.5 - i * 0.1}
                        />
                    ))}
                    <circle cx="200" cy="200" r="16" fill="currentColor" />
                </svg>

                <div className="relative max-w-2xl">
                    <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl">
                        {title}
                    </h2>
                    <p className="mt-6 max-w-lg text-lg leading-relaxed text-[oklch(0.82_0.02_264)]">{body}</p>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                        <Link href="/register" className="btn-signal group">
                            Get started free
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href="/docs"
                            className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-medium text-white/90 transition-colors hover:bg-white/[0.06]"
                        >
                            Read the docs
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
