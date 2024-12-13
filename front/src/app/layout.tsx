import type { Metadata } from "next";
import "@/app/globals.css";
import "@/css/i.css";
import "@/css/home.css";
import "@/css/rounded.css";
import "@/css/underlineAnim.css";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
//import { UserProvider } from "@/contexts/UserContext";

export const metadata: Metadata = {
  title: "LearnBooksWords",
  description: "WebSite for learning english words by books",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  //if (session) {
  //  redirect("/I");
  //}

  return (
    <html lang="en">
      <body className="h-dvh bg-primary-main text-base">
        {/*<UserProvider session={session}>{children}</UserProvider>*/}
				{children}
      </body>
    </html>
  );
}
