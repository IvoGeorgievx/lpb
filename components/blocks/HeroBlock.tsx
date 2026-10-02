import { safeLink } from "@/lib/document";
type Animation = "fade-in" | "slide-right" | "slide-left";
type FontStyle = "normal" | "italic";
export interface HeroBlockProps extends React.ComponentPropsWithRef<"div"> {
	heading?: string;
	subheading?: string;
	headingFontSize?: number;
	headingColor?: string;
	headingWeight?: number;
	headingStyle?: FontStyle;
	headingAnimation?: Animation;
	subheadingFontSize?: number;
	subheadingColor?: string;
	subheadingWeight?: number;
	subheadingStyle?: FontStyle;
	subHeadingAnimation?: Animation;
	preset?: {
		layout: "center";
		textAlign: "center" | "left" | "right";
		showImage: boolean;
		imagePosition: "left" | "right" | "background";
	};
	overlayStrength?: number;
	shadowBlur?: number;
	shadowIntensity?: number;
	cta?: {
		link?: string;
		text?: string;
		bgColor?: string;
		textColor?: string;
		paddingX?: number;
		paddingY?: number;
		radius?: number;
		fontSize?: number;
		border?: boolean;
		animation?: Animation;
		boxShadow?: { shadowBlur?: number; shadowIntensity?: number };
	};
}
const animations = {
	"fade-in": "animate-fade-in",
	"slide-left": "animate-slide-in-left",
	"slide-right": "animate-slide-in-right",
};
export default function HeroBlock({
	heading,
	subheading,
	headingFontSize,
	headingColor,
	headingWeight,
	headingStyle,
	headingAnimation,
	subheadingFontSize,
	subheadingColor,
	subheadingWeight,
	subheadingStyle,
	subHeadingAnimation,
	preset,
	overlayStrength = 0,
	shadowBlur = 0,
	shadowIntensity = 0,
	cta,
	style,
	className,
	...props
}: HeroBlockProps) {
	return (
		<div className={`hero-block ${className ?? ""}`} {...props}>
			<div
				className="hero-block-surface"
				style={{
					...style,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 24,
					position: "relative",
					textAlign: preset?.textAlign ?? "center",
					backgroundSize: "cover",
					backgroundPosition: "center",
					boxShadow: `inset 0 0 ${shadowBlur}px rgba(0,0,0,${shadowIntensity})`,
				}}
			>
				{overlayStrength > 0 && (
					<div
						aria-hidden="true"
						style={{
							position: "absolute",
							inset: 0,
							background: `rgba(0,0,0,${overlayStrength})`,
							pointerEvents: "none",
						}}
					/>
				)}
				<h1
					className={
						headingAnimation
							? animations[headingAnimation]
							: undefined
					}
					style={{
						position: "relative",
						fontSize: headingFontSize,
						color: headingColor,
						fontWeight: headingWeight,
						fontStyle: headingStyle,
					}}
				>
					{heading}
				</h1>
				<p
					className={
						subHeadingAnimation
							? animations[subHeadingAnimation]
							: undefined
					}
					style={{
						position: "relative",
						fontSize: subheadingFontSize,
						color: subheadingColor,
						fontWeight: subheadingWeight,
						fontStyle: subheadingStyle,
					}}
				>
					{subheading}
				</p>
				{cta?.text && (
					<a
						href={safeLink(cta.link)}
						className={
							cta.animation
								? animations[cta.animation]
								: undefined
						}
						style={{
							position: "relative",
							display: "inline-block",
							textDecoration: "none",
							background: cta.bgColor,
							color: cta.textColor,
							paddingInline: cta.paddingX ?? 24,
							paddingBlock: cta.paddingY ?? 12,
							borderRadius: cta.radius,
							border: cta.border
								? "1px solid currentColor"
								: undefined,
							fontSize: cta.fontSize,
							fontWeight: 700,
							boxShadow: `0 4px ${cta.boxShadow?.shadowBlur ?? 0}px rgba(0,0,0,${cta.boxShadow?.shadowIntensity ?? 0})`,
						}}
					>
						{cta.text}
					</a>
				)}
			</div>
		</div>
	);
}
