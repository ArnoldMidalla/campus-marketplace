import Image from "next/image";
import Link from "next/link";
export default function Items({
  img,
  name,
  price,
  id,
  category,
  uploadedByName,
  used,
  uploadById,
  loggedUser,
}: {
  img: string;
  name: string;
  price: string;
  id: string;
  category?: string;
  uploadedByName?: string;
  used?: string;
  uploadById?: string;
  loggedUser?: string;
}) {
  console.log(img);
  let test;
  if (used === "New") {
    test = (
      <p className="text-sm font-medium opacity-80 leading-4 text-green-700 dark:text-green-500">
        {used}
      </p>
    );
  } else {
    test = (
      <p className="text-sm font-medium opacity-80 leading-4 text-red-700 dark:text-red-500">
        {used}
      </p>
    );
  }

  const formatPrice = price.toLocaleString();
  return (
    <Link
      href={`/item/${id}`}
      className="scale-90 lg:scale-100 border rounded-md p-4 hover:-translate-y-0.5 hover:shadow-md duration-300 dark:bg-neutral-900 bg-white"
    >
      <div className="relative h-[140px] w-full overflow-hidden rounded-sm">
        <Image
          src={img}
          alt={`Image of ${name}`}
          className="w-full h-full object-cover"
          fill
        />
      </div>
      <p className="text-sm opacity-80 pt-2 leading-4">{category}</p>
      <h1 className="font-bold leading-5 line-clamp-2">{name}</h1>
      <div className="flex items-center gap-1">
        <p className="text-blue-700 dark:text-blue-500 font-bold">
          ₦{formatPrice}
        </p>
        {/* {used ? <p className="text-sm opacity-80 leading-4">{used}</p> : null} */}
        {used ? test : null}
      </div>
      {/* {uploadedByName ? (
        <p className="text-sm opacity-80 leading-4 tracking-tight">By {uploadedByName}</p>
      ) : null} */}
      <p className="text-sm opacity-80 leading-4 tracking-tight">
        By {loggedUser === uploadById ? "you" : uploadedByName}
      </p>
    </Link>
  );
}
