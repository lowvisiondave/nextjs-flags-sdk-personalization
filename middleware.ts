import { type NextRequest, NextResponse } from "next/server";
import { precompute } from "flags/next";
import { precomputeFlags } from "@/flags";

export async function middleware(request: NextRequest) {
	request.headers.set(
		"x-search-params",
		request.nextUrl.searchParams.toString()
	);

	const code = await precompute(precomputeFlags);

	const nextUrl = new URL(
		`/${code}${request.nextUrl.pathname}${request.nextUrl.search}`,
		request.url
	);

	return NextResponse.rewrite(nextUrl, { request });
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
