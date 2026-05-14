/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

interface Link {
	label: string;
	url: string;
}

interface Cta {
	text: string;
	paddingX: number;
	paddingY: number;
	backgroundColor: string;
	radius: number;
	link: string;
	color: string;
}

export interface HeaderBlockProps extends React.ComponentPropsWithRef<"header"> {
	heightInPx?: number;
	heightInPercentage?: number;
	sticky?: boolean;
	padding?: number;
	blur?: boolean;
	blurPx?: number;
	logo?: boolean;
	logoText?: string;
	links?: Link[];
	gap?: number;
	animation?: string;
	cta?: Cta;
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
	cta,
	logoText,
	...props
}: HeaderBlockProps) {
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
			{logo && style?.backgroundImage && (
				<img
					src={style.backgroundImage}
					alt="Logo"
					style={{
						height: "80%",
						maxHeight: "100%",
						width: "auto",
						objectFit: "contain",
						flexShrink: 0,
					}}
				/>
			)}
			{logoText && (
				<p
					style={{
						textAlign: style?.textAlign,
						width: "100%",
					}}
				>
					{logoText}
				</p>
			)}
			{cta && (
				<button
					style={{
						paddingInline: cta.paddingX,
						paddingBlock: cta.paddingY,
						background: cta.backgroundColor,
						borderRadius: cta.radius,
					}}
				>
					<a
						href={cta.link}
						style={{ textDecoration: "none", color: cta.color }}
					>
						{cta.text}
					</a>
				</button>
			)}

			{children}
		</header>
	);
}
