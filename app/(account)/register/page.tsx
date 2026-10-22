import { SignUp } from "@clerk/nextjs";
import AuthShell, { clerkAppearance } from "@/lib/components/auth/auth-shell";

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start monitoring your backend in a few minutes."
      headline={
        <>
          Your next error,
          <br />
          <span className="text-signal">explained.</span>
        </>
      }
      points={[
        "Create a project and get API keys instantly",
        "Bring your own Gemini, OpenAI or Claude key",
        "Two lines of code to start capturing",
      ]}
    >
      <SignUp appearance={clerkAppearance} routing="hash" redirectUrl="/dashboard" />
    </AuthShell>
  );
}
