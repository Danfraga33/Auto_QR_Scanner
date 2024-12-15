import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { WebhookIcon as Hook, ShoppingBag } from "lucide-react";
import { Link } from "@remix-run/react";

export default function ChoosePage() {
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center gap-2 px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Choose Your Path</h1>
      <div className="flex flex-col items-stretch justify-center gap-8 md:flex-row">
        <Card className="w-full max-w-md md:w-1/2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hook className="h-6 w-6" />
              Create a Hook
            </CardTitle>
            <CardDescription>
              Build custom hooks for your projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Create reusable logic with custom React hooks. Perfect for
              abstracting complex operations and state management.
            </p>
            <Link to="/createHook">
              <Button className="w-full">Start Creating</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="w-full max-w-md md:w-1/2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              <Link to="/Dashboard"> Explore MarketPro</Link>
            </CardTitle>
            <CardDescription>
              Discover professional-grade solutions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Browse our marketplace for high-quality, pre-built components and
              solutions to accelerate your development process.
            </p>
            <Link to="/Campaigns">
              <Button className="w-full" variant="secondary">
                Explore marketPro
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
