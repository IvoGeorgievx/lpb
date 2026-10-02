import { useId } from "react";

interface Slide {
	heading?: string;
	subheading?: string;
	author?: string;
	bgColor?: string;
	textColor?: string;
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
			heading: "Add a customer story",
			subheading:
				"Replace this placeholder with a real testimonial before publishing.",
			author: "Example content",
			bgColor: "var(--lpb-card)",
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
				className
					? `testimonial-block ${className}`
					: "testimonial-block"
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
									boxShadow:
										"0 16px 36px rgba(15,23,42,0.08)",
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
										color:
											slide.textColor ??
											"var(--lpb-foreground)",
									}}
								>
									{slide.heading}
								</p>
								<p
									style={{
										margin: 0,
										fontSize:
											"clamp(0.95rem, 1.8vw, 1.125rem)",
										lineHeight: 1.6,
										color:
											slide.textColor ??
											"var(--lpb-muted)",
									}}
								>
									{slide.subheading}
								</p>
								<p
									style={{
										margin: 0,
										fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
										fontStyle: "italic",
										color:
											slide.textColor ??
											"var(--lpb-muted)",
										textAlign: "right",
									}}
								>
									{slide.author}
								</p>
							</div>
						))}
					</div>

					<div className="default-carousel-nav">
						{slides.map((_, idx) => (
							<a
								key={idx}
								href={`#${radioGroupId}-default-slide-${idx + 1}`}
								aria-label={`Show testimonial ${idx + 1}`}
								className="testimonial-nav-item"
							>
								<span>{idx + 1}</span>
							</a>
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
						display: "flex",
						flexDirection: "column",
						gap: 16,
					}}
				>
					{slides.map((_, idx) => (
						<input
							key={idx}
							type="radio"
							name={`${radioGroupId}-fade`}
							id={`${radioGroupId}-fade-slide-${idx + 1}`}
							defaultChecked={idx === 0}
							aria-label={`Show testimonial ${idx + 1}`}
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
									position: "relative",
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
									boxShadow:
										"0 16px 36px rgba(15,23,42,0.08)",
								}}
								className="fade-slide"
							>
								<p
									style={{
										margin: 0,
										fontSize: "clamp(1.2rem, 3vw, 2rem)",
										lineHeight: 1.2,
										fontWeight: 700,
										color:
											slide.textColor ??
											"var(--lpb-foreground)",
									}}
								>
									{slide.heading}
								</p>
								<p
									style={{
										margin: 0,
										fontSize:
											"clamp(0.95rem, 1.8vw, 1.125rem)",
										lineHeight: 1.6,
										color:
											slide.textColor ??
											"var(--lpb-muted)",
									}}
								>
									{slide.subheading}
								</p>
								<p
									style={{
										margin: 0,
										fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
										fontStyle: "italic",
										color:
											slide.textColor ??
											"var(--lpb-muted)",
										textAlign: "right",
									}}
								>
									{slide.author}
								</p>
							</div>
						))}
					</div>

					<div className="fade-nav">
						{slides.map((_, idx) => (
							<label
								key={idx}
								htmlFor={`${radioGroupId}-fade-slide-${idx + 1}`}
								aria-label={`Show testimonial ${idx + 1}`}
								className="testimonial-nav-item"
							>
								<span>{idx + 1}</span>
							</label>
						))}
					</div>
					<style>{`
						${slides
							.map(
								(_, idx) => `
						#${radioGroupId}-fade-slide-${idx + 1}:checked ~ .fade-slides .fade-slide:nth-child(${idx + 1}) {
									opacity: 1;
									visibility: visible;
							z-index: 2;
						}
						#${radioGroupId}-fade-slide-${idx + 1}:checked ~ .fade-nav label:nth-child(${idx + 1}) {
							background: var(--lpb-primary);
							color: var(--lpb-card);
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
