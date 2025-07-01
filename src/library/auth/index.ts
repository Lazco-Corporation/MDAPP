/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> **/

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { User } from "@/types/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
	trustHost: true,
	pages: {
		signIn: "/login",
	},
	// 禁用或自定義日誌
	logger: {
		error() {},
		warn() {},
		debug() {},
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

					const response = await fetch(
						`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`,
						requestOptions,
					);
					const result = await response.json();

					if (!result.user?.cRole) {
						return null;
					} else {
						user = result;
					}
				}
				return user;
			},
		}),
	],
	callbacks: {
		async signIn({ user }: { user: any }) {
			if (!user) {
				return false;
			}
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
