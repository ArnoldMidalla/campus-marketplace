import { createClient } from "@/lib/supabase/server";

export default async function UserProfile({params}:{params: { id: string };}){
    const supabase = await createClient();
  const { id } = params;
  console.log(supabase)
  console.log(id)
  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;
    return(
        <main className="pt-16 min-h-screen">
            <section>
                {user?.email}
            </section>
        </main>
    )
}