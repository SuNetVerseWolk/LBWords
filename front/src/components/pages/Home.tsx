"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Read from "@/components/svgs/Read";
import Relax from "@/components/svgs/Relax";
import { Learn } from "@/components/svgs/Learn";
import { Login } from "@/components/svgs/Login";

export default function Home() {
  const [hovered, setHovered] = useState({
    learn: false,
    read: false,
    relax: false,
    login: false,
  });

  return (
    <div className="home px-8 sm:px-12">
      <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <Image
          className="w-1/2 sm:w-[60%]"
          src="/LBWordsNoP.svg"
          alt="Next.js logo"
          width={180 * 1.5}
          height={38 * 1.5}
          priority
        />
        <ol className="list-inside list-decimal text-xb sm:text-bt text-nowrap flex flex-col gap-0.5 mb-5 sm:mb-1.5">
          <li>Читай книги на Английском.</li>
          <li>И учи слова.</li>
        </ol>
        <div className="flex gap-2 items-stretch justify-center sm:justify-start flex-row w-full text-base sm:text-lg">
          <Link
            className="roundedLink dark bordered py-0.5 px-2 sm:text-base rounded-full"
            href="/up"
            onMouseEnter={() =>
              setHovered((prev) => ({ ...prev, login: true }))
            }
            onMouseLeave={() =>
              setHovered((prev) => ({ ...prev, login: false }))
            }
            onTouchStart={() =>
              setHovered((prev) => ({ ...prev, login: true }))
            }
            onTouchEnd={() => setHovered((prev) => ({ ...prev, login: false }))}
          >
            <Login hovered={hovered.login} />
            <p style={{ textWrap: "nowrap" }}>Новый</p>
          </Link>
          <Link
            className="roundedLink bordered py-0.5 px-3 sm:text-base rounded-full"
            href="/in"
          >
            Вход
          </Link>
        </div>
      </main>
      <footer className="flex gap-2 flex-wrap items-end text-sm sm:text-xs row-start-3 justify-between sm:justify-evenly w-full sm:w-[70%]">
        <div
          className="flex items-center flex-col order-1 sm:order-2"
          onMouseEnter={(e) => setHovered((prev) => ({ ...prev, learn: true }))}
          onMouseLeave={(e) =>
            setHovered((prev) => ({ ...prev, learn: false }))
          }
          onTouchStart={(e) => setHovered((prev) => ({ ...prev, learn: true }))}
          onTouchEnd={(e) => setHovered((prev) => ({ ...prev, learn: false }))}
        >
          <Learn hovered={hovered.learn} />
          <Link
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_learn"
            rel="noopener noreferrer"
          >
            <p className="sm:hidden">Учи</p>
            <p className="hidden lg:block">Запоминай</p>
          </Link>
        </div>
        <div
          className="flex items-center flex-col order-2 sm:order-1"
          onMouseEnter={(e) => setHovered((prev) => ({ ...prev, read: true }))}
          onMouseLeave={(e) => setHovered((prev) => ({ ...prev, read: false }))}
          onTouchStart={(e) => setHovered((prev) => ({ ...prev, read: true }))}
          onTouchEnd={(e) => setHovered((prev) => ({ ...prev, read: false }))}
        >
          <Read hovered={hovered.read} />
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
          onMouseEnter={(e) => setHovered((prev) => ({ ...prev, relax: true }))}
          onMouseLeave={(e) =>
            setHovered((prev) => ({ ...prev, relax: false }))
          }
          onTouchStart={(e) => setHovered((prev) => ({ ...prev, relax: true }))}
          onTouchEnd={(e) => setHovered((prev) => ({ ...prev, relax: false }))}
        >
          <Relax hovered={hovered.relax} />
          <Link
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            rel="noopener noreferrer"
          >
            <p className="sm:hidden">Смекай</p>
            <p className="hidden lg:block">Воспринимай</p>
          </Link>
        </div>
      </footer>
    </div>
  );
}
