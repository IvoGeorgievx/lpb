import {
	BlockType,
	DroppedItem,
	getThemeDefaultProps,
} from "@/app/page";
import { Label } from "@/components/ui/label";
import { Page, usePage } from "@/context/PageContext";
import { ThemeId, THEME_PRESETS, getThemePreset } from "@/lib/theme";

const THEME_BLOCK_ORDER: BlockType[] = [
	"header",
	"hero",
	"cta",
	"embed",
	"product",
	"testimonial",
	"footer",
];

const buildOrderedBlocks = (
	currentBlocks: DroppedItem[],
	themeId: ThemeId,
): DroppedItem[] => {
	const now = Date.now();
	const themeDefaults = getThemeDefaultProps(themeId);

	return THEME_BLOCK_ORDER.map((type, index) => {
		const existing = currentBlocks.find((block) => block.type === type);

		if (existing) {
			return {
				...existing,
				props: structuredClone(themeDefaults[type]),
			};
		}

		return {
			id: `${type}-${now + index}`,
			type,
			timestamp: now + index,
			props: structuredClone(themeDefaults[type]),
		};
	});
};

const withThemeApplied = (prev: Page, themeId: ThemeId): Page => {
	return {
		...prev,
		activeTheme: themeId,
		blocks: buildOrderedBlocks(prev.blocks, themeId),
	};
};

type ThemePreviewCardProps = {
	themeId: ThemeId;
	isActive: boolean;
	onClick: () => void;
};

const ThemePreviewCard = ({
	themeId,
	isActive,
	onClick,
}: ThemePreviewCardProps) => {
	const preset = getThemePreset(themeId);

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={(event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					onClick();
				}
			}}
			className={`w-full cursor-pointer rounded-2xl border p-3 shadow-sm transition hover:scale-[1.01] hover:shadow-md ${preset.preview.borderClass} ${
				isActive ? "ring-2 ring-primary/60" : ""
			}`}
			style={{
				background: preset.preview.gradient,
				fontFamily: preset.typography.body,
			}}
		>
			<div className="flex items-start justify-between gap-3">
				<div>
					<div
						className="text-sm font-semibold"
						style={{ color: preset.preview.foreground }}
					>
						{preset.label}
					</div>
					<div
						className="mt-1 text-xs leading-relaxed opacity-90"
						style={{ color: preset.preview.foreground }}
					>
						{preset.description}
					</div>
				</div>
				<div className="flex shrink-0 items-center gap-1.5">
					{preset.preview.swatches.map((swatch, index) => (
						<span
							key={`${themeId}-${index}`}
							className="h-4 w-4 rounded-full border border-black/10"
							style={{ background: swatch }}
						/>
					))}
				</div>
			</div>
			<div className="mt-3 rounded-lg bg-white/25 p-2 backdrop-blur-[1px]">
				<div className="h-2 w-2/3 rounded bg-black/20" />
				<div className="mt-1.5 h-1.5 w-full rounded bg-black/15" />
				<div className="mt-1.5 h-1.5 w-4/5 rounded bg-black/15" />
			</div>
		</div>
	);
};

export const GlobalEditor = () => {
	const { page, setPage } = usePage();
	const themeIds = Object.keys(THEME_PRESETS) as ThemeId[];

	const applyTheme = (themeId: ThemeId) => {
		setPage((prev) => withThemeApplied(prev, themeId));
	};

	return (
		<div className="flex flex-col gap-4">
			<Label>Choose Predefined Styles.</Label>
			{themeIds.map((themeId) => (
				<ThemePreviewCard
					key={themeId}
					themeId={themeId}
					isActive={page.activeTheme === themeId}
					onClick={() => applyTheme(themeId)}
				/>
			))}
		</div>
	);
};
