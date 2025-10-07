import Image from "next/image";
import Link from "next/link";
export default function Items({
  img,
  name,
  price,
  id,
}: {
  img: string;
  name: string;
  price: string;
  id: string;
}) {
  return (
    <Link href={`/item/${id}`}>
      <div className="relative h-[150] w-[150] rounded-lg overflow-hidden">
        <Image
          src={img}
          alt=""
          className="w-full h-full object-cover hover:scale-105 duration-300"
          fill
        />
      </div>
      <h1 className="font-bold text-lg">{name}</h1>
      <p className="opacity-80">{price}</p>
    </Link>
  );
}
