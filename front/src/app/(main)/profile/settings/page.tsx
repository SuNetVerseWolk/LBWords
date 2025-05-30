"use client";
import Image from "next/image";
import React, { useState } from "react";
import { isDeviceType } from "@/services/checkDeviceType";
import { ProfileSvg } from "@/components/svgs/Profile";
import { useAuth } from "@/hooks/useAuth";
import { supabase, supabaseAdmin } from "@/lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Popup from "@/components/Popup";
import Bye from "@/components/layouts/Bye";
import GoodBye from "@/components/layouts/GoodBye";
import { Profile } from "@/types/dbTypes";

export default function page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isBoolean, setBoolaen] = useState({
    providerPopupShown: false,
    logoutPopupShown: false,
    deleteProfilePopupShown: false,
    userOut: false,
    userOff: false,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [localNickname, setLocalNickname] = useState("");

  const { isPhone } = isDeviceType();
  const { user, profile, updateProfile } = useAuth();

  // Initialize localNickname when profile or user data is available
  React.useEffect(() => {
    if (profile?.nickname || user?.user_metadata.full_name) {
      setLocalNickname(profile?.nickname || user?.user_metadata.full_name || "noname");
    }
  }, [profile, user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedImage(e.target.files[0]);
      updateProfile({
        id: user!.id,
        data: {},
        avatar: e.target.files[0],
      });
    }
  };

  const handleNicknameBlur = async () => {
    try {
      const updatedProfile = await updateProfile({
        id: user!.id,
        data: { nickname: localNickname },
      });

      if (updatedProfile) {
        queryClient.setQueryData(["user"], (oldData: Profile) => ({
          ...oldData,
          nickname: localNickname
        }));
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Revert to the previous value if the update fails
      setLocalNickname(profile?.nickname || user?.user_metadata.full_name || "noname");
    }
  };

  const { mutate: signOut } = useMutation({
    mutationFn: async (e: any) => await supabase.auth.signOut(),
    onSuccess() {
      queryClient.resetQueries();
      setBoolaen((prev) => ({ ...prev, userOut: true }));
      setTimeout(() => router.replace("/"), 550);
    },
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: async (e: any) =>
      await supabaseAdmin.auth.admin.deleteUser(user!.id),
    onSuccess() {
      queryClient.resetQueries();
      setBoolaen((prev) => ({ ...prev, userOff: true }));
      setTimeout(() => router.replace("/"), 550);
    },
  });

  if (isBoolean.userOut) return <Bye />;
  if (isBoolean.userOff) return <GoodBye />;

  return (
    <>
      <div className="c flex-col gap-2">
        <div className="flex flex-col gap-3 px-5">
          <h1 className="text-3xl font-bold font-pangolin">
            Настройки профиля
          </h1>
          <div className="flex gap-3">
            {isPhone ? (
              profile?.image || user?.user_metadata.picture ? (
                <Image
                  alt="user image"
                  src={profile?.image || user?.user_metadata.picture || ""}
                  width={50}
                  height={50}
                  className="rounded-full w-[20vw] md:w-auto aspect-square border-2 border-black"
                />
              ) : (
                <ProfileSvg className="w-auto h-10" />
              )
            ) : (
              <div className="relative">
                <button className="rounded-full bordered-ui py-0.5 px-1 active-black hover:bg-brown">
                  Изменить фото
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            )}
            <div
              className="text-xs font-mono relative h-fit text-cat-brown-medium cp"
              onClick={() =>
                setBoolaen((prev) => ({ ...prev, providerPopupShown: true }))
              }
            >
              <p>Вы вошли используя</p>
              <p className="flex gap-0-5 uppercase">
                {user?.app_metadata.providers.map((provider: string) => (
                  <span key={provider}>{provider}</span>
                ))}
              </p>
              <span className="c bg-cat-coral-light text-cat-beige-light font-mono rounded-full h-1/2 translate-x-full translate-y-1/2 w-auto aspect-square absolute bottom-0 right-0">
                !
              </span>
            </div>
          </div>
          <input
            type="text"
            value={localNickname}
            onChange={(e) => setLocalNickname(e.target.value)}
            onBlur={handleNicknameBlur}
            className="rounded-full bordered-ui py-0-5 px-1 bg-transparent placeholder-gray-200 w-full font-shantell_Sans"
          />
          <input
            type="text"
            value={user?.email || "no email"}
            readOnly
            className="rounded-full bordered-ui py-0-5 px-1 bg-transparent placeholder-gray-200 w-full font-shantell_Sans"
          />
        </div>
        <div className="flex gap-1">
          <motion.button
            whileHover={{ background: "var(--color-cat-coral-light)" }}
            className="bg-brown-dark text-cat-beige-light rounded-4xl cp text-sm sm:text-base text-nowrap py-0-5 px-4 my-0-5"
            onClick={() =>
              setBoolaen((prev) => ({ ...prev, deleteProfilePopupShown: true }))
            }
          >
            Удалить профиль
          </motion.button>
          <button
            className="bg-brown-dark hover:bg-brown text-cat-beige-light rounded-4xl cp text-sm sm:text-base text-nowrap py-0-5 px-4 my-0-5"
            onClick={() =>
              setBoolaen((prev) => ({ ...prev, logoutPopupShown: true }))
            }
          >
            Выйти
          </button>
        </div>
      </div>
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
      <Popup isShown={isBoolean.deleteProfilePopupShown}>
        <h1 className="text-cat-warm text-center text-3xl">
          Удаление аккаунта
        </h1>
        <p className="text-cat-beige-light text-base">
          Если вы уверены что хотите удалить аккаунт, подтвердите его удаление
        </p>
        <div className="flex justify-evenly gap-3">
          <button
            className="bg-main-2 text-brown py-0-5 px-10 md:px-4 rounded-md text-lg hover:bg-main-accent"
            onClick={deleteUser}
          >
            Да
          </button>
          <button
            className="bg-main-2 text-brown py-0-5 px-10 md:px-4 rounded-md text-lg hover:bg-main-accent"
            onClick={() =>
              setBoolaen((prev) => ({
                ...prev,
                deleteProfilePopupShown: false,
              }))
            }
          >
            Нет
          </button>
        </div>
      </Popup>
    </>
  );
}