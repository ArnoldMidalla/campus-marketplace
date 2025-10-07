import Image from "next/image";
import Link from "next/link";
import TestimonialBox from "./my_components/testimonialBox";

export default function Page() {
  return (
    <main className="min-h-screen pt-16 flex flex-col gap-6">
      <section className="flex justify-between items-center min-h-[90vh] px-[100px] inset-0 z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#e5e7eb80_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="flex flex-col gap-3">
          <h1 className="font-extrabold text-5xl tracking-tight leading-14 w-fit">
            Buy, Sell, and Meet
            <br />
            Other Students Right
            <br />
            Here on Your Campus
          </h1>
          <p className="leading-5">
            University students often have items they no longer need — books,
            gadgets,
            <br />
            furniture, clothes, and more — but lack a trusted, student-only
            platform
            <br />
            to buy, sell, or exchange those items safely and conveniently.
          </p>
          <Link href="/" className="hover:underline w-fit">
            Get Started
          </Link>
        </div>
        <Image
          src="/heroImage.jpg"
          alt=""
          width={400}
          height={400}
          className="rounded-lg "
        />
      </section>
      <section className="flex flex-col px-[100px]">
        <h1 className="text-3xl font-bold tracking-tight text-center">
          How it works
        </h1>
        <p className="text-muted-foreground text-sm text-center mb-4">
          Simple as calculus...
        </p>
        <div className="flex gap-8 text-center">
          <div className="rounded-2xl hover:shadow-lg duration-300 bg-neutral-50 dark:bg-neutral-900 p-6 flex flex-col items-center gap-2 border w-1/3">
            <p className="leading-5 font-semibold tracking-tight">1. Sign Up</p>
            <p className="text-sm">
              Create your free Campus Connect account using your verified
              student email. Join your university's trusted marketplace
              community in seconds.
            </p>
            <img src="/Nerd-amico.svg" alt="" className="h-36" />
          </div>{" "}
          <div className="rounded-2xl hover:shadow-lg duration-300 bg-neutral-50 dark:bg-neutral-900 p-6 flex flex-col items-center gap-2 border w-1/3">
            <p className="leading-5 font-semibold tracking-tight">
              2. List an Item
            </p>
            <p className="text-sm">
              Got something you no longer need? Upload photos, add details, and
              set your price — it's quick and easy.
            </p>
            <img src="/Checklist-cuate.svg" alt="" className="h-36" />
          </div>{" "}
          <div className="rounded-2xl hover:shadow-lg duration-300 bg-neutral-50 dark:bg-neutral-900 p-6 flex flex-col items-center gap-2 border w-1/3">
            <p className="leading-5 font-semibold tracking-tight">
              3. Sell or Buy
            </p>
            <p className="text-sm">
              Connect safely with other verified students. Sell what you don't
              need or grab great deals on books, gadgets, and more — all within
              your campus.
            </p>
            <img src="/Self checkout-rafiki.svg" alt="" className="h-36" />
          </div>
        </div>
      </section>
      <section className="flex flex-col px-[100px] mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-center">
          Testimonials
        </h1>
        <p className="text-muted-foreground text-sm text-center mb-4">
          Let others rave about us...
        </p>
        <div className="grid grid-cols-3 gap-8">
          <TestimonialBox
            name="Sarah Johnson"
            username="@sarah_jay"
            mainText="I sold my old textbooks here within two days! The fact that it's only for students makes it so much safer and easier to trust. Love it!"
          />
          <TestimonialBox
            name="Daniel Chukwu"
            username="@daniel_codes"
            mainText="Campus Connect saved me big time. I bought a mini-fridge at half the price and the seller was from my hostel block. Super convenient!"
          />
          <TestimonialBox
            name="Maryam Bello"
            username="@maryambee"
            mainText="I never thought selling old furniture could be this stress-free. Just listed it and got buyers from my university in less than 24 hours."
          />
          <TestimonialBox
            name="Kelvin Umeh"
            username="@kelvin_umeh"
            mainText="This app is literally the Jumia for students 😅. I've bought gadgets, sold a few items, and even met new friends through it."
          />
          <TestimonialBox
            name="Anita Okoro"
            username="@anitadsgn"
            mainText="As a designer, I use Campus Connect to sell custom tote bags and merch to other students. It's helping me grow my small business!"
          />
          <TestimonialBox
            name="Joshua Adeyemi"
            username="@josh_techie"
            mainText="I love how simple and student-focused the interface is. No spam, no scams — just real students trying to buy or sell legit stuff."
          />
        </div>
      </section>
    </main>
  );
}
