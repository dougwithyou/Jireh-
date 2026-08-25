import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HazardStripe from "@/components/HazardStripe";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Commitment from "@/components/Commitment";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import BidCTA from "@/components/BidCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/site-content/get";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <Header content={content.nav} />
      <main className="flex-1">
        <Hero content={content.hero} />
        <HazardStripe />
        <TrustBar content={content.trustBar} />
        <Services content={content.services} />
        <Portfolio content={content.portfolio} />
        <Process content={content.process} />
        <Commitment content={content.commitment} />
        <About content={content.about} />
        <Testimonials content={content.testimonials} />
        <BidCTA content={content.bidCta} />
        <Contact content={content.contact} />
      </main>
      <Footer content={content.footer} nav={content.nav} />
    </>
  );
}
