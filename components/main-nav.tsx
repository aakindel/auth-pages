import Link from "next/link";
import ThemeChanger from "./theme-changer";
import { PanelRight } from "lucide-react";
import { Button } from "./ui/button";

export function MainNav({
  isPanelOpen,
  setIsPanelOpen,
}: {
  isPanelOpen: boolean;
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
