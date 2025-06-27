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
		async jwt({ token, user }: { token: any; user: any }) {
			if (user) {
				token.userID = user.userID;
				token.name = user.name;
				token.email = user.mail;
				token.code = user.code;
				token.wRole = user.wRole;
				token.session = user.session;
				token.className = user.className;
				token.userIdentity = user.userIdentity;
			}
			return (
				token && {
					userID: token.userID,
					name: token.name,
					email: token.email,
					code: token.code,
					wRole: token.wRole,
					session: token.session,
					className: token.className,
					userIdentity: token.userIdentity,
				}
			);
		},
		async session({ session, token }: { session: any; token: any }) {
			if (token) {
				session.user.userID = token.userID;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.code = token.code;
				session.user.wRole = token.wRole;
				session.user.session = token.session;
				session.user.className = token.className;
				session.user.userIdentity = token.userIdentity;
			}
			return session;
		},
	},
});
