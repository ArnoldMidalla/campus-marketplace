import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function EventItems({
  img,
  eventName,
  location,
  id,
  type,
  date,
  time,
}: {
  img: string;
  eventName: string;
  location: string;
  id: string;
  type: string;
  date: string;
  time: string;
}) {
  console.log(img);

  return (
    <Link
      href={`/item/${id}`}
      className="scale-90 lg:scale-100 border rounded-md p-4 hover:-translate-y-0.5 hover:shadow-md duration-300 dark:bg-neutral-900"
    >
      <div className="relative h-[140px] w-full overflow-hidden rounded-sm">
        <Image
          src={img}
          alt={`Image of ${eventName}`}
          className="w-full h-full object-cover"
          fill
        />
      </div>
      <p className="text-sm opacity-80 pt-2 leading-4">{type}</p>
      <h1 className="font-bold leading-5 line-clamp-2">{eventName}</h1>
      <p className="text-sm flex w-fit">
        <MapPin className="h-4 w-fit" />
        {location}
      </p>
      {/* <p>{time.slice(0, 5)}</p> */}
      <div className="flex gap-1">
        <p className="text-sm">
          {new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}
        </p>
        <p className="text-sm">
          {new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </Link>
  );
}
