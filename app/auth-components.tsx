import {
  FloatingSimpleLogin,
  FloatingSimpleLoginSmall,
} from "@/components/floating-simple-login";
import {
  LoginLeftPanel,
  LoginLeftPanelSmall,
} from "@/components/login-left-panel";
import { SimpleLogin, SimpleLoginSmall } from "@/components/simple-login";
import { AuthComponentType } from "@/types";

export const authComponents: AuthComponentType[] = [
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
    isLocked: true,
  },
];
