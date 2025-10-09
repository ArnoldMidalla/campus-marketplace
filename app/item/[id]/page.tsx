import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function ItemsDetails({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { id } = params;
  // Fetch that single item
  const { data: item, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .single();

  // Get its image public URL
  let imageUrl = null;
  let imageUrl2;
  if (item.images) {
    const { data } = supabase.storage.from("images").getPublicUrl(item.images);
    imageUrl = data.publicUrl;
    const data2 = supabase.storage.from("images").getPublicUrl(item.image2);
    imageUrl2 = data2.data.publicUrl;
  }
  return (
    <div className="min-h-screen flex flex-col mx-auto max-w-5xl py-12">
      
    </div>
  );
}
