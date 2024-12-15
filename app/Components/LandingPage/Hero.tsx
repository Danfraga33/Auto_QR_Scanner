import React from "react";
import { Button } from "../ui/button";
import { Link } from "@remix-run/react";

const Hero = () => {
  return (
    <section id="hero" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Supercharge Your Marketing Campaigns
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
            MarketPro empowers you to craft irresistible hooks, target your
            leads precisely, and launch high-converting campaigns effortlessly.
            Drive engagement, maximize ROI, and turn prospects into loyal
            customers!
          </p>

          <div className="space-x-4">
            <Button asChild>
              <Link to="campaigns">Get Started</Link>
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
