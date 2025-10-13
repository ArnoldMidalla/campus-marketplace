import CopyLinkButton from "@/app/my_components/copyBtn";
import DeleteBtn from "@/app/my_components/deleteBtn";
import ExcessDes from "@/app/my_components/excessDes";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function ItemsDetails({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  console.log(data.user?.id); // current logged in user

  const { id } = await params;

  // Fetch that single item
  const { data: item, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .single();
  console.log(item.uploadById); //user that uploaded product item

  console.log(item);

  const name = item?.name;
  const phone = "08065088147";
  const user = data.user?.user_metadata.full_name;

  const maxLength = 200;

  let newUsed;
  if (item.used === "New") {
    newUsed = (
      <p className="text-green-700 dark:text-green-600">
        {"This item is brand new"}
      </p>
    );
  } else {
    newUsed = (
      <p className="text-red-700 dark:text-red-600">{"This item is used"}</p>
    );
  }

  let formatPrice = item.price.toLocaleString(); 
// console.log(formatted); // "300,000"

  return (
    <div className="min-h-screen flex mx-auto max-w-5xl items-center py-16 gap-12">
      {/* {data.user?.id === item?.uploadById ? (
        <>
          <DeleteBtn id={id} /> <CopyLinkButton id={id} />{" "}
          <Link target="_blank" rel="noopener noreferrer"
            href={`https://api.whatsapp.com/send?phone=${phone}&text=Hey%2C%20I%27m%20${user}%20from%20the%20Campus%20Marketplace%20app.%20I%27m%20interested%20in%20the%20${name}.%20Let%27s%20talk`}
          >
            Message on whatsapp
          </Link>
        </>
      ) : (
        <p>
          youre logged in but you didnt upload this product so you dont get a
          delete button
        </p>
      )} */}
      <div className="min-w-[500px] min-h-[440px] relative overflow-hidden rounded-md">
        <Image
          src={item.images}
          fill
          alt={item.name}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="tracking-tight text-3xl font-bold">{item.name}</h1>
        {/* <p className="opacity-80 leading-5 text-sm">{item.des}</p> */}
        <ExcessDes description={item.des} maxLength={maxLength} />
        <p className="text-blue-700 dark:text-blue-500 font-bold text-2xl">
          ₦{formatPrice}
        </p>
        <div className="flex gap-2 text-sm font-medium opacity-90 leading-4 tracking-tight">
          {newUsed}&bull;<p>{item.type}</p>&bull;<p>{item.uni}</p>&bull;
          <p>By {item.uploadedByName}</p>
        </div>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`https://api.whatsapp.com/send?phone=${phone}&text=Hey%2C%20I%27m%20${user}%20from%20the%20Campus%20Marketplace%20app.%20I%27m%20interested%20in%20the%20${name}.%20Let%27s%20talk`}
          className="flex gap-2 border justify-center text-white dark:text-black bg-black dark:bg-white py-2 rounded-md text-sm font-semibold"
        >
          <Image
            width={18}
            height={18}
            alt=""
            src={"https://www.svgrepo.com/show/500461/whatsapp.svg"}
            className="invert dark:invert-0"
          />
          Contact on Whatsapp
        </Link>
      </div>
    </div>
  );
}
