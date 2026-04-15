import Image from "next/image";
import React from "react";

export interface HeaderProps extends React.ComponentPropsWithRef<"header"> {
	heightInPx?: number;
	heightInPercentage?: number;
	sticky?: boolean;
	padding?: number;
	blur?: boolean;
	blurPx?: number;
	logo?: string;
	links?: string[];
	gap?: number;
	animation?: string;
}

export default function Header({
	heightInPx,
	heightInPercentage,
	sticky,
	padding,
	blur,
	blurPx,
	logo,
	links,
	gap,
	children,
	style,
	...props
}: HeaderProps) {
	const styles: React.CSSProperties = {
		height: heightInPx
			? `${heightInPx}px`
			: heightInPercentage
				? `${heightInPercentage}%`
				: 50,
		position: sticky ? "sticky" : undefined,
		top: sticky ? 0 : undefined,
		padding: padding ? `${padding}px` : undefined,
		backdropFilter: blur ? `blur(${blurPx || 8}px)` : undefined,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: gap ? `${gap}px` : undefined,
		...style,
	};

	return (
		<header style={styles} {...props}>
			{logo && <Image src={logo} alt="logo" className="h-full" />}
			{links && (
				<nav className="flex items-center gap-4">
					{links.map((link, i) => (
						<a key={i} href="#">
							{link}
						</a>
					))}
				</nav>
			)}
			test
			{children}
		</header>
	);
}
