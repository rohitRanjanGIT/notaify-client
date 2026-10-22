import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Notaify logo on a white tile. The logo artwork has a white background,
 * so it always sits on white — in dark mode the tile reads as a badge.
 */
export default function BrandMark({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[30%] bg-white ring-1 ring-black/5 dark:ring-white/10",
                className
            )}
        >
            <Image
                src="/notaify_logo.png"
                alt=""
                fill
                sizes="40px"
                className="object-contain p-[12%]"
                priority
            />
        </span>
    );
}
