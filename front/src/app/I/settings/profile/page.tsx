"use client";
import Popup from "@/components/Popup";
import { UserContext } from "@/contexts/UserContext";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { isDeviceType } from "@/services/checkDeviceType";

export default function page() {
  const [isBoolean, setBoolaen] = useState({
    providerPopupShown: false,
    logoutPopupShown: false,
  });
	const {isPhone} = isDeviceType();
  const session = useContext(UserContext);

  return (
    <>
      <Popup isShown={isBoolean.providerPopupShown}>
        <h1 className="text-lg text-cats-warmTan">
          Ваши видимые данные — это всё, что мы используем.
        </h1>
        <p className="text-sm text-cats-lightBeige">
          Чтобы изменить свои данные зайдите в аккаунт который вы используете
          для входа.
        </p>
        <div className="grid-center mt-3">
          <button
            className="bg-secondary-main text-dark-brown py-0.5 px-6 rounded-md"
            onClick={() =>
              setBoolaen((prev) => ({ ...prev, providerPopupShown: false }))
            }
          >
            Ok
          </button>
        </div>
      </Popup>
      <Popup isShown={isBoolean.logoutPopupShown}>
        <h1 className="text-cats-warmTan text-center text-3xl">Выход</h1>
        <p className="text-cats-lightBeige text-base">
          Вы уверены что хотите выйти?
        </p>
        <div className="flex justify-evenly gap-3">
          <button
            className="bg-secondary-main text-dark-brown py-0.5 px-10 md:px-4 rounded-md text-lg"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Да
          </button>
          <button
            className="bg-secondary-main text-dark-brown py-0.5 px-10 md:px-4 rounded-md text-lg"
            onClick={() =>
              setBoolaen((prev) => ({ ...prev, logoutPopupShown: false }))
            }
          >
            Нет
          </button>
        </div>
      </Popup>
      <div className="flex flex-col gap-3 px-5">
        <h1 className="text-3xl font-bold font-pangolin">Настройки профиля</h1>
        <div className="flex gap-3">
          {isPhone ? (
						<Image
							alt="user image"
							src={session?.user?.image || ""}
							width={50}
							height={50}
							className="rounded-full w-[20vw] md:w-auto aspect-square border-2 border-black"
						/>
					) : (
						<button className="rounded-full dark bordered py-0.5 px-1 bg-transparent">
							Изменить фото
						</button>
					)}
          <p
            className="text-xs font-mono relative h-fit text-cats-lightCoral cursor-pointer"
            onClick={() =>
              setBoolaen((prev) => ({ ...prev, providerPopupShown: true }))
            }
          >
            Вы вошли используя
            <br />
            Github | Google
            <span className="flex-center bg-cats-lightCoral text-cats-lightBeige font-mono rounded-full h-1/2 translate-x-1/2 translate-y-1/2 w-auto aspect-square absolute bottom-0 right-0">
              !
            </span>
          </p>
        </div>
        <input
          type="text"
          value={session?.user?.name || "noname"}
          readOnly
          className="rounded-full bordered py-0.5 px-1 bg-transparent placeholder-fXgrey w-full font-shantell_Sans"
        />
        <input
          type="text"
          value={session?.user?.email || "noname"}
          readOnly
          className="rounded-full bordered py-0.5 px-1 bg-transparent placeholder-fXgrey w-full font-shantell_Sans"
        />
      </div>
      <button
        className="bg-black hover:bg-dark-richBrown text-cats-lightBeige rounded-3 text-sm sm:text-base text-nowrap py-0.5 px-4 my-0.5"
        onClick={() =>
          setBoolaen((prev) => ({ ...prev, logoutPopupShown: true }))
        }
      >
        Выйти
      </button>
    </>
  );
}
