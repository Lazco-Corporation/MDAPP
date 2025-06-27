/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> **/

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
    trustHost: true,
	pages: {
		signIn: "/MDAPP/login",
	},
	providers: [
		Credentials({
			credentials: {
				id: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;
				if (credentials) {
					const { id, password } = credentials;
					if (id === "admin" && password === "password") {
						user = { id: "1", name: "Admin User", email: "test@example.com" };
					} else if (id === "user" && password === "password") {
						user = { id: "2", name: "Regular User", email: "user@example.com" };
					}
				}
				return user;
			},
		}),
	],
	callbacks: {
		async signIn({ account, profile }) {
			console.log("SignIn Callback:", account, profile);
			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }: { session: any; token: any }) {
			session.user.id = token.id;
			session.user.name = token.name;
			session.user.email = token.email;
			return session;
		},
	},
});
