type FooterSectionType = "links" | "brand" | "newsletter" | "socials";

// export interface FooterSection {
// 	id: string;
// 	title?: string;
// 	type: FooterSectionType;
// 	links?: {
// 		label: string;
// 		href: string;
// 	}[];
// 	text?: string;
// 	align?: "left" | "center" | "right";
// }

interface LayoutPreset {
	columns: number;
}

export interface FooterBlockProps extends React.ComponentPropsWithRef<"footer"> {
	layout?: LayoutPreset;
	// sections?: FooterSection[];
	logo?: string;
	links?: string[];
	copyright?: string;
}

export const FooterBlock = ({
	style: footerStyles,
	layout,
	// sections = [],
}: FooterBlockProps) => {
	const columns = layout?.columns || 2;

	return (
		<footer className="w-full border-t bg-background">
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
					...footerStyles,
				}}
			></div>
		</footer>
	);
};
