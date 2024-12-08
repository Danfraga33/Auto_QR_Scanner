import { SignIn, useSignIn } from "@clerk/remix";
import React from "react";

const SignInPage = () => {
  const data = useSignIn();
  console.log(data);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <SignIn />
    </div>
  );
};

export default SignInPage;
