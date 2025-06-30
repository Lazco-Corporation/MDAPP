/** biome-ignore-all lint/performance/noImgElement: <explanation> **/
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> **/
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> **/
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> **/

"use client";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getLaunchPad } from "./(main)/launchPad";
import { getExtraMenu } from "./(main)/extraMenu";
import Loading from "@/components/Loading";

const menuNames: any = {
	leave: "提假及審假",
	CA: "銷過申請審核",
	RFT: "精緻巡堂",
};

export default function Home() {
	const { data: session } = useSession();
	const userData: any = session?.user;
	const [launchPad, setLaunchPad] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showExtraMenu, setShowExtraMenu] = useState(false);
	const [extraMenuName, setExtraMenuName] = useState("");
	const [extraMenu, setExtraMenu] = useState<any>([]);

	useEffect(() => {
		if (userData) {
			const pad = getLaunchPad(userData);
			if (!pad) {
				setLaunchPad([]);
				setIsLoading(false);
			} else {
				setLaunchPad(pad);
			}
		} else {
			setLaunchPad([]);
		}
	}, [userData]);

	useEffect(() => {
		if (userData && launchPad.length > 0) {
			setIsLoading(false);
		}
	}, [userData, launchPad]);

	useEffect(() => {
		if (userData) {
			const menu = getExtraMenu(userData, extraMenuName);

			if (!menu) {
				setExtraMenu([]);
			} else {
				setExtraMenu(menu);
			}
		} else {
			setExtraMenu([]);
		}
	}, [extraMenuName, userData]);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center h-full w-full relative bg-[#1c1c1e]">
				<Loading color="white" size="md" />
			</div>
		);
	}

	return (
		<div className="h-[calc(100dvh-3.5rem)] w-full flex flex-col items-center p-4 overflow-hidden">
			<img src="/images/logoMD.png" alt="Logo" className="mb-4 w-[12rem]" />
			<div className="pb-8 overflow-y-auto overflow-x-hidden">
				<div className="grid grid-cols-4 gap-4 max-sm:gap-3 p-1">
					{launchPad.map((item: any, index: any) => {
						if (item.openMenu) {
							return (
								<button
									type="button"
									key={index}
									className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105 active:scale-95 outline-0 focus:outline-0"
									onClick={() => {
										setExtraMenuName(item.menuName);
										setShowExtraMenu(true);
									}}
								>
									<img
										src={item.image}
										alt={item.name}
										className="rounded-xl flex items-center justify-center shadow-lg mb-2 object-cover"
										style={{
											width: "clamp(3.2rem, 19vw, 7.5rem)",
											height: "clamp(3.2rem, 19vw, 7.5rem)",
										}}
										loading="lazy"
									/>
									<span
										className="text-center leading-tight text-white font-bold font-[Arial_Black] px-1"
										style={{
											fontSize: "clamp(0.7rem, 3.6vw, 1rem)",
											minWidth: "max-content",
										}}
									>
										{item.name}
									</span>
								</button>
							);
						} else {
							return (
								<Link
									href={item.url}
									target={item.target}
									key={index}
									className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105 active:scale-95 outline-0 focus:outline-0"
								>
									<img
										src={item.image}
										alt={item.name}
										className="rounded-xl flex items-center justify-center shadow-lg mb-2 object-cover"
										style={{
											width: "clamp(3.2rem, 19vw, 7.5rem)",
											height: "clamp(3.2rem, 19vw, 7.5rem)",
										}}
										loading="lazy"
									/>
									<span
										className="text-center leading-tight text-white font-bold font-[Arial_Black] px-1"
										style={{
											fontSize: "clamp(0.7rem, 3.6vw, 1rem)",
											minWidth: "max-content",
										}}
									>
										{item.name}
									</span>
								</Link>
							);
						}
					})}
				</div>
			</div>
			{showExtraMenu && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-[#28272a] text-white backdrop-blur-md rounded-lg overflow-hidden w-full max-w-xs relative animate-scale-in">
						<div className="flex items-center justify-between p-3 py-2">
							<h1 className="font-black text-xl">{menuNames[extraMenuName]}</h1>
							<button
								type="button"
								onClick={() => setShowExtraMenu(false)}
								className=" text-red-500 font-bold my-auto rounded transition-colors"
							>
								<X />
							</button>
						</div>
						<hr className="text-white/50" />
						<div className="px-6 py-6 text-center h-[50dvh]">
							<div className="pb-8 overflow-y-auto overflow-x-hidden h-full max-h-[calc(50dvh-3rem)]">
								<div className="grid grid-cols-3 gap-4 max-sm:gap-3 p-1">
									{extraMenu.map((item: any, index: any) => (
										<Link
											href={item.url}
											target={item.target}
											key={index}
											className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105 active:scale-95 outline-0 focus:outline-0"
										>
											<img
												src={item.image}
												alt={item.name}
												className="rounded-xl flex items-center justify-center shadow-lg mb-2 object-cover"
												style={{
													width: "clamp(3.2rem, 19vw, 7.5rem)",
													height: "clamp(3.2rem, 19vw, 7.5rem)",
												}}
												loading="lazy"
											/>
											<span
												className="text-center leading-tight text-white font-bold font-[Arial_Black] px-1"
												style={{
													fontSize: "clamp(0.7rem, 3.6vw, 1rem)",
													minWidth: "max-content",
												}}
											>
												{item.name}
											</span>
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
