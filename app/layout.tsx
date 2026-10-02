import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Landing Page Builder | Create & Export Clean HTML Pages",
	description:
		"Build a landing page visually and download one HTML file for static hosting. Your page, your hosting, no builder runtime required.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full antialiased">
			<body className="min-h-full flex flex-col">
				<TooltipProvider>
					<main>{children}</main>
				</TooltipProvider>
			</body>
		</html>
	);
}
