import { SignIn } from "@clerk/nextjs";
import AuthShell, { clerkAppearance } from "@/lib/components/auth/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to see what your servers have been up to."
      headline={
        <>
          Catch errors.
          <br />
          Understand them.
          <br />
          <span className="text-signal">Fix them faster.</span>
        </>
      }
      points={[
        "AI explanations for every captured error",
        "Email alerts within seconds of a crash",
        "Express, Fastify, NestJS and Next.js",
      ]}
    >
      <SignIn appearance={clerkAppearance} routing="hash" redirectUrl="/dashboard" />
    </AuthShell>
  );
}
