"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { redirect, useRouter } from 'next/navigation';

export function GoogleAuthButton() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const supabase = createClient();
    //test
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // You can handle post-login redirect here
      },
    });

    if (error) {
      console.error("Google sign-in error:", error);
    } else {
      // window.location.reload();
      router.refresh()
      redirect('/buy')
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={handleGoogleSignIn}
    >
      <img
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      Continue with Google
    </Button>
  );
}
