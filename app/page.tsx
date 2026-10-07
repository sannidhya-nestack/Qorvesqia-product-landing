import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Platform from "@/components/sections/Platform";
import WalkthroughCalendar from "@/components/sections/WalkthroughCalendar";
import Suite from "@/components/sections/Suite";
import Modules from "@/components/sections/Modules";
import HowItWorks from "@/components/sections/HowItWorks";
import Intelligence from "@/components/sections/Intelligence";
import Compliance from "@/components/sections/Compliance";
import Products from "@/components/sections/Products";
import Connectivity from "@/components/sections/Connectivity";
import Pricing from "@/components/sections/Pricing";
import Onboarding from "@/components/sections/Onboarding";
import Integrations from "@/components/sections/Integrations";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-dvh bg-[var(--paper)] text-[var(--ink)]">
      <Nav />
      <Hero />
      <Platform />
      <WalkthroughCalendar />
      <Suite />
      <Modules />
      <HowItWorks />
      <Intelligence />
      <Compliance />
      <Products />
      <Connectivity />
      <Pricing />
      <Onboarding />
      <Integrations />
      <Faq />
      <Footer />
    </main>
  );
}
