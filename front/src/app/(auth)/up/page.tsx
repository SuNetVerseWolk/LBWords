"use client";
import SignForm from "@/components/SignForm";
import React from "react";

export default function page() {
  return (
    <SignForm src="/tryHi.png" type="up" >
      <input
        className="rounded-full bordered py-0.5 px-2 sm:px-1 bg-transparent placeholder-cats-darkTaupe font-pangolin placeholder:font-hachiMaruPop w-full"
        type="password"
        name="repassword"
        placeholder="Повторите пароль"
      />
    </SignForm>
  );
}
