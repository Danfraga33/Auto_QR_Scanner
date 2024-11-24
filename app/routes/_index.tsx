import { type MetaFunction } from "@remix-run/node";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/remix";
import { Link } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [
    { title: "QR Scanner" },
    { name: "description", content: "Marketing Automation App" },
  ];
};

export default function Index() {
  return (
    <div className="flex justify-center h-screen items-center flex-col">
      <div>
        <h1>Index Route</h1>
        <SignedIn>
          <p>You are signed in!</p>
          <div>
            <p>View your profile here</p>
            <UserButton />
          </div>
          <Link to="/Dashboard">Dashboard</Link>
          <div>
            <SignOutButton />
          </div>
        </SignedIn>
        <SignedOut>
          <p>You are signed out</p>
          <div>
            <SignInButton forceRedirectUrl="/asd" />
          </div>

          <div>
            <SignUpButton forceRedirectUrl="/Dashboard" />
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
