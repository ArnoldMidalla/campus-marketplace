"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        router.replace("/auth/login");
        return;
      }

      if (data?.session) {
        // Successful login — redirect wherever you want
        router.replace("/protected");
      } else {
        router.replace("/auth/login");
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg font-medium">Signing you in...</p>
    </div>
  );
}
