type Layout = "center" | "flex" | "flex-col";
type ImagePosition = "left" | "right" | "background";
type TextAlign = "center" | "right" | "left";

interface HeroBlockPresets {
	layout: Layout;
	textAlign: TextAlign;
	showImage: boolean;
	imagePosition: ImagePosition;
}

type FontStyle = "normal" | "italic";

export interface HeroBlockProps extends React.ComponentPropsWithRef<"div"> {
	image?: string;
	title?: string;
	headingFontSize?: number;
	headingColor?: string;
	headingWeight?: number;
	headingStyle?: FontStyle;
	subheadingFontSize?: number;
	subheadingColor?: string;
	subheadingWeight?: number;
	subheadingStyle?: FontStyle;
	animationEnabled?: boolean;
	animation?: string;
	overlay?: number;
	bgType?: "color" | "gradient" | "image" | "transparent";
	preset?: HeroBlockPresets;
	heading?: string;
	subheading?: string;
	cta?: string;
}

export default function HeroBlock({
	bgType = "color",
	preset,
	heading,
	subheading,
	headingFontSize,
	headingColor,
	headingWeight,
	headingStyle,
	subheadingColor,
	subheadingFontSize,
	subheadingWeight,
	animationEnabled,
	subheadingStyle,
	...props
}: HeroBlockProps) {
	//should render based on the layout preset
	return (
		<div
			className="animate-fade-in"
			style={{
				...props.style,
				backgroundImage: props.style?.backgroundImage
					? `url("${props.style.backgroundImage}")`
					: "none",
				backgroundSize: "cover",
				backgroundPosition: "center",
				justifyContent: "center",
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				gap: 16,
			}}
		>
			<h1
				style={{
					fontSize: headingFontSize,
					color: headingColor,
					fontWeight: headingWeight,
					fontStyle: headingStyle,
				}}
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
			>
				{subheading}
			</h2>
		</div>
	);
}
