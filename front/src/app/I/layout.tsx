import Profile from '@/components/pages/Profile';
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function layout({ children } : { children: React.ReactNode }) {
	const session = await getServerSession();

	return (
		<Profile session={session}>
			{children}
		</Profile>
	)
}
