"use client";

import { motion } from "framer-motion";
import { Mail, Radar, Sparkles } from "lucide-react";
import SectionHeading from "./section-heading";

const steps = [
    {
        n: "01",
        at: "t + 0s",
        title: "Capture",
        icon: Radar,
        body: "Initialise once and every unhandled error and rejected promise is intercepted — or drop in middleware for your framework. Your server keeps running.",
    },
    {
        n: "02",
        at: "t + ~2s",
        title: "Analyse",
        icon: Sparkles,
        body: "The stack trace and request context go to the model you choose — Gemini, OpenAI or Claude — which explains what broke and how to fix it.",
    },
    {
        n: "03",
        at: "t + 5–8s",
        title: "Notify",
        icon: Mail,
        body: "Your team gets an email with the diagnosis, the trace and the environment, so the first person to look already knows where to start.",
    },
];

export default function Workflow() {
    return (
        <section className="relative border-t bg-surface py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="How it works"
                    title="From crash to inbox in one pipeline."
                    description="No dashboards to babysit and no logs to grep. Notaify watches, thinks, and tells you."
                />

                <div className="relative mt-16">
                    {/* Signal line running through the steps */}
                    <div className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-signal via-border to-transparent md:left-0 md:top-[19px] md:h-px md:w-full md:bg-gradient-to-r" />

                    <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
                        {steps.map((step, i) => (
                            <motion.li
                                key={step.n}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                className="relative pl-16 md:pl-0"
                            >
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border bg-background text-foreground shadow-sm md:relative">
                                    <step.icon className="h-[18px] w-[18px]" />
                                    {i === 0 && (
                                        <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                                            <span className="absolute inline-flex h-full w-full animate-signal-ping rounded-full bg-signal" />
                                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
                                        </span>
                                    )}
                                </div>
                                <div className="md:mt-7">
                                    <div className="flex items-baseline gap-3">
                                        <span className="font-mono text-xs text-signal">{step.n}</span>
                                        <h3 className="font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
                                        <span className="ml-auto rounded-full border px-2 py-0.5 font-mono text-[11px] text-muted-foreground md:ml-0">
                                            {step.at}
                                        </span>
                                    </div>
                                    <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">{step.body}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
