import { cn } from "@/lib/utils";

export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = "left",
    className,
}: {
    eyebrow: string;
    title: string;
    description?: string;
    align?: "left" | "center";
    className?: string;
}) {
    return (
        <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
            <p className={cn("eyebrow flex items-center gap-2", align === "center" && "justify-center")}>
                <span className="h-px w-6 bg-signal" />
                {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance sm:text-5xl">
                {title}
            </h2>
            {description && (
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">{description}</p>
            )}
        </div>
    );
}
