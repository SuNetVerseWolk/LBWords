"use client";
import Popup from "@/components/Popup";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { isDeviceType } from "@/services/checkDeviceType";
import { ProfileSvg } from "@/components/svgs/Profile";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabaseClient";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function page() {
	const router = useRouter();
	const queryClient = useQueryClient();
  const [isBoolean, setBoolaen] = useState({
    providerPopupShown: false,
    logoutPopupShown: false,
  });
	const {isPhone} = isDeviceType();
	const { data: user, isLoading, error } = useUser();
	const { mutate: signOut } = useMutation({
		mutationFn: (e: any) => supabase.auth.signOut(),
		onSuccess(data, variables, context) {
			queryClient.resetQueries();
			router.replace('/');
		},
	})

  return (
    <>
      <Popup isShown={isBoolean.providerPopupShown}>
        <h1 className="text-xl text-cat-warm">
          Ваши видимые данные — это всё, что мы используем.
        </h1>
        <p className="text-sm text-cat-beige-light">
          Чтобы изменить свои данные зайдите в аккаунт который вы используете
          для входа.
        </p>
        <div className="c mt-3">
          <button
            className="bg-main-2 text-brown py-0-5 px-6 rounded-md"
            onClick={() =>
              setBoolaen((prev) => ({ ...prev, providerPopupShown: false }))
            }
          >
            Ok
          </button>
        </div>
      </Popup>
      <Popup isShown={isBoolean.logoutPopupShown}>
        <h1 className="text-cat-warm text-center text-3xl">Выход</h1>
        <p className="text-cat-beige-light text-base">
          Вы уверены что хотите выйти?
        </p>
        <div className="flex justify-evenly gap-3">
          <button
            className="bg-main-2 text-brown py-0-5 px-10 md:px-4 rounded-md text-lg hover:bg-main-accent"
            onClick={signOut}
          >
            Да
          </button>
          <button
            className="bg-main-2 text-brown py-0-5 px-10 md:px-4 rounded-md text-lg hover:bg-main-accent"
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
          {isPhone ? user?.user_metadata.picture ? (
						<Image
							alt="user image"
							src={user?.user_metadata.picture || ""}
							width={50}
							height={50}
							className="rounded-full w-[20vw] md:w-auto aspect-square border-2 border-black"
						/>
					) : (
						<ProfileSvg className="w-auto h-10" />
					) : (
						<button className="rounded-full bordered-ui py-0.5 px-1 active-black hover:bg-brown">
							Изменить фото
						</button>
					)}
          <div
            className="text-xs font-mono relative h-fit text-cat-brown-medium cp"
            onClick={() =>
              setBoolaen((prev) => ({ ...prev, providerPopupShown: true }))
            }
          >
            <p>Вы вошли используя</p>
						<p className="flex gap-0-5 uppercase">{user?.app_metadata.providers.map((provider:string) => (
							<span>{provider}</span>
						))}</p>
            <span className="c bg-cat-coral-light text-cat-beige-light font-mono rounded-full h-1/2 translate-x-full translate-y-1/2 w-auto aspect-square absolute bottom-0 right-0">
              !
            </span>
          </div>
        </div>
        <input
          type="text"
          value={user?.user_metadata.full_name || "noname"}
          readOnly
          className="rounded-full bordered-ui py-0-5 px-1 bg-transparent placeholder-gray-200 w-full font-shantell_Sans"
        />
        <input
          type="text"
          value={user?.email || "noname"}
          readOnly
          className="rounded-full bordered-ui py-0-5 px-1 bg-transparent placeholder-gray-200 w-full font-shantell_Sans"
        />
      </div>
      <button
        className="bg-brown-dark hover:bg-brown text-cat-beige-light rounded-4xl cp text-sm sm:text-base text-nowrap py-0-5 px-4 my-0-5"
        onClick={() =>
          setBoolaen((prev) => ({ ...prev, logoutPopupShown: true }))
        }
      >
        Выйти
      </button>
    </>
  );
}
