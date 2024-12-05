import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/remix";
import { Link } from "@remix-run/react";
import React from "react";

const AuthComponent = () => {
  return (
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
  );
};

export default AuthComponent;
