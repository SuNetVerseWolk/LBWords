"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ReadSVG } from "@/components/svgs/ReadSVG";
import { RelaxSVG } from "@/components/svgs/RelaxSVG";
import { LearnSVG } from "@/components/svgs/LearnSVG";
import { LoginSVG } from "@/components/svgs/LoginSVG";

export default function page() {
  const [hovered, setHovered] = useState({
    learn: false,
    read: false,
    relax: false,
    login: false,
  });

  return (
    <main className="h-full flex items-center lg:items-end pb-5 relative font-bold ">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-2 items-center lg:items-start w-fit mb-5">
          <Image
            className="w-1/2 sm:w-[60%] select-none"
            src="/LBWordsNoP.svg"
            alt="Next.js logo"
            width={100}
            height={50}
            priority
          />
          <ol className="flex flex-col gap-2 lg:gap-1 mb-3 lg:mb-1 list-inside list-decimal text-xs lg:text-sm text-nowrap">
            <li>Учи слова</li>
            <li>Читая книги на Английском</li>
          </ol>
          <div className="flex flex-col gap-3 items-center">
            <div className="flex gap-2 items-stretch justify-center sm:justify-start flex-row w-full text-base lg:text-xl">
              <Link
                className="flex justify-center items-center gap-1 active-black hover:bg-brown py-0-5 px-2 rounded-4xl select-none"
                href="/in"
                onMouseEnter={() =>
                  setHovered((prev) => ({ ...prev, login: true }))
                }
                onMouseLeave={() =>
                  setHovered((prev) => ({ ...prev, login: false }))
                }
                onTouchStart={() =>
                  setHovered((prev) => ({ ...prev, login: true }))
                }
                onTouchEnd={() =>
                  setHovered((prev) => ({ ...prev, login: false }))
                }
              >
                <LoginSVG
                  className="overflow-visible"
                  hovered={hovered.login}
                />
                <span className="text-nowrap">Вход</span>
              </Link>
              <Link
                className="c py-0-5 px-3 bordered-ui rounded-4xl hover:bg-main-hover select-none"
                href="/up"
              >
                Новый
              </Link>
            </div>
            <Link
              className="text-sm lg:text-xs font-medium border-dashed border-b mt-1 lg:mt-0"
              href="/profile"
              replace
            >
              войти как гость
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-between lg:gap-10 w-full text-sm absolute bottom-1/6 lg:static">
          <div
            className="flex items-center flex-col order-1 sm:order-2"
            onMouseEnter={(e) =>
              setHovered((prev) => ({ ...prev, learn: true }))
            }
            onMouseLeave={(e) =>
              setHovered((prev) => ({ ...prev, learn: false }))
            }
            onTouchStart={(e) =>
              setHovered((prev) => ({ ...prev, learn: true }))
            }
            onTouchEnd={(e) =>
              setHovered((prev) => ({ ...prev, learn: false }))
            }
          >
            <LearnSVG hovered={hovered.learn} />
            <Link
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_learn"
              rel="noopener noreferrer"
            >
              <span className="sm:hidden">Учи</span>
              <span className="hidden lg:block">Запоминай</span>
            </Link>
          </div>
          <div
            className="flex items-center flex-col order-2 sm:order-1"
            onMouseEnter={(e) =>
              setHovered((prev) => ({ ...prev, read: true }))
            }
            onMouseLeave={(e) =>
              setHovered((prev) => ({ ...prev, read: false }))
            }
            onTouchStart={(e) =>
              setHovered((prev) => ({ ...prev, read: true }))
            }
            onTouchEnd={(e) => setHovered((prev) => ({ ...prev, read: false }))}
          >
            <ReadSVG hovered={hovered.read} />
            <Link
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_books"
              rel="noopener noreferrer"
            >
              Читай
            </Link>
          </div>
          <div
            className="flex items-center flex-col order-3"
            onMouseEnter={(e) =>
              setHovered((prev) => ({ ...prev, relax: true }))
            }
            onMouseLeave={(e) =>
              setHovered((prev) => ({ ...prev, relax: false }))
            }
            onTouchStart={(e) =>
              setHovered((prev) => ({ ...prev, relax: true }))
            }
            onTouchEnd={(e) =>
              setHovered((prev) => ({ ...prev, relax: false }))
            }
          >
            <RelaxSVG hovered={hovered.relax} />
            <Link
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              rel="noopener noreferrer"
            >
              <span className="sm:hidden">Смекай</span>
              <span className="hidden lg:block">Воспринимай</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
    //<div className=" px-8 sm:px-12">
    //  <footer className="flex gap-2 flex-wrap items-end text-sm sm:text-xs row-start-3 justify-between sm:justify-evenly w-full sm:w-[70%]">

    //  </footer>
    //</div>
  );
}
