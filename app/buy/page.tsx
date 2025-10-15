import FilteredItems from "../my_components/filteredItems";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen flex flex-col items-center py-16 inset-0 z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#e5e7eb40_1px,transparent_1px)] [background-size:16px_16px]">
      <FilteredItems loggedUser={data.user?.id} />
    </main>
  );
}
