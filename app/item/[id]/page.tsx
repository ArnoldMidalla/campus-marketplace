import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import ProductImages from "../../my_components/productImages";
import ProductInfo from "../../my_components/productInfo";
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
    <div className="min-h-screen flex flex-col mx-auto px-[100px] py-12">
      <Link href="/" className="hover:underline mb-4">
        Back
      </Link>
      <div className="flex gap-8">
        <ProductImages imageUrl={imageUrl} imageUrl2={imageUrl2} />
        <ProductInfo
          name={item.name}
          desMain={item.desMain}
          des={item.des}
          price={item.price}
        />
      </div>
    </div>
  );
}
