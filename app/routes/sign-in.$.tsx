import { SignIn } from "@clerk/remix";
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <SignIn />
    </div>
  );
};

export default SignInPage;
