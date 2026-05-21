export interface TextConfig {
	content: string;
	fontSize?: number | string;
	fontWeight?: "normal" | "bold" | number;
	color?: string;
	iconClass?: string;
}

export type ProductCardVariants =
	| "default"
	| "featured"
	| "ghost"
	| "outlined"
	| "glass";

export interface ProductCard {
	id: string;
	iconClass?: string;
	heading?: TextConfig;
	subheading?: TextConfig;
	additionalContent?: TextConfig[];
	border?: boolean;
	borderRadius?: number;
	className?: string;
	style?: React.CSSProperties;
	variant?: ProductCardVariants;
}

export interface ProductBlockProps extends React.ComponentPropsWithRef<"section"> {
	cards?: ProductCard[];
	background?: string;
}

const resolveLucideIconClass = (iconClass?: string) => {
	if (!iconClass) return "";
	const tokens = iconClass.trim().split(/\s+/);
	const iconToken = tokens.find((token) => token.startsWith("icon-"));
	if (iconToken) return iconToken;

	const lucideToken = tokens.find((token) => token.startsWith("lucide-"));
	if (lucideToken) return `icon-${lucideToken.replace("lucide-", "")}`;

	if (tokens.length === 1) return `icon-${tokens[0]}`;
	return "";
};

export default function ProductBlock({
	background,
	cards,
	...props
}: ProductBlockProps) {
	if (!cards) return null;
	return (
		<section
			className="product-block"
			style={{
				background,
				minHeight: "20vh",
			}}
		>
			{cards.map((card) => (
				<div
					key={card.id}
					className={`product-card ${card.variant && `product-card--${card.variant}`}`}
					style={card.style}
				>
					{card.heading && (
						<h3
							className="product-card-heading"
							style={{
								color: card.heading.color,
								fontSize: card.heading.fontSize,
								fontWeight: card.heading.fontWeight,
							}}
						>
							{card.heading.content}
						</h3>
					)}

					{card.subheading && (
						<p
							className="product-card-subheading"
							style={{
								color: card.subheading.color,
								fontSize: card.subheading.fontSize,
								fontWeight: card.subheading.fontWeight,
							}}
						>
							{card.subheading.content}
						</p>
					)}
					{card.additionalContent && card.additionalContent.length > 0 && (
						<div className="product-card-additional">
							{card.additionalContent.map((contentPiece, idx) => {
								const { content, color, fontSize, fontWeight, iconClass } =
									contentPiece;
								return (
									<div className="product-card-additional-item" key={idx}>
									{iconClass && (
										<i className={resolveLucideIconClass(iconClass)} aria-hidden="true" />
									)}
										<p
											style={{
												fontSize,
												fontWeight,
												color,
												textAlign: "center",
											}}
										>
											{content}
										</p>
									</div>
								);
							})}
						</div>
					)}
				</div>
			))}
		</section>
	);
}
