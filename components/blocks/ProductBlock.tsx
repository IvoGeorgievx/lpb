interface TextConfig {
	content: string;
	fontSize?: number | string;
	fontWeight?: "normal" | "bold" | number;
	color?: string;
}

export interface ProductCard {
	id: string;
	icon?: string;
	heading?: TextConfig;
	subheading?: TextConfig;
	additionalContent?: TextConfig[];
	border?: boolean;
	borderRadius?: number;
	className?: string;
	style?: React.CSSProperties;
}

export interface ProductBlockProps extends React.ComponentPropsWithRef<"section"> {
	cards?: ProductCard[];
	background?: string;
}

export default function ProductBlock({
	background,
	cards,
	...props
}: ProductBlockProps) {
	console.log(cards);
	return (
		<section
			className="product-block"
			style={{
				background,
				minHeight: "20vh",
			}}
		>
			{cards?.map((card) => (
				<div
					key={card.id}
					className={`product-card ${card.className || ""}`}
					style={card.style}
				>
					{card.heading && (
						<h3 className="product-card-heading">{card.heading.content}</h3>
					)}

					{card.subheading && (
						<p className="product-card-subheading">{card.subheading.content}</p>
					)}
					{card.additionalContent &&
						card.additionalContent.map((contentPiece, idx) => {
							const { content, color, fontSize, fontWeight } = contentPiece;
							return (
								<div className="product-card-additional" key={idx}>
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
									<hr className="separator" />
								</div>
							);
						})}
				</div>
			))}
		</section>
	);
}
