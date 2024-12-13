'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Read({ hovered } : {
	hovered: boolean
}) {
	return (
		<motion.svg
			animate={{
				scale: hovered ? [.9, 1] : 1,
				transition: {
					type: 'spring',
					stiffness: 500,
					damping: 10
				}
			}}
			className='w-5 sm:w-1.5'
			viewBox="0 0 24 24"
		>
			<path d="M12.7,21.9c-0.4,0.3-1.1,0.3-1.5,0c-1-0.8-2.1-1.5-3.4-2S5.3,19.1,4,19c-0.6,0-1-0.5-1-1.1V9.2C3,8.5,3.6,8,4.3,8.1
				c1.2,0.1,2.4,0.4,3.5,0.8c1.2,0.5,2.4,1.1,3.4,2c0.4,0.4,1.1,0.4,1.5,0c1-0.8,2.2-1.5,3.4-2c1.1-0.4,2.3-0.7,3.5-0.8
				C20.4,8,21,8.5,21,9.2v8.7c0,0.6-0.4,1.1-1,1.1c-1.3,0.1-2.6,0.4-3.9,0.9C14.9,20.4,13.8,21,12.7,21.9z M13.3,8.8
				c-2.2,0.5-3.8-0.2-5-2.1C8.3,6.6,8.2,6.5,8.2,6.4c-0.5-2.2,0.1-3.9,2.1-5c0.1-0.1,0.2-0.1,0.4-0.2c2.2-0.5,3.9,0.1,5,2.1
				c0.1,0.1,0.1,0.2,0.2,0.4c0.5,2.2-0.1,3.8-2.1,5C13.6,8.7,13.5,8.8,13.3,8.8z"/>
			<motion.path
				animate={{
					scale: hovered ? 0 : 1,
					opacity: hovered ? 0 : 1,
				}}
				className='fill-primary-main' d="M11.3,19.5c0.4,0.3,0.9,0.3,1.3,0c0.9-0.6,1.7-1,2.7-1.4c0.9-0.4,1.8-0.6,2.7-0.8c0.5-0.1,0.9-0.6,0.9-1.2v-4.4
				c0-0.8-0.8-1.4-1.6-1.1c-0.7,0.2-1.3,0.5-2,0.9c-0.9,0.5-1.8,1.1-2.6,1.9c-0.4,0.4-1.1,0.4-1.5,0c-0.9-0.8-1.7-1.4-2.6-1.9
				c-0.7-0.4-1.3-0.7-2-0.9C5.8,10.4,5,11,5,11.8v4.4c0,0.6,0.4,1.1,0.9,1.2c0.9,0.2,1.8,0.4,2.7,0.8C9.6,18.5,10.5,19,11.3,19.5z"/>
			<motion.path
				animate={{
					scale: hovered ? 0 : 1,
					opacity: hovered ? 0 : 1,
				}}
				className='fill-primary-main' d="M12,7c0.6,0,1-0.2,1.4-0.6C13.8,6,14,5.6,14,5s-0.2-1-0.6-1.4S12.5,3,12,3s-1,0.2-1.4,0.6S10,4.5,10,5
				s0.2,1,0.6,1.4C11,6.8,11.4,7,12,7z"/>
			</motion.svg>
	)
}
