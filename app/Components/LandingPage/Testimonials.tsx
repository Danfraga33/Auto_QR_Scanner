import React from "react";
import { Card, CardContent } from "../ui/card";

const Testimonials = () => {
  return (
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
                <img src="" alt="Sarah J." className="rounded-full" />
                <div>
                  <h3 className="font-semibold">Sarah J.</h3>
                  <p className="text-sm text-gray-500">Marketing Director</p>
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
                <img src="" alt="Mark T." className="rounded-full" />
                <div>
                  <h3 className="font-semibold">Mark T.</h3>
                  <p className="text-sm text-gray-500">Small Business Owner</p>
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
                <img src="" alt="Emily R." className="rounded-full" />
                <div>
                  <h3 className="font-semibold">Emily R.</h3>
                  <p className="text-sm text-gray-500">
                    Digital Marketing Specialist
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "The campaign management features in MarketPro have streamlined
                our workflows and improved our ROI significantly."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
