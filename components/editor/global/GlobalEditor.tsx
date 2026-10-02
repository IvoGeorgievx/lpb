import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePage } from "@/context/PageContext";
import { applyTheme } from "@/lib/document";
import { THEME_PRESETS, type ThemeId } from "@/lib/theme";

export function GlobalEditor() {
	const { page, setPage } = usePage();
	return (
		<div className="space-y-5">
			<h2 className="text-lg font-semibold">Page settings</h2>
			<div className="space-y-2">
				<Label htmlFor="page-title">Page title</Label>
				<Input
					id="page-title"
					value={page.title}
					maxLength={160}
					onChange={(e) =>
						setPage(
							(page) => ({ ...page, title: e.target.value }),
							"page-title",
						)
					}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="page-description">Description</Label>
				<textarea
					id="page-description"
					className="min-h-24 w-full rounded-md border bg-transparent p-3 text-sm"
					maxLength={320}
					value={page.description}
					onChange={(e) =>
						setPage(
							(page) => ({
								...page,
								description: e.target.value,
							}),
							"page-description",
						)
					}
				/>
			</div>
			<fieldset className="space-y-2">
				<legend className="mb-2 font-medium">Theme</legend>
				<p className="mb-3 text-xs text-muted-foreground">
					Changes page colors and typography. Your content and custom
					colors stay intact.
				</p>
				{(Object.keys(THEME_PRESETS) as ThemeId[]).map((id) => {
					const preset = THEME_PRESETS[id];
					return (
						<label
							key={id}
							className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 has-checked:border-primary has-checked:bg-muted"
						>
							<input
								type="radio"
								name="page-theme"
								value={id}
								checked={page.activeTheme === id}
								onChange={() =>
									setPage((page) => applyTheme(page, id))
								}
							/>
							<span className="flex-1 text-sm">
								{preset.label}
							</span>
							<span className="flex gap-1" aria-hidden="true">
								{preset.preview.swatches.map((color, i) => (
									<span
										key={i}
										className="h-3 w-3 rounded-full border"
										style={{ background: color }}
									/>
								))}
							</span>
						</label>
					);
				})}
			</fieldset>
			<p className="border-t pt-4 text-xs leading-relaxed text-muted-foreground">
				Export includes your page, styles, icons, and uploaded images.
				Fonts, remote images, and embeds need internet access.
			</p>
		</div>
	);
}
