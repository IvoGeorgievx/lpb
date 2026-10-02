import type { HeroBlockProps } from "@/components/blocks/HeroBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/context/EditorContext";
import { ColorField } from "../ColorField";
import { HeroEditorCenterPreset } from "./HeroEditorCenterPreset";

export function HeroEditor({ props }: { props: HeroBlockProps }) {
	const { item, onPropsChange } = useEditor();
	if (!item) return null;
	const update = (props: HeroBlockProps) =>
		onPropsChange({ id: item.id, props });
	return (
		<div className="space-y-5">
			<Label htmlFor="hero-heading">Heading</Label>
			<Input
				id="hero-heading"
				value={props.heading ?? ""}
				onChange={(e) => update({ heading: e.target.value })}
			/>
			<Label htmlFor="hero-subheading">Subheading</Label>
			<Input
				id="hero-subheading"
				value={props.subheading ?? ""}
				onChange={(e) => update({ subheading: e.target.value })}
			/>
			<Label htmlFor="hero-height">Minimum height</Label>
			<Slider
				id="hero-height"
				value={[parseFloat(String(props.style?.minHeight ?? "60"))]}
				min={30}
				max={100}
				onValueChange={([height]) =>
					update({ style: { minHeight: `${height}vh` } })
				}
			/>
			<Label htmlFor="hero-size">
				Heading size: {props.headingFontSize ?? 52}px
			</Label>
			<Slider
				id="hero-size"
				value={[props.headingFontSize ?? 52]}
				min={24}
				max={80}
				onValueChange={([headingFontSize]) =>
					update({ headingFontSize })
				}
			/>
			<Label htmlFor="hero-sub-size">Subheading size</Label>
			<Slider
				id="hero-sub-size"
				value={[props.subheadingFontSize ?? 19]}
				min={14}
				max={32}
				onValueChange={([subheadingFontSize]) =>
					update({ subheadingFontSize })
				}
			/>
			<ColorField
				id="hero-heading-color"
				label="Heading color"
				value={props.headingColor ?? "#111827"}
				onChange={(headingColor) => update({ headingColor })}
			/>
			<ColorField
				background
				id="hero-background"
				label="Hero background"
				value={String(props.style?.background ?? "#ffffff")}
				onChange={(background) => update({ style: { background } })}
			/>
			<Label htmlFor="hero-animation">Heading animation</Label>
			<select
				id="hero-animation"
				className="w-full rounded-md border p-2"
				value={props.headingAnimation ?? ""}
				onChange={(e) =>
					update({
						headingAnimation: e.target
							.value as HeroBlockProps["headingAnimation"],
					})
				}
			>
				<option value="">None</option>
				<option value="fade-in">Fade in</option>
				<option value="slide-left">Slide from left</option>
				<option value="slide-right">Slide from right</option>
			</select>
			<details className="space-y-4">
				<summary className="cursor-pointer text-sm font-medium">
					More typography options
				</summary>
				{(["heading", "subheading"] as const).map((kind) => (
					<div key={kind} className="space-y-3 border-t pt-3">
						<Label htmlFor={`${kind}-weight`}>
							{kind === "heading" ? "Heading" : "Subheading"}{" "}
							weight
						</Label>
						<select
							id={`${kind}-weight`}
							className="w-full rounded-md border p-2"
							value={props[`${kind}Weight`] ?? 400}
							onChange={(e) =>
								update({
									[`${kind}Weight`]: Number(e.target.value),
								})
							}
						>
							{[400, 500, 600, 700, 800].map((weight) => (
								<option key={weight} value={weight}>
									{weight}
								</option>
							))}
						</select>
						<label className="flex gap-2 text-sm">
							<input
								type="checkbox"
								checked={props[`${kind}Style`] === "italic"}
								onChange={(e) =>
									update({
										[`${kind}Style`]: e.target.checked
											? "italic"
											: "normal",
									})
								}
							/>
							Italic {kind}
						</label>
						{kind === "subheading" && (
							<ColorField
								id="hero-subheading-color"
								label="Subheading color"
								value={props.subheadingColor ?? "#475569"}
								onChange={(subheadingColor) =>
									update({ subheadingColor })
								}
							/>
						)}
					</div>
				))}
				<Label htmlFor="subheading-animation">
					Subheading animation
				</Label>
				<select
					id="subheading-animation"
					className="w-full rounded-md border p-2"
					value={props.subHeadingAnimation ?? ""}
					onChange={(e) =>
						update({
							subHeadingAnimation: e.target
								.value as HeroBlockProps["subHeadingAnimation"],
						})
					}
				>
					<option value="">None</option>
					<option value="fade-in">Fade in</option>
					<option value="slide-left">Slide from left</option>
					<option value="slide-right">Slide from right</option>
				</select>
			</details>
			<HeroEditorCenterPreset />
			<h3 className="border-t pt-4 font-semibold">Call to action</h3>
			<Label htmlFor="hero-cta-text">CTA text</Label>
			<Input
				id="hero-cta-text"
				value={props.cta?.text ?? ""}
				onChange={(e) =>
					update({ cta: { ...props.cta, text: e.target.value } })
				}
			/>
			<Label htmlFor="hero-cta-link">CTA destination</Label>
			<Input
				id="hero-cta-link"
				placeholder="https://…, mailto:… or #contact"
				value={props.cta?.link ?? ""}
				onChange={(e) =>
					update({ cta: { ...props.cta, link: e.target.value } })
				}
			/>
			<Label htmlFor="hero-cta-radius">Button radius</Label>
			<Slider
				id="hero-cta-radius"
				value={[props.cta?.radius ?? 24]}
				min={0}
				max={999}
				onValueChange={([radius]) =>
					update({ cta: { ...props.cta, radius } })
				}
			/>
			<ColorField
				background
				id="hero-cta-background"
				label="Button background"
				value={props.cta?.bgColor ?? "#111827"}
				onChange={(bgColor) =>
					update({ cta: { ...props.cta, bgColor } })
				}
			/>
			<details className="space-y-4">
				<summary className="cursor-pointer text-sm font-medium">
					More button options
				</summary>
				<ColorField
					id="hero-cta-color"
					label="Button text color"
					value={props.cta?.textColor ?? "#ffffff"}
					onChange={(textColor) =>
						update({ cta: { ...props.cta, textColor } })
					}
				/>
				{(
					[
						["paddingX", "Horizontal padding", 40],
						["paddingY", "Vertical padding", 40],
						["fontSize", "Text size", 40],
					] as const
				).map(([key, label, max]) => (
					<div key={key} className="space-y-2">
						<Label htmlFor={`hero-cta-${key}`}>{label}</Label>
						<Slider
							id={`hero-cta-${key}`}
							min={0}
							max={max}
							value={[props.cta?.[key] ?? 16]}
							onValueChange={([value]) =>
								update({ cta: { ...props.cta, [key]: value } })
							}
						/>
					</div>
				))}
				<label className="flex gap-2 text-sm">
					<input
						type="checkbox"
						checked={props.cta?.border ?? false}
						onChange={(e) =>
							update({
								cta: { ...props.cta, border: e.target.checked },
							})
						}
					/>
					Show border
				</label>
				<Label htmlFor="hero-cta-animation">Button animation</Label>
				<select
					id="hero-cta-animation"
					className="w-full rounded-md border p-2"
					value={props.cta?.animation ?? ""}
					onChange={(e) =>
						update({
							cta: {
								...props.cta,
								animation: e.target.value as NonNullable<
									HeroBlockProps["cta"]
								>["animation"],
							},
						})
					}
				>
					<option value="">None</option>
					<option value="fade-in">Fade in</option>
					<option value="slide-left">Slide from left</option>
					<option value="slide-right">Slide from right</option>
				</select>
				<Label htmlFor="hero-cta-shadow">Shadow blur</Label>
				<Slider
					id="hero-cta-shadow"
					min={0}
					max={100}
					value={[props.cta?.boxShadow?.shadowBlur ?? 0]}
					onValueChange={([shadowBlur]) =>
						update({
							cta: {
								...props.cta,
								boxShadow: {
									...props.cta?.boxShadow,
									shadowBlur,
								},
							},
						})
					}
				/>
				<Label htmlFor="hero-cta-intensity">Shadow intensity</Label>
				<Slider
					id="hero-cta-intensity"
					min={0}
					max={1}
					step={0.05}
					value={[props.cta?.boxShadow?.shadowIntensity ?? 0]}
					onValueChange={([shadowIntensity]) =>
						update({
							cta: {
								...props.cta,
								boxShadow: {
									...props.cta?.boxShadow,
									shadowIntensity,
								},
							},
						})
					}
				/>
			</details>
		</div>
	);
}
