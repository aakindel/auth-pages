"use client";

import { create } from "zustand";
import {
  AuthComponentType,
  EmailUserSessionType,
  EmailUserType,
  ProviderStatusType,
} from "@/types";
import { authComponents } from "../app/auth-components";

type AuthStore = {
  activeComponent: AuthComponentType;
  setActiveComponent: (authComponent: AuthComponentType) => void;
  emailUserSession: EmailUserSessionType | null;
  setEmailUserSession: (userSession: EmailUserType | null) => void;
  providerStatus: ProviderStatusType | null;
  setProviderStatus: (providerStatus: ProviderStatusType | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
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
        providerStatus: userProviderStatus ? { ...userProviderStatus } : null,
      };
    }),
}));
