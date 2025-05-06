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
    <main className="h-full flex items-center md:items-end md:pb-8 lg:pb-5 relative font-bold ">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-7 md:gap-2 items-center md:items-start w-fit md:mb-10 lg:mb-8">
          <Image
            className="w-1/2 sm:w-[60%] select-none"
            src="/LBWordsNoP.svg"
            alt="Next.js logo"
            width={100}
            height={50}
            priority
          />
          <ul className="flex flex-col gap-4 md:gap-1.5 lg:gap-1 mb-1 lg:mb-1 md:mb-1.5 list-inside list-disc text-[.8rem] md:text-base lg:text-sm text-nowrap">
            <li>Учи слова</li>
            <li>Читая книги на Английском</li>
          </ul>
          <div className="flex flex-col gap-3 items-center">
            <div className="flex gap-2 items-stretch justify-center md:justify-start flex-row w-full text-base md:text-2xl lg:text-xl">
              <Link
                className="c gap-1 md:gap-0-5 active-black hover:bg-brown py-1-5 sm:py-0-5 md:py-1 px-5 sm:px-3-5 md:px-2 rounded-4xl select-none"
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
                className="c py-1-5 sm:py-0-5 md:py-1 px-5 sm:px-4 md:px-3-5 bordered-ui rounded-4xl hover:bg-main-hover select-none"
                href="/up"
              >
                Новый
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between md:gap-10 w-full text-sm absolute bottom-1/6 md:static">
          <div
            className="flex items-center flex-col order-1 md:order-2"
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
              <span className="md:hidden">Учи</span>
              <span className="hidden md:block">Запоминай</span>
            </Link>
          </div>
          <div
            className="flex items-center flex-col order-2 md:order-1"
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
              <span className="md:hidden">Смекай</span>
              <span className="hidden md:block">Воспринимай</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
