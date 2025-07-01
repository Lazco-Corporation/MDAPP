/** biome-ignore-all lint/performance/noImgElement: <explanation> **/

"use client";
import { signIn } from "next-auth/react";
import { UserRound, Lock } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignIn() {
	const credentialsAction = (formData: FormData) => {
		const data = Object.fromEntries(formData.entries());
		signIn("credentials", { ...data });
	};

	const [showError, setShowError] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();
	const error = searchParams.get("error");

	useEffect(() => {
		if (error === "CredentialsSignin") {
			setShowError(true);
		}
	}, [error]);

	return (
		<div className="min-h-screen flex flex-col">
			{/* 主要內容區域 */}
			<div className="flex-1 flex flex-col items-center justify-start max-w-md w-full mx-auto px-4">
				<img
					src="/images/logoMD.png"
					alt="Logo"
					width="80%"
					height="auto"
					className="mt-10 mb-10"
				/>
				<form
					action={credentialsAction}
					className="w-full px-6 flex flex-col items-center justify-center"
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
						className="relative overflow-hidden w-[14rem] h-[3rem] rounded-xl cursor-pointer mt-5 mb-8"
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
			</div>

			{/* 底部圖片區域 - 只在鍵盤沒有出現時顯示 */}
			<div className="flex-shrink-0 w-full max-w-md mx-auto">
				<img
					src="/images/loginIVAN.png"
					alt="Login Ivan"
					width="100%"
					height="auto"
					className="w-full h-auto block"
				/>
			</div>
			{showError && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<button
						type="button"
						className="absolute inset-0"
						onClick={() => {
							setShowError(false);
							router.push("/login");
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								setShowError(false);
								router.push("/login");
							}
						}}
						aria-label="關閉登出確認"
						tabIndex={0}
						style={{
							background: "transparent",
							border: "none",
							padding: 0,
							margin: 0,
						}}
					/>

					<div className="bg-[#28272a] backdrop-blur-md rounded-2xl overflow-hidden w-full max-w-xs relative animate-scale-in">
						<div className="px-6 py-5 text-center">
							<h3 className="text-xl font-semibold text-white mb-2">
								登入失敗
							</h3>
							<p className="text-gray-300 text-sm">
								您的帳號密碼錯誤或是帳號與密碼相同
							</p>
						</div>
						<div className="border-t border-gray-200"></div>
						<div className="flex">
							<button
								type="button"
								className="flex-1 py-3 text-blue-500 font-bold text-lg transition-colors border-r border-gray-200"
								onClick={() => {
									setShowError(false);
									router.push("/login");
								}}
							>
								了解
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
