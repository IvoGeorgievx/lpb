interface TextConfig {
	content: string;
	fontSize?: number | string;
	fontWeight?: "normal" | "bold" | number;
	color?: string;
}

interface Card {
	icon?: string;
	heading?: TextConfig;
	subheading?: TextConfig;
	border?: boolean;
	borderRadius?: number;
	//animations
}

export interface ProductBlockProps extends React.ComponentPropsWithRef<"section"> {
	cardCount?: number;
	card?: Card;
	background?: string;
}

export default function ProductBlock({
	background,
	...props
}: ProductBlockProps) {
	return (
		<div
			style={{
				background,
				height: "50vh",
			}}
		></div>
	);
}
