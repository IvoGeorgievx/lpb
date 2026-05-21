import { useId } from "react";

interface Slide {
	heading?: string;
	subheading?: string;
	author?: string;
	bgColor?: string;
}

interface Carousel {
	type: "default" | "fade";
	slides?: Slide[];
}

export interface TestimonialBlockProps extends React.ComponentPropsWithRef<"div"> {
	carousel?: Carousel;
}

export const TestimonialBlock = ({
	carousel = { type: "default", slides: [] },
	style,
	className,
	...props
}: TestimonialBlockProps) => {
	const fallbackSlides: Slide[] = [
		{
			heading: "Loved by fast-moving teams",
			subheading:
				"Everything is easier to maintain and our pages finally look intentional.",
			author: "Alex Rivera, Product Marketing",
			bgColor: "rgba(248,250,252,0.92)",
		},
	];
	const slides =
		carousel.slides && carousel.slides.length > 0
			? carousel.slides
			: fallbackSlides;
	const radioGroupId = useId().replace(/:/g, "");

	return (
		<div
			style={style}
			className={
				className ? `testimonial-block ${className}` : "testimonial-block"
			}
			{...props}
		>
			{carousel?.type === "default" ? (
				<div
					className="default-carousel"
					style={{
						width: "100%",
						maxWidth: 980,
						padding: "24px",
						display: "flex",
						flexDirection: "column",
						gap: 14,
					}}
				>
					<div
						className="default-carousel-slides"
						style={{
							display: "grid",
							gridAutoFlow: "column",
							gridAutoColumns: "100%",
							overflowX: "auto",
							scrollSnapType: "x mandatory",
							scrollBehavior: "smooth",
							gap: 14,
							paddingBottom: 6,
							scrollbarWidth: "none",
							msOverflowStyle: "none",
						}}
					>
						{slides.map((slide, idx) => (
							<div
								key={idx}
								style={{
									scrollSnapAlign: "start",
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									gap: 18,
									minHeight: 280,
									padding: "clamp(18px, 3vw, 34px)",
									borderRadius: 20,
									border: "1px solid rgba(148,163,184,0.24)",
									background:
										slide.bgColor ??
										"linear-gradient(160deg, #ffffff 0%, #f8fafc 100%)",
									boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
								}}
								className="default-carousel-slide"
								id={`${radioGroupId}-default-slide-${idx + 1}`}
							>
								<p
									style={{
										margin: 0,
										fontSize: "clamp(1.2rem, 3vw, 2rem)",
										lineHeight: 1.2,
										fontWeight: 700,
										color: "#0f172a",
									}}
								>
									{slide.heading}
								</p>
								<p
									style={{
										margin: 0,
										fontSize: "clamp(0.95rem, 1.8vw, 1.125rem)",
										lineHeight: 1.6,
										color: "#334155",
									}}
								>
									{slide.subheading}
								</p>
								<p
									style={{
										margin: 0,
										fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
										fontStyle: "italic",
										color: "#475569",
										textAlign: "right",
									}}
								>
									{slide.author}
								</p>
							</div>
						))}
					</div>

					<div
						className="default-carousel-nav"
						style={{ display: "flex", justifyContent: "center", gap: 10 }}
					>
						{slides.map((_, idx) => (
							<a
								key={idx}
								href={`#${radioGroupId}-default-slide-${idx + 1}`}
								style={{
									width: 10,
									height: 10,
									borderRadius: 999,
									background: "rgba(100,116,139,0.45)",
									textDecoration: "none",
									display: "inline-block",
								}}
							/>
						))}
					</div>
				</div>
			) : (
				<div
					className="fade-carousel"
					style={{
						position: "relative",
						width: "100%",
						maxWidth: 980,
						minHeight: 320,
						padding: "24px",
					}}
				>
					{slides.map((_, idx) => (
						<input
							key={idx}
							type="radio"
							name={`${radioGroupId}-fade`}
							id={`${radioGroupId}-fade-slide-${idx + 1}`}
							defaultChecked={idx === 0}
							style={{ display: "none" }}
						/>
					))}

					<div
						className="fade-slides"
						style={{
							position: "relative",
							width: "100%",
							minHeight: 320,
						}}
					>
						{slides.map((slide, idx) => (
							<div
								key={idx}
								style={{
									position: "absolute",
									inset: 0,
									opacity: 0,
									transition: "opacity .35s ease",
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									gap: 18,
									padding: "clamp(18px, 3vw, 34px)",
									borderRadius: 20,
									border: "1px solid rgba(148,163,184,0.24)",
									background:
										slide.bgColor ??
										"linear-gradient(160deg, #ffffff 0%, #f8fafc 100%)",
									boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
								}}
								className="fade-slide"
							>
								<p
									style={{
										margin: 0,
										fontSize: "clamp(1.2rem, 3vw, 2rem)",
										lineHeight: 1.2,
										fontWeight: 700,
										color: "#0f172a",
									}}
								>
									{slide.heading}
								</p>
								<p
									style={{
										margin: 0,
										fontSize: "clamp(0.95rem, 1.8vw, 1.125rem)",
										lineHeight: 1.6,
										color: "#334155",
									}}
								>
									{slide.subheading}
								</p>
								<p
									style={{
										margin: 0,
										fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
										fontStyle: "italic",
										color: "#475569",
										textAlign: "right",
									}}
								>
									{slide.author}
								</p>
							</div>
						))}
					</div>

					<div
						className="fade-nav"
						style={{
							position: "absolute",
							left: "50%",
							bottom: 12,
							transform: "translateX(-50%)",
							display: "flex",
							gap: 10,
							zIndex: 3,
						}}
					>
						{slides.map((_, idx) => (
							<label
								key={idx}
								htmlFor={`${radioGroupId}-fade-slide-${idx + 1}`}
								style={{
									width: 10,
									height: 10,
									borderRadius: 999,
									background: "rgba(100,116,139,0.45)",
									cursor: "pointer",
								}}
							/>
						))}
					</div>
					<style>{`
						${slides
							.map(
								(_, idx) => `
						#${radioGroupId}-fade-slide-${idx + 1}:checked ~ .fade-slides .fade-slide:nth-child(${idx + 1}) {
							opacity: 1;
							z-index: 2;
						}
						#${radioGroupId}-fade-slide-${idx + 1}:checked ~ .fade-nav label:nth-child(${idx + 1}) {
							background: rgba(15, 23, 42, 0.92);
						}
						`,
							)
							.join("")}
					`}</style>
				</div>
			)}
		</div>
	);
};
