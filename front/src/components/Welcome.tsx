import Image from 'next/image'
import React from 'react'

export default function Welcome() {
	return (
		<div className='relative left-0 top-0'>
			<Image
				className='absolute left-10 top-10'
				src='/welcome.png'
				alt='WELCOME'
				width={320}
				height={320}
			/>
		</div>
	)
}
