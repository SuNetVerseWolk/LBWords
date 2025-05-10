'use client'
import React from "react";
import { motion, MotionProps } from "framer-motion";

const Popup: React.FC<MotionProps & {
	children: React.ReactNode,
	isShown?: boolean,
	className?: string
}> = ({ children, isShown=true, className, ...rest }) => {
  return (isShown ? (
		<motion.div
			{...rest}
      animate={{ opacity: 1 }}
      className={`c absolute top-0 left-0 font-shantell_Sans bg-[#000000dd] text-lg w-full h-full z-50 md:rounded-4xl ${className}`}
    >
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        className="flex flex-col gap-3 w-3/4 max-w-screen-md p-3 rounded-xl bg-black relative"
      >
				{children}
      </motion.div>
    </motion.div>
	) : (
		<></>
	));
}

export default Popup