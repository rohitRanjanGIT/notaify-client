import Hero from "@/lib/components/home/hero";
import Workflow from "@/lib/components/home/workflow";
import Features from "@/lib/components/home/features";
import Footer from "@/lib/components/hf/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <Hero />
        <Workflow />
        <Features />
        <Footer />
      </main>
    </div>
  );
}