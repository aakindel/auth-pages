import React from "react";
import { AuthForm } from "./auth-form";
import { cn } from "@/utils";
import { SmallComponentWrapper } from "./small-component-wrapper";

export const LoginLeftPanelSmall = () => {
  return (
    <SmallComponentWrapper>
      <LoginLeftPanel isNonResponsive={true} />
    </SmallComponentWrapper>
  );
};

export const LoginLeftPanel = ({
  isNonResponsive = false,
}: {
  isNonResponsive?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center overflow-hidden md:grid md:grid-cols-1 lg:grid-cols-2",
        isNonResponsive && "grid grid-cols-2 md:grid-cols-2"
      )}
    >
      <div
        className={cn(
          "relative hidden h-full flex-col bg-neutral-100 p-8 text-neutral-900 dark:border-r dark:bg-neutral-800 dark:text-white lg:flex",
          isNonResponsive && "flex"
        )}
      >
        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="mr-2.5 h-7 w-7 rounded-full bg-neutral-400 dark:bg-neutral-600"></div>
          <span className="block pt-0.5 leading-8">Logo</span>
        </div>
      </div>
      <div className="w-full px-4">
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
    </div>
  );
};
