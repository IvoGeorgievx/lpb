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
	const hasLogoImage = Boolean(logo && style?.backgroundImage && !logoText);
	const hasLogoText = Boolean(logoText && logoText.trim().length > 0);
	const resolvedHeight =
		heightInPx !== undefined
			? `${heightInPx}px`
			: heightInPercentage !== undefined
				? `${heightInPercentage}%`
				: "72px";

	const styles: React.CSSProperties = {
		height: resolvedHeight,
		position: sticky ? "sticky" : undefined,
		top: sticky ? 0 : undefined,
		padding: padding ? `${padding}px` : "10px 16px",
		backdropFilter: blur ? `blur(${blurPx || 8}px)` : undefined,
		display: "flex",
		alignItems: "stretch",
		justifyContent: "center",
		boxSizing: "border-box",
		width: "100%",
		gap: gap ? `${gap}px` : undefined,
		...style,
	};

	return (
		<header style={styles} {...props}>
			<div
				style={{
					width: "100%",
					maxWidth: 1160,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 16,
					margin: "0 auto",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 12,
						minWidth: 0,
					}}
				>
					{hasLogoImage ? (
						<img
							src={style?.backgroundImage}
							alt="Logo"
							style={{
								height: 40,
								width: "auto",
								maxWidth: 180,
								objectFit: "contain",
								display: "block",
								flexShrink: 0,
							}}
						/>
					) : null}
					{hasLogoText ? (
						<p
							style={{
								margin: 0,
								fontSize: 22,
								fontWeight: 700,
								letterSpacing: 0.2,
								lineHeight: 1.1,
								color: style?.color ?? "#0f172a",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{logoText}
						</p>
					) : null}
				</div>
				{cta ? (
					<a
						href={cta.link}
						style={{
							textDecoration: "none",
						}}
					>
						<button
							style={{
								paddingInline: cta.paddingX,
								paddingBlock: cta.paddingY,
								background: cta.backgroundColor,
								borderRadius: cta.radius,
								border: "none",
								color: cta.color,
								fontWeight: 600,
								fontSize: 14,
								cursor: "pointer",
								boxShadow: "0 8px 20px rgba(15, 23, 42, 0.18)",
							}}
						>
							{cta.text}
						</button>
					</a>
				) : null}
			</div>

			{children}
		</header>
	);
}
