import Image from "next/image";
import React from "react";

interface Link {
	label: string;
	url: string;
}

export interface HeaderProps extends React.ComponentPropsWithRef<"header"> {
	heightInPx?: number;
	heightInPercentage?: number;
	sticky?: boolean;
	padding?: number;
	blur?: boolean;
	blurPx?: number;
	logo?: string;
	links?: Link[];
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
			{/* {logo && <Image src={logo} alt="logo" className="h-full" />} */}
			{logo && <p className={`w-full ${styles.textAlign}`}>{logo}</p>}

			{children}
		</header>
	);
}
