"use client";
import { GitHubSVG } from "@/components/svgs/GitHub";
import { GoogleSVG } from "@/components/svgs/Google";
import { supabase } from "@/lib/supabaseClient";
import AuthTypeParams from "@/types/authType";
import React, { Usable, use } from "react";

interface SelectorProps {
  auth: AuthTypeParams;
  isNameChosen: boolean;
  setChosen: React.Dispatch<React.SetStateAction<boolean>>;
  isHovered: {
    github: boolean;
    google: boolean;
  };
  setHovered: React.Dispatch<
    React.SetStateAction<{
      github: boolean;
      google: boolean;
    }>
  >;
}

export const Selector = ({
  auth,
  isNameChosen,
  setChosen,
  isHovered,
  setHovered,
}: SelectorProps) => {
  const { type } = auth;
  const emailBtn = (
    <button
      className={`bordered py-0.5 px-1 cp ${
        isNameChosen
          ? "bordered-ui hover:bg-main-hover"
          : "active-black hover:bg-brown"
      } ${type === "up" ? "col-span-4" : "col-span-3 rounded-e-4xl"}`}
      onClick={() => setChosen(false)}
    >
      Почта
    </button>
  );
	const redirectUrl = `${window.location.origin}/profile`;
	const googleHandler = async () => {
		const value = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: redirectUrl,
			}
		})
	}
	const githubHandler = async () => {
		const value = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: redirectUrl,
			}
		})
	}

  return (
    <div className="grid grid-cols-8 gap-0-5 text-xs mb-1.5 sm:mb-0.5 w-full">
      {type === "in" && (
        <button
          className={`bordered py-0-5 px-1 col-span-3 rounded-s-full cp ${
            isNameChosen
              ? "active-black hover:bg-brown"
              : "bordered-ui hover:bg-main-hover"
          }`}
          onClick={() => setChosen(true)}
        >
          Никнэим
        </button>
      )}
      <button
        onMouseEnter={() => setHovered((prev) => ({ ...prev, github: true }))}
        onMouseLeave={() => setHovered((prev) => ({ ...prev, github: false }))}
        className={`grid place-items-center bordered-ui hover:bg-main-hover p-0-5 cp ${
          type === "up" && "rounded-s-4xl col-span-4"
        }`}
        onClick={() => {}}
      >
        <GitHubSVG className="h-7 lg:h-1-5" hovered={isHovered.github} onClick={githubHandler} />
      </button>
      <button
        onMouseEnter={() => setHovered((prev) => ({ ...prev, google: true }))}
        onMouseLeave={() => setHovered((prev) => ({ ...prev, google: false }))}
        className={`grid place-items-center bordered-ui hover:bg-main-hover p-0-5 cp ${
          type === "up" && "col-span-4 rounded-e-4xl"
        }`}
        onClick={() => {}}
      >
        <GoogleSVG className="h-7 lg:h-1-5" hovered={isHovered.google} onClick={googleHandler} />
      </button>
			{type === 'in' && emailBtn}
    </div>
  );
};
