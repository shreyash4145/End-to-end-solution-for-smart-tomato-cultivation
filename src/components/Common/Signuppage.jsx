import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-green-100 to-green-300">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
