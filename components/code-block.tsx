"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    code: string;
    language?: string;
    className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code: ", err);
        }
    };

    return (
        <div
            data-codeblock
            className={cn(
                "group relative overflow-hidden rounded-2xl border bg-code text-code-foreground dark:border-white/10",
                className
            )}
        >
            <div className="flex items-center justify-between border-b border-white/[0.07] py-1.5 pl-4 pr-1.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
                    {language || "code"}
                </span>
                <button
                    type="button"
                    className="flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white"
                    onClick={copyToClipboard}
                    aria-label="Copy code"
                >
                    {isCopied ? (
                        <>
                            <Check className="h-3 w-3 text-success" /> Copied
                        </>
                    ) : (
                        <>
                            <Copy className="h-3 w-3" /> Copy
                        </>
                    )}
                </button>
            </div>
            <pre className="overflow-x-auto p-4 text-[13px] leading-[1.7]">
                <code className="font-mono">{code}</code>
            </pre>
        </div>
    );
}
