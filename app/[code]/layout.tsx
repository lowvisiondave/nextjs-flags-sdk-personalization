import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Next.js Flags SDK Personalization Demo",
	description:
		"A demonstration of using Vercel's Flags SDK to implement URL-based personalization with efficient caching in Next.js applications.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
