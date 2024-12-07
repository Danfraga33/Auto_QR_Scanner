import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form } from "@remix-run/react";

const CTA = () => {
  return (
    <section
      id="cta"
      className="flex flex-col mx-12 items-center w-full py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4 items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to Boost Your Marketing?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Join thousands of marketers who are already using MarketPro to
              supercharge their campaigns.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2 flex flex-col gap-2">
            <Form className="flex space-x-2">
              <Input
                className="max-w-lg flex-1"
                placeholder="Enter your email"
                type="email"
                name="email"
              />
              <Button type="submit">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Form>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Start your free 14-day trial. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
