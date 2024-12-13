'use client'
import React, { useState } from "react";
import { motion, SVGMotionProps } from "framer-motion";

export const Book: React.FC<SVGMotionProps<SVGSVGElement>> = ({ ...rest }) => {
	const [hovered, setHovered] = useState(0);

  return (
    <motion.svg
			//className='w-2'
      viewBox="0 0 24 24"
			animate={{
				scale: hovered ? [.95, 1] : 1,
				transition: {
					type: 'spring',
					stiffness: 500,
					damping: 10
				}
			}}
			onMouseEnter={() => setHovered(1)}
			onMouseLeave={() => setHovered(0)}
			onTouchStart={() => setHovered(1)}
			onTouchEnd={() => setHovered(0)}
			{ ...rest }
    >
			<path d="M7.5,22c-1,0-1.8-0.3-2.5-1c-0.7-0.7-1-1.5-1-2.5v-13c0-1,0.3-1.8,1-2.5s1.5-1,2.5-1H20v15c-0.4,0-0.8,0.1-1.1,0.4
				c-0.3,0.3-0.4,0.6-0.4,1.1s0.1,0.8,0.4,1.1c0.3,0.3,0.6,0.4,1.1,0.4v2H7.5z M6,15.3c0.2-0.1,0.5-0.2,0.7-0.2S7.2,15,7.5,15H8V4H7.5
				C7.1,4,6.7,4.1,6.4,4.4C6.1,4.7,6,5.1,6,5.5V15.3z M10,15h8V4h-8V15z M6,15.3V4V15.3z M7.5,20h9.3c-0.1-0.2-0.2-0.5-0.2-0.7
				c-0.1-0.2-0.1-0.5-0.1-0.8c0-0.3,0-0.5,0.1-0.8c0-0.2,0.1-0.5,0.2-0.7H7.5c-0.4,0-0.8,0.1-1.1,0.4S6,18.1,6,18.5
				c0,0.4,0.1,0.8,0.4,1.1C6.7,19.9,7.1,20,7.5,20z"/>
		</motion.svg>
  );
};
