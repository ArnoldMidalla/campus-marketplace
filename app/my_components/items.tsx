import Image from "next/image";
import Link from "next/link";
export default function Items({
  img,
  name,
  price,
  id,
  category
}: {
  img: string;
  name: string;
  price: string;
  id: string;
  category:string
}) {
  return (
    <Link href={`/item/${id}`} className="border p-4 hover:-translate-y-0.5 hover:shadow-md duration-300 dark:bg-neutral-900 rounded-md">
      <div className="relative h-[140] w-[180] overflow-hidden">
        <Image
          src={img}
          alt=""
          className="w-full h-full object-cover"
          fill
        />
      </div>
      <p className="text-sm opacity-80 pt-2 leading-4">{category}</p>
      <h1 className="font-bold leading-5">{name}</h1>
      <p className="text-blue-700 dark:text-blue-500 font-bold">₦{price}</p>
    </Link>
  );
}
