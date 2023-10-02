"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useState, useEffect } from "react";
import {
  AuthComponentType,
  EmailUserSessionType,
  EmailUserType,
  ProviderStatusType,
} from "@/types";
import { authComponents } from "./auth-components";

type AuthStore = {
  activeComponent: AuthComponentType;
  setActiveComponent: (authComponent: AuthComponentType) => void;
  emailUserSession: EmailUserSessionType | null;
  setEmailUserSession: (userSession: EmailUserType | null) => void;
  providerStatus: ProviderStatusType | null;
  setProviderStatus: (providerStatus: ProviderStatusType | null) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      activeComponent: authComponents[0],
      setActiveComponent: (authComponent: AuthComponentType) =>
        set(() => {
          return {
            activeComponent: { ...authComponent },
          };
        }),
      emailUserSession: null,
      setEmailUserSession: (userData: EmailUserType | null) =>
        set(() => {
          return {
            emailUserSession: userData
              ? ({
                  user: { ...userData },
                  expires: "3025-01-01T12:00:00.000Z",
                } as EmailUserSessionType)
              : null,
          };
        }),
      providerStatus: null,
      setProviderStatus: (userProviderStatus: ProviderStatusType | null) =>
        set(() => {
          return {
            providerStatus: userProviderStatus
              ? { ...userProviderStatus }
              : null,
          };
        }),
    }),
    {
      name: "zustand-store",
    }
  )
);

// from https://docs.pmnd.rs/zustand/integrations/persisting-store-data
export const useAuthStoreHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = useAuthStore.persist.onHydrate(() =>
      setHydrated(false)
    );

    const unsubFinishHydration = useAuthStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(useAuthStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
