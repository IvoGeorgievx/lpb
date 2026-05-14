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
}: TestimonialBlockProps) => {
	const containerStyles: React.CSSProperties = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
		flexDirection: "column",
	};

	return (
		<>
			{carousel?.type === "default" ? (
				<div className="default-carousel">
					<div className="default-carousel-slides">
						{carousel.slides &&
							carousel.slides.map((slide, idx) => (
								<div
									key={idx}
									style={containerStyles}
									className="default-carousel-slide"
									id={`default-slide-${idx + 1}`}
								>
									<p>{slide.heading}</p>
									<span>{slide.subheading}</span>
									<span>{slide.author}</span>
								</div>
							))}
					</div>

					<div className="default-carousel-nav">
						{carousel.slides &&
							carousel.slides.map((_, idx) => (
								<a key={idx} href={`#default-slide-${idx + 1}`} />
							))}
					</div>
				</div>
			) : (
				<div className="fade-carousel">
					<input type="radio" name="fade" id="slide-1" defaultChecked />
					<input type="radio" name="fade" id="slide-2" />
					<input type="radio" name="fade" id="slide-3" />
					{carousel.slides &&
						carousel.slides.map((_, idx) => (
							<input
								key={idx}
								type="radio"
								name="fade"
								id={`slide-${idx + 1}`}
							/>
						))}

					<div className="fade-slides">
						{carousel.slides &&
							carousel.slides.map((carousel, idx) => (
								<div
									key={idx}
									style={{ ...containerStyles, background: carousel.bgColor }}
									className="fade-slide"
								>
									<h1>{carousel.heading}</h1>
									<h1>{carousel.subheading}</h1>
									<h1>{carousel.author}</h1>
								</div>
							))}
					</div>

					<div className="fade-nav">
						{carousel.slides &&
							carousel.slides.map((_, idx) => (
								<label key={idx} htmlFor={`slide-${idx + 1}`} />
							))}
					</div>
				</div>
			)}
		</>
	);
};
