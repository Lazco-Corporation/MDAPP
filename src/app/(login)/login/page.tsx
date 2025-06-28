/** biome-ignore-all lint/performance/noImgElement: <explanation> **/

"use client";
import { signIn } from "next-auth/react";
import { UserRound, Lock } from "lucide-react";

export default function SignIn() {
	const credentialsAction = (formData: FormData) => {
		const data = Object.fromEntries(formData.entries());
		signIn("credentials", { ...data });
	};

	return (
		<div className="max-w-md h-full w-full mx-auto">
			<div className="flex flex-col items-center justify-start h-full w-full relative">
				<img
					src="/images/logoMD.png"
					alt="Logo"
					width="80%"
					height="auto"
					className="mt-10 mb-10"
				/>
				<form
					action={credentialsAction}
					className="w-full px-10 flex flex-col items-center justify-center"
				>
					<div className="flex items-center justify-center mb-4 gap-2 w-full">
						<UserRound color="white" className="flex-none" size={40} />
						<input
							name="id"
							type="text"
							placeholder="User ID"
							className="bg-white ring-0 border-0 outline-0 rounded-md p-1 px-2 w-full flex-1 placeholder:text-black/60"
						/>
					</div>
					<hr className="text-white w-full " />
					<div className="flex items-center justify-center mb-4 gap-2 w-full mt-2">
						<Lock color="white" className="flex-none" size={40} />
						<input
							name="password"
							type="password"
							placeholder="Password"
							className="bg-white ring-0 border-0 outline-0 rounded-md p-1 px-2 w-full flex-1 placeholder:text-black/60"
						/>
					</div>
					<hr className="text-white w-full" />
					<a
						className="text-[#e3ef05] text-lg font-bold mt-2 text-left w-full"
						href="https://crm.mingdao.edu.tw/m/register.asp"
					>
						註冊新帳號
					</a>
					<a
						className="text-[#e3ef05] text-lg font-bold mt-2 text-left w-full"
						href="https://crm.mingdao.edu.tw/m/pw_check.asp"
					>
						忘記密碼 forgot password?
					</a>
					<button
						type="submit"
						className="relative overflow-hidden w-[14rem] h-[3rem] rounded-xl cursor-pointer mt-5"
						style={{
							background:
								"linear-gradient(135deg, #FFE135 0%, #FFED4A 20%, #FFF8E1 50%, #FFD54F 70%, #FFC107 85%, #FF9800 100%);",
						}}
					>
						<div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20  to-black/5 pointer-events-none rounded-2xl"></div>
						<p className="text-[#025ba0] font-black text-xl font-[Arial_Black]">
							Login
						</p>
					</button>
				</form>
				<img
					src="/images/loginIVAN.png"
					alt="Login Ivan"
					width="100%"
					height="auto"
					className="absolute bottom-0"
				/>
			</div>
		</div>
	);
}
