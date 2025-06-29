/** biome-ignore-all lint/performance/noImgElement: <explanation> **/
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> **/
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> **/
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> **/

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getLaunchPad } from "./(main)/launchPad";

export default function Home() {
	const { data: session } = useSession();
	const userData: any = session?.user;
	const [launchPad, setLaunchPad] = useState<any>([]);

	useEffect(() => {
		if (userData) {
			const pad = getLaunchPad(userData);
			setLaunchPad(pad);
		} else {
			setLaunchPad([]);
		}
	}, [userData]);

	return (
		<div className="h-[calc(100dvh-3.5rem)] w-full flex flex-col items-center p-4 overflow-hidden">
			<img src="/images/logoMD.png" alt="Logo" className="mb-4 w-[12rem]" />
			<div className="pb-8 overflow-y-auto">
				<div className="grid grid-cols-4 gap-4 max-sm:gap-3 p-1">
					{launchPad.map((item: any, index: any) => (
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
							/>
							<span
								className="text-center leading-tight text-white font-bold font-[Arial_Black]"
								style={{
									fontSize: "clamp(0.75rem, 3.6vw, 1.05rem)",
									maxWidth: "clamp(3.2rem, 19vw, 7.5rem)",
								}}
							>
								{item.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
