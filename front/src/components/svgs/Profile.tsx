"use client";
import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import CustomSVGProps from "@/types/customSVG";

export const ProfileSvg: FC<CustomSVGProps> = ({ className, pathProps, ...rest }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <motion.svg
			{...rest}
      className={`w-2 ${className}`}
      viewBox="0 0 24 24"
      animate={{
        scale: hovered ? [0.9, 1] : 1,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 10,
        },
      }}
      onMouseEnter={() => setHovered(1)}
      onMouseLeave={() => setHovered(0)}
      onTouchStart={() => setHovered(1)}
      onTouchEnd={() => setHovered(0)}
    >
      <path
				{...pathProps}
        d="M5.8,17.1c0.9-0.6,1.8-1.2,2.8-1.5S10.9,15,12,15s2.2,0.2,3.3,0.6s2,0.9,2.8,1.5c0.6-0.7,1-1.5,1.4-2.3
				C19.8,13.9,20,13,20,12c0-2.2-0.8-4.1-2.3-5.7S14.2,4,12,4S7.9,4.8,6.3,6.3S4,9.8,4,12c0,1,0.2,1.9,0.5,2.8
				C4.8,15.6,5.3,16.4,5.8,17.1z M12,13c-1,0-1.8-0.3-2.5-1c-0.7-0.7-1-1.5-1-2.5s0.3-1.8,1-2.5C10.2,6.3,11,6,12,6s1.8,0.3,2.5,1
				s1,1.5,1,2.5s-0.3,1.8-1,2.5C13.8,12.7,13,13,12,13z M12,22c-1.4,0-2.7-0.3-3.9-0.8S5.8,20,4.9,19.1c-0.9-0.9-1.6-2-2.1-3.2
				S2,13.4,2,12s0.3-2.7,0.8-3.9S4,5.8,4.9,4.9s2-1.6,3.2-2.1S10.6,2,12,2s2.7,0.3,3.9,0.8s2.3,1.2,3.2,2.1s1.6,2,2.1,3.2
				C21.7,9.3,22,10.6,22,12s-0.3,2.7-0.8,3.9c-0.5,1.2-1.2,2.3-2.1,3.2c-0.9,0.9-2,1.6-3.2,2.1S13.4,22,12,22z M12,20
				c0.9,0,1.7-0.1,2.5-0.4s1.5-0.6,2.1-1.1c-0.6-0.5-1.4-0.9-2.1-1.1C13.7,17.1,12.9,17,12,17s-1.7,0.1-2.5,0.4C8.7,17.6,8,18,7.3,18.5
				C8,19,8.7,19.4,9.5,19.6S11.1,20,12,20z M12,11c0.4,0,0.8-0.1,1.1-0.4s0.4-0.6,0.4-1.1c0-0.4-0.1-0.8-0.4-1.1S12.4,8,12,8
				s-0.8,0.1-1.1,0.4s-0.4,0.6-0.4,1.1c0,0.4,0.1,0.8,0.4,1.1S11.6,11,12,11z"
      />
    </motion.svg>
  );
};
