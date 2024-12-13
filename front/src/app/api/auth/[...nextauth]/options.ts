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
			clientId: "218512213273-46u7u0arqc921urrfkb58o4rm6d6n4h5.apps.googleusercontent.com",
			clientSecret: "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",
		}),
		GitHubProvider({
			clientId: "Ov23li6lK90NcNX33YhK",
			clientSecret: "0dca92af87b7af397268e3d46eee8eb799fbeffe",
		})
	],
	pages: {
		signIn: '/in',
		newUser: '/up',
	},
	debug: true,
	secret: "071cb66eda7d36ff126f0609207c4c55c03d19f62a76eed2e0297705c24c93dc",
}