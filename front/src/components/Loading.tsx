'use client'
import React, { useEffect, useState } from 'react'
import Center from './Center';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Loading({ children, time=1700, isLoading=false } : {
	children: React.ReactNode,
	time?: number,
	isLoading?: boolean,
}) {
	const [showLoading, setShowLoading] = useState(true);

	useEffect(() => {
		let timer = setTimeout(() => {
			setShowLoading(isLoading);
		}, time);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{showLoading ? (
				<Center>
					<motion.div initial={{ opacity: 0 }} animate={{ scale: [.5, 1], opacity: 1 }}>
						<Image
								width={500}
								height={250}
								alt='Welcome'
								src={'/welcome.png'}
								fetchPriority='high'
								priority
							/>
					</motion.div>
				</Center>
			) : children || <></> }
		</>
	)
}
