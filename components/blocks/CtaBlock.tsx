import React from "react";

export interface CtaBlockProps extends React.ComponentPropsWithRef<"section"> {
	heading?: string;
	subheading?: string;
	button?: {
		text: string;
		link: string;
		backgroundColor: string;
		color: string;
		radius: number;
		paddingX: number;
		paddingY: number;
	};
	style?: React.CSSProperties;
}

export const CtaBlock = ({
	heading = "Ready to launch something great?",
	subheading = "Create a polished page in minutes and start converting faster.",
	button = {
		text: "Start free",
		link: "#",
		backgroundColor: "#111827",
		color: "#ffffff",
		radius: 999,
		paddingX: 24,
		paddingY: 12,
	},
	style,
	...props
}: CtaBlockProps) => {
	return (
		<section
			className="cta-block"
			style={{
				display: "flex",
				justifyContent: "center",
				padding: "clamp(24px, 6vw, 44px) clamp(14px, 4vw, 20px)",
				background:
					"linear-gradient(135deg, #f8fafc 0%, #eef2ff 45%, #e2e8f0 100%)",
				...style,
			}}
			{...props}
		>
			<div
				className="cta-block-inner"
				style={{
					width: "100%",
					maxWidth: 980,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
					gap: 14,
					padding: "clamp(18px, 4vw, 28px)",
					borderRadius: 18,
					border: "1px solid rgba(15,23,42,0.1)",
					background: "rgba(255,255,255,0.75)",
					backdropFilter: "blur(6px)",
				}}
			>
				<h2
					className="cta-block-heading"
					style={{
						margin: 0,
						fontSize: "clamp(1.6rem, 4vw, 2.375rem)",
						lineHeight: 1.15,
						fontWeight: 800,
						color: "#0f172a",
						textWrap: "balance",
					}}
				>
					{heading}
				</h2>
				<p
					className="cta-block-subheading"
					style={{
						margin: 0,
						fontSize: "clamp(0.96rem, 2.2vw, 1.125rem)",
						lineHeight: 1.5,
						color: "#475569",
						maxWidth: 780,
						textWrap: "pretty",
					}}
				>
					{subheading}
				</p>
				<a
					className="cta-block-link"
					href={button.link}
					style={{ textDecoration: "none" }}
				>
					<button
						className="cta-block-button"
						style={{
							marginTop: 8,
							paddingInline: button.paddingX,
							paddingBlock: button.paddingY,
							border: "none",
							borderRadius: button.radius,
							background: button.backgroundColor,
							color: button.color,
							fontSize: 15,
							fontWeight: 700,
							cursor: "pointer",
							boxShadow: "0 12px 24px rgba(15,23,42,0.2)",
						}}
					>
						{button.text}
					</button>
				</a>
			</div>
		</section>
	);
};
