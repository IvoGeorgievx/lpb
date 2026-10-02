import {
	Award,
	Rocket,
	Briefcase,
	Check,
	Star,
	Heart,
	Shield,
	Zap,
	Globe,
	Leaf,
	Circle,
	type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
	award: Award,
	rocket: Rocket,
	briefcase: Briefcase,
	check: Check,
	star: Star,
	heart: Heart,
	shield: Shield,
	zap: Zap,
	globe: Globe,
	leaf: Leaf,
};
function ProductIcon({ name, color }: { name: string; color?: string }) {
	const key =
		name
			.trim()
			.split(/\s+/)
			.find((part) => /^(lucide-|icon-)/.test(part))
			?.replace(/^(lucide-|icon-)/, "") ?? name;
	const Icon = ICONS[key] ?? Circle;
	return <Icon aria-hidden="true" style={color ? { color } : undefined} />;
}
export interface TextConfig {
	content: string;
	fontSize?: number | string;
	fontWeight?: "normal" | "bold" | number;
	color?: string;
	iconClass?: string;
	iconColor?: string;
}

export type ProductCardVariants =
	"default" | "featured" | "ghost" | "outlined" | "glass";

export interface ProductCard {
	id: string;
	iconClass?: string;
	iconColor?: string;
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

export default function ProductBlock({
	background,
	cards,
	...props
}: ProductBlockProps) {
	if (!cards) return null;
	return (
		<section
			{...props}
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
					{card.iconClass && (
						<ProductIcon
							name={card.iconClass}
							color={card.iconColor}
						/>
					)}
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
					{card.additionalContent &&
						card.additionalContent.length > 0 && (
							<div className="product-card-additional">
								{card.additionalContent.map(
									(contentPiece, idx) => {
										const {
											content,
											color,
											fontSize,
											fontWeight,
											iconClass,
											iconColor,
										} = contentPiece;
										return (
											<div
												className="product-card-additional-item"
												key={idx}
											>
												{iconClass && (
													<ProductIcon
														name={iconClass}
														color={iconColor}
													/>
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
									},
								)}
							</div>
						)}
				</div>
			))}
		</section>
	);
}
