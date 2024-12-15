"use client";
import SignForm from "@/components/SignForm";
import React from "react";

export default function page() {
  return (
    <SignForm src="/tryHi.png" type="up" >
      <input
        className="rounded-full bordered py-0.5 px-1 bg-transparent placeholder-fXgrey w-full"
        type="repassword"
        name="repassword"
        placeholder="Повторите пароль"
      />
    </SignForm>
  );
}
