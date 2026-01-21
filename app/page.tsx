import Hero from "@/lib/components/home/hero";
import Workflow from "@/lib/components/home/workflow";
import Features from "@/lib/components/home/features";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <Workflow />
        <Features />
      </main>
    </div>
  );
}