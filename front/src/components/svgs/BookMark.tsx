"use client";
import React, { useState } from "react";
import { motion, SVGMotionProps } from "framer-motion";

export const BookMark: React.FC<SVGMotionProps<SVGSVGElement>> = ({ ...rest }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <motion.svg
      viewBox="0 0 24 24"
      animate={{
        scale: hovered ? [0.95, 1] : 1,
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
			{ ...rest }
    >
      <path
        d="M5,21V5c0-0.5,0.2-1,0.6-1.4S6.5,3,7,3h10c0.6,0,1,0.2,1.4,0.6S19,4.4,19,5v16l-7-3L5,21z M7,18l5-2.2l5,2.2V5.7
				C17,5.3,16.7,5,16.3,5H7.7C7.3,5,7,5.3,7,5.7V18z M7,5h10H7z"
      />
    </motion.svg>
  );
};
