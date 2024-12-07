import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { ArrowRight, BarChart, CheckCircle, Target, Users } from "lucide-react";
import AuthComponent from "~/components/AuthComponent";
import Header from "~/components/LandingPage/Header";

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
          <section className="flex items-center flex-col mx-12 w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <AuthComponent />
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Supercharge Your Marketing Campaigns
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    MarketPro empowers you to craft irresistible hooks, target
                    your leads precisely, and launch high-converting campaigns
                    effortlessly. Drive engagement, maximize ROI, and turn
                    prospects into loyal customers!
                  </p>
                </div>

                <div className="space-x-4">
                  <Button>Get Started</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          </section>
          <section
            id="features"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          >
            <div className="flex items-center flex-col mx-12  px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Key Features
              </h2>
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                <Card>
                  <CardHeader>
                    <Target className="h-10 w-10 mb-2 text-primary" />
                    <CardTitle>Campaign Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Create, schedule, and manage multiple campaigns across
                    various channels from a single dashboard.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Users className="h-10 w-10 mb-2 text-primary" />
                    <CardTitle>Lead Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Track and nurture leads through your sales funnel with our
                    advanced lead management system.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <BarChart className="h-10 w-10 mb-2 text-primary" />
                    <CardTitle>Analytics & Reporting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Gain valuable insights with real-time analytics and
                    customizable reports to optimize your campaigns.
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
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
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />{" "}
                        Up to 5 campaigns
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />{" "}
                        1,000 leads
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />{" "}
                        Basic analytics
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
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />{" "}
                        10,000 leads
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
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />{" "}
                        Custom integrations
                      </li>
                    </ul>
                    <Button className="w-full mt-4">Contact Sales</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section
            id="testimonials"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          >
            <div className="flex items-center flex-col mx-12 px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                What Our Customers Say
              </h2>
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                <Card>
                  <CardContent className="pt-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={"/placeholder.svg?height=40&width=40" ?? "/"}
                        alt="Sarah J."
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">Sarah J.</h3>
                        <p className="text-sm text-gray-500">
                          Marketing Director
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      "MarketPro has revolutionized our marketing efforts. The
                      insights we've gained have been invaluable."
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        alt="Mark T."
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">Mark T.</h3>
                        <p className="text-sm text-gray-500">
                          Small Business Owner
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      "As a small business, MarketPro has given us the tools to
                      compete with larger companies. It's been a game-changer."
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        alt="Emily R."
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">Emily R.</h3>
                        <p className="text-sm text-gray-500">
                          Digital Marketing Specialist
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      "The campaign management features in MarketPro have
                      streamlined our workflows and improved our ROI
                      significantly."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="flex flex-col mx-12 items-center w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="f lex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Ready to Boost Your Marketing?
                  </h2>
                  <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Join thousands of marketers who are already using MarketPro
                    to supercharge their campaigns.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input
                      className="max-w-lg flex-1"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button type="submit">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Start your free 14-day trial. No credit card required.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 MarketPro. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" to="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" to="#">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}
