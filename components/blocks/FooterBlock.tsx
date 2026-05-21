/* eslint-disable @next/next/no-img-element */
interface LayoutPreset {
	columns: number;
}

export interface FooterBlockProps extends React.ComponentPropsWithRef<"footer"> {
	layout?: LayoutPreset;
	// sections?: FooterSection[];
	logo?: {
		text?: string;
		image?: string;
	};
	background?: string;
	links?: { label: string; href: string }[];
	copyright?: string;
}

export const FooterBlock = ({
	logo = { text: "Paste image url in the editor" },
	links,
	background,
	copyright = "(c) 2026 Your Company. All rights reserved.",
	style: footerStyles,
}: FooterBlockProps) => {
	const mergedStyle = footerStyles ?? {};
	const textColor = (mergedStyle.color as string) ?? "#e2e8f0";
	const borderColor = "rgba(148, 163, 184, 0.25)";
	const linkColor = (mergedStyle.color as string) ?? "#f8fafc";

	return (
		<footer
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "stretch",
				background:
					background ??
					"linear-gradient(135deg, #0f172a 0%, #111827 45%, #1e293b 100%)",
				borderTop: `1px solid ${borderColor}`,
				padding: "28px 24px",
				...footerStyles,
			}}
		>
			<div
				style={{
					display: "flex",
					width: "100%",
					maxWidth: 1120,
					justifyContent: "space-between",
					alignItems: "flex-start",
					gap: 24,
					flexWrap: "wrap",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 10,
						minWidth: 220,
						flex: "1 1 260px",
					}}
				>
					{logo.image ? (
						<div style={{ height: 120, width: 180 }}>
							<img
								alt="logo"
								loading="lazy"
								src={logo.image}
								style={{
									height: "100%",
									width: "100%",
									objectFit: "contain",
									display: "block",
								}}
							/>
						</div>
					) : null}
					{logo.text ? (
						<div
							style={{
								color: textColor,
								fontSize: 20,
								fontWeight: 700,
								letterSpacing: 0.2,
							}}
						>
							{logo.text}
						</div>
					) : null}
					<div
						style={{
							color: "rgba(226, 232, 240, 0.85)",
							fontSize: 13,
							lineHeight: 1.5,
							maxWidth: 420,
						}}
					>
						{copyright}
					</div>
				</div>
				<div
					style={{
						display: "flex",
						flex: "1 1 280px",
						justifyContent: "flex-end",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 10,
							width: "100%",
							maxWidth: 280,
						}}
					>
						<div
							style={{
								color: textColor,
								fontWeight: 600,
								fontSize: 14,
								textTransform: "uppercase",
								letterSpacing: 0.8,
							}}
						>
							Quick Links
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: 8,
							}}
						>
							{links?.map((link, idx) => (
								<a
									key={idx}
									href={link.href}
									style={{
										color: linkColor,
										textDecoration: "none",
										fontSize: 15,
										opacity: 0.92,
									}}
								>
									{link.label}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
