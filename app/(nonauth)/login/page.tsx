import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Branding / Info */}
        <section className="relative hidden lg:block">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.28),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.22),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.85))]" />

          {/* Grid texture */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:16px_16px] opacity-60" />

          <div className="relative flex h-full items-center justify-center px-12 py-12 text-center">
            <div className="max-w-md space-y-6">
              {/* Logo placeholder */}
              <div className="mx-auto h-12 w-12 rounded-xl border border-emerald-400/40 bg-emerald-400/10" />

              <h1 className="text-3xl font-semibold leading-tight">
                Catch errors.
                <br />
                Understand failures.
                <br />
                Notify instantly.
              </h1>

              <p className="text-sm text-gray-400 leading-relaxed">
                Notaify is an Express.js error monitoring and notification
                platform that captures runtime errors, analyzes them,
                and sends real-time alerts to your team.
              </p>

              <div className="pt-4 text-xs text-gray-400">
                Built for Express.js developers
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: Auth */}
        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-semibold">Log in to Notaify</h2>
              <p className="mt-2 text-sm text-gray-400">
                Monitor your Express apps in real time
              </p>
            </div>

            <div className="flex justify-center">
              <SignIn
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card:
                      "bg-black border border-gray-800 rounded-2xl shadow-lg",
                    headerTitle:
                      "text-white text-lg font-semibold",
                    headerSubtitle:
                      "text-gray-400 text-sm",
                    socialButtonsBlockButton:
                      "border border-gray-700 bg-[#0b0b0b] text-white hover:bg-[#151515]",
                    socialButtonsBlockButtonText:
                      "font-medium text-sm",
                    dividerLine:
                      "bg-gray-800",
                    dividerText:
                      "text-gray-500",
                    formFieldLabel:
                      "text-gray-200 font-medium text-sm",
                    formFieldInput:
                      "bg-[#0b0b0b] border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
                    formButtonPrimary:
                      "bg-white text-black hover:bg-gray-100 font-medium rounded-md",
                    footerActionLink:
                      "text-emerald-300 hover:text-emerald-200",
                    footer:
                      "text-gray-500",
                  },
                }}
                routing="hash"
                redirectUrl="/dashboard"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
