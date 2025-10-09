// import { createClient } from "@/lib/supabase/server";
// import Items from "../my_components/items";
// import { DropdownMenuRadioGroupDemo } from "../my_components/dropDown";

// export default async function Home() {
//   const supabase = await createClient();

//   // Fetch items from DB
//   const { data: items, error } = await supabase
//     .from("items")
//     .select("*")
//     // .eq("type", "bag")
//     .limit(6)
//     .order("created_at", { ascending: false });
//   if (error) {
//     console.error("Error fetching items:", error.message);
//   }

//   // Attach image URLs
//   const itemsWithUrls = items?.map((item) => {
//     let imageUrl = null;

//     if (item.images) {
//       const { data } = supabase.storage
//         .from("images")
//         .getPublicUrl(item.images); // safe now

//       imageUrl = data.publicUrl;
//     }

//     return {
//       ...item,
//       imageUrl,
//     };
//   });

//   return (
//     <main className="min-h-screen flex flex-col items-center pt-16">
//       <DropdownMenuRadioGroupDemo />
//       <div className="flex-1 w-full flex flex-col gap-20 items-center">
//         <div className="grid grid-cols-3 gap-6 p-5">
//           {itemsWithUrls?.map((item) => (
//             <Items
//               key={item.id}
//               img={item.imageUrl}
//               name={item.name}
//               price={item.price}
//               id={item.id}
//             />
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

import Items from "../my_components/items";
import FilteredItems from "../my_components/filteredItems";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-16">
      <FilteredItems />
    </main>
  );
}
