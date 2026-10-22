"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import IncidentReplay from "./incident-replay";
import CopyCommand from "./copy-command";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

const frameworks = ["Node.js", "Express", "Fastify", "NestJS", "Next.js"];

export default function Hero() {
    return (
        <section className="relative isolate -mt-[4.5rem] overflow-hidden pt-[4.5rem] sm:-mt-20 sm:pt-20">
            <HeroBackdrop />

            <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-16 px-4 pb-24 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-10 lg:pb-32 lg:pt-24">
                {/* Copy */}
                <div>
                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
                        <Link
                            href="/docs"
                            className="group inline-flex items-center gap-2 rounded-full border bg-card/70 py-1 pl-1 pr-3 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
                        >
                            <span className="rounded-full bg-signal-soft px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-signal">
                                v1.0
                            </span>
                            Now on npm as @notaify/node
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={1}
                        className="mt-7 font-display text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.1rem] xl:text-[4.35rem]"
                    >
                        Fix backend errors{" "}
                        <span className="relative whitespace-nowrap">
                            before users
                            <SignalUnderline />
                        </span>{" "}
                        notice.
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={2}
                        className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
                    >
                        Notaify catches runtime errors in your Node.js backend, has AI explain the root cause in plain
                        English, and emails your team the fix — usually within seconds of the crash.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={3}
                        className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
                    >
                        <Link href="/register" className="btn-signal group">
                            Start for free
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <CopyCommand command="npm i @notaify/node" />
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={4}
                        className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2"
                    >
                        <span className="eyebrow">Works with</span>
                        {frameworks.map((f) => (
                            <span key={f} className="font-mono text-[13px] text-foreground/60">
                                {f}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Replay */}
                <motion.div
                    initial={{ opacity: 0, y: 30, rotate: 1.5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mx-auto w-full max-w-[540px] pb-10 lg:pb-0"
                >
                    <IncidentReplay />
                </motion.div>
            </div>
        </section>
    );
}

function SignalUnderline() {
    return (
        <svg
            aria-hidden
            viewBox="0 0 300 18"
            preserveAspectRatio="none"
            className="absolute -bottom-2 left-0 h-[0.32em] w-full text-signal"
        >
            <motion.path
                d="M3 12 C 60 4, 120 3, 180 7 S 270 13, 297 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
            />
        </svg>
    );
}

/** Concentric "signal" arcs from the logo, radiating from behind the replay window. */
function HeroBackdrop() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_35%,black,transparent_75%)] opacity-60" />
            <svg
                className="absolute -right-[22rem] -top-[18rem] h-[60rem] w-[60rem] text-signal sm:-right-[16rem] lg:-right-[10rem]"
                viewBox="0 0 600 600"
                fill="none"
            >
                {[90, 160, 230, 300, 370].map((r, i) => (
                    <circle
                        key={r}
                        cx="300"
                        cy="300"
                        r={r}
                        stroke="currentColor"
                        strokeWidth={i === 0 ? 1.5 : 1}
                        strokeOpacity={0.28 - i * 0.045}
                        strokeDasharray={i % 2 ? "2 6" : undefined}
                    />
                ))}
            </svg>
            <div className="absolute right-[5%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-signal/20 blur-[120px] dark:bg-signal/10" />
            <div className="absolute right-[30%] top-[45%] h-[22rem] w-[22rem] rounded-full bg-plum/10 blur-[120px]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        </div>
    );
}
