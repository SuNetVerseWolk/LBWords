import React, { FC } from "react";
import { motion } from "framer-motion";
import CustomSVGProps from "@/types/customSVG";

export const LearnSVG: FC<CustomSVGProps> = ({
  hovered,
  pathProps,
  pathMotionProps,
  polygonMotionProps,
  className,
  ...rest
}) => {
  return (
    <motion.svg
      {...rest}
      animate={{
        scale: hovered ? [0.9, 1] : 1,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 10,
        },
      }}
      className={`w-3 lg:w-2 ${className}`}
      viewBox="0 0 24 24"
    >
      <path
        {...pathProps}
        d="M12.1,12.6l6.2-3.4c0.2-0.1,0.2-0.4,0-0.5l-6.2-3.4c-0.1,0-0.2,0-0.3,0L5.6,8.7c-0.2,0.1-0.2,0.4,0,0.5l6.2,3.4
				C11.9,12.7,12.1,12.7,12.1,12.6z"
      />
      <motion.path
				{...pathMotionProps}
        animate={{
          scale: hovered ? 0 : 1,
          opacity: hovered ? 0 : 1,
        }}
        className="fill-main"
        d="M12.1,12.6l6.2-3.4c0.2-0.1,0.2-0.4,0-0.5l-6.2-3.4c-0.1,0-0.2,0-0.3,0L5.6,8.7c-0.2,0.1-0.2,0.4,0,0.5l6.2,3.4
	C11.9,12.7,12.1,12.7,12.1,12.6z"
      />
      <path
        {...pathProps}
        d="M7,16.1l5,2.6l5-2.6l0-2c0-0.2-0.2-0.4-0.4-0.3l-4.4,2.3c-0.1,0-0.2,0.1-0.3,0l-4.4-2.3c-0.2-0.1-0.4,0-0.4,0.3L7,16.1z"
      />
      <motion.polygon
				{...polygonMotionProps}
        initial={{
          top: "100%",
          transformOrigin: "100% 50%",
        }}
        animate={{
          scaleY: hovered ? 0 : 1,
          opacity: hovered ? 0 : 1,
        }}
        className="fill-main"
        points="7,16 12,18.7 17,16 17,12.7 12,15.4 7,12.7 "
      />
      <path
				{...pathProps}
        d="M11.9,20.9l-6.7-3.6C5.1,17.2,5,17.1,5,17v-5.6c0-0.1-0.1-0.2-0.2-0.3L1.5,9.3c-0.2-0.1-0.2-0.4,0-0.5l10.4-5.7
				c0.1,0,0.2,0,0.3,0l10.7,5.8C22.9,9,23,9.1,23,9.2v7.5c0,0.2-0.1,0.3-0.3,0.3h-1.4c-0.2,0-0.3-0.1-0.3-0.3v-6.1
				c0-0.2-0.2-0.4-0.4-0.3l-1.4,0.8c-0.1,0.1-0.2,0.2-0.2,0.3V17c0,0.1-0.1,0.2-0.2,0.3l-6.7,3.6C12.1,21,11.9,21,11.9,20.9z
				M12.1,12.6l6.2-3.4c0.2-0.1,0.2-0.4,0-0.5l-6.2-3.4c-0.1,0-0.2,0-0.3,0L5.6,8.7c-0.2,0.1-0.2,0.4,0,0.5l6.2,3.4
				C11.9,12.7,12.1,12.7,12.1,12.6z M12.1,18.6l4.7-2.5c0.1-0.1,0.2-0.2,0.2-0.3v-3.1c0-0.2-0.2-0.4-0.4-0.3l-4.4,2.4
				c-0.1,0-0.2,0-0.3,0l-4.4-2.4c-0.2-0.1-0.4,0-0.4,0.3v3.1c0,0.1,0.1,0.2,0.2,0.3l4.7,2.5C11.9,18.7,12.1,18.7,12.1,18.6z"
      />
    </motion.svg>
  );
};
