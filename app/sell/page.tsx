import { createClient } from "@/lib/supabase/server";

export default async function Sell({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = params;

  const { data: userData, error: userError } = await supabase.auth.getUser();

  const user = userData?.user;
  
  const { data: insertData, error: insertError } = await supabase
    .from("table_name")
    .insert([
      {
        uploadedById: id,
        uploadedByName: user?.user_metadata?.full_name || "",
      },
    ]);

  return (
    <section>
      <div>test</div>
    </section>
  );
}
