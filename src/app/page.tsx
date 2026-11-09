import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Channels } from "@/components/channels";
import { Problem } from "@/components/problem";
import { Journey } from "@/components/journey";
import { Capabilities } from "@/components/capabilities";
import { Process } from "@/components/process";
import { SavingsCalculator } from "@/components/calculator";
import { Pricing } from "@/components/pricing";
import { FaqSection } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main id="contenido">
        <Hero />
        <Channels />
        <Problem />
        <Journey />
        <Capabilities />
        <Process />
        <SavingsCalculator />
        <Pricing />
        <FaqSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
