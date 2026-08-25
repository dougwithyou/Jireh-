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

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <HazardStripe />
        <TrustBar />
        <Services />
        <Portfolio />
        <Process />
        <Commitment />
        <About />
        <Testimonials />
        <BidCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
