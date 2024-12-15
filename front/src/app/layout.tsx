import type { Metadata } from "next";
import "@/app/globals.css";
import "@/css/i.css";
import "@/css/home.css";
import "@/css/rounded.css";
import "@/css/underlineAnim.css";

export const metadata: Metadata = {
  title: "LearnBooksWords",
  description: "WebSite for learning english words by books",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-dvh bg-primary-main text-base">{children}</body>
    </html>
  );
}
