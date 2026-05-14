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
	style: footerStyles,
}: FooterBlockProps) => {
	return (
		<footer
			className="page-footer"
			style={{
				width: "100%",
				borderBottom: "1px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				background,
				...footerStyles,
			}}
		>
			<div
				style={{
					display: "flex",
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{logo.text && logo.text}
				{logo.image && (
					<div style={{ height: 64, width: "100%" }}>
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
				)}
			</div>
			<div
				style={{
					display: "flex",
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				{links &&
					links.map((link, idx) => (
						<div key={idx}>
							<a href={link.href}>{link.label}</a>
						</div>
					))}
			</div>
		</footer>
	);
};
