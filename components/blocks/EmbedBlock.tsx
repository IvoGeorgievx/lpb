import React from "react";

export interface EmbedBlockProps extends React.ComponentPropsWithRef<"section"> {
	src?: string;
	title?: string;
	height?: number;
	loading?: "lazy" | "eager";
	allowFullScreen?: boolean;
	showContentPanel?: boolean;
	contentHeading?: string;
	contentParagraph?: string;
	contentBullets?: string[];
}

export const EmbedBlock = ({
	src = "",
	title = "Embedded content",
	height = 520,
	loading = "lazy",
	allowFullScreen = true,
	showContentPanel = false,
	contentHeading = "Why this embed matters",
	contentParagraph = "Use this area to add context before users interact with the embedded content.",
	contentBullets = [
		"Highlight key outcomes",
		"Add short setup notes",
		"Include one clear call to action",
	],
	style,
	...props
}: EmbedBlockProps) => {
	const panelBullets = (contentBullets ?? []).filter(
		(line) => line.trim().length > 0,
	);

	const embedFrame = src ? (
		<>
			<iframe
				src={src}
				title={title}
				loading={loading}
				allowFullScreen={allowFullScreen}
				referrerPolicy="origin-when-cross-origin"
				style={{
					width: "100%",
					height,
					border: "none",
					display: "block",
				}}
			/>
			<div
				style={{
					padding: "10px 12px",
					borderTop: "1px solid rgba(148,163,184,0.22)",
					display: "flex",
					justifyContent: "flex-end",
					background: "#f8fafc",
				}}
			>
				<a
					href={src}
					target="_blank"
					rel="noreferrer"
					style={{
						fontSize: 13,
						fontWeight: 600,
						textDecoration: "none",
						color: "#1d4ed8",
					}}
				>
					Open source in new tab
				</a>
			</div>
		</>
	) : (
		<div
			style={{
				height,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 18,
				color: "#64748b",
				fontSize: 14,
				textAlign: "center",
				background:
					"linear-gradient(135deg, rgba(148,163,184,0.14), rgba(226,232,240,0.24))",
			}}
		>
			Paste an embed URL in the editor to render iframe content.
		</div>
	);

	return (
		<section
			style={{
				width: "100%",
				padding: "24px 16px",
				background: "transparent",
				...style,
			}}
			{...props}
		>
			<div
				style={{
					width: "100%",
					maxWidth: 1100,
					margin: "0 auto",
					display: "flex",
					flexWrap: "wrap",
					gap: 16,
					alignItems: "stretch",
				}}
			>
				{showContentPanel ? (
					<div
						style={{
							flex: "1 1 280px",
							minWidth: 260,
							borderRadius: 16,
							border: "1px solid rgba(148,163,184,0.35)",
							background: "#ffffff",
							boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
							padding: "20px 18px",
							display: "flex",
							flexDirection: "column",
							gap: 12,
							alignItems: "center",
							textAlign: "center",
						}}
					>
						<h3
							style={{
								margin: 0,
								fontSize: "clamp(1.25rem, 2.5vw, 1.7rem)",
								lineHeight: 1.2,
								color: "#0f172a",
							}}
						>
							{contentHeading}
						</h3>
						<p
							style={{
								margin: 0,
								fontSize: "clamp(0.95rem, 1.6vw, 1rem)",
								lineHeight: 1.55,
								color: "#334155",
							}}
						>
							{contentParagraph}
						</p>
						{panelBullets.length > 0 ? (
							<div
								style={{
									margin: 0,
									padding: 0,
									display: "flex",
									flexDirection: "column",
									gap: 8,
									color: "#334155",
									fontSize: "clamp(0.9rem, 1.5vw, 0.98rem)",
									lineHeight: 1.4,
									width: "100%",
									maxWidth: 520,
								}}
							>
								{panelBullets.map((bullet, index) => (
									<div key={index}>{bullet}</div>
								))}
							</div>
						) : null}
					</div>
				) : null}
				<div
					style={{
						flex: showContentPanel ? "1.6 1 480px" : "1 1 100%",
						minWidth: 320,
						borderRadius: 16,
						overflow: "hidden",
						border: "1px solid rgba(148,163,184,0.35)",
						background: "#ffffff",
						boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
					}}
				>
					{embedFrame}
				</div>
			</div>
		</section>
	);
};
