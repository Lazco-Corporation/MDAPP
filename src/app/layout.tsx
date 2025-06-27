import { SessionProvider } from "next-auth/react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "明道中學 APP",
	description:
		"一個更好的明道學 APP 體驗，我們致力於將明道學的體驗提升到新的高度",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionProvider>
			<html lang="en">
				<body className="bg-gradient-to-b from-[#0c3d89] via-[#016eb3] to-[#0a428d] h-[100dvh] w-[100dvw]">
					<div className="flex flex-col items-center justify-center h-full w-full">
						<div className="max-w-md w-full h-full">{children}</div>
					</div>
				</body>
			</html>
		</SessionProvider>
	);
}
