import { Workflow } from "@/components/workflow";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Integrations } from "@/components/integrations";
import { WorkflowScene } from "@/components/workflow-scene";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { SavingsCalculator } from "@/components/calculator";
import { Pricing } from "@/components/pricing";
import { FaqSection } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";

export default function Home() {
  return (
    <Workflow>
      <JsonLd />
      <Nav />
      <main id="contenido">
        <Hero />
        <Integrations />
        <Intro />
        <HowItWorks />
        <WorkflowScene />
        <Features />
        <SavingsCalculator />
        <Pricing />
        <FaqSection />
        <Contact />
      </main>
      <Footer />
    </Workflow>
  );
}
