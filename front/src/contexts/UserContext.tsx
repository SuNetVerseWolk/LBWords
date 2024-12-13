import type { Session } from 'next-auth';
import { createContext } from 'react';

interface MyContextType {
	user: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	} | undefined
}

export const UserContext = createContext<MyContextType | null>(null);

export const UserProvider = ({ children, session } : {
	children: React.ReactNode,
	session: Session | null
}) => {

	return (
		<UserContext.Provider value={{user: session?.user}}>
			{children}
		</UserContext.Provider>
	)
}
