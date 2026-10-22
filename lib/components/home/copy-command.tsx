"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CopyCommand({ command, className }: { command: string; className?: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard unavailable — ignore */
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={`Copy command: ${command}`}
            className={cn(
                "group inline-flex h-11 items-center gap-3 rounded-full border bg-card/70 pl-4 pr-1.5 font-mono text-[13px] text-foreground/85 backdrop-blur transition-colors hover:border-foreground/20",
                className
            )}
        >
            <span className="text-signal">$</span>
            <span className="truncate">{command}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:text-foreground">
                {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            </span>
        </button>
    );
}
