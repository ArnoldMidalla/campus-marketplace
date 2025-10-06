"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProductImages({
  imageUrl,
  imageUrl2,
}: {
  imageUrl: string | null;
  imageUrl2: string | undefined;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  let images = [imageUrl, imageUrl2];
  return (
    <div className="flex gap-4">
      {/* Thumbnail Column */}
      <div className="flex flex-col gap-4">
        {images.map((images, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={cn(
              "w-24 h-24 rounded-lg border-2 overflow-hidden transition-all",
              selectedImage === idx
                ? "border-primary"
                : "border-border hover:border-muted-foreground"
            )}
          >
            <img
              src={images || ''}
              alt={`Product view ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 h-96 w-[20rem] bg-[hsl(var(--product-bg))] rounded-2xl overflow-hidden">
        <img
          src={images[selectedImage] || ''}
          alt="Product main view"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
