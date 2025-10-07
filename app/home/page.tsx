import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import Items from "../my_components/items";

export default async function Home() {
  const supabase = await createClient();

  // Fetch items from DB
  const { data: items, error } = await supabase.from("items").select("*");
  if (error) {
    console.error("Error fetching items:", error.message);
  }

  // Attach image URLs
  const itemsWithUrls = items?.map((item) => {
    let imageUrl = null;

    if (item.images) {
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(item.images); // safe now

      imageUrl = data.publicUrl;
    }

    return {
      ...item,
      imageUrl,
    };
  });

  return (
    <main className="min-h-screen flex flex-col items-center pt-16">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        {/* <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
          <main className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Next steps</h2>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
          </main>
        </div> */}
        <div className="grid grid-cols-3 gap-6 p-5">
          {itemsWithUrls?.map((item) => (
            <Items
              key={item.id}
              img={item.imageUrl}
              name={item.name}
              price={item.price}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
