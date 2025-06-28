"use client";
import { useSession, signOut } from "next-auth/react";
import { Undo2, LogOut } from "lucide-react";
import Loading from "@/components/Loading";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const cRole: any = {
	STU: "學生",
	TEA: "教職員",
	PAR: "家長",
	ALU: "校友",
};

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session, status } = useSession();
	const userData: any = session?.user;
	const pathname = usePathname();
	const router = useRouter();
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

	if (status === "loading") {
		return (
			<div className="flex flex-col items-center justify-center h-full w-full relative bg-[#1c1c1e]">
				<Loading color="white" size="md" />
			</div>
		);
	}

	const handleLogout = () => {
		setShowLogoutConfirm(false);
		signOut({ redirect: true, redirectTo: "/login" });
	};

	return (
		<div className="flex flex-col items-center justify-start h-full w-full relative bg-[#1c1c1e] overflow-hidden">
			<div className="h-[3.5rem] w-full flex p-1 px-4 items-center">
				<Undo2
					size={32}
					color="oklch(62.3% 0.214 259.815)"
					strokeWidth={3}
					className="my-auto"
					onClick={() => {
						if (pathname !== "/") {
							router.back();
						} else {
							router.refresh();
						}
					}}
				/>
				<div className="flex-1 w-full text-center justify-end items-end flex h-full">
					<span className="text-white text-xl font-bold w-full my-auto pt-2">
						{userData?.name} ({cRole[userData?.wRole] || userData?.wRole})
					</span>
				</div>
				<button
					type="button"
					className="flex-none"
					onClick={() => setShowLogoutConfirm(true)}
				>
					<LogOut
						size={32}
						color="oklch(62.3% 0.214 259.815)"
						strokeWidth={3}
					/>
				</button>
			</div>

			{showLogoutConfirm && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<button
						type="button"
						className="absolute inset-0"
						onClick={() => setShowLogoutConfirm(false)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								setShowLogoutConfirm(false);
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
								確認登出
							</h3>
							<p className="text-gray-300 text-sm">您確定要登出嗎？</p>
						</div>
						<div className="border-t border-gray-200"></div>
						<div className="flex">
							<button
								type="button"
								className="flex-1 py-3 text-blue-500 font-bold text-lg transition-colors border-r border-gray-200"
								onClick={() => setShowLogoutConfirm(false)}
							>
								取消
							</button>
							<button
								type="button"
								className="flex-1 py-3 text-red-500 font-bold text-lg transition-colors "
								onClick={handleLogout}
							>
								登出
							</button>
						</div>
					</div>
				</div>
			)}

			{children}
		</div>
	);
}
