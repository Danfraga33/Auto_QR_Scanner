import { useState } from "react";
import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { QrCode, Mail } from "lucide-react";

export async function loader() {
  const hooks = [
    {
      id: "qr-scanner",
      title: "QR Scanner",
      description: "Engage customers with interactive QR code campaigns",
      icon: <QrCode className="h-6 w-6" />,
    },
    {
      id: "free-shipping-email",
      title: "Free Shipping Email",
      description: "Boost sales with a free shipping promotion email",
      icon: <Mail className="h-6 w-6" />,
    },
  ];

  return json(hooks);
}

const HookSelector = () => {
  const [selectedHook, setSelectedHook] = useState<string | undefined>(
    undefined,
  );
  const data = useLoaderData<typeof loader>();
  console.log(data);
  const hooks = [
    {
      id: "qr-scanner",
      title: "QR Scanner",
      description: "Engage customers with interactive QR code campaigns",
      icon: <QrCode className="h-6 w-6" />,
    },
    {
      id: "free-shipping-email",
      title: "Free Shipping Email",
      description: "Boost sales with a free shipping promotion email",
      icon: <Mail className="h-6 w-6" />,
    },
  ];

  return (
    <Form method="post">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Choose a Marketing Hook</CardTitle>
          <CardDescription>
            Select a hook for your next campaign
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedHook} onValueChange={setSelectedHook}>
            {hooks &&
              hooks.map((hook) => (
                <div key={hook.id} className="mb-4 flex items-center space-x-2">
                  <RadioGroupItem value={hook.id} id={hook.id} />
                  <Label
                    htmlFor={hook.id}
                    className="flex cursor-pointer items-center"
                  >
                    {/* Conditionally render icons based on the hook data */}
                    {/* {hook.icon === "qr" ? (
                      <QrCode className="h-6 w-6" />
                    ) : hook.icon === "mail" ? (
                      <Mail className="h-6 w-6" />
                    ) : null} */}
                    <div className="ml-2">
                      <div className="font-medium">{hook.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {hook.description}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!selectedHook} className="w-full">
            Select Hook
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
};

export default HookSelector;
