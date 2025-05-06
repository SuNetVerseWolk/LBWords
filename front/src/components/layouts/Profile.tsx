"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookMark } from "@/components/svgs/BookMark";
import { Book } from "@/components/svgs/Book";
import { ProfileSvg } from "@/components/svgs/Profile";
import { MarkedBook } from "@/components/svgs/MarkedBook";
import { Remind } from "@/components/svgs/Remind";
import { Dictionary } from "@/components/svgs/Dictionary";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isDeviceType } from "@/services/checkDeviceType";
import { useUser } from "@/hooks/useUser";
import SpinerLoading from "./SpinerLoading";

export default function Profile({ children }: { children: React.ReactNode }) {
  const { isPhone } = isDeviceType();
  const router = useRouter();
  const isPage = {
    i: usePathname() === "/profile",
    books:
      usePathname().includes("/books") && !usePathname().includes("marked"),
    markedBooks: usePathname() === "/books/marked",
    dictionary:
      usePathname().includes("/dictionary") &&
      !usePathname().includes("marked"),
    markedTerms: usePathname() === "/dictionary/marked",
    profileSettings: usePathname() === "/profile/settings",
  };
  const { data: user, isLoading, error } = useUser();

  return error ? (
    <SpinerLoading />
  ) : (
    <div className="overflow-hidden grid w-full h-full md:place-items-center md:px-4">
      <motion.div
        initial={{
          scale: isPhone ? 1 : 0.5,
        }}
        animate={{
          scale: 1,
        }}
        className="
							grid
							grid-rows-12 md:grid-rows-1
							md:grid-cols-12
							md:items-center
							max-h-dvh md:max-h-[70%]
							md:aspect-video
						"
      >
        <motion.header
          initial={{
            x: isPhone ? 0 : "200%",
          }}
          animate={{
            x: 0,
            transition: {
              delay: 0.2,
            },
          }}
          className="
								flex md:flex-col
								items-stretch md:items-center
								justify-between md:justify-around
								bg-black md:bg-main-2
								text-cat-beige-light
								shadow-main-hover
								shadow-[20px_20px_20px_-10px]
								md:h-1/2
								p-0-5 px-3 md:p-1
								md:rounded-4xl
								relative
								fill-cat-dark
							"
        >
          {isPage.profileSettings && isPhone ? (
            <motion.button
              initial={{
                x: -100,
              }}
              animate={{
                x: 0,
              }}
              className="px-3 font-black"
              onClick={() => router.back()}
            >
              {"<"}
            </motion.button>
          ) : (
            <Link
              href="/profile/settings"
              className="flex-center gap-4 h-full md:w-full md:h-auto md:aspect-square"
            >
              {user?.user_metadata.avatar_url ? (
                <>
                  <Image
                    alt="user image"
                    src={user.user_metadata.avatar_url}
                    width={50}
                    height={50}
                    className="rounded-full h-full w-auto aspect-square border-2 border-black"
                    priority
                  />
                  {isPhone ? (
                    <p className="text-lg font-semibold font-shantell_Sans">
                      {user.email}
                    </p>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <ProfileSvg className="h-full w-auto fill-cat-warm" />
              )}
            </Link>
          )}
          <div className="absolute right-0 md:hidden h-full w-auto">
            <Image
              width={200}
              height={200}
              alt="cat"
              src="/cat.gif"
              className="w-full h-full"
            />
          </div>
          {!isPhone && (
            <>
              <Book
                className={`fill-cat-dark md:w-4/5 ${
                  isPage.books && "fill-cat-warm"
                }`}
                onClick={() => router.push("/books")}
              />
              <MarkedBook
                className={`fill-cat-dark md:w-4/5 ${
                  isPage.markedBooks && "fill-cat-warm"
                }`}
                onClick={() => router.push("/books/marked")}
              />
            </>
          )}
        </motion.header>
        <main
          className="
								flex
								row-span-10 md:row-span-1
								md:col-span-10
								bg-main-hover
								md:h-full
								md:mx-3
								md:rounded-4xl
								md:shadow-main-darken
								md:shadow-[0px_30px_30px_-10px]
								overflow-y-scroll
								no-scrollbar
								font-sans
								p-2
								z-10
								relative
							"
        >
          {children}
        </main>
        <motion.footer
          initial={{
            x: isPhone ? 0 : "-200%",
          }}
          animate={{
            x: 0,
            transition: {
              delay: 0.2,
            },
          }}
          className="
								flex md:flex-col
								items-stretch md:items-center
								justify-between md:justify-around
								bg-black md:bg-main-2
								text-cat-beige-light
								shadow-main-hover
								shadow-[-20px_20px_20px_-10px]
								md:h-1/2
								p-0-5 px-3 md:p-1
								md:rounded-4xl
								fill-cat-dark
							"
        >
          <Dictionary
            onClick={() => router.push("/dictionary")}
            className={`fill-cat-dark md:w-4/5 ${
              isPage.dictionary && "fill-cat-warm"
            }`}
          />
          <BookMark
            onClick={() => router.push("/dictionary/marked")}
            className={`fill-cat-dark md:w-4/5 ${
              isPage.markedTerms && "fill-cat-warm"
            }`}
          />
          <Remind
            onClick={() => router.push("/profile")}
            className={`fill-cat-dark md:w-4/5 ${isPage.i && "fill-cat-warm"}`}
          />
          {isPhone && (
            <>
              <Book
                className={`fill-cat-dark ${
                  isPage.books && "fill-cat-warm"
                }`}
                onClick={() => router.push("/books")}
              />
              <MarkedBook
                className={`fill-cat-dark ${
                  isPage.markedBooks && "fill-cat-warm"
                }`}
                onClick={() => router.push("/books/marked")}
              />
            </>
          )}
        </motion.footer>
      </motion.div>
      <Image
        width={200}
        height={200}
        alt="cat"
        src="/cat.gif"
        className="absolute bottom-0 left-0 hidden md:block"
      />
    </div>
  );
}
