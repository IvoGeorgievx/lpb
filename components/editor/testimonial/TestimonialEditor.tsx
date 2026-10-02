import type { TestimonialBlockProps } from "@/components/blocks/TestimonialBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditor } from "@/context/EditorContext";
import { usePage } from "@/context/PageContext";
import { getThemePreset } from "@/lib/theme";
import { ColorField } from "../ColorField";

export function TestimonialEditor({ props }: { props: TestimonialBlockProps }) {
	const { item, onPropsChange } = useEditor();
	const { page } = usePage();
	if (!item) return null;
	const colors = getThemePreset(page.activeTheme).tokens;
	const slides = props.carousel?.slides ?? [];
	const update = (next: TestimonialBlockProps) =>
		onPropsChange({ id: item.id, props: next });
	const updateSlides = (next: typeof slides) =>
		update({
			carousel: { type: props.carousel?.type ?? "default", slides: next },
		});
	const updateSlide = (
		index: number,
		key: "heading" | "subheading" | "author" | "bgColor" | "textColor",
		value: string,
	) =>
		updateSlides(
			slides.map((slide, i) =>
				i === index ? { ...slide, [key]: value } : slide,
			),
		);
	return (
		<div className="space-y-6">
			<ColorField
				background
				id="testimonial-background"
				label="Section background"
				value={String(props.style?.background ?? colors.background)}
				onChange={(background) => update({ style: { background } })}
			/>
			<div className="space-y-2">
				<Label htmlFor="carousel-type">Carousel style</Label>
				<select
					id="carousel-type"
					className="h-10 w-full rounded-md border bg-transparent px-3 text-sm"
					value={props.carousel?.type ?? "default"}
					onChange={(event) =>
						update({
							carousel: {
								slides,
								type: event.target.value as "default" | "fade",
							},
						})
					}
				>
					<option value="default">Scroll</option>
					<option value="fade">Fade</option>
				</select>
			</div>
			{slides.map((slide, index) => (
				<fieldset
					key={index}
					className="min-w-0 space-y-4 border-t pt-5"
				>
					<legend className="px-1 text-sm font-semibold">
						Testimonial {index + 1}
					</legend>
					<div className="space-y-2">
						<Label htmlFor={`testimonial-${index}-heading`}>
							Heading
						</Label>
						<textarea
							id={`testimonial-${index}-heading`}
							aria-label={`Testimonial ${index + 1} heading`}
							className="editor-textarea"
							rows={2}
							value={slide.heading ?? ""}
							onChange={(event) =>
								updateSlide(
									index,
									"heading",
									event.target.value,
								)
							}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor={`testimonial-${index}-description`}>
							Description
						</Label>
						<textarea
							id={`testimonial-${index}-description`}
							aria-label={`Testimonial ${index + 1} description`}
							className="editor-textarea"
							rows={3}
							value={slide.subheading ?? ""}
							onChange={(event) =>
								updateSlide(
									index,
									"subheading",
									event.target.value,
								)
							}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor={`testimonial-${index}-author`}>
							Author
						</Label>
						<Input
							id={`testimonial-${index}-author`}
							aria-label={`Testimonial ${index + 1} author`}
							className="h-10"
							value={slide.author ?? ""}
							onChange={(event) =>
								updateSlide(index, "author", event.target.value)
							}
						/>
					</div>
					<ColorField
						background
						id={`testimonial-${index}-background`}
						label={`Testimonial ${index + 1} background`}
						value={slide.bgColor ?? colors.card}
						onChange={(value) =>
							updateSlide(index, "bgColor", value)
						}
					/>
					<ColorField
						id={`testimonial-${index}-color`}
						label={`Testimonial ${index + 1} text color`}
						value={slide.textColor ?? colors.foreground}
						onChange={(value) =>
							updateSlide(index, "textColor", value)
						}
					/>
					<Button
						variant="outline"
						onClick={() =>
							updateSlides(slides.filter((_, i) => i !== index))
						}
					>
						Remove testimonial {index + 1}
					</Button>
				</fieldset>
			))}
			{!slides.length && (
				<p className="text-sm text-muted-foreground">
					Add a testimonial to edit its content and colors.
				</p>
			)}
			<Button
				variant="outline"
				className="w-full"
				disabled={slides.length >= 9}
				onClick={() =>
					updateSlides([
						...slides,
						{
							heading: "Your customer’s story",
							subheading:
								"Replace this example with a real testimonial.",
							author: "Customer name",
							bgColor: "var(--lpb-card)",
						},
					])
				}
			>
				Add testimonial
			</Button>
		</div>
	);
}
