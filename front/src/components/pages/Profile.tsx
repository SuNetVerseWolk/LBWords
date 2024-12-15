"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookMark } from "@/components/svgs/BookMark";
import { Book } from "@/components/svgs/Book";
import { ProfileSvg } from "@/components/svgs/Profile";
import { MarkedBook } from "@/components/svgs/MarkedBook";
import { Remind } from "@/components/svgs/Remind";
import { Dictionary } from "@/components/svgs/Dictionary";
import Image from "next/image";
import { Session } from "next-auth";
import Link from "next/link";
import { UserProvider } from "@/contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { isDeviceType } from "@/services/checkDeviceType";
import Loading from "../Loading";

export default function Profile({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const {isPhone} = isDeviceType();
  const router = useRouter();
  const isPage = {
    i: usePathname() === "/I",
    profileSettings: usePathname() === "/I/settings/profile",
		n: false,
  };

  return (
		<Loading isLoading={isPhone === undefined}>
			<UserProvider session={session}>
				<div id="i" className="overflow-hidden hw-full md:grid-center md:px-4">
					<motion.div
						initial={{
							scale: isPhone ? 1 : 0.5,
						}}
						animate={{
							scale: 1,
						}}
						className="
							grid
							grid-rows-12 md:grid-rows-1
							md:grid-cols-12
							md:items-center
							max-h-dvh md:max-h-[70%]
							md:aspect-video
						"
					>
						<motion.header
							initial={{
								x: isPhone ? 0 : "200%",
							}}
							animate={{
								x: 0,
								transition: {
									delay: 0.2,
								},
							}}
							className="
								flex md:flex-col
								items-stretch md:items-center
								justify-between md:justify-around
								bg-dark-brown md:bg-primary-bitDarken
								text-cats-lightBeige
								shadow-secondary-main
								shadow-[20px_20px_20px_-10px]
								md:h-1/2
								p-0.5 px-3 md:p-1
								md:rounded-2.5
								relative
								fill-cats-darkTaupe
							"
						>
							{isPage.profileSettings && isPhone ? (
								<motion.button
									initial={{
										x: -100,
									}}
									animate={{
										x: 0,
									}}
									className="px-3 font-black"
									onClick={() => router.back()}
								>
									{"<"}
								</motion.button>
							) : (
								<Link href="/I/settings/profile" className="flex-center gap-4 h-full md:w-full md:h-auto md:aspect-square">
									{session?.user?.image ? (
										<>
											<Image
												alt="user image"
												src={session.user.image}
												width={50}
												height={50}
												className="rounded-full h-full w-auto aspect-square border-2 border-black"
												priority
											/>
											{isPhone ? (
												<p className="text-lg font-semibold font-shantell_Sans">
													{session.user.name}
												</p>
											) : (
												<></>
											)}
										</>
									) : (
										<ProfileSvg />
									)}
								</Link>
							)}
							<div className="absolute right-0 md:hidden h-full w-auto">
								<Image
									width={200}
									height={200}
									alt="cat"
									src="/cat.gif"
									className="hw-full"
								/>
							</div>
							{!isPhone && (
								<>
									<Book className='w-4/5' />
									<MarkedBook className='w-4/5' />
								</>
							)}
						</motion.header>
						<main
							className="
								grid-center
								row-span-10 md:row-span-1
								md:col-span-10
								bg-primary-darken
								md:h-full
								md:mx-3
								md:rounded-3
								md:shadow-secondary-darken
								md:shadow-[0px_30px_30px_-10px]
								z-10
								relative
							"
						>
							{children}
						</main>
						<motion.footer
							initial={{
								x: isPhone ? 0 : "-200%",
							}}
							animate={{
								x: 0,
								transition: {
									delay: 0.2,
								},
							}}
							className="
								flex md:flex-col
								items-stretch md:items-center
								justify-between md:justify-around
								bg-dark-brown md:bg-primary-bitDarken
								text-cats-lightBeige
								shadow-secondary-main
								shadow-[-20px_20px_20px_-10px]
								md:h-1/2
								p-0.5 px-3 md:p-1
								md:rounded-2.5
								fill-cats-darkTaupe
							"
						>
							<Dictionary className={`md:w-4/5 ${isPage.n && 'fill-cats-warmTan'}`} />
							<BookMark className={`md:w-4/5 ${isPage.n && 'fill-cats-warmTan'}`} />
							<Remind onClick={() => router.push('/I')} className={`md:w-4/5 ${isPage.i && 'fill-cats-warmTan'}`} />
							{isPhone && (
								<>
									<Book className={`${isPage.n && 'fill-cats-warmTan'}`} />
									<MarkedBook className={`${isPage.n && 'fill-cats-warmTan'}`} />
								</>
							)}
						</motion.footer>
					</motion.div>
					<Image
						width={200}
						height={200}
						alt="cat"
						src="/cat.gif"
						className="absolute bottom-0 left-0 hidden md:block"
					/>
				</div>
			</UserProvider>
		</Loading>
	);
}
