import { type MetaFunction } from "@remix-run/node";
import CTA from "~/components/LandingPage/CTA";
import Features from "~/components/LandingPage/Features";
import Footer from "~/components/LandingPage/Footer";
import Header from "~/components/LandingPage/Header";
import Hero from "~/components/LandingPage/Hero";
import Pricing from "~/components/LandingPage/Pricing";
import Testimonials from "~/components/LandingPage/Testimonials";

export const meta: MetaFunction = () => {
  return [
    { title: "QR Scanner" },
    { name: "description", content: "Marketing Automation App" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          <Hero />
          <Features />
          <Pricing />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
