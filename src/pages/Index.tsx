import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Promotion from "@/components/Promotion";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Promotion />
      <About />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
