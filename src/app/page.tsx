/** biome-ignore-all lint/performance/noImgElement: <explanation> **/
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> **/
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> **/
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> **/

"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, LogOut } from "lucide-react";

export default function Home() {
	const { data: session } = useSession();
	const userData: any = session?.user;

	const cRole: any = {
		STU: "學生",
		TEA: "教師",
		PAR: "家長",
		ALU: "校友",
	};

	const menus = [
		{
			name: "校安中心",
			image: "/icons/MD-safety.png",
			url: "https://sites.google.com/ms.mingdao.edu.tw/guidance-and-counseling/學生群聚與衝突處理",
		},
		{
			name: "即時刻表",
			image: "/icons/MD-timetable.png",
			url: `https://s44.mingdao.edu.tw/AACourses/Web/qWTTM.php?lang=CH&rMode=APP&session=${userData?.session}&wRole=${userData?.wRole === "STU" ? "STD" : userData?.wRole}`,
		},
		{
			name: "即時資訊",
			image: "/icons/MD-info.png",
			url: ``,
		},
		{
			name: "線上請假",
			image: "/icons/MD-leave.png",
			url: ``,
		},
	];

	return (
		<div className="flex flex-col items-center justify-start h-full w-full relative bg-[#1c1c1e]">
			<div className="h-[3.5rem] w-full flex p-1 px-4 items-center">
				<Menu color="white" size={30} className="my-auto" />
				<div className="flex-1 w-full text-center ">
					<span className="text-white text-xl font-bold w-full">
						{cRole[userData?.wRole] || "未登入"}
					</span>
				</div>
				<LogOut
					color="white"
					size={30}
					className="my-auto"
					onClick={() => signOut({ redirect: true, redirectTo: "/login" })}
				/>
			</div>
			<div className="h-[calc(100dvh-3.5rem)] w-full flex flex-col items-center py-4 px-2 max-sm:px-1 overflow-hidden">
				<img src="/images/logoMD.png" alt="Logo" className="mb-10 w-[12rem]" />
				<div className="pb-8 overflow-x-auto">
					<div className="grid grid-cols-4 gap-4">
						{menus.map((menu, index) => (
							<Link
								href={menu.url}
								target="_blank"
								key={index}
								className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105 active:scale-95 outline-0 focus:outline-0"
							>
								<img
									src={menu.image}
									alt={menu.name}
									className="w-18 h-18 rounded-xl flex items-center justify-center shadow-lg mb-2"
								/>
								<span className="text-md text-center leading-tight max-w-16 text-white font-bold font-[Arial_Black]">
									{menu.name}
								</span>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
