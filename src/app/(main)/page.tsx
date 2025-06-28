/** biome-ignore-all lint/performance/noImgElement: <explanation> **/
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> **/
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> **/
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> **/

"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();
	const userData: any = session?.user;

	const menus = [
		{
			name: "校安中心",
			image: "/icons/MD-safety.webp",
			url: "https://sites.google.com/ms.mingdao.edu.tw/guidance-and-counseling/學生群聚與衝突處理",
			target: "_blank",
		},
		{
			name: "即時刻表",
			image: "/icons/MD-timetable.webp",
			url: `https://s44.mingdao.edu.tw/AACourses/Web/qWTTM.php?lang=CH&rMode=APP&session=${userData?.session}&wRole=${userData?.wRole === "STU" ? "STD" : userData?.wRole}`,
			target: "_blank",
		},
		{
			name: "即時資訊",
			image: "/icons/MD-info.webp",
			url: `/menu`,
			// url: `https://app.mingdao.edu.tw/MDAPP/menuList.php?qFID=F11&session=${userData?.session}&wRole=${userData?.wRole}`,
			target: "_self",
		},
		{
			name: "線上請假",
			image: "/icons/MD-leave.webp",
			url: `https://s44.mingdao.edu.tw/ORDER/SubSystem/stdLeave/leave_login.php?rMode=APP&session=${userData?.session}&wRole=${userData?.wRole}`,
			target: "_blank",
		},
	];

	return (
		<div className="h-[calc(100dvh-3.5rem)] w-full flex flex-col items-center p-4 overflow-hidden">
			<img src="/images/logoMD.png" alt="Logo" className="my-4 w-[12rem]" />
			<div className="pb-8 overflow-y-auto">
				<div className="grid grid-cols-4 gap-4 max-sm:gap-3 p-1">
					{menus.map((menu, index) => (
						<Link
							href={menu.url}
							target={menu.target}
							key={index}
							className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105 active:scale-95 outline-0 focus:outline-0"
						>
							<img
								src={menu.image}
								alt={menu.name}
								className="rounded-xl flex items-center justify-center shadow-lg mb-2 object-cover"
								style={{
									width: "clamp(2.8rem, 16vw, 6.5rem)",
									height: "clamp(2.8rem, 16vw, 6.5rem)",
								}}
							/>
							<span
								className="text-center leading-tight text-white font-bold font-[Arial_Black]"
								style={{
									fontSize: "clamp(0.65rem, 3.2vw, 0.95rem)",
									maxWidth: "clamp(2.8rem, 16vw, 6.5rem)",
								}}
							>
								{menu.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
