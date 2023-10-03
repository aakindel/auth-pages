"use client";

import Link from "next/link";
import ThemeChanger from "./theme-changer";
import { PanelRight } from "lucide-react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/app/store";

export function MainNav({
  isPanelOpen,
  setIsPanelOpen,
}: {
  isPanelOpen: boolean;
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data } = useSession();
  const emailUserSession = useAuthStore((state) => state.emailUserSession);
  const setEmailUserSession = useAuthStore(
    (state) => state.setEmailUserSession
  );
  const setProviderStatus = useAuthStore((state) => state.setProviderStatus);
  const session = emailUserSession ? emailUserSession : data;

  return (
    <header className="w-full border-b bg-white dark:bg-neutral-950">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between gap-4 px-4 md:px-8">
        <Link
          href="/"
          className="text-base font-medium text-neutral-950 dark:text-neutral-50"
        >
          Auth Pages
        </Link>
        <div className="flex items-center gap-2">
          {session && !emailUserSession?.user.isLoggingIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="relative h-8 w-8 rounded-full"
                >
                  {session?.user?.name
                    ? session?.user?.name.charAt(0).toUpperCase()
                    : "U"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="break-words text-sm font-medium leading-none">
                      {session?.user?.name ? session?.user?.name : "user"}
                    </p>
                    {session?.user?.email && !emailUserSession && (
                      <p className="break-words text-xs leading-none text-neutral-500 dark:text-neutral-400">
                        {session?.user?.email}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                    emailUserSession &&
                      setEmailUserSession({
                        ...emailUserSession.user,
                        isLoggingOut: true,
                      });
                    !emailUserSession &&
                      setProviderStatus({
                        isLoggingOut: true,
                      });
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ThemeChanger />

          <Button
            variant="ghost"
            className="hidden h-9 w-9 md:flex"
            size="icon"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
          >
            <PanelRight className="h-6 w-6 scale-90" />
          </Button>
        </div>
      </div>
    </header>
  );
}
