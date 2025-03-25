"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const WelcomeLoading = () => {
	return (
		<div className="relative c h-screen w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.2, 0.8, 0.4, 1],
          },
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
        className="relative z-10"
      >
        <motion.div
          initial={{ rotate: -2 }}
          animate={{
            rotate: [0, -1, 1, -1, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          <Image
            width={500}
            height={250}
            alt="Welcome"
            src="/welcome.png"
            fetchPriority="high"
            priority
            className="drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </div>
	)
}

export default WelcomeLoading