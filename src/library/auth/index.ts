/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> **/

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
	trustHost: true,
	pages: {
		signIn: "/login",
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
					const loginRaw = `{\r\n    \"id\":\"${id}\",\r\n    \"password\":\"${password}\"\r\n}`;

					const requestOptions = {
						method: "POST",
						body: loginRaw,
					};

					await fetch(
						`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`,
						requestOptions,
					)
						.then((response) => response.json())
						.then(async (result) => {
							user = result;
						})
						.catch((error) => console.log("error", error));
				}
				return user;
			},
		}),
	],
	callbacks: {
		async signIn() {
			return true;
		},
		async jwt({
			token,
			user,
			trigger,
			session,
		}: {
			token: any;
			user?: any;
			trigger?: "signIn" | "signUp" | "update";
			session?: any;
		}) {
			if (user) {
				token.user = user.user;
			}

			// 處理 update 觸發
			if (trigger === "update") {
				console.log("Updating token with session user data", session.user);
				return {
					...token,
					user: session.user,
				};
			}

			return token;
		},
		async session({ session, token }: { session: any; token: any }) {
			if (token) {
				session.user = token.user;
			}
			return session;
		},
	},
});
