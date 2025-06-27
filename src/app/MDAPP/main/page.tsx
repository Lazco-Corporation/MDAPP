/** biome-ignore-all lint/performance/noImgElement: <explanation> **/

"use client";
import { useSession, signOut } from "next-auth/react";

export default function SignIn() {
	const { data: session } = useSession();

	console.log("Session Data:", session);

	return (
		<div className="flex flex-col items-center justify-start h-full w-full relative">
			<img
				src="/images/logoMD.png"
				alt="Logo"
				width="80%"
				height="auto"
				className="mt-10 mb-10"
			/>
			<button
				onClick={() => signOut({ redirect: true, redirectTo: "/MDAPP/login" })}
				type="submit"
				className="relative overflow-hidden w-[14rem] h-[3rem] rounded-xl cursor-pointer"
				style={{
					background:
						"linear-gradient(135deg, #FFE135 0%, #FFED4A 20%, #FFF8E1 50%, #FFD54F 70%, #FFC107 85%, #FF9800 100%);",
				}}
			>
				<div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20  to-black/5 pointer-events-none rounded-2xl"></div>
				<p className="text-[#025ba0] font-black text-xl font-[Arial_Black]">
					Logout
				</p>
			</button>

			<img
				src="/images/loginIVAN.png"
				alt="Login Ivan"
				width="100%"
				height="auto"
				className="absolute bottom-0"
			/>
		</div>
	);
}
