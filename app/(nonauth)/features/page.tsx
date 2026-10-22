"use client";

import { motion } from "framer-motion";
import {
    Activity,
    BellRing,
    BrainCircuit,
    Check,
    Network,
    Search,
    Shield,
    Terminal,
    Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Cta from "@/lib/components/home/cta";

const coreFeatures = [
    {
        title: "Fast alerts",
        description: "Critical error alerts land in your inbox within 5–8 seconds of the crash. Never be the last to know.",
        icon: Zap,
    },
    {
        title: "Encrypted credentials",
        description: "API keys and SMTP passwords are AES-encrypted at rest, and never exposed back to the browser in plain text.",
        icon: Shield,
    },
    {
        title: "Intelligent parsing",
        description: "Raw V8 stack traces are parsed into file, line and reason so the culprit is obvious at a glance.",
        icon: Search,
    },
    {
        title: "Native email reports",
        description: "No webhooks to configure. Full-context bug reports go straight to your team over your own SMTP.",
        icon: BellRing,
    },
    {
        title: "Pre-flight config tests",
        description: "Validate SMTP routing and LLM configuration from the dashboard before you deploy to production.",
        icon: Activity,
    },
    {
        title: "Universal middleware",
        description: "One SDK for Express, Fastify, Next.js and NestJS — global capture, wrappers or middleware.",
        icon: Terminal,
    },
];

export default function FeaturesPage() {
    return (
        <div className="relative overflow-x-clip">
            {/* Header */}
            <section className="relative overflow-hidden">
                <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_60%_80%_at_20%_0%,black,transparent_70%)]" />
                <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="eyebrow flex items-center gap-2"
                    >
                        <span className="h-px w-6 bg-signal" /> Features
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-balance sm:text-7xl"
                    >
                        Built for the moment <span className="text-signal">production breaks.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground"
                    >
                        Everything Notaify does is aimed at one number: how long it takes your team to go from an
                        error to an answer.
                    </motion.p>
                </div>
            </section>

            {/* Core features — hairline grid */}
            <section className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid overflow-hidden rounded-[1.6rem] border bg-border sm:grid-cols-2 lg:grid-cols-3 [&>*]:bg-card gap-px">
                    {coreFeatures.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                            className="group relative p-7 sm:p-8"
                        >
                            <div className="flex items-center justify-between">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background transition-colors group-hover:border-signal/50 group-hover:text-signal">
                                    <f.icon className="h-[18px] w-[18px]" />
                                </span>
                                <span className="font-mono text-xs text-muted-foreground/60">0{i + 1}</span>
                            </div>
                            <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{f.title}</h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Deep dives */}
            <section className="mx-auto max-w-6xl space-y-24 px-4 py-24 sm:px-6 sm:py-32 lg:space-y-32">
                <DeepDive
                    icon={BrainCircuit}
                    eyebrow="AI diagnostics"
                    title="Let the model find the bug before you open your IDE."
                    body="Connect a Gemini, OpenAI or Anthropic key and every error is auto-diagnosed. Notaify reads the stack trace, understands the framework context, and writes a plain-English explanation with a suggested fix."
                    visual={<DiagnosisVisual />}
                />
                <DeepDive
                    reverse
                    icon={Network}
                    eyebrow="Framework integration"
                    title="One SDK, whatever your server looks like."
                    body="A monolith on Express, services on Fastify, a full-stack app on Next.js or a NestJS API — @notaify/node covers them all, so error tracking stops being something you set up per project."
                    visual={<FrameworksVisual />}
                />
                <DeepDive
                    icon={Activity}
                    eyebrow="Dashboard"
                    title="A home for every project and every error."
                    body="Create projects, generate API keys, test your SMTP and LLM setup, and browse every captured error with the AI's analysis alongside it."
                    visual={<DashboardVisual />}
                />
            </section>

            <Cta title="Ready when your next error is." />
        </div>
    );
}

function DeepDive({
    icon: Icon,
    eyebrow,
    title,
    body,
    visual,
    reverse,
}: {
    icon: React.ComponentType<{ className?: string }>;
    eyebrow: string;
    title: string;
    body: string;
    visual: React.ReactNode;
    reverse?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={cn("grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-2 lg:gap-20", reverse && "lg:[&>*:first-child]:order-2")}
        >
            <div>
                <p className="eyebrow flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-signal" />
                    {eyebrow}
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance sm:text-[2.6rem]">
                    {title}
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">{body}</p>
            </div>
            <div className="relative">
                <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-signal/10 blur-3xl dark:bg-signal/[0.06]" />
                {visual}
            </div>
        </motion.div>
    );
}

function DiagnosisVisual() {
    return (
        <div className="overflow-hidden rounded-[1.4rem] border bg-code p-6 font-mono text-[13px] leading-relaxed text-code-foreground shadow-[0_40px_80px_-40px_color-mix(in_oklch,var(--primary)_55%,transparent)] dark:border-white/10">
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.07] pb-3 text-[11px] text-white/45">
                <span>diagnosis · checkout-api</span>
                <span className="text-signal">● new</span>
            </div>
            <p className="text-[oklch(0.75_0.15_25)]">TypeError: Cannot read properties of undefined (reading &apos;map&apos;)</p>
            <p className="mt-1 text-white/35">    at renderItems (services/cart.js:42:21)</p>
            <div className="mt-5 border-l-2 border-[oklch(0.78_0.11_345)] pl-4 font-sans text-[14px] text-white/80">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[oklch(0.78_0.11_345)]">Analysis</span>
                <p className="mt-1.5">
                    <code className="font-mono text-white">userData.items</code> is undefined when the upstream API
                    responds with a 404. Guard the access or fall back to an empty array.
                </p>
            </div>
            <div className="mt-5 flex items-start gap-2 rounded-xl bg-[oklch(0.74_0.14_155/0.1)] p-3 text-[oklch(0.82_0.13_155)]">
                <Check className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                    Suggested fix: <span className="text-white/85">userData?.items?.map(…) ?? []</span>
                </span>
            </div>
        </div>
    );
}

function FrameworksVisual() {
    const items = [
        { name: "Express", api: "notaifyMiddleware()" },
        { name: "Fastify", api: "setErrorHandler(…)" },
        { name: "Next.js", api: "notaifyHandler(…)" },
        { name: "NestJS", api: "notaify.capture(…)" },
    ];
    return (
        <div className="panel grid grid-cols-2 gap-px overflow-hidden !bg-border p-0">
            {items.map((it, i) => (
                <div key={it.name} className="bg-card p-6 sm:p-7">
                    <span className="font-mono text-[11px] text-muted-foreground">0{i + 1}</span>
                    <p className="mt-6 font-display text-2xl font-semibold tracking-tight">{it.name}</p>
                    <p className="mt-1 truncate font-mono text-xs text-signal">{it.api}</p>
                </div>
            ))}
        </div>
    );
}

function DashboardVisual() {
    const bars = [30, 52, 38, 70, 44, 26, 62, 48, 88, 40, 34, 56];
    return (
        <div className="panel p-6">
            <div className="flex items-center justify-between border-b pb-4">
                <div>
                    <p className="font-display text-lg font-semibold tracking-tight">checkout-api</p>
                    <p className="font-mono text-[11px] text-muted-foreground">errors · last 12 hours</p>
                </div>
                <span className="rounded-full bg-success-soft px-2.5 py-1 font-mono text-[11px] text-success">SMTP ✓ LLM ✓</span>
            </div>
            <div className="flex h-44 items-end gap-1.5 pt-6">
                {bars.map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                        className={cn("flex-1 rounded-t-md", i === 8 ? "bg-signal" : "bg-foreground/15")}
                    />
                ))}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl border bg-background px-3 py-2.5 text-sm">
                <span className="h-2 w-2 rounded-full bg-signal" />
                <span className="min-w-0 flex-1 truncate font-mono text-[12px]">ECONNREFUSED 127.0.0.1:5432</span>
                <span className="font-mono text-[11px] text-muted-foreground">peak</span>
            </div>
        </div>
    );
}
