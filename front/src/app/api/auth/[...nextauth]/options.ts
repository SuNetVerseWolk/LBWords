import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "Username",
					type: 'text',
					placeholder: 'Name',
				},
				password: {
					label: "Password",
					type: 'password',
					placeholder: 'Password',
				}
			},
			async authorize(credentials) {
				if(credentials?.username == "name")
					return { id: "42", name: credentials.username, password: credentials.password };
				else return null;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		})
	],
	pages: {
		signIn: '/in',
		newUser: '/up',
		error: '/error',
	},
	debug: true,
	secret: "071cb66eda7d36ff126f0609207c4c55c03d19f62a76eed2e0297705c24c93dc",
}