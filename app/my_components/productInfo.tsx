"use client";

import { useState } from "react";
import { Star, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProductInfo({
  name,
  desMain,
  des,
  price,
}: {
  name: string;
  desMain: string;
  des: string;
  price: number;
}) {
  const [selectedColor, setSelectedColor] = useState("olive");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { id: "olive", name: "Olive", class: "bg-[#4F4631]" },
    { id: "green", name: "Dark Green", class: "bg-[#314F4A]" },
    { id: "navy", name: "Navy", class: "bg-[#31344F]" },
  ];

  const sizes = ["Small", "Medium", "Large", "X-Large"];

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h1 className="text-4xl font-bold">{name}</h1>

        {/* Rating */}
        {/* <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4].map((star) => (
              <Star
                key={star}
                className="w-5 h-5 fill-[hsl(var(--rating-star))] text-[hsl(var(--rating-star))]"
              />
            ))}
            <Star className="w-5 h-5 fill-[hsl(var(--rating-star))] text-[hsl(var(--rating-star))] opacity-50" />
          </div>
          <span className="text-sm">4.5/5</span>
        </div> */}
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">₦{price}</span>
        <span className="text-2xl text-muted-foreground line-through">
          ₦{price + (price * 1) / 12.5}
        </span>
        <span className="bg-[hsl(var(--discount)/0.1)] text-[hsl(var(--discount))] px-3 py-1 rounded-full text-sm font-medium">
          -12.5%
        </span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-5">{desMain}</p>

      {/* Color Selection */}
      {/* <div>
        <p className="text-sm text-muted-foreground mb-3">Select Colors</p>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={cn(
                "w-10 h-10 rounded-full border-2 transition-all",
                color.class,
                selectedColor === color.id
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-border"
              )}
              title={color.name}
            />
          ))}
        </div>
      </div> */}

      {/* Size Selection */}
      {/* <div>
        <p className="text-sm text-muted-foreground mb-3">Choose Size</p>
        <div className="flex gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "px-6 py-2 rounded-full border transition-all text-sm",
                selectedSize === size
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted border-border hover:border-primary"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div> */}

      {/* Quantity and Add to Cart */}
      <div className="flex gap-4">
        <div className="flex items-center bg-muted rounded-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="rounded-full"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            className="rounded-full"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button className="flex-1 rounded-full py-6 text-base font-medium">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
