"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

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
        <div className={cn("relative group rounded-lg overflow-hidden border bg-zinc-950", className)}>
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                <span className="text-xs font-medium text-zinc-400 capitalize">
                    {language || "code"}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-zinc-700"
                    onClick={copyToClipboard}
                    aria-label="Copy code"
                >
                    {isCopied ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                        <Copy className="h-3 w-3" />
                    )}
                </Button>
            </div>
            <div className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-zinc-50 leading-relaxed whitespace-pre">
                    {code}
                </code>
            </div>
        </div>
    );
}
