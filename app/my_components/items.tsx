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
}: {
  img: string;
  name: string;
  price: string;
  id: string;
  category?: string;
  uploadedByName?: string;
  used?: string;
}) {
  console.log(img);
  let test;
  if (used === "new") {
    test = (
      <p className="text-sm font-medium opacity-80 leading-4 text-green-700">
        {used}
      </p>
    );
  } else {
    test = (
      <p className="text-sm font-medium opacity-80 leading-4 text-red-700">
        {used}
      </p>
    );
  }
  return (
    <Link
      href={`/item/${id}`}
      className="border rounded-md p-4 hover:-translate-y-0.5 hover:shadow-md duration-300 dark:bg-neutral-900"
    >
      <div className="relative h-[140px] w-full overflow-hidden rounded-sm">
        <Image
          src={img}
          // src={img.startsWith("http") ? img : `https://${img}`} // ✅ Changed line
          alt=""
          className="w-full h-full object-cover"
          fill
        />
      </div>
      <p className="text-sm opacity-80 pt-2 leading-4">{category}</p>
      <h1 className="font-bold leading-5">{name}</h1>
      <div className="flex items-center gap-1">
        <p className="text-blue-700 dark:text-blue-500 font-bold">₦{price}</p>
        {/* {used ? <p className="text-sm opacity-80 leading-4">{used}</p> : null} */}
        {used ? test : null}
      </div>
      {uploadedByName ? (
        <p className="text-sm opacity-80 leading-4">By {uploadedByName}</p>
      ) : null}
    </Link>
  );
}
