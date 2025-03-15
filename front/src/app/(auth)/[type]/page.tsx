"use client";
import { Selector } from "@/components/layouts/auth/Selector";
import { supabase } from "@/lib/supabaseClient";
import { AuthTypeParams } from "@/types/authType";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function page() {
  const { type }: { type: AuthTypeParams } = useParams();
  const [isNameChosen, setChosen] = useState(type === "up" ? false : true);
  const [isHovered, setHovered] = useState({ github: false, google: false });
	const [formData, setFromData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const router = useRouter();

  let Submit = async (e: FormEvent) => {
    e.preventDefault();
		
		if (type === 'in') {
			if (formData.password) {
				if (formData.email) {
					const { error, data } = await supabase.auth.signInWithPassword({
						email: formData.email,
						password: formData.password
					})

					if (error) {
						console.log(error)
					} else {
						router.replace('/profile')
					}
				}
			}
		}

    return new FormData(e.target as HTMLFormElement);
  };

	const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFromData(prev => ({...prev, [e.target.name]: e.target.value }))
	}

  return (
    <form
      className="flex flex-col gap-2 lg:gap-1 items-center lg:min-w-1/3 px-5"
      onSubmit={(e) => Submit(e)}
    >
      <Image
        src={type === "up" ? "/tryHi.png" : "/hiAgain.png"}
        alt="Next.js logo"
        width={180 * 1.5}
        height={38 * 1.5}
        fetchPriority="high"
        priority
      />
      <div className="flex flex-col gap-3 lg:gap-1 w-full">
        <h1 className="text-3xl font-bold text-center">
          {type === "in" ? "Вход по" : "Новый акк"}
        </h1>
        {type === "in" && (
          <Selector
            type={type}
            isHovered={isHovered}
            isNameChosen={isNameChosen}
            setChosen={setChosen}
            setHovered={setHovered}
          />
        )}
        {isNameChosen ? (
          <input
            className="rounded-full bordered-ui py-0-5 px-2 lg:px-1 bg-transparent placeholder-cats-darkTaupe font-pangolin placeholder:font-hachiMaruPop w-full"
            type="text"
            name="name"
						value={formData.name}
						onChange={handleFormData}
            placeholder="Никнэим"
          />
        ) : (
          <input
            className="rounded-full bordered-ui py-0-5 px-2 lg:px-1 bg-transparent placeholder-cats-darkTaupe font-pangolin placeholder:font-hachiMaruPop w-full"
            type="email"
            name="email"
						value={formData.email}
						onChange={handleFormData}
            placeholder="Почта"
          />
        )}
        <input
          className="rounded-full bordered-ui py-0-5 px-2 lg:px-1 bg-transparent placeholder-cats-darkTaupe font-pangolin placeholder:font-hachiMaruPop w-full"
          type="password"
          name="password"
					value={formData.password}
					onChange={handleFormData}
          placeholder="Пароль"
        />
        {type === "up" ? (
          <input
            className="rounded-full bordered-ui py-0-5 px-2 sm:px-1 bg-transparent placeholder-cats-darkTaupe font-pangolin placeholder:font-hachiMaruPop w-full"
            type="password"
            name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleFormData}
            placeholder="Подтвердите пароль"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="flex gap-0.5 mt-1.5 items-center justify-center flex-row w-full text-lg lg:text-base">
        <button
          className="rounded-4xl w-full p-0-5 pl-3 pr-1-5 lg:pl-1-5 lg:pr-1 active-black hover:bg-brown cp"
          type="submit"
        >
          Готово
        </button>
      </div>
      {type === "up" && (
        <Selector
          type={type}
          isHovered={isHovered}
          isNameChosen={isNameChosen}
          setChosen={setChosen}
          setHovered={setHovered}
        />
      )}
      <Link
        className="text-sm lg:text-xs font-medium border-dashed border-b mt-1 lg:mt-0"
        href={type === "in" ? "/up" : "/in"}
        replace
      >
        {type === "in" ? "нет аккаунта" : "уже есть аккаунт"}
      </Link>
    </form>
  );
}
