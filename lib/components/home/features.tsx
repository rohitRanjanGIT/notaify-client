"use client";

import { motion } from "framer-motion";
import { Check, FileSearch, KeyRound, Layers, ListTree, Mail, Sparkles, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionHeading from "./section-heading";

export default function Features() {
    return (
        <section className="relative border-t bg-surface py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="What you get"
                    title="Everything between “it broke” and “it's fixed”."
                    description="Built to shrink the time from the first error to the first useful clue."
                />

                <div className="mt-14 grid gap-4 md:grid-cols-3">
                    <Tile className="md:col-span-2" icon={Sparkles} title="AI root-cause analysis" index={0}
                        body="Bring your own model. Notaify reads the trace and the request, then writes a plain-English diagnosis with a suggested fix.">
                        <div className="mt-6 flex flex-wrap gap-2">
                            {["Gemini", "OpenAI", "Claude"].map((m, i) => (
                                <span key={m} className={cn(
                                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                                    i === 0 ? "border-signal/40 bg-signal-soft text-foreground" : "bg-background text-muted-foreground"
                                )}>
                                    <span className={cn("h-1.5 w-1.5 rounded-full", i === 0 ? "bg-signal" : "bg-muted-foreground/40")} />
                                    {m}
                                </span>
                            ))}
                        </div>
                    </Tile>

                    <Tile icon={KeyRound} title="Encrypted at rest" index={1}
                        body="LLM keys and SMTP credentials are encrypted before they touch the database.">
                        <div className="mt-6 rounded-xl border bg-background px-3 py-2.5 font-mono text-xs text-muted-foreground">
                            smtpPass <span className="text-foreground/40">=</span> <span className="tracking-widest text-foreground/70">••••••••••</span>
                        </div>
                    </Tile>

                    <Tile icon={FlaskConical} title="Pre-flight testing" index={2}
                        body="Send a test email and ping your model from the dashboard before going live.">
                        <ul className="mt-6 space-y-2 text-sm">
                            {["SMTP test email sent", "LLM integration OK"].map((t) => (
                                <li key={t} className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2">
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success-soft text-success">
                                        <Check className="h-3 w-3" />
                                    </span>
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </Tile>

                    <Tile className="md:col-span-2" icon={ListTree} title="Every error, searchable" index={3}
                        body="Each project keeps a log of what was captured and what the AI said about it — filter by type and dig in.">
                        <div className="mt-6 overflow-hidden rounded-xl border bg-background text-[13px]">
                            {[
                                { t: "2m", msg: "TypeError: Cannot read properties of undefined", kind: "error" },
                                { t: "1h", msg: "ECONNREFUSED 127.0.0.1:5432", kind: "error" },
                                { t: "3h", msg: "Test error from dashboard", kind: "test" },
                            ].map((r) => (
                                <div key={r.msg} className="flex items-center gap-3 border-b px-3 py-2.5 last:border-b-0">
                                    <span className="w-6 font-mono text-[11px] text-muted-foreground">{r.t}</span>
                                    <span className="min-w-0 flex-1 truncate font-mono text-[12px]">{r.msg}</span>
                                    <span className={cn(
                                        "rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                                        r.kind === "error" ? "bg-destructive/10 text-destructive" : "bg-plum-soft text-plum"
                                    )}>
                                        {r.kind}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Tile>

                    <Tile icon={Mail} title="Straight to your inbox" index={4}
                        body="Detailed reports over your own SMTP. No webhooks, no extra tools to check." />
                    <Tile icon={FileSearch} title="Readable stack traces" index={5}
                        body="Traces are parsed into file, line and reason, so the culprit stands out at a glance." />
                    <Tile icon={Layers} title="Framework-ready" index={6}
                        body="Global auto-capture, manual capture, handler wrappers and middleware for Express, Fastify, NestJS and Next.js." />
                </div>
            </div>
        </section>
    );
}

function Tile({
    icon: Icon,
    title,
    body,
    children,
    className,
    index,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    body: string;
    children?: React.ReactNode;
    className?: string;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className={cn("panel group relative overflow-hidden p-6 sm:p-7", className)}
        >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border bg-background text-foreground transition-colors duration-300 group-hover:border-signal/50 group-hover:text-signal">
                <Icon className="h-[18px] w-[18px]" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">{body}</p>
            {children}
        </motion.div>
    );
}
