"use client";

import { MainNav } from "@/components/main-nav";
import type { NextPage } from "next";
import { RightPanelLayout, RightPanelSidebar } from "./right-panel-layout";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";
import { LockIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { authComponents } from "./auth-components";
import { useAuthStoreHydration } from "./store";
import { Icons } from "@/components/icons";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const isAuthStoreHydrated = useAuthStoreHydration();
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState(authComponents[0]);

  return isAuthStoreHydrated ? (
    <div className="mx-auto min-h-screen w-full">
      <RightPanelLayout
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
      >
        <MainNav isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
        {activeComponent.component}
        <RightPanelSidebar>
          <RadioGroup
            value={activeComponent.id}
            onValueChange={(value) =>
              setActiveComponent(
                authComponents.find((item) => item.id === value) ??
                  authComponents[0]
              )
            }
          >
            <div className="flex h-full w-[98%] flex-col gap-4 p-4">
              {authComponents.map((authComponent, index) => {
                return (
                  <TooltipProvider key={index} delayDuration={100}>
                    <Tooltip>
                      <div className="w-full">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="block text-sm font-medium">
                            {authComponent.title}
                          </span>
                          {authComponent?.isLocked && !session && (
                            <div className="flex items-center justify-center rounded-full bg-neutral-200 p-[5px] dark:bg-neutral-700">
                              <LockIcon className="h-[10px] w-[10px] shrink-0" />
                            </div>
                          )}
                        </div>
                        <TooltipTrigger asChild>
                          <div className="relative flex h-[200px] w-full items-center">
                            <RadioGroupItem
                              className="peer absolute right-4 top-4"
                              value={authComponent.id}
                              id={authComponent.id}
                              disabled={authComponent?.isLocked && !session}
                            />
                            <Label
                              htmlFor={authComponent.id}
                              className={cn(
                                "mx-auto flex h-[200px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 bg-white p-0 dark:bg-neutral-950",
                                "hover:border-neutral-500 peer-aria-checked:border-neutral-900 dark:hover:border-neutral-400 dark:peer-aria-checked:border-neutral-50"
                              )}
                            >
                              {authComponent.componentSmall}
                            </Label>
                          </div>
                        </TooltipTrigger>
                      </div>
                      {authComponent?.isLocked && !session && (
                        <TooltipContent className="mb-0.5 ml-[245px] select-none px-2 py-1 text-xs shadow-sm duration-0 data-[state=closed]:duration-0">
                          <p>Requires Login</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </RadioGroup>
        </RightPanelSidebar>
      </RightPanelLayout>
    </div>
  ) : (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2.5">
      <Icons.spinner className="h-7 w-7 text-neutral-400 dark:text-neutral-500" />
      <span className="block text-sm text-neutral-400 dark:text-neutral-500">
        Loading Auth Pages...
      </span>
    </div>
  );
};

export default Home;
