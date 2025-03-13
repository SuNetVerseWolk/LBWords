import type { Metadata } from "next";
import "@/styles/global.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "LBWords",
  description: "WebSite for learning english words from books",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
				<body className="h-dvh grid place-items-center text-base bg-main">
					<ReactQueryProvider>
						{children}
					</ReactQueryProvider>
				</body>
    </html>
  );
}
