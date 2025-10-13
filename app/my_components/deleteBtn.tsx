"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const supabase = createClient();

    const { error } = await supabase.from("items").delete().eq("id", id);

    if (error) {
      // console.error("Error deleting item:", error.message);
      toast.error("Failed to delete item.");
    } else {
      toast.success("Item deleted successfully!");
      // Optionally refresh page or update UI
      //   window.location.reload(); // or use router.refresh() if using Next.js
      router.push("/buy");
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      className="text-white bg-red-600 hover:bg-red-700 w-1/2"
    >
      <Trash className="h-4" strokeWidth={2.3} />
      Delete
    </Button>
  );
}
