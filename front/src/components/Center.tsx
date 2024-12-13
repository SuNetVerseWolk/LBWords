import React from 'react'

export default function Center({ children } : {
	children: React.ReactNode
}) {
	return (
		<div className='grid place-items-center w-full h-full'>
			{children}
		</div>
	)
}
