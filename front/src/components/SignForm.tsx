"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import Center from "@/components/Center";
import { useRouter } from "next/navigation";
import GitHub from "./svgs/GitHub";
import { motion } from "framer-motion";
import Google from "./svgs/Google";
import { signIn } from "next-auth/react";

export default function SignForm({
  children,
  src,
  type,
}: {
  children?: React.ReactNode;
  src: string;
  type: "in" | "up";
}) {
  let [isNameChosen, setChosen] = useState(true);
  let [isHovered, setHovered] = useState({ github: false, google: false });

  let Submit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Center>
      <form
        className="flex flex-col gap-1 items-center w-auto"
        onSubmit={(e) => Submit(e)}
      >
        <Image
          className="signImg"
          src={src}
          alt="Next.js logo"
          width={180 * 1.5}
          height={38 * 1.5}
          priority
        />
        <div className="flex flex-col text-lg sm:text-base gap-1 w-full">
          <h1 className="text-2xl font-bold text-center">
            {type === "in" ? "Вход по" : "Новый акк"}
          </h1>
          <div className="grid grid-cols-8 gap-0.5 text-xs sm:text-sm mb-1.5 sm:mb-0.5">
            <button
              className={`bordered py-0.5 px-1 col-span-3 rounded-s-full ${
                isNameChosen && "dark"
              }`}
              onClick={() => setChosen(true)}
            >
              Никнэим
            </button>
            <button
              onMouseEnter={() =>
                setHovered((prev) => ({ ...prev, github: true }))
              }
              onMouseLeave={() =>
                setHovered((prev) => ({ ...prev, github: false }))
              }
              className="bordered p-0.5"
              onClick={() => signIn("github", { callbackUrl: "/I" })}
            >
              <GitHub isHovered={isHovered.github} />
            </button>
            <button
              onMouseEnter={() =>
                setHovered((prev) => ({ ...prev, google: true }))
              }
              onMouseLeave={() =>
                setHovered((prev) => ({ ...prev, google: false }))
              }
              className="bordered p-0.5"
              onClick={() => signIn("google", { callbackUrl: "/I" })}
            >
              <Google isHovered={isHovered.google} />
            </button>
            <button
              className={`bordered py-0.5 px-1 col-span-3 rounded-e-full ${
                !isNameChosen && "dark"
              }`}
              onClick={() => setChosen(false)}
            >
              Почта
            </button>
          </div>
          {isNameChosen ? (
            <input
              className="rounded-full bordered py-0.5 px-1 bg-transparent placeholder-fXgrey w-full"
              type="text"
              name="name"
              placeholder="Никнэим"
            />
          ) : (
            <input
              className="rounded-full bordered py-0.5 px-1 bg-transparent placeholder-fXgrey w-full"
              type="email"
              name="email"
              placeholder="Почта"
            />
          )}
          <input
            className="rounded-full bordered py-0.5 px-1 bg-transparent placeholder-fXgrey w-full"
            type="password"
            name="password"
            placeholder="Пароль"
          />
          {children}
        </div>
        <div className="flex gap-0.5 mt-1.5 items-center justify-center flex-row w-full text-lg sm:text-base">
          <button
            className="roundedLink rounded-s-full bordered py-0.5 px-1.5 dark"
            type="submit"
						onClick={() => signIn('credentials', { callbackUrl: '/I' })}
          >
            Готово
          </button>
          <Link
            className="roundedLink rounded-e-full bordered py-0.5 px-1.5"
            href={type === "in" ? "/up" : "/in"}
            replace
          >
            {type === "in" ? "Создать" : "Войти"}
          </Link>
        </div>
      </form>
    </Center>
  );
}
