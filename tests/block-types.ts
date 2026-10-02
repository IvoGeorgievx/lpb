import type { DroppedItem } from "../lib/blocks";

export const invalidBlock: DroppedItem = {
	id: "invalid-hero",
	type: "hero",
	timestamp: 0,
	props: {
		// @ts-expect-error A hero cannot be constructed with carousel fields.
		carousel: { type: "fade", slides: [] },
	},
};

export const validBlock: DroppedItem = {
	id: "hero",
	type: "hero",
	timestamp: 0,
	props: { heading: "A correctly typed hero" },
};
