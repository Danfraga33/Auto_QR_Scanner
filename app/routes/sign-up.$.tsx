import { useSignUp } from "@clerk/remix";
import { redirect, useNavigate } from "@remix-run/react";
import { Computer, Github } from "lucide-react";
import { FormEvent, useState } from "react";
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

const SignupPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleNewUser = async ({
    email,
    password,
    e,
  }: {
    email: string;
    password: string;
    e: FormEvent<HTMLFormElement>;
  }) => {
    e.preventDefault();
    try {
      const data = await signUp?.create({
        emailAddress: email,
        password: password,
      });

      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);

      return {
        message: "User Successfully Added",
        status: data,
      };
    } catch (error: any) {
      setError(error.errors[0].message);
      return {
        message: "Unable to create new client",
        error: error,
      };
    }
  };

  async function onPressVerify(e: FormEvent<HTMLFormElement>, code: string) {
    e.preventDefault();
    if (!isLoaded) return;
    const navigate = useNavigate();

    try {
      const completeSignup = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignup.status !== "complete") {
        console.log(JSON.stringify(completeSignup));
      }
      if (completeSignup.status !== "complete") {
        await setActive({ session: completeSignup.createdSessionId });
        navigate("/");
      }
    } catch (error: any) {
      console.log(JSON.stringify(error));
      setError(error.error[0].message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {!pendingVerification ? (
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={(e) => handleNewUser({ email, password, e })}>
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Create account
              </Button>
            </CardFooter>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          {/* {success && <p className="text-green-500">{success}</p>} */}
        </Card>
      ) : (
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Verify</CardTitle>
            <CardDescription>Enter the code sent to your email</CardDescription>
          </CardHeader>
          <form onSubmit={(e) => onPressVerify(e, verificationCode)}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="code"
                  name="code"
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </CardFooter>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          {/* {success && <p className="text-green-500">{success}</p>} */}
        </Card>
      )}
    </div>
  );
};

export default SignupPage;
