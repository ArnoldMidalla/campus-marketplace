import Image from "next/image";
import Link from "next/link";
import TestimonialBox from "./my_components/testimonialBox";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <main className="min-h-screen pt-10 flex flex-col gap-6 items-center">
      {/* pt-16 */}
      <section className="flex flex-col md:flex-row gap-4 md:gap-16 lg:gap-24 md:justify-between items-center md:min-h-[90vh] px-[30px] md:px-[60px] lg:px-[100px] inset-0 z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#e5e7eb40_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="flex flex-col gap-3 items-center md:items-start pt-14 md:pt-0">
          <h1 className="font-extrabold text-center md:text-left text-3xl md:text-4xl lg:text-5xl tracking-tight leading-8 md:leading-9 lg:leading-14 w-fit">
            Buy, Sell, and Meet Other Students Right Here on Your Campus
          </h1>
          <p className="leading-4 lg:leading-5 text-sm text-center md:text-left lg:text-base">
            Campus Marketplace makes it easy for students to safely buy, sell,
            or trade within their university community — all in one trusted
            platform.
          </p>
          <Link
            href={data?.user?.id ? "/buy" : "/auth/sign-up"}
            className="hover:underline w-fit py-2 px-4 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium text-sm"
          >
            Get Started
          </Link>
        </div>
        <div className="overflow-hidden relative min-w-[270px] h-[270px] md:min-w-[300px] md:h-[300px] lg:min-w-[380px] lg:h-[380px] rounded-lg">
          <Image
            src="/heroImage.jpg"
            alt=""
            // width={380}
            // height={380}
            fill
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <section className="flex flex-col px-[30px] lg:max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight text-center">
          How it works
        </h1>
        <p className="text-muted-foreground text-sm text-center mb-4">
          Simple as calculus...
        </p>
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          <div className="rounded-md hover:-translate-y-0.5 hover:shadow-lg duration-300 bg-neutral-50 dark:bg-neutral-900 p-6 flex flex-col items-center gap-2 border w-full">
            <p className="text-lg leading-5 font-bold tracking-tight">
              1. Sign Up
            </p>
            <p className="text-sm">
              Create your free Campus Connect account using your verified
              student email. Join your university's trusted marketplace
              community in seconds.
            </p>
            <img src="/Nerd-amico.svg" alt="" className="h-36" />
          </div>
          <div className="rounded-md hover:-translate-y-0.5 hover:shadow-lg duration-300 bg-neutral-50 dark:bg-neutral-900 p-6 flex flex-col items-center gap-2 border w-full">
            <p className="text-lg leading-5 font-bold tracking-tight">
              2. List an Item
            </p>
            <p className="text-sm">
              Got something you no longer need? Upload photos, add details, and
              set your price — it's quick and easy.
            </p>
            <img src="/Checklist-cuate.svg" alt="" className="h-36" />
          </div>
          <div className="rounded-md hover:-translate-y-0.5 hover:shadow-lg duration-300 bg-neutral-50 dark:bg-neutral-900 p-6 flex flex-col items-center gap-2 border w-full">
            <p className="text-lg leading-5 font-bold tracking-tight">
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
      <section className="flex flex-col px-[30px] lg:max-w-5xl mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-center">
          Testimonials
        </h1>
        <p className="text-muted-foreground text-sm text-center mb-4">
          Let others rave about us...
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
