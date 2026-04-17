type Layout = "center" | "flex" | "flex-col";
type ImagePosition = "left" | "right" | "background";
type TextAlign = "center" | "right" | "left";

interface HeroBlockPresets {
	layout: Layout;
	textAlign: TextAlign;
	showImage: boolean;
	imagePosition: ImagePosition;
}

export interface HeroBlockProps extends React.ComponentPropsWithRef<"div"> {
	image?: string;
	title?: string;
	fontSizeHeading?: number;
	colorHeading?: string;
	fontSizeSubheading?: number;
	colorSubHeading?: string;
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
	fontSizeHeading,
	colorHeading,
	colorSubHeading,
	fontSizeSubheading,
	...props
}: HeroBlockProps) {
	//should render based on the layout preset
	return (
		<div
			style={{
				...props.style,
				backgroundImage: props.style?.backgroundImage
					? `url("${props.style.backgroundImage}")`
					: "none",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
			className=""
		>
			<h1 style={{ fontSize: fontSizeHeading, color: colorHeading }}>
				{heading}
			</h1>
			<h2 style={{ fontSize: fontSizeSubheading, color: colorSubHeading }}>
				{subheading}
			</h2>
		</div>
	);
}
