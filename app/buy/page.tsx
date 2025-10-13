import FilteredItems from "../my_components/filteredItems";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen flex flex-col items-center pt-16">
      <FilteredItems loggedUser={data.user?.id} />
    </main>
  );
}
