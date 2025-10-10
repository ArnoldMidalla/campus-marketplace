import { ThemeSwitcher } from "@/components/theme-switcher";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
      {/* <p>Arnold Midalla</p> */}
      <HoverCard>
        <HoverCardTrigger>Arnold Midalla</HoverCardTrigger>
        <HoverCardContent>The criminal mastermind</HoverCardContent>
      </HoverCard>
      <ThemeSwitcher />
    </footer>
  );
}
