import { auth } from "@/library/auth";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const session = await auth();
	if (session && request.nextUrl.pathname.startsWith("/login")) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!session && !request.nextUrl.pathname.startsWith("/login")) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|images|.well-known|_next).*)",
	],
};
