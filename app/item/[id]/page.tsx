import DeleteBtn from "@/app/my_components/deleteBtn";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function ItemsDetails({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  console.log(data.user?.id); // current logged in user

  const { id } = await params;

  // Fetch that single item
  const { data: item, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .single();
  console.log(item.uploadById); //user that uploaded product item

  return (
    <div className="min-h-screen flex flex-col mx-auto max-w-5xl py-16">
      {data.user?.id === item?.uploadById ? (
        <DeleteBtn id={id}/>
      ) : (
        <p>
          youre logged in but you didnt upload this product so you dont get a
          delete button
        </p>
      )}
    </div>
  );
}
