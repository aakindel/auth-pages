import React from "react";
import { AuthForm } from "./auth-form";

export const SimpleLoginSmall = () => {
  return (
    <div className="pointer-events-none flex h-full w-full scale-[0.3] flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
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

export const SimpleLogin = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
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
