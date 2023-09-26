import React from "react";
import { AuthForm } from "./auth-form";
import { SmallComponentWrapper } from "./small-component-wrapper";

export const SimpleLoginSmall = () => {
  return (
    <SmallComponentWrapper>
      <SimpleLogin />
    </SmallComponentWrapper>
  );
};

export const SimpleLogin = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden px-4">
      <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Log in to Auth Pages
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Enter your email to sign in to your account
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};
