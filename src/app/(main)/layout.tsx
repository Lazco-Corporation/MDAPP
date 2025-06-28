"use client";
import { useSession, signOut } from "next-auth/react";
import { Undo2, LogOut } from "lucide-react";
import Loading from "@/components/Loading";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session, status } = useSession();
	const userData: any = session?.user;

	if (status === "loading") {
		return (
			<div className="flex flex-col items-center justify-center h-full w-full relative bg-[#1c1c1e]">
				<Loading color="white" size="md" />
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-start h-full w-full relative bg-[#1c1c1e]">
			<div className="h-[3.5rem] w-full flex p-1 px-4 items-center">
				<Undo2
					size={32}
					color="#ffffff"
					strokeWidth={3}
					className="my-auto"
					onClick={() => signOut({ redirect: true, redirectTo: "/login" })}
				/>
				<div className="flex-1 w-full text-center ">
					<span className="text-white text-2xl font-bold w-full">
						您好，{userData?.name || "使用者"}
					</span>
				</div>
			</div>
			{children}
		</div>
	);
}
