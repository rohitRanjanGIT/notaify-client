import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BrandMark from "./brand-mark";

const columns = [
    {
        title: "Product",
        links: [
            { label: "Home", href: "/" },
            { label: "Features", href: "/features" },
            { label: "Dashboard", href: "/dashboard" },
        ],
    },
    {
        title: "Docs",
        links: [
            { label: "Introduction", href: "/docs" },
            { label: "Installation", href: "/docs/installation" },
            { label: "Framework guides", href: "/docs/frameworks" },
            { label: "Configuration", href: "/docs/configuration" },
        ],
    },
    {
        title: "Elsewhere",
        links: [
            { label: "npm package", href: "https://www.npmjs.com/package/notaify", external: true },
            { label: "GitHub", href: "https://github.com", external: true },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t bg-surface">
            <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6">
                <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
                    <div className="max-w-sm space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <BrandMark className="h-8 w-8" />
                            <span className="font-display text-lg font-semibold tracking-tight">Notaify</span>
                        </Link>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            AI-powered error alerts for Node.js backends. Catch the crash, understand the cause, and
                            get it in your inbox before your users notice.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        {columns.map((col) => (
                            <div key={col.title}>
                                <h3 className="eyebrow">{col.title}</h3>
                                <ul role="list" className="mt-4 space-y-2.5">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                target={"external" in link ? "_blank" : undefined}
                                                rel={"external" in link ? "noopener noreferrer" : undefined}
                                                className="group inline-flex items-center gap-1 text-sm text-foreground/75 transition-colors hover:text-foreground"
                                            >
                                                {link.label}
                                                {"external" in link && (
                                                    <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
                    <p className="font-mono text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Notaify
                    </p>
                    <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-signal-ping rounded-full bg-signal" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                        </span>
                        Deploy · Monitor · Notify
                    </p>
                </div>
            </div>

            {/* Oversized wordmark, cropped by the footer edge */}
            <div
                aria-hidden
                className="pointer-events-none select-none px-4 text-center font-display text-[22vw] font-bold leading-[0.72] tracking-tighter text-foreground/[0.04] sm:text-[16vw] lg:text-[13rem]"
            >
                notaify
            </div>
        </footer>
    );
}
