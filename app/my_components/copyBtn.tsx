"use client";

import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";

import { toast } from "sonner";

export default function CopyLinkButton({ id }: { id: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://campus-marketplace-dusky.vercel.app/item/${id}`);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Could not copy link");
    }
  };

  return (
    <Button onClick={handleCopy} variant="outline" className="w-1/2">
      <Clipboard className="h-4" strokeWidth={2.3} />Copy Link
    </Button>
  );
}
