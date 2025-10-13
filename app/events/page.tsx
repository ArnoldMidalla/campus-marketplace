"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Events() {

  const [uni, setUni] = useState("");

  return (
    <main className="min-h-screen pt-24 flex justify-center">
      <div className="max-w-5xl flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <h1 className="text-3xl font-bold text-center tracking-tight">
            Events around
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {uni === "" ? "Select your university" : uni}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Your University</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={uni}
                // onValueChange={setType}
                onValueChange={(value) => {
                  setUni(value);
                  // setFormData((prev) => ({ ...prev, uni: value }));
                }}
              >
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

      </div>
    </main>
  );
}
