import React, { FC } from "react";
import { motion } from "framer-motion";
import CustomSVGProps from "@/types/customSVG";

export const LoginSVG: FC<CustomSVGProps> = ({ hovered, pathProps, pathMotionProps, className, ...rest }) => {
  return (
    <motion.svg {...rest} className={`w-5 sm:w-4 md:w-2-58 lg:w-2 ${className}`} viewBox="0 0 24 24">
      <path
				{...pathProps}
        className="fill-white"
        d="M12,20.7v-1.4c0-0.2,0.1-0.3,0.3-0.3h6.4c0.2,0,0.3-0.1,0.3-0.3V5.3C19,5.1,18.9,5,18.7,5h-6.4
				C12.1,5,12,4.9,12,4.7V3.3C12,3.1,12.1,3,12.3,3H19c0.6,0,1,0.2,1.4,0.6S21,4.4,21,5v14c0,0.5-0.2,1-0.6,1.4S19.6,21,19,21h-6.7
				C12.1,21,12,20.9,12,20.7z"
      />
      <motion.path
				{...pathMotionProps}
        animate={{
          translateX: hovered ? [-3, 0] : -3,
          transition: {
            type: "spring",
          },
        }}
        className={`fill-white ${pathMotionProps?.className}`}
        d="M9.8,16.8l-1-1c-0.1-0.1-0.1-0.3,0-0.4l1.8-1.8c0.2-0.2,0.1-0.5-0.2-0.5H3.3C3.1,13,3,12.9,3,12.7v-1.4
				C3,11.1,3.1,11,3.3,11h7.2c0.3,0,0.4-0.3,0.2-0.5L8.8,8.7c-0.1-0.1-0.1-0.3,0-0.4l1-1c0.1-0.1,0.3-0.1,0.4,0l4.6,4.6
				c0.1,0.1,0.1,0.3,0,0.4l-4.6,4.6C10.1,16.9,9.9,16.9,9.8,16.8z"
      />
    </motion.svg>
  );
};
