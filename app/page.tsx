"use client";

import { MainNav } from "@/components/main-nav";
import type { NextPage } from "next";
import { RightPanelLayout, RightPanelSidebar } from "./right-panel-layout";
import { useState } from "react";
import { SimpleLogin, SimpleLoginSmall } from "@/components/simple-login";
import {
  LoginLeftPanel,
  LoginLeftPanelSmall,
} from "@/components/login-left-panel";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/utils";
import {
  FloatingSimpleLogin,
  FloatingSimpleLoginSmall,
} from "@/components/floating-simple-login";
import React from "react";

type AuthComponentType = {
  id: string;
  title: string;
  component: React.ReactNode;
  componentSmall: React.ReactNode;
};

const authComponents: AuthComponentType[] = [
  {
    id: "simple-login",
    title: "Simple Login",
    component: (
      <div className="mx-auto h-[calc(100vh-57px)] w-full max-w-none p-0">
        <SimpleLogin />
      </div>
    ),
    componentSmall: <SimpleLoginSmall />,
  },
  {
    id: "floating-simple-login",
    title: "Floating Simple Login",
    component: (
      <div className="mx-auto h-[calc(100vh-57px)] w-full max-w-none p-0">
        <FloatingSimpleLogin />
      </div>
    ),
    componentSmall: <FloatingSimpleLoginSmall />,
  },
  {
    id: "login-left-panel",
    title: "Login with Left Panel",
    component: (
      <div className="mx-auto h-[calc(100vh-57px)] w-full max-w-none p-0">
        <LoginLeftPanel />
      </div>
    ),
    componentSmall: <LoginLeftPanelSmall />,
  },
];

const Home: NextPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState(authComponents[0]);

  return (
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
                  <React.Fragment key={index}>
                    <div className="w-full">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="block text-sm font-medium">
                          {authComponent.title}
                        </span>
                      </div>
                      <div className="relative flex h-[200px] w-full items-center">
                        <RadioGroupItem
                          className="peer absolute right-4 top-4 z-50"
                          value={authComponent.id}
                          id={authComponent.id}
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
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </RadioGroup>
        </RightPanelSidebar>
      </RightPanelLayout>
    </div>
  );
};

export default Home;
