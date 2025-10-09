import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { id } = params;
  console.log(supabase);
  console.log(id);
  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;
  return (
    <main className="pt-16 min-h-screen">
      <section className="flex flex-col items-center px-[100px]">
        <div className="w-full h-32 bg-gray-100 rounded-b-lg"></div>
        <div className="absolute translate-y-28 flex justify-between w-full items-center max-w-5xl">
          <div className="flex items-center gap-4">
            <img
              src={user?.user_metadata.avatar_url}
              alt=""
              className="rounded-full border-2 shadow-md h-28"
            />
            <div>
              <p className="text-2xl font-bold leading-6 tracking-tight">
                {user?.user_metadata.name}
              </p>
              <p className="text-muted-foreground text-sm">
                {user?.user_metadata.email}
              </p>
            </div>
          </div>
          <Button variant={"outline"}>View profile</Button>
        </div>
        <div className="w-full pt-28">
          <hr className="border mb-2" />
          <div className="flex gap-4">
            <div>
              <p>Your details</p>
              <p>Update your user details here</p>
            </div>
            <FieldSet className="">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Arnold Midalla"
                  />
                  <FieldDescription>Change your name</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                  <Input id="password" type="password" placeholder="********" />
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
        </div>
      </section>
    </main>
  );
}
