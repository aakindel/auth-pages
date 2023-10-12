"use client";

import { cn, isElementOfType } from "@/utils";
import * as React from "react";
import { useEffect, useState } from "react";

export const RightPanelSidebar = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <React.Fragment>{children}</React.Fragment>;
};
RightPanelSidebar.displayName = "RightPanelSidebar";

export const RightPanelLayout = ({
  isAbsolute = false,
  children,
  isPanelOpen,
  setIsPanelOpen,
}: {
  isAbsolute?: boolean;
  children: React.ReactNode;
  isPanelOpen: boolean;
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [size, setSize] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768 ? 384 : 0
  );

  useEffect(() => {
    const setBreakpointBoolean = () => {
      // 768 = "md" breakpoint
      if (window.innerWidth >= 768) {
        if (isPanelOpen && size === 0) {
          setSize(384);
        } else if (!isPanelOpen && size !== 0) {
          setSize(0);
        }
      } else {
        if (size !== 0) {
          setSize(0);
        }
      }
    };
    setBreakpointBoolean();

    window.addEventListener("resize", setBreakpointBoolean);

    return () => window.removeEventListener("resize", setBreakpointBoolean);
  }, [isPanelOpen, size, setSize]);

  const filteredChildren = React.Children.toArray(children).filter((child) => {
    return !isElementOfType(child, RightPanelSidebar);
  }) as React.ReactElement[];

  const RightPanelSidebarArray = React.Children.toArray(children).filter(
    (child) => {
      return isElementOfType(child, RightPanelSidebar);
    }
  ) as React.ReactElement[];
  const RightPanelSidebarElem = RightPanelSidebarArray[0];

  if (RightPanelSidebarArray.length > 1) {
    console.error(
      `ERROR: RightPanelLayout should only have 1 RightPanelSidebar! It currently has ${RightPanelSidebarArray.length}.`
    );
  }

  return (
    <div className="relative flex h-full w-full">
      <div
        className={cn(
          isAbsolute ? "flex-1" : "",
          "flex h-full w-full flex-col"
        )}
        style={{ width: `calc(100vw - ${size}px)` }}
      >
        {filteredChildren}
      </div>
      <div
        className={cn(
          isPanelOpen && size > 0
            ? "border-l border-solid border-l-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900"
            : "",
          "fixed bottom-0 right-0 top-0"
        )}
        style={{ width: `${size}px` }}
      >
        <div className="h-full overflow-hidden">
          <button
            className="flex h-[57px] w-full items-center whitespace-nowrap border-x-0 border-b border-t-0 border-solid border-b-neutral-200 bg-neutral-50 p-4 text-left text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            onClick={() => {
              setIsPanelOpen(false);
            }}
          >
            Hide Panel
          </button>
          <div className="h-[calc(100%-57px)] overflow-scroll">
            {RightPanelSidebarElem && RightPanelSidebarElem}
          </div>
        </div>
      </div>
    </div>
  );
};
