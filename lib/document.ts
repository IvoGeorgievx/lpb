import type { DroppedItem, BlockType } from "./blocks";
import { DEFAULT_THEME_ID, THEME_PRESETS, type ThemeId } from "./theme";

export interface Page {
	blocks: DroppedItem[];
	activeTheme: ThemeId;
	title: string;
	description: string;
}
export const EMPTY_PAGE: Page = {
	blocks: [],
	activeTheme: DEFAULT_THEME_ID,
	title: "My landing page",
	description: "",
};
export const DRAFT_KEY = "lpb-draft-v1";
export const MAX_IMAGE_BYTES = 1024 * 1024;
export const MAX_DOCUMENT_ITEMS = 200;
const blockTypes: BlockType[] = [
	"header",
	"hero",
	"cta",
	"embed",
	"product",
	"footer",
	"separator",
	"testimonial",
];

export function applyTheme(page: Page, activeTheme: ThemeId): Page {
	return { ...page, activeTheme };
}

export function serializeDraft(page: Page) {
	return JSON.stringify({ version: 1, page });
}

const isObject = (value: unknown): value is Record<string, unknown> =>
	value !== null && typeof value === "object" && !Array.isArray(value);

// Drafts are untrusted JSON. Check the fields that renderers/editors depend on.
export function restoreDraft(json: string): Page {
	const draft: unknown = JSON.parse(json);
	if (!isObject(draft) || draft.version !== 1 || !isObject(draft.page))
		throw new Error("Unsupported draft");
	const page = draft.page;
	if (
		typeof page.activeTheme !== "string" ||
		!Object.hasOwn(THEME_PRESETS, page.activeTheme) ||
		typeof page.title !== "string" ||
		typeof page.description !== "string" ||
		!Array.isArray(page.blocks) ||
		page.blocks.length > MAX_DOCUMENT_ITEMS
	)
		throw new Error("Invalid draft");
	const ids = new Set<string>();
	const strings = (object: Record<string, unknown>, keys: string[]) => {
		for (const key of keys)
			if (object[key] !== undefined && typeof object[key] !== "string")
				throw new Error(`Invalid ${key}`);
	};
	const objects = (object: Record<string, unknown>, keys: string[]) => {
		for (const key of keys)
			if (object[key] !== undefined && !isObject(object[key]))
				throw new Error(`Invalid ${key}`);
	};
	for (const block of page.blocks) {
		if (
			!isObject(block) ||
			typeof block.id !== "string" ||
			ids.has(block.id) ||
			!blockTypes.includes(block.type as BlockType) ||
			typeof block.timestamp !== "number" ||
			!isObject(block.props)
		)
			throw new Error("Invalid block");
		ids.add(block.id);
		const props = block.props;
		strings(props, [
			"id",
			"className",
			"heading",
			"subheading",
			"logoText",
			"background",
			"copyright",
			"src",
			"title",
			"contentHeading",
			"contentParagraph",
		]);
		objects(props, ["style", "cta", "button", "logo", "layout", "preset"]);
		for (const key of ["cta", "button", "logo"])
			if (isObject(props[key]))
				strings(props[key], [
					"text",
					"link",
					"image",
					"bgColor",
					"textColor",
					"backgroundColor",
					"color",
				]);
		if (props.links !== undefined) {
			if (!Array.isArray(props.links)) throw new Error("Invalid links");
			for (const link of props.links) {
				if (!isObject(link)) throw new Error("Invalid link");
				strings(link, ["label", "href", "url"]);
			}
		}
		if (props.style !== undefined && !isObject(props.style))
			throw new Error("Invalid styles");
		if (
			block.type === "testimonial" &&
			(!isObject(props.carousel) || !Array.isArray(props.carousel.slides))
		)
			throw new Error("Invalid testimonials");
		if (block.type === "product" && !Array.isArray(props.cards))
			throw new Error("Invalid features");
		if (Array.isArray(props.cards))
			for (const card of props.cards) {
				if (!isObject(card) || typeof card.id !== "string")
					throw new Error("Invalid card");
				objects(card, ["heading", "subheading", "style"]);
				strings(card, ["iconClass", "iconColor", "variant"]);
				for (const key of ["heading", "subheading"])
					if (isObject(card[key]))
						strings(card[key], ["content", "color", "iconClass"]);
				if (
					card.additionalContent !== undefined &&
					(!Array.isArray(card.additionalContent) ||
						card.additionalContent.some(
							(piece) =>
								!isObject(piece) ||
								typeof piece.content !== "string",
						))
				)
					throw new Error("Invalid card content");
			}
		if (isObject(props.carousel)) {
			if (!["fade", "default"].includes(String(props.carousel.type)))
				throw new Error("Invalid carousel");
			for (const slide of props.carousel.slides as unknown[]) {
				if (!isObject(slide)) throw new Error("Invalid slide");
				strings(slide, [
					"heading",
					"subheading",
					"author",
					"bgColor",
					"textColor",
				]);
			}
		}
		if (
			block.type === "embed" &&
			props.contentBullets !== undefined &&
			(!Array.isArray(props.contentBullets) ||
				props.contentBullets.some(
					(v: unknown) => typeof v !== "string",
				))
		)
			throw new Error("Invalid embed");
	}
	// Reject executable/event-like props and malformed nested data, but allow styles and image data.
	function validate(value: unknown, key = "", depth = 0): void {
		if (
			depth > 16 ||
			/^(on[A-Z].*|dangerouslySetInnerHTML|srcDoc|__proto__|constructor|prototype)$/i.test(
				key,
			)
		)
			throw new Error("Invalid property");
		if (value === null) throw new Error("Invalid value");
		if (
			key === "style" &&
			isObject(value) &&
			Object.values(value).some(
				(v) => typeof v !== "string" && typeof v !== "number",
			)
		)
			throw new Error("Invalid styles");
		if (
			key === "children" &&
			typeof value !== "string" &&
			typeof value !== "number"
		)
			throw new Error("Invalid children");
		if (Array.isArray(value)) {
			if (value.length > MAX_DOCUMENT_ITEMS)
				throw new Error("Draft too large");
			value.forEach((v) => validate(v, "", depth + 1));
		} else if (isObject(value)) {
			for (const [k, v] of Object.entries(value))
				validate(v, k, depth + 1);
		} else if (!["string", "number", "boolean"].includes(typeof value))
			throw new Error("Invalid value");
	}
	validate(page);
	return page as unknown as Page;
}

export interface History {
	past: Page[];
	present: Page;
	future: Page[];
	group?: string;
	time: number;
}
export type HistoryAction =
	| { type: "edit"; page: Page; group?: string; time: number }
	| {
			type: "change";
			update: Page | ((page: Page) => Page);
			group?: string;
			time: number;
	  }
	| { type: "undo" }
	| { type: "redo" }
	| { type: "boundary" }
	| { type: "restore"; page: Page };
export const initialHistory = (page: Page): History => ({
	past: [],
	present: page,
	future: [],
	time: 0,
});

// Array additions, removals, and reordering are separate undo steps—even during a drag or edit.
function structureChanged(previous: unknown, next: unknown): boolean {
	if (Array.isArray(previous) || Array.isArray(next)) {
		if (
			!Array.isArray(previous) ||
			!Array.isArray(next) ||
			previous.length !== next.length
		)
			return true;
		return previous.some((entry, index) => {
			const other = next[index];
			return (
				(isObject(entry) && isObject(other) && entry.id !== other.id) ||
				structureChanged(entry, other)
			);
		});
	}
	if (isObject(previous) || isObject(next)) {
		const before = isObject(previous) ? previous : {};
		const after = isObject(next) ? next : {};
		return [
			...new Set([...Object.keys(before), ...Object.keys(after)]),
		].some((key) => structureChanged(before[key], after[key]));
	}
	return false;
}

export function historyReducer(state: History, action: HistoryAction): History {
	if (action.type === "boundary")
		return { ...state, group: undefined, time: 0 };
	if (action.type === "change")
		return historyReducer(state, {
			type: "edit",
			page:
				typeof action.update === "function"
					? action.update(state.present)
					: action.update,
			group: action.group,
			time: action.time,
		});
	if (action.type === "restore") return initialHistory(action.page);
	if (action.type === "undo") {
		const page = state.past.at(-1);
		return page
			? {
					past: state.past.slice(0, -1),
					present: page,
					future: [state.present, ...state.future].slice(0, 40),
					time: 0,
				}
			: state;
	}
	if (action.type === "redo") {
		const page = state.future[0];
		return page
			? {
					past: [...state.past, state.present].slice(-40),
					present: page,
					future: state.future.slice(1),
					time: 0,
				}
			: state;
	}
	if (JSON.stringify(state.present) === JSON.stringify(action.page))
		return state;
	const structural = structureChanged(state.present, action.page);
	const grouped =
		!structural &&
		action.group &&
		action.group === state.group &&
		action.time - state.time < 800;
	// ponytail: 40 in-memory snapshots; use patches if image-heavy history becomes costly.
	return {
		past: grouped ? state.past : [...state.past, state.present].slice(-40),
		present: action.page,
		future: [],
		group: structural ? undefined : action.group,
		time: action.time,
	};
}

export function safeLink(value?: string) {
	const url = value?.trim() ?? "";
	return /^(https?:\/\/|mailto:|tel:|#)/i.test(url) &&
		!/[\u0000-\u001f\u007f]/.test(url)
		? url
		: "#";
}
export function safeEmbed(value?: string) {
	try {
		const url = new URL(value ?? "");
		return ["https:", "http:"].includes(url.protocol) ? url.href : "";
	} catch {
		return "";
	}
}

export function validateImage(file: Pick<File, "type" | "size">) {
	if (
		!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
			file.type,
		)
	)
		throw new Error("Choose a JPG, PNG, WebP, or GIF image.");
	if (file.size > MAX_IMAGE_BYTES)
		throw new Error(
			"Choose an image smaller than 1 MB. Compress it and try again.",
		);
}
