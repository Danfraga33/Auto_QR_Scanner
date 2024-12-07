import React from "react";
import { SignUp } from "@clerk/remix";
const SignupPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="text-lg">asd</p>
      <SignUp forceRedirectUrl="/Dashboard" />
    </div>
  );
};

export default SignupPage;
