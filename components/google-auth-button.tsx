// "use client";

// import { useState } from "react";
// import { createClient } from "@/lib/supabase/client";
// import { Button } from "./ui/button";

// export function GoogleAuthButton({ className }: { className?: string }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleGoogleSignIn = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const supabase = createClient();

//       // The new Supabase JS auth method for OAuth
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: {
//           // redirect back to an authenticated page in the app
//           redirectTo: `https://teyohuqtwvgtfjxrynqh.supabase.co/auth/v1/callback`,
//         },
//       });

//       if (error) throw error;
//       // The browser will be redirected to Google's consent screen.
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={className}>
//       <Button
//         type="button"
//         className="w-full"
//         onClick={handleGoogleSignIn}
//         disabled={isLoading}
//         variant="outline"
//       >
//         {isLoading ? "Redirecting..." : "Continue with Google"}
//       </Button>
//       {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
//     </div>
//   );
// }
