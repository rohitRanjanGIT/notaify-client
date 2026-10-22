"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Mail, Sparkles, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A looping replay of what Notaify does with a single crash:
 * capture it, explain it with AI, and land it in your inbox.
 * Purely illustrative — no network calls.
 */

const STAGES = [
    { key: "crash", at: "+0.0s", label: "Crash" },
    { key: "capture", at: "+0.1s", label: "Captured" },
    { key: "analyze", at: "+2.3s", label: "Diagnosed" },
    { key: "notify", at: "+5.6s", label: "Emailed" },
] as const;

const STAGE_DURATIONS = [1100, 1300, 2600, 4200]; // ms spent on each stage

const traceLines = [
    { text: "POST /api/checkout  500", tone: "muted" },
    { text: "TypeError: Cannot read properties of undefined (reading 'email')", tone: "error" },
    { text: "    at getUser (controllers/user.js:27:18)", tone: "dim" },
    { text: "    at async routes/checkout.js:14:5", tone: "dim" },
] as const;

export default function IncidentReplay({ className }: { className?: string }) {
    const reduce = useReducedMotion();
    const [stage, setStage] = useState(reduce ? 3 : 0);

    useEffect(() => {
        if (reduce) return;
        const t = setTimeout(() => setStage((s) => (s + 1) % STAGES.length), STAGE_DURATIONS[stage]);
        return () => clearTimeout(t);
    }, [stage, reduce]);

    return (
        <div className={cn("relative", className)}>
            {/* Main window */}
            <div className="panel relative overflow-hidden !rounded-[1.4rem] bg-code text-code-foreground !shadow-[0_40px_80px_-40px_color-mix(in_oklch,var(--primary)_60%,transparent)] dark:border-white/10">
                {/* Title bar */}
                <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    </div>
                    <span className="font-mono text-[11px] text-white/45">api-prod · server.js</span>
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-white/45">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-signal-ping rounded-full bg-signal" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                        </span>
                        live
                    </span>
                </div>

                {/* Stage rail */}
                <ol className="grid grid-cols-4 border-b border-white/[0.07]">
                    {STAGES.map((s, i) => {
                        const done = i < stage;
                        const current = i === stage;
                        return (
                            <li
                                key={s.key}
                                className={cn(
                                    "relative px-3 py-2.5 transition-colors duration-500",
                                    i > 0 && "border-l border-white/[0.07]"
                                )}
                            >
                                <div className="font-mono text-[10px] text-white/35">{s.at}</div>
                                <div
                                    className={cn(
                                        "mt-0.5 flex items-center gap-1 whitespace-nowrap text-[11.5px] font-medium sm:text-[12px] transition-colors duration-500",
                                        current ? "text-signal" : done ? "text-white/80" : "text-white/30"
                                    )}
                                >
                                    {done && <Check className="h-3 w-3" />}
                                    {s.label}
                                </div>
                                {current && (
                                    <motion.span
                                        layoutId="stage-bar"
                                        className="absolute inset-x-0 bottom-0 h-[2px] bg-signal"
                                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ol>

                {/* Body */}
                <div className="min-h-[300px] space-y-4 p-4 font-mono text-[12.5px] leading-relaxed pb-20 sm:min-h-[310px] sm:p-5 sm:pb-16">
                    <div className="space-y-0.5">
                        {traceLines.map((line, i) => (
                            <motion.div
                                key={line.text}
                                initial={false}
                                animate={{ opacity: 1, x: 0 }}
                                className={cn(
                                    "truncate",
                                    line.tone === "error" && "text-[oklch(0.75_0.15_25)]",
                                    line.tone === "muted" && "text-white/55",
                                    line.tone === "dim" && "text-white/35"
                                )}
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                {line.tone === "muted" && <span className="mr-2 text-signal">›</span>}
                                {line.text}
                            </motion.div>
                        ))}
                    </div>

                    <AnimatePresence mode="popLayout">
                        {stage >= 1 && (
                            <motion.div
                                key="captured"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-start gap-2 text-[12px] text-white/55"
                            >
                                <TriangleAlert className="mt-[3px] h-3.5 w-3.5 shrink-0 text-signal" />
                                <span>
                                    notaify captured <span className="text-white/80">TypeError</span> · stack + request context
                                </span>
                            </motion.div>
                        )}

                        {stage >= 2 && (
                            <motion.div
                                key="analysis"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3.5 font-sans"
                            >
                                <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[oklch(0.78_0.11_345)]">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Root cause
                                </div>
                                <Typewriter
                                    active={stage === 2}
                                    text="req.user is undefined when the session cookie has expired, so getUser() reads .email off nothing."
                                    className="text-[13px] leading-relaxed text-white/85"
                                />
                                {stage >= 3 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-2.5 rounded-lg bg-black/25 px-2.5 py-1.5 font-mono text-[12px] text-[oklch(0.8_0.13_155)]"
                                    >
                                        + if (!req.user) return res.status(401).end()
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Inbox notification, overlapping the window */}
            <AnimatePresence>
                {stage === 3 && (
                    <motion.div
                        key="toast"
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300, damping: 26 }}
                        className="panel absolute -bottom-8 left-4 right-4 flex items-start gap-3 p-3.5 sm:-bottom-10 sm:-left-10 sm:right-auto sm:w-[330px]"
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-signal text-signal-foreground">
                            <Mail className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-[13px] font-semibold">Notaify · api-prod</p>
                                <span className="font-mono text-[10px] text-muted-foreground">now</span>
                            </div>
                            <p className="truncate text-[13px] text-foreground/85">TypeError in getUser — session expired</p>
                            <p className="truncate text-xs text-muted-foreground">Root cause + suggested fix inside</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Typewriter({ text, active, className }: { text: string; active: boolean; className?: string }) {
    // Remounts each loop (the parent block unmounts between replays), so the count starts at 0.
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) return;
        const id = setInterval(() => {
            setCount((c) => {
                if (c >= text.length) {
                    clearInterval(id);
                    return c;
                }
                return c + 2;
            });
        }, 22);
        return () => clearInterval(id);
    }, [active, text]);

    const shown = active ? count : text.length;

    return (
        <p className={className}>
            {text.slice(0, shown)}
            {shown < text.length && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-caret bg-signal" />}
        </p>
    );
}
