export type SeparatorType =
	| "wave"
	| "waves"
	| "curve"
	| "triangle"
	| "tilt"
	| "zigzag"
	| "line";

export interface SectionSeparatorProps extends React.ComponentPropsWithRef<"div"> {
	type?: SeparatorType;
	fill?: string;
	height?: number;
	flipX?: boolean;
	flipY?: boolean;
}

export const SectionSeparator = ({
	type = "wave",
	fill = "#3b82f6",
	height = 80,
	flipX = false,
	flipY = false,
	style,
	...props
}: SectionSeparatorProps) => {
	const svgStyle: React.CSSProperties = {
		display: "block",
		width: "100%",
		height,
		transform: `
			${flipX ? "scaleX(-1)" : ""}
			${flipY ? "scaleY(-1)" : ""}
		`,
	};

	const wrapperStyle: React.CSSProperties = {
		position: "relative",
		width: "100%",
		height,
		overflow: "hidden",
		lineHeight: 0,
		...style,
	};

	switch (type) {
		case "wave":
			return (
				<div style={wrapperStyle} {...props}>
					<svg
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
						style={svgStyle}
						fill={fill}
					>
						<path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
					</svg>
				</div>
			);

		case "waves":
			return (
				<div style={wrapperStyle} {...props}>
					<svg
						viewBox="0 0 1440 320"
						preserveAspectRatio="none"
						style={svgStyle}
						fill={fill}
					>
						<path d="M0,192L60,202.7C120,213,240,235,360,224C480,213,600,171,720,154.7C840,139,960,149,1080,170.7C1200,192,1320,224,1380,240L1440,256L1440,320L0,320Z" />
					</svg>
				</div>
			);

		case "curve":
			return (
				<div style={wrapperStyle} {...props}>
					<svg
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
						style={svgStyle}
						fill={fill}
					>
						<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
					</svg>
				</div>
			);

		case "triangle":
			return (
				<div style={wrapperStyle} {...props}>
					<svg
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						style={svgStyle}
						fill={fill}
					>
						<polygon points="0,0 100,100 0,100" />
					</svg>
				</div>
			);

		case "tilt":
			return (
				<div style={wrapperStyle} {...props}>
					<svg
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						style={svgStyle}
						fill={fill}
					>
						<polygon points="0,0 100,30 100,100 0,100" />
					</svg>
				</div>
			);

		case "zigzag":
			return (
				<div style={wrapperStyle} {...props}>
					<svg
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						style={svgStyle}
						fill={fill}
					>
						<path d="M0 100 L10 0 L20 100 L30 0 L40 100 L50 0 L60 100 L70 0 L80 100 L90 0 L100 100 V100 H0 Z" />
					</svg>
				</div>
			);

		case "line":
			return (
				<div
					{...props}
					style={{
						width: "100%",
						height,
						borderTop: `1px solid ${fill}`,
						...style,
					}}
				/>
			);

		default:
			return null;
	}
};
