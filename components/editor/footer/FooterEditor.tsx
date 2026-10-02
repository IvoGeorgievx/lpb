import type { FooterBlockProps } from "@/components/blocks/FooterBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/context/EditorContext";
import { MAX_DOCUMENT_ITEMS } from "@/lib/document";
import { ColorField } from "../ColorField";

export function FooterEditor({ props }: { props: FooterBlockProps }) {
	const { item, onPropsChange } = useEditor();
	if (!item) return null;
	const update = (props: FooterBlockProps) =>
		onPropsChange({ id: item.id, props });
	const links = props.links ?? [];
	const height = parseFloat(String(props.style?.minHeight ?? "20"));
	return (
		<div className="space-y-5">
			<ColorField
				background
				id="footer-background"
				label="Footer background"
				value={props.background ?? "#111827"}
				onChange={(background) => update({ background })}
			/>
			<Label htmlFor="footer-height">Minimum height: {height}vh</Label>
			<Slider
				id="footer-height"
				value={[height]}
				min={20}
				max={60}
				onValueChange={([height]) =>
					update({ style: { minHeight: `${height}vh` } })
				}
			/>
			<Label htmlFor="footer-logo">Logo text</Label>
			<Input
				id="footer-logo"
				value={props.logo?.text ?? ""}
				onChange={(event) =>
					update({
						logo: { ...props.logo, text: event.target.value },
					})
				}
			/>
			<Label htmlFor="footer-image">Logo image URL</Label>
			<Input
				id="footer-image"
				value={props.logo?.image ?? ""}
				placeholder="https://example.com/logo.png"
				onChange={(event) =>
					update({
						logo: { ...props.logo, image: event.target.value },
					})
				}
			/>
			<Label htmlFor="footer-copyright">Copyright</Label>
			<Input
				id="footer-copyright"
				value={props.copyright ?? ""}
				onChange={(event) => update({ copyright: event.target.value })}
			/>
			<ColorField
				id="footer-color"
				label="Footer text color"
				value={String(props.style?.color ?? "#e2e8f0")}
				onChange={(color) => update({ style: { color } })}
			/>
			<h3 className="border-t pt-5 font-semibold">Links</h3>
			{links.map((link, index) => (
				<fieldset key={index} className="space-y-3 border-t pt-4">
					<legend className="text-sm font-medium">
						Link {index + 1}
					</legend>
					<Label htmlFor={`footer-link-${index}-label`}>Label</Label>
					<Input
						id={`footer-link-${index}-label`}
						value={link.label}
						onChange={(event) =>
							update({
								links: links.map((link, i) =>
									i === index
										? { ...link, label: event.target.value }
										: link,
								),
							})
						}
					/>
					<Label htmlFor={`footer-link-${index}-href`}>
						Destination
					</Label>
					<Input
						id={`footer-link-${index}-href`}
						value={link.href}
						onChange={(event) =>
							update({
								links: links.map((link, i) =>
									i === index
										? { ...link, href: event.target.value }
										: link,
								),
							})
						}
					/>
					<Button
						variant="outline"
						onClick={() =>
							update({
								links: links.filter((_, i) => i !== index),
							})
						}
					>
						Remove link {index + 1}
					</Button>
				</fieldset>
			))}
			<Button
				variant="outline"
				disabled={links.length >= MAX_DOCUMENT_ITEMS}
				onClick={() => {
					if (links.length < MAX_DOCUMENT_ITEMS)
						update({
							links: [
								...links,
								{ label: "New link", href: "#contact" },
							],
						});
				}}
			>
				Add link
			</Button>
			{links.length >= MAX_DOCUMENT_ITEMS && (
				<p role="status" className="text-sm text-muted-foreground">
					Limit reached: {MAX_DOCUMENT_ITEMS} footer links.
				</p>
			)}
		</div>
	);
}
