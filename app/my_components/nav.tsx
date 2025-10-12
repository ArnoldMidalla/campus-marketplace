import Link from "next/link";
import { hasEnvVars } from "@/lib/utils";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function Nav() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 fixed dark:bg-black bg-white dark:bg-opacity-60 bg-opacity-55 backdrop-filter backdrop-blur-lg z-50">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>Campus Marketplace</Link>
          <NavigationMenu viewport={false} className="hidden sm:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={'font-medium px-4 py-2 rounded-md'}
                >
                  <Link href="/buy">Buy</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={'font-medium px-4 py-2 rounded-md'}
                >
                  <Link href="/sell">Sell</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* <div className="flex items-center gap-2">
                <DeployButton />
              </div> */}
        </div>

        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
      </div>
    </nav>
  );
}
