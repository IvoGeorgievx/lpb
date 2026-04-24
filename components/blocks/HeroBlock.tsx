type Layout = "center" | "flex" | "flex-col";
type ImagePosition = "left" | "right" | "background";
type TextAlign = "center" | "right" | "left";

interface HeroBlockPresets {
	layout: Layout;
	textAlign: TextAlign;
	showImage: boolean;
	imagePosition: ImagePosition;
}
type GenericAnimation = "fade-in" | "slide-right" | "slide-left";
type FontStyle = "normal" | "italic";

type CtaOptions = {
	bgColor?: string;
	paddingX?: number;
	paddingY?: number;
	animation?: GenericAnimation;
	text?: string;
	border?: boolean;
	radius?: number;
	fontSize?: number;
	boxShadow?: {
		shadowBlur?: number;
		shadowIntensity?: number;
	};
};

export interface HeroBlockProps extends React.ComponentPropsWithRef<"div"> {
	image?: string;
	title?: string;
	headingFontSize?: number;
	headingColor?: string;
	headingWeight?: number;
	headingStyle?: FontStyle;
	headingAnimation?: GenericAnimation;
	subheadingFontSize?: number;
	subheadingColor?: string;
	subheadingWeight?: number;
	subheadingStyle?: FontStyle;
	subHeadingAnimation?: GenericAnimation;
	animationEnabled?: boolean;
	animation?: string;
	overlay?: number;
	bgType?: "color" | "gradient" | "image" | "transparent";
	preset?: HeroBlockPresets;
	heading?: string;
	subheading?: string;
	cta?: CtaOptions;
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
	flexReverse = false,
	shadowBlur,
	shadowIntensity,
	overlayStrength,
	subheadingStyle,
	cta = {
		// text: "CTA Button",
		paddingX: 12,
		paddingY: 8,
		border: false,
		fontSize: 16,
	},
	...props
}: HeroBlockProps) {
	const animationMap = {
		"fade-in": "animate-fade-in",
		"slide-left": "animate-slide-in-left",
		"slide-right": "animate-slide-in-right",
	};

	const getCtaButton = () => {
		return (
			<button
				style={{
					cursor: "pointer",
					background: cta.bgColor,
					paddingInline: cta.paddingX,
					paddingBlock: cta.paddingY,
					border: cta.border ? "1px solid" : "",
					borderRadius: cta.radius,
					fontSize: cta.fontSize,
					boxShadow: `inset 0 0 ${cta.boxShadow?.shadowBlur}px rgba(0,0,0,${cta.boxShadow?.shadowIntensity})`,
				}}
				className={(cta?.animation && animationMap[cta.animation]) || ""}
			>
				{cta.text}
			</button>
		);
	};

	return (
		<div>
			{preset?.layout === "center" && (
				<div
					style={{
						...props.style,
						backgroundImage: props.style?.backgroundImage
							? `linear-gradient(rgba(0,0,0,${overlayStrength || 0}), rgba(0,0,0,${overlayStrength || 0})), url("${props.style.backgroundImage}")`
							: "none",
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
					{getCtaButton()}
				</div>
			)}
			{preset?.layout === "flex" && (
				<div
					style={{
						...props.style,
						padding: 16,
						// flexDirection: flexReverse ? "row-reverse" : "row",
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
						{getCtaButton()}
					</div>
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
						Test
					</div>
				</div>
			)}
		</div>
	);
}
