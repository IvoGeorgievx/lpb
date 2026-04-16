export interface HeroBlockProps extends React.ComponentPropsWithRef<"div"> {
	image?: string;
	title?: string;
	fontSize?: string;
	animation?: string;
	overlay?: number;
	bgType?: "color" | "gradient" | "image" | "transparent";
}

export default function HeroBlock({ ...props }: HeroBlockProps) {
	return (
		<div style={props.style} className="">
			{props.title}
		</div>
	);
}
