type Layout = "center" | "flex" | "flex-col";
type ImagePosition = "left" | "right" | "background";
type TextAlign = "center" | "right" | "left";

interface HeroBlockPresets {
	layout: Layout;
	textAlign: TextAlign;
	showImage: boolean;
	imagePosition: ImagePosition;
}
type HeadingAnimation = "fade-in" | "slide-right" | "slide-left";
type FontStyle = "normal" | "italic";

export interface HeroBlockProps extends React.ComponentPropsWithRef<"div"> {
	image?: string;
	title?: string;
	headingFontSize?: number;
	headingColor?: string;
	headingWeight?: number;
	headingStyle?: FontStyle;
	headingAnimation?: HeadingAnimation;
	subheadingFontSize?: number;
	subheadingColor?: string;
	subheadingWeight?: number;
	subheadingStyle?: FontStyle;
	subHeadingAnimation?: HeadingAnimation;
	animationEnabled?: boolean;
	animation?: string;
	overlay?: number;
	bgType?: "color" | "gradient" | "image" | "transparent";
	preset?: HeroBlockPresets;
	heading?: string;
	subheading?: string;
	cta?: string;
	flexReverse?: boolean;
	overlayStrength?: number;
	shadowBlur?: number;
	shadowIntensity?: number;
}

export default function HeroBlock({
	preset = {
		layout: "center",
		textAlign: "center",
		showImage: true,
		imagePosition: "background",
	},
	heading,
	subheading,
	headingFontSize,
	headingColor,
	headingWeight,
	headingStyle,
	headingAnimation,
	subHeadingAnimation,
	subheadingColor,
	subheadingFontSize,
	subheadingWeight,
	flexReverse,
	shadowBlur,
	shadowIntensity,
	overlayStrength,
	subheadingStyle,
	...props
}: HeroBlockProps) {
	const animationMap = {
		"fade-in": "animate-fade-in",
		"slide-left": "animate-slide-in-left",
		"slide-right": "animate-slide-in-right",
	};
	return (
		<div>
			{preset?.layout === "center" && (
				<div
					// className="animate-fade-in"
					style={{
						...props.style,
						backgroundImage: props.style?.backgroundImage
							? `url("${props.style.backgroundImage}")`
							: "none",
						// backgroundImage: props.style?.backgroundImage
						// 	? `linear-gradient(rgba(0,0,0,${overlayStrength}), rgba(0,0,0,${overlayStrength})), url("${props.style.backgroundImage}")`
						// 	: "none",
						backgroundSize: "cover",
						backgroundPosition: "center",
						justifyContent: "center",
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
						gap: 16,
						boxShadow: `inset 0 0 ${shadowBlur}px rgba(0,0,0,${shadowIntensity})`,
					}}
				>
					<h1
						style={{
							fontSize: headingFontSize,
							color: headingColor,
							fontWeight: headingWeight,
							fontStyle: headingStyle,
						}}
						className={
							(headingAnimation && animationMap[headingAnimation]) || ""
						}
					>
						{heading}
					</h1>
					<h2
						style={{
							fontSize: subheadingFontSize,
							color: subheadingColor,
							fontWeight: subheadingWeight,
							fontStyle: subheadingStyle,
						}}
						className={
							(subHeadingAnimation && animationMap[subHeadingAnimation]) || ""
						}
					>
						{subheading}
					</h2>
				</div>
			)}
			{preset?.layout === "flex" && (
				<div
					style={{
						...props.style,
						padding: 16,
						flexDirection: flexReverse ? "row-reverse" : "row",
					}}
					className="hero-preset-flex"
				>
					<div
						style={{
							flex: "1 1 50%",
							flexDirection: "column",
							gap: 16,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<h1
							style={{
								fontSize: headingFontSize,
								color: headingColor,
								fontWeight: headingWeight,
								fontStyle: headingStyle,
							}}
							className={
								(headingAnimation && animationMap[headingAnimation]) || ""
							}
						>
							{heading}
						</h1>
						<h2
							style={{
								fontSize: subheadingFontSize,
								color: subheadingColor,
								fontWeight: subheadingWeight,
								fontStyle: subheadingStyle,
							}}
							className={
								(subHeadingAnimation && animationMap[subHeadingAnimation]) || ""
							}
						>
							{subheading}
						</h2>
					</div>
					<div style={{ flex: "1 1 50%" }}>Test</div>
				</div>
			)}
		</div>
	);
}
