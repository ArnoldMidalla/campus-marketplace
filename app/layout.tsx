import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Nav from "./my_components/nav";
import Footer from "./my_components/footer";
import { Toaster } from 'sonner'


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Campus Marketplace",
  description:
    "By Arnold. A campus-only marketplace app where students can trade within the university",
};

const geistSans = DM_Sans({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <Toaster position="top-center" richColors />
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
