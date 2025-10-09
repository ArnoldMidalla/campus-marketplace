export default function TestimonialBox({
  name,
  username,
  mainText,
}: {
  name: string;
  username: string;
  mainText: string;
}) {
  return (
    <div className="rounded-2xl hover:-translate-y-0.5 hover:shadow-lg duration-300 bg-neutral-50 dark:bg-neutral-900 p-6 flex flex-col border">
      <p className="text-sm leading-5 font-medium tracking-tight">{mainText}</p>
      <div className="mt-5 pt-2 border-t-2">
        <p className="text-sm text-blue-900 dark:text-blue-500 font-semibold tracking-tight">{name}</p>
        <p className="text-muted-foreground text-xs">{username}</p>
      </div>
    </div>
  );
}
