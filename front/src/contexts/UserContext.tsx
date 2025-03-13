import type { Session } from 'next-auth';
import { createContext } from 'react';

export const UserContext = createContext<Session | null>(null);

export const UserProvider = ({ children, session } : {
	children: React.ReactNode,
	session: Session | null
}) => {

	return (
		<UserContext.Provider value={session}>
			{children}
		</UserContext.Provider>
	)
}
