import CopyLinkButton from "@/app/my_components/copyBtn";
import DeleteBtn from "@/app/my_components/deleteBtn";
import ExcessDes from "@/app/my_components/excessDes";
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

  const { id } = params;

  // Fetch that single item
  const { data: item } = await supabase
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
      <p className="text-green-700 dark:text-green-500">{"This item is new"}</p>
    );
  } else {
    newUsed = (
      <p className="text-red-700 dark:text-red-500">{"This item is used"}</p>
    );
  }

  const formatPrice = item.price.toLocaleString();
  // console.log(formatted); // "300,000"

  return (
    <section className="min-h-screen inset-0 z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#e5e7eb40_1px,transparent_1px)] [background-size:16px_16px] md:flex md:items-center">
      <div className="text-center md:text-left md:flex mx-auto max-w-5xl md:items-center pt-24 md:pt-20 pb-8 px-[30px] gap-12">
        <div className="min-w-full min-h-[250px] md:min-w-[500px] md:min-h-[440px] relative overflow-hidden rounded-md">
          <Image
            src={item.images}
            fill
            alt={item.name}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 md:gap-2 items-center md:items-start">
          <h1 className="tracking-tight text-2xl md:text-3xl font-bold pt-4 md:pt-0">
            {item.name}
          </h1>
          {/* <p className="opacity-80 leading-5 text-sm">{item.des}</p> */}
          <ExcessDes description={item.des} maxLength={maxLength} />
          <p className="text-blue-700 dark:text-blue-500 font-bold text-2xl">
            ₦{formatPrice}
          </p>
          <div className="hidden md:flex gap-2 text-sm font-medium text-black/80 dark:text-white/80 leading-4 tracking-tight">
            {newUsed}&bull;<p>{item.type}</p>&bull;<p>{item.uni}</p>&bull;
            <p>
              By{" "}
              {data.user?.id === item?.uploadById ? "you" : item.uploadedByName}
            </p>
          </div>
          <div className="md:hidden text-sm font-medium text-black/80 dark:text-white/80 leading-4 tracking-tight space-y-2">
            {newUsed}
            <div className="flex gap-2">
              <p>{item.type}</p>&bull;<p>{item.uni}</p>&bull;
              <p>
                By{" "}
                {data.user?.id === item?.uploadById
                  ? "you"
                  : item.uploadedByName}
              </p>
            </div>
          </div>

          {data.user?.id === item?.uploadById ? (
            <div className="flex w-full gap-4 pt-2 md:pt-0">
              <DeleteBtn id={id} /> <CopyLinkButton id={id} />
            </div>
          ) : (
            <div className="flex gap-4 w-full pt-2 md:pt-0">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`https://api.whatsapp.com/send?phone=${phone}&text=Hey%2C%20I%27m%20${
                  user || ""
                }%20from%20the%20Campus%20Marketplace%20app.%20I%27m%20interested%20in%20the%20${name}.%20Let%27s%20talk`}
                className="flex gap-2 border justify-center text-white dark:text-black bg-black dark:bg-white py-2 rounded-md text-sm font-semibold w-1/2"
              >
                <Image
                  width={18}
                  height={18}
                  alt=""
                  src={"https://www.svgrepo.com/show/500461/whatsapp.svg"}
                  className="invert dark:invert-0"
                />
                Whatsapp
              </Link>
              <CopyLinkButton id={id} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
