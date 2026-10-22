"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionHeading from "./section-heading";

// Snippets mirror the API documented in /docs (apiKeyId + apiKey, capture, notaifyHandler).
const snippets = [
    {
        id: "auto",
        label: "Auto-capture",
        file: "server.js",
        code: `import express from 'express'
import notaify from '@notaify/node'

notaify.init({
  apiKeyId: process.env.NOTAIFY_API_KEY_ID,
  apiKey: process.env.NOTAIFY_API_KEY,
})

const app = express()

// That's it — every unhandled error is now reported.
app.get('/users', async (req, res) => {
  res.json(await db.findUsers())
})

app.listen(3000)`,
    },
    {
        id: "manual",
        label: "Manual capture",
        file: "payments.js",
        code: `import notaify from '@notaify/node'

try {
  await chargeCustomer(order)
} catch (error) {
  // Report with extra context, then handle it your way
  await notaify.capture(error, {
    userId: order.userId,
    route: '/api/payment',
    severity: 'critical',
  })
  throw error
}`,
    },
    {
        id: "next",
        label: "Next.js route",
        file: "app/api/users/route.ts",
        code: `import notaify, { notaifyHandler } from '@notaify/node'

notaify.init({
  apiKeyId: process.env.NOTAIFY_API_KEY_ID,
  apiKey: process.env.NOTAIFY_API_KEY,
})

export const GET = notaifyHandler(async (req) => {
  const users = await db.getUsers()
  return Response.json(users)
})`,
    },
];

const points = [
    { title: "Install the package", body: "npm, pnpm, yarn or bun — it's a single dependency." },
    { title: "Add two env vars", body: "Your API key ID and key, generated per project in the dashboard." },
    { title: "Call init() once", body: "At your entry point. Middleware and wrappers are there when you want them." },
];

export default function CodeDemo() {
    const [active, setActive] = useState(snippets[0].id);
    const [copied, setCopied] = useState(false);
    const snippet = snippets.find((s) => s.id === active)!;

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(snippet.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* ignore */
        }
    };

    return (
        <section className="relative py-24 sm:py-32">
            <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-start gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
                <div className="lg:sticky lg:top-28">
                    <SectionHeading
                        eyebrow="Integration"
                        title="Two lines in, every error covered."
                        description="No routing changes and no try/catch sprawl. Notaify sits beside your existing error handling instead of replacing it."
                    />
                    <ol className="mt-10 space-y-6">
                        {points.map((p, i) => (
                            <li key={p.title} className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs text-muted-foreground">
                                    {i + 1}
                                </span>
                                <div>
                                    <p className="font-medium">{p.title}</p>
                                    <p className="mt-0.5 text-sm text-muted-foreground">{p.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <Link
                        href="/docs/installation"
                        className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-signal decoration-2 underline-offset-[6px]"
                    >
                        Read the setup guide
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden rounded-[1.4rem] border bg-code text-code-foreground shadow-[0_40px_80px_-40px_color-mix(in_oklch,var(--primary)_55%,transparent)] dark:border-white/10"
                >
                    <div className="flex items-center justify-between gap-2 border-b border-white/[0.07] px-2 py-2">
                        <div role="tablist" aria-label="Integration examples" className="flex gap-1 overflow-x-auto">
                            {snippets.map((s) => (
                                <button
                                    key={s.id}
                                    role="tab"
                                    aria-selected={active === s.id}
                                    onClick={() => setActive(s.id)}
                                    className={cn(
                                        "relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                                        active === s.id ? "text-white" : "text-white/45 hover:text-white/75"
                                    )}
                                >
                                    {active === s.id && (
                                        <motion.span
                                            layoutId="code-tab"
                                            className="absolute inset-0 rounded-full bg-white/[0.08]"
                                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                    <span className="relative">{s.label}</span>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={copy}
                            aria-label="Copy code"
                            className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/[0.08] hover:text-white"
                        >
                            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                    </div>

                    <div className="border-b border-white/[0.07] px-5 py-2 font-mono text-[11px] text-white/40">{snippet.file}</div>

                    <div className="min-h-[380px] overflow-x-auto p-5 text-[13px] leading-[1.75]">
                        <AnimatePresence mode="wait">
                            <motion.pre
                                key={snippet.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.2 }}
                                className="font-mono"
                            >
                                <code>
                                    {snippet.code.split("\n").map((line, i) => (
                                        <div key={i} className="flex">
                                            <span className="mr-5 w-5 shrink-0 select-none text-right text-white/20">{i + 1}</span>
                                            <span>{highlight(line)}</span>
                                        </div>
                                    ))}
                                </code>
                            </motion.pre>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* A deliberately tiny highlighter — enough for these snippets, no dependency. */
const KEYWORDS = /^(import|from|export|const|async|await|return|try|catch|throw|new)$/;

function highlight(line: string) {
    if (!line.trim()) return " ";
    const commentAt = line.indexOf("//");
    const code = commentAt >= 0 ? line.slice(0, commentAt) : line;
    const comment = commentAt >= 0 ? line.slice(commentAt) : "";

    const parts = code.split(/('[^']*'|\b[A-Za-z_$][\w$]*\b|\d+)/g);
    return (
        <>
            {parts.map((p, i) => {
                if (!p) return null;
                if (p.startsWith("'")) return <span key={i} className="text-[oklch(0.82_0.12_150)]">{p}</span>;
                if (KEYWORDS.test(p)) return <span key={i} className="text-[oklch(0.75_0.13_345)]">{p}</span>;
                if (/^\d+$/.test(p)) return <span key={i} className="text-signal">{p}</span>;
                if (/^[A-Z][A-Z_]+$/.test(p)) return <span key={i} className="text-signal">{p}</span>;
                if (/^(init|capture|notaifyHandler|json|get|listen|findUsers|getUsers|chargeCustomer)$/.test(p))
                    return <span key={i} className="text-[oklch(0.82_0.09_230)]">{p}</span>;
                return <span key={i}>{p}</span>;
            })}
            {comment && <span className="italic text-white/35">{comment}</span>}
        </>
    );
}
