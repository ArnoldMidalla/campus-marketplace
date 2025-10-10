import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Sell({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = params;

  const { data: userData, error: userError } = await supabase.auth.getUser();

  const user = userData?.user;

  const { data: insertData, error: insertError } = await supabase
    .from("items") //table name
    .insert([
      {
        uploadedById: id,
        uploadedByName: user?.user_metadata?.full_name || "",
        type: "",
        price: 0 as number,
        name: "",
        des: "",
        desMain: "",
        uni: "",
      },
    ]);

  //      const file = formData.get("file") as File;
  //   if (!file) return { error: "No file uploaded" };

  //   // Create a unique file name
  //   const fileName = `${Date.now()}_${file.name}`;

  //   // Upload to your bucket (e.g. "images")
  //   const { data: uploadData, error: uploadError } = await supabase.storage
  //     .from("images")
  //     .upload(fileName, file);

  //   if (uploadError) {
  //     console.error("Upload error:", uploadError);
  //     return { error: uploadError.message };
  //   }

  //   // Get a public URL
  //   const { data: publicUrlData } = supabase.storage
  //     .from("images")
  //     .getPublicUrl(fileName);

  //   const imageUrl = publicUrlData.publicUrl;

  //   // Insert into database table
  //   const { data: insertData, error: insertError } = await supabase
  //     .from("user_images")
  //     .insert([{ image_url: imageUrl }]);

  //   if (insertError) {
  //     console.error("Insert error:", insertError);
  //     return { error: insertError.message };
  //   }

  //   // Optional: revalidate page
  //   revalidatePath("/");

  //   return { success: true, imageUrl };
  // }

  return (
    <section className="pt-16 min-h-screen flex flex-col items-center">
      {/* <form className="max-w-5xl w-full bg-gray-100">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
      </form> */}
    </section>
  );
}
