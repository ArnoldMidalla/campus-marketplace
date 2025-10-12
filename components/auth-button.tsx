import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  // const { data } = await supabase.auth.getClaims();
  const { data } = await supabase.auth.getUser();

  // console.log(data.user);

  // const user = data?.claims;

  return data.user ? (
    // <div className="flex items-center gap-4">
    //   Hey {data.user?.user_metadata.name}!{/* Hey, {user.email}! */}
    //   <LogoutButton />
    // </div>
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="sm:hidden">
          <Button variant="outline">Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>
            Hey {data.user?.user_metadata.name}!
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <Link
              className={cn(
                "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
              )}
              href={"/buy"}
            >
              Buy
            </Link>
            <Link
              className={cn(
                "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
              )}
              href={"/sell"}
            >
              Sell
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>Your Profile</DropdownMenuItem>
            <DropdownMenuItem>Bless Arnold's Aza</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="items-center gap-4 hidden sm:flex">
        Hey {data.user?.user_metadata.name}!{/* Hey, {user.email}! */}
        <LogoutButton />
      </div>
    </>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
