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

export default function FilteredItems({ loggedUser }: { loggedUser?: string }) {
  const supabase = createClient();
  const [selectedUni, setSelectedUni] = useState("all");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 🟩 for search input

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

      // 🟩 Add this block for multi-column search
      if (searchQuery.trim() !== "") {
        query = query.or(
          `name.ilike.%${searchQuery}%,type.ilike.%${searchQuery}%,used.ilike.%${searchQuery}%,uploadedByName.ilike.%${searchQuery}%`
        );
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

    // Debounce search so it doesn’t run on every keystroke
    const timeout = setTimeout(fetchItems, 1000);
    return () => clearTimeout(timeout);
  }, [selectedUni, searchQuery]); // added searchQuery dependency

  return (
    <div className="flex flex-col items-center gap-2 pt-6 ">
      <div className="flex gap-4 pb-4 px-4">
        {/* <Input type="search" placeholder="Search items..." /> */}
        <Input
          type="search"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-[300px] bg-white dark:bg-neutral-950"
        />
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 px-2 lg:px-0">
          {items.map((item) => (
            <Items
              key={item.id}
              img={item.imageUrl}
              name={item.name}
              price={item.price}
              id={item.id}
              category={item.type}
              uploadedByName={item.uploadedByName}
              uploadById={item.uploadById}
              used={item.used}
              loggedUser={loggedUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}
