"use client";
import React from "react";
import { motion } from "framer-motion";

const Bye = () => {
  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{
        scale: 1,
      }}
    >
      <h1 className="text-7xl">See Ya</h1>
    </motion.div>
  );
};

export default Bye;
