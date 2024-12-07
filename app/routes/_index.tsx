import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import {
  ArrowRight,
  BarChart2,
  CheckCircle,
  Target,
  Users,
} from "lucide-react";
import AuthComponent from "~/components/AuthComponent";
import CTA from "~/components/LandingPage/CTA";
import Features from "~/components/LandingPage/Features";
import Footer from "~/components/LandingPage/Footer";
import Header from "~/components/LandingPage/Header";
import Hero from "~/components/LandingPage/Hero";
import Pricing from "~/components/LandingPage/Pricing";
import Testimonials from "~/components/LandingPage/Testimonials";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
export const meta: MetaFunction = () => {
  return [
    { title: "QR Scanner" },
    { name: "description", content: "Marketing Automation App" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
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
