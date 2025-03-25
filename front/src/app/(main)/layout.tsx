'use client';
import WelcomeLoading from "@/components/layouts/WelcomeLoading";
import dynamic from "next/dynamic";
import React from "react";

const Profile = dynamic(
	() => import("@/components/layouts/Profile"),
	{
		loading: () => <WelcomeLoading />,
		ssr: false,
	}
)

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
		<Profile>{children}</Profile>
  );
};

export default layout;
