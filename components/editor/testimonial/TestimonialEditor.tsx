import { TestimonialBlockProps } from "@/components/blocks/TestimonialBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor } from "@/context/EditorContext";

interface TestimonialEditorProps {
	props: TestimonialBlockProps;
}

type CarouselType = "default" | "fade";

export const TestimonialEditor = ({ props }: TestimonialEditorProps) => {
	const slides = props.carousel?.slides || [];
	const { item, onPropsChange } = useEditor();

	if (!item) return null;

	const updateSlide = (
		index: number,
		field: "heading" | "subheading" | "author" | "bgColor",
		value: string,
	) => {
		const updatedSlides = slides.map((slide, i) =>
			i === index
				? {
						...slide,
						[field]: value,
					}
				: slide,
		);

		onPropsChange({
			id: item.id,
			props: {
				...props,
				carousel: {
					...props.carousel,
					type: props.carousel?.type || "default",
					slides: updatedSlides,
				},
			},
		});
	};

	const addSlide = () => {
		const newSlide = {
			heading: "test heading",
			subheading: "test subheading",
			author: "test author",
			bgColor: "#333333",
		};

		onPropsChange({
			id: item.id,
			props: {
				...props,
				carousel: {
					...props.carousel,
					type: props.carousel?.type || "default",
					slides: [...slides, newSlide],
				},
			} as TestimonialBlockProps,
		});
	};

	const removeSlide = () => {
		const currentSlides = props.carousel?.slides || [];

		onPropsChange({
			id: item.id,
			props: {
				...props,
				carousel: {
					...props.carousel,
					type: props.carousel?.type || "default",
					slides: currentSlides.slice(0, -1),
				},
			},
		});
	};

	return (
		<Tabs defaultValue="settings" className="w-full p-4">
			<TabsList className="grid w-full grid-cols-1">
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>

			<TabsContent value="settings" className="mt-4 flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<Label>Carousel Type</Label>

					<Select
						value={
							(item.props as TestimonialBlockProps).carousel?.type || "default"
						}
						onValueChange={(type: CarouselType) => {
							onPropsChange({
								id: item.id,
								props: {
									...props,
									carousel: {
										...props.carousel,
										type,
									},
								},
							});
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select type" />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value="default">Default</SelectItem>
							<SelectItem value="fade">Fade</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex flex-col gap-6">
					{slides.map((slide, index) => (
						<div
							key={index}
							className="rounded-lg border p-4 flex flex-col gap-4"
						>
							<h3 className="font-medium">Slide {index + 1}</h3>

							<div className="flex flex-col gap-2">
								<Label>Heading</Label>
								<Input
									value={slide.heading}
									onChange={(e) =>
										updateSlide(index, "heading", e.target.value)
									}
									placeholder="Enter heading"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<Label>Subheading</Label>
								<Input
									value={slide.subheading}
									onChange={(e) =>
										updateSlide(index, "subheading", e.target.value)
									}
									placeholder="Enter subheading"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<Label>Author</Label>
								<Input
									value={slide.author}
									onChange={(e) => updateSlide(index, "author", e.target.value)}
									placeholder="Enter author"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<Label>Background Color</Label>

								<div className="flex items-center gap-2">
									<Input
										type="color"
										value={slide.bgColor}
										onChange={(e) =>
											updateSlide(index, "bgColor", e.target.value)
										}
										className="h-10 w-16 p-1"
									/>

									<Input
										value={slide.bgColor}
										onChange={(e) =>
											updateSlide(index, "bgColor", e.target.value)
										}
										placeholder="#333333"
									/>
								</div>
							</div>
						</div>
					))}
				</div>

				<Button disabled={slides.length >= 9} onClick={addSlide}>
					Add Slide
				</Button>

				<Button disabled={slides.length === 0} onClick={removeSlide}>
					Remove Slide
				</Button>
			</TabsContent>
		</Tabs>
	);
};
