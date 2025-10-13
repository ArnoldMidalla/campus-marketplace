"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Items from "./items";
import { Input } from "@/components/ui/input";
import Loading from "../loading";

export default function FilteredItems() {
  const supabase = createClient();
  const [selectedUni, setSelectedUni] = useState("all");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch items based on selected uni
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      // Fetch from Supabase
      let query = supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

      if (selectedUni !== "all") {
        query = query.eq("uni", selectedUni);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching items:", error.message);
        setLoading(false);
        return;
      }

      // No need to generate public URLs — they're already full ImageKit links
      const itemsWithUrls = data?.map((item) => ({
        ...item,
        imageUrl: item.images, // assuming this field stores full URLs (from your screenshot)
      }));

      setItems(itemsWithUrls || []);
      setLoading(false);
    };

    fetchItems();
  }, [selectedUni]);

  return (
    <div className="flex flex-col items-center gap-2 pt-6 ">
      <div className="flex gap-4 pb-4 px-4">
        <Input type="search" placeholder="Search items..." />
        {/* Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedUni === "all" ? "Select Uni" : selectedUni}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedUni}
              onValueChange={setSelectedUni}
            >
              <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Fut Minna">
                Fut Minna
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Unilag" disabled>
                Unilag (soon)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Unilorin" disabled>
                Unilorin (soon)
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Items */}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5 lg:gap-5">
          {items.map((item) => (
            <Items
              key={item.id}
              img={item.imageUrl}
              name={item.name}
              price={item.price}
              id={item.id}
              category={item.type}
              uploadedByName={item.uploadedByName}
              used={item.used}
            />
          ))}
        </div>
      )}
    </div>
  );
}
