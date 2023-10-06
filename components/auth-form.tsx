"use client";

import { cn } from "@/utils";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Icons } from "./icons";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { useAuthStore } from "@/app/store";

type AuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function AuthForm({ className, ...props }: AuthFormProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
  const emailUserSession = useAuthStore((state) => state.emailUserSession);
  const setEmailUserSession = useAuthStore(
    (state) => state.setEmailUserSession
  );
  const providerStatus = useAuthStore((state) => state.providerStatus);
  const setProviderStatus = useAuthStore((state) => state.setProviderStatus);

  useEffect(() => {
    if (emailUserSession && emailUserSession?.user?.isLoggingIn) {
      setEmailUserSession({
        ...emailUserSession.user,
        isLoggingIn: false,
      });
      toast({
        description: "Successfully logged in.",
        variant: "success",
      });
    }
    if (providerStatus?.isLoggingIn) {
      setProviderStatus({
        isLoggingIn: false,
      });
      toast({
        description: "Successfully logged in.",
        variant: "success",
      });
    }
    if (emailUserSession && emailUserSession?.user?.isLoggingOut) {
      setEmailUserSession(null);
      toast({
        description: "Successfully logged out.",
        variant: "success",
      });
    }
    if (providerStatus?.isLoggingOut) {
      setProviderStatus(null);
      toast({
        description: "Successfully logged out.",
        variant: "success",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (email.length) {
      setIsLoading(true);

      setEmailUserSession({
        name: email,
        email: email,
        isLoggingIn: true,
      });

      window.location.reload();
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading || isGitHubLoading}
          onClick={() => {
            setIsGitHubLoading(true);
            signIn("github").then(() => {
              setProviderStatus({ isLoggingIn: true });
            });
          }}
        >
          {isGitHubLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.github className="mr-2 h-4 w-4" />
          )}
          <span className="mt-px block">Github</span>
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading || isGitHubLoading}
          onClick={() => {
            setEmail("johndoe@example.com");
          }}
        >
          <Icons.mail className="mr-2 h-4 w-4" />
          <span className="block">Demo Email</span>
        </Button>
      </div>
    </div>
  );
}
