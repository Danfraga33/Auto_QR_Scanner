import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart2, Target, Users } from "lucide-react";

const Features = () => {
  return (
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
              Create, schedule, and manage multiple campaigns across various
              channels from a single dashboard.
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
              <BarChart2 className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Analytics & Reporting</CardTitle>
            </CardHeader>
            <CardContent>
              Gain valuable insights with real-time analytics and customizable
              reports to optimize your campaigns.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
