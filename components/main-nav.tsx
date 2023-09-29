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

export function MainNav({
  isPanelOpen,
  setIsPanelOpen,
}: {
  isPanelOpen: boolean;
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();

  return (
    <header className="w-full border-b bg-white dark:bg-neutral-950">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-8">
        <Link
          href="/"
          className="text-base font-medium text-neutral-950 dark:text-neutral-50"
        >
          Auth Pages
        </Link>
        <div className="flex items-center gap-2">
          {session && (
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
                    {session?.user?.email && (
                      <p className="break-words text-xs leading-none text-neutral-500 dark:text-neutral-400">
                        {session?.user?.email}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ThemeChanger />

          <Button
            variant="ghost"
            className="h-9 w-9"
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
