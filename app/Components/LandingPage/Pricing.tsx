import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CheckCircle } from "lucide-react";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="flex items-center flex-col mx-12 w-full py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Pricing Plans
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>
                For small businesses and startups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">$49/mo</div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" /> Up to
                  5 campaigns
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" /> 1,000
                  leads
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" /> Basic
                  analytics
                </li>
              </ul>
              <Button className="w-full mt-4">Choose Plan</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Professional</CardTitle>
              <CardDescription>
                For growing teams and businesses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">$99/mo</div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />{" "}
                  Unlimited campaigns
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" /> 10,000
                  leads
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />{" "}
                  Advanced analytics
                </li>
              </ul>
              <Button className="w-full mt-4">Choose Plan</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>
                For large-scale marketing operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">Custom</div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />{" "}
                  Unlimited everything
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />{" "}
                  Dedicated support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" /> Custom
                  integrations
                </li>
              </ul>
              <Button className="w-full mt-4">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
