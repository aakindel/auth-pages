import "./globals.scss";
import { Providers } from "./providers";
import { inter, SFMono } from "../assets/fonts";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/session-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Auth Pages",
  description: "A collection of authentication pages.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${SFMono.variable} font-sans`}>
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
