import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import ColorPicker from "react-best-gradient-color-picker";

export function ColorField({
	id,
	label,
	value,
	onChange,
	background = false,
}: {
	id: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
	background?: boolean;
}) {
	const [draft, setDraft] = useState<string>();
	const [error, setError] = useState("");
	const commit = (next: string) => {
		if (!CSS.supports(background ? "background" : "color", next)) {
			setDraft(next);
			setError(
				background
					? "Enter a valid CSS color or background gradient."
					: "Enter a valid solid color. Gradients cannot color text or icons.",
			);
			return;
		}
		setDraft(undefined);
		setError("");
		onChange(next);
	};
	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<div className="flex min-w-0 items-center gap-2">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="h-10 w-12 shrink-0 p-2"
							aria-label={`Choose ${label.toLowerCase()}`}
						>
							<span
								aria-hidden="true"
								className="h-full w-full rounded border"
								style={{ background: value }}
							/>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className="w-auto"
						side="left"
						align="start"
						aria-label={`${label} picker`}
					>
						<ColorPicker
							idSuffix={id}
							value={
								!background && /gradient\(/i.test(value)
									? "#000000"
									: value
							}
							onChange={commit}
							hideColorTypeBtns={!background}
							hideGradientControls={!background}
						/>
					</PopoverContent>
				</Popover>
				<Input
					id={id}
					className="h-10 min-w-0 flex-1"
					value={draft ?? value}
					aria-invalid={!!error}
					aria-describedby={error ? `${id}-error` : undefined}
					onChange={(event) => commit(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Escape") {
							setDraft(undefined);
							setError("");
						}
					}}
					placeholder={
						background
							? "#ffffff or a CSS gradient"
							: "#ffffff or a CSS color"
					}
				/>
			</div>
			{error && (
				<p
					id={`${id}-error`}
					role="alert"
					className="text-sm text-destructive"
				>
					{error}
				</p>
			)}
		</div>
	);
}
