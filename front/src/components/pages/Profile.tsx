"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookMark } from "@/components/svgs/BookMark";
import { Book } from "@/components/svgs/Book";
import { ProfileSvg } from "@/components/svgs/Profile";
import { MarkedBook } from "@/components/svgs/MarkedBook";
import { Remind } from "@/components/svgs/Remind";
import { Dictionary } from "@/components/svgs/Dictionary";
import Loading from "@/components/Loading";
import Image from "next/image";
import { Session } from "next-auth";
import Link from "next/link";
import { UserProvider } from "@/contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";

export default function Profile({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
	const isMobile = /android/i.test(navigator?.userAgent) || /ipad|iphone|ipod/i.test(navigator?.userAgent);
  const router = useRouter();
  const isPage = {
    profileSettings: usePathname() === "/I/settings/profile",
  };

  return (
    <Loading>
      <UserProvider session={session}>
        <div id="i" className="overflow-hidden">
          <motion.div
            initial={{
              scale: isMobile ? 1 : 0.5,
            }}
            animate={{
              scale: 1,
            }}
            className="grid grid-rows-12 md:grid-cols-12 md:grid-rows-1 max-h-dvh"
          >
            <motion.header
              initial={{
                x: isMobile ? 0 : "200%",
								//y: isMobile ? "-200%" : 0,
              }}
              animate={{
                x: 0,
								//y: 0,
                transition: {
                  delay: 0.2,
                },
              }}
              className="flex relative items-stretch justify-between p-0.5 px-3 md:flex-col md:items-center md:justify-around bg-dark-brown text-cats-lightBeige"
            >
              {isPage.profileSettings ? (
                <motion.button
									initial={{
										x: -100
									}}
                  animate={{
										x: 0
									}}
                  className="px-3 font-black"
                  onClick={() => router.back()}
                >
                  {"<"}
                </motion.button>
              ) : (
                <Link href="/I/settings/profile" className="flex-center gap-4">
                  {session?.user?.image ? (
                    <>
                      <Image
                        alt="user image"
                        src={session.user.image}
                        width={50}
                        height={50}
                        className="rounded-full h-full w-auto aspect-square border-2 border-black md:w-full"
												priority
                      />
                      <p className="text-lg font-semibold font-shantell_Sans">
                        {session.user.name}
                      </p>
                    </>
                  ) : (
                    <ProfileSvg />
                  )}
                </Link>
              )}
              <Book className="hidden md:block" />
              <MarkedBook className="hidden md:block" />
              <div className="absolute right-0 md:hidden h-full w-auto">
                <Image
                  width={200}
                  height={200}
                  alt="cat"
                  src="/cat.gif"
                  className="hw-full"
                />
              </div>
            </motion.header>
            <main className="row-span-10 md:col-span-10 grid-center relative">
              {children}
            </main>
            <motion.footer
              initial={{
                x: isMobile ? 0 : "-200%",
              }}
              animate={{
                x: 0,
                transition: {
                  delay: 0.2,
                },
              }}
              className="flex items-stretch justify-between py-2 px-6 md:flex-col md:items-center md:justify-around bg-dark-brown fill-cats-darkTaupe"
            >
              <Dictionary />
              <BookMark />
              <Remind className="fill-cats-warmTan" />
              <Book />
              <MarkedBook />
            </motion.footer>
          </motion.div>
        </div>
      </UserProvider>
    </Loading>
  );
}
