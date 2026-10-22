import Hero from "@/lib/components/home/hero";
import Workflow from "@/lib/components/home/workflow";
import CodeDemo from "@/lib/components/home/code-demo";
import Features from "@/lib/components/home/features";
import Cta from "@/lib/components/home/cta";
import Footer from "@/lib/components/hf/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="grow">
        <Hero />
        <Workflow />
        <CodeDemo />
        <Features />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
