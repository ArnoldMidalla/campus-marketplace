import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen pt-16">
      <section className="flex justify-between items-center min-h-[80vh] px-[100px] inset-0 z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#e5e7eb80_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="flex flex-col gap-3">
          <h1 className="font-extrabold text-5xl tracking-tight leading-14">
            Buy, Sell, and Meet
            <br />
            Other Students Right
            <br />
            Here on Your Campus
          </h1>
          <p className="">
            University students often have items they no longer need — books,
            gadgets,
            <br />
            furniture, clothes, and more — but lack a trusted, student-only
            platform
            <br />
            to buy, sell, or exchange those items safely and conveniently.
          </p>
          <Link href="/" className="hover:underline">
            Get Started
          </Link>
        </div>
        <Image
          src="/heroImage.jpg"
          alt=""
          width={350}
          height={350}
          className="rounded-lg"
        />
      </section>
      <section className="flex flex-col px-[100px]">
        <h1 className="text-2xl font-bold tracking-tight text-center">
          How it works
        </h1>
        <p className="text-muted-foreground text-sm text-center mb-8">
          Simple as calculus...
        </p>
        <div className="flex justify-center gap-12">
          <div className="bg-neutral-50 rounded-lg h-40 w-40">r</div>
          <div className="bg-neutral-50 rounded-lg h-40 w-40">r</div>
          <div className="bg-neutral-50 rounded-lg h-40 w-40">r</div>
        </div>
      </section>
    </main>
  );
}
