import React from "react";
import { motion } from "framer-motion";

export default function Popup({ children, isShown } : {
	children: React.ReactNode,
	isShown: boolean
}) {
  return (isShown ? (
		<motion.div
      animate={{ opacity: 1 }}
      className='grid-center absolute font-shantell_Sans bg-[#000000dd] text-lg hw-full z-50'
    >
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        className="flex flex-col gap-3 w-3/4 p-3 rounded-xl bg-black relative"
      >
				{children}
      </motion.div>
    </motion.div>
	) : (
		<></>
	));
}
