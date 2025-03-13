'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Center from './Center';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Loading({ children, time=1800, isLoading=false } : {
	children: React.ReactNode,
	time?: number,
	isLoading?: boolean,
}) {
	const [timeGoing, setGoing] = useState(true);
	const showLoading = useMemo(() => timeGoing || isLoading, [timeGoing, isLoading])

	useEffect(() => {
		let timer = setTimeout(() => {
			setGoing(false);
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
			) : children }
		</>
	)
}
