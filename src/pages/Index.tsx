import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Cities from "@/components/Cities";
import Videos from "@/components/Videos";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <HowItWorks />
      <Features />
      <Videos />
      <Cities />
      <Contact />
      <Partners />
      <Footer />
    </div>
  );
};

export default Index;
