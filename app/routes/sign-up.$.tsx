import { useSignUp } from "@clerk/remix";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Computer, Github } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  return null;
}

const SignupPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showPassword, setShowPassword] = useState("");
  const [error, setError] = useState("");
  // const navigation = useNavigation();

  if (!isLoaded)
    return (
      <>
        <p className="flex items-center justify-center h-screen">Loading... </p>
      </>
    );

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <Form method="post">
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
                <Github />
                Github
              </Button>
              <Button variant="outline">
                <Computer />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="hook@CRM.com"
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create account</Button>
          </CardFooter>
        </Form>
        {error && <p className="text-red-500">{error}</p>}
        {/* {success && <p className="text-green-500">{success}</p>} */}
      </Card>
    </div>
  );
};

export default SignupPage;
