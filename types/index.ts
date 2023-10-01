export type AuthComponentType = {
  id: string;
  title: string;
  component: React.ReactNode;
  componentSmall: React.ReactNode;
  isLocked?: boolean;
};

export type EmailUserType = {
  name: string;
  email: string;
  isLoggingIn?: boolean;
  isLoggingOut?: boolean;
};

export type ProviderStatusType = {
  isLoggingIn?: boolean;
  isLoggingOut?: boolean;
};

export type EmailUserSessionType = {
  user: EmailUserType;
  expires: string;
};
