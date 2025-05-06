"use client";
import React, { useState } from "react";
import { motion, SVGMotionProps } from "framer-motion";

export const MarkedBook: React.FC<SVGMotionProps<SVGSVGElement>> = ({ ...rest }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <motion.svg
      viewBox="0 0 24 24"
      animate={{
        scale: hovered ? [.95, 1] : 1,
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
        d="M6,22c-0.5,0-1-0.2-1.4-0.6S4,20.5,4,20V4c0-0.5,0.2-1,0.6-1.4S5.5,2,6,2h12c0.6,0,1,0.2,1.4,0.6S20,3.4,20,4v16
				c0,0.5-0.2,1-0.6,1.4S18.6,22,18,22H6z M6,20h12V4h-2v7l-2.5-1.5L11,11V4H6V20z M6,20V4V20z M11,11l2.5-1.5L16,11l-2.5-1.5L11,11z"
      />
    </motion.svg>
  );
};
