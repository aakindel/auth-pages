"use client";

import { MainNav } from "@/components/main-nav";
import type { NextPage } from "next";
import { RightPanelLayout } from "./right-panel-layout";
import { useState } from "react";
import { SimpleLogin } from "@/components/simple-login";

const Home: NextPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="mx-auto min-h-screen w-full">
      <RightPanelLayout
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
      >
        <MainNav isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
        <div className="mx-auto h-[calc(100vh-57px)] w-full max-w-[1400px] px-4 pt-4 sm:px-8">
          <SimpleLogin />
        </div>
      </RightPanelLayout>
    </div>
  );
};

export default Home;
