import { auth } from "@/library/auth";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const session = await auth();
	if (session && !request.nextUrl.pathname.startsWith("/MDAPP/main")) {
		return NextResponse.redirect(new URL("/MDAPP/main", request.url));
	}

	if (!session && !request.nextUrl.pathname.startsWith("/MDAPP/login")) {
		return NextResponse.redirect(new URL("/MDAPP/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/MDAPP/:path*", "/MDAPP"],
};
