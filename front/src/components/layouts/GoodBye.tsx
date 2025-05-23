import React from 'react';
import { motion } from "framer-motion";

const GoodBye = () => {
	return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{
        scale: 1,
      }}
			className="w-full c"
    >
      <h1 className="text-7xl">Take care</h1>
    </motion.div>
	)
}

export default GoodBye