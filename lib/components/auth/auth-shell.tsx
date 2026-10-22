import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import BrandMark from "@/lib/components/hf/brand-mark";

/** Shared Clerk appearance so SignIn/SignUp follow the site theme in light and dark. */
export const clerkAppearance = {
    variables: {
        borderRadius: "0.75rem",
        fontFamily: "var(--font-geist-sans)",
    },
    elements: {
        rootBox: "w-full",
        cardBox: "w-full shadow-none",
        card: "w-full bg-card border border-border shadow-[0_24px_60px_-30px_color-mix(in_oklch,var(--primary)_35%,transparent)] rounded-2xl",
        headerTitle: "text-foreground font-display text-xl font-semibold tracking-tight",
        headerSubtitle: "text-muted-foreground text-sm",
        socialButtonsBlockButton: "border border-border bg-background text-foreground hover:bg-accent",
        socialButtonsBlockButtonText: "font-medium text-sm text-foreground",
        dividerLine: "bg-border",
        dividerText: "text-muted-foreground",
        formFieldLabel: "text-foreground font-medium text-sm",
        formFieldInput:
            "bg-background border border-input text-foreground rounded-lg focus:ring-2 focus:ring-ring/40 focus:border-ring",
        formButtonPrimary:
            "bg-signal text-signal-foreground hover:bg-signal hover:brightness-105 font-semibold rounded-full shadow-none normal-case text-sm",
        footer: "bg-transparent [&_*]:!bg-transparent",
        footerActionText: "text-muted-foreground",
        footerActionLink: "text-foreground font-medium underline decoration-signal decoration-2 underline-offset-4 hover:text-signal",
        identityPreviewText: "text-foreground",
        identityPreviewEditButton: "text-signal",
        formFieldInputShowPasswordButton: "text-muted-foreground",
        otpCodeFieldInput: "border-input text-foreground",
    },
};

export default function AuthShell({
    title,
    subtitle,
    headline,
    points,
    children,
}: {
    title: string;
    subtitle: string;
    headline: React.ReactNode;
    points: string[];
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
            {/* Brand panel */}
            <section className="grain relative hidden overflow-hidden bg-[oklch(0.22_0.05_264)] text-[oklch(0.96_0.008_80)] lg:flex lg:flex-col">
                <svg aria-hidden viewBox="0 0 400 400" fill="none" className="absolute -right-24 -top-24 h-[36rem] w-[36rem] text-signal">
                    {[60, 110, 160, 210, 260].map((r, i) => (
                        <path
                            key={r}
                            d={`M ${200 - r} 200 A ${r} ${r} 0 0 1 200 ${200 - r}`}
                            stroke="currentColor"
                            strokeWidth={i === 0 ? 12 : 8}
                            strokeLinecap="round"
                            strokeOpacity={i === 0 ? 0.9 : 0.42 - i * 0.07}
                            transform="rotate(90 200 200)"
                        />
                    ))}
                </svg>
                <div className="relative flex flex-1 flex-col justify-between p-12 xl:p-16">
                    <Link href="/" className="inline-flex w-fit items-center gap-2.5">
                        <BrandMark className="h-9 w-9" />
                        <span className="font-display text-xl font-semibold tracking-tight">Notaify</span>
                    </Link>

                    <div className="max-w-md">
                        <h1 className="font-display text-5xl font-semibold leading-[1] tracking-[-0.035em]">{headline}</h1>
                        <ul className="mt-10 space-y-3.5">
                            {points.map((p) => (
                                <li key={p} className="flex items-start gap-3 text-[15px] text-[oklch(0.84_0.02_264)]">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-signal-foreground">
                                        <Check className="h-3 w-3" strokeWidth={3} />
                                    </span>
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="font-mono text-xs text-[oklch(0.7_0.025_264)]">Deploy · Monitor · Notify</p>
                </div>
            </section>

            {/* Form */}
            <section className="relative flex flex-col items-center justify-center px-5 pb-12 pt-24 sm:px-8">
                <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent_75%)]" />
                <div className="w-full max-w-[400px]">
                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Back to home
                    </Link>
                    <div className="mb-8">
                        <h2 className="font-display text-3xl font-semibold tracking-tight">{title}</h2>
                        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
                    </div>
                    <div className="flex justify-center">{children}</div>
                </div>
            </section>
        </div>
    );
}
