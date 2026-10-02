import { BlockPropsMap, BlockType, DroppedItem } from "@/lib/blocks";
import { EditorContext, useEditor } from "@/context/EditorContext";
import { usePage } from "@/context/PageContext";
import { resolveEditorProps, preserveThemeBindings } from "@/lib/theme";
import { HeaderEditor } from "./header/HeaderEditor";
import { HeroEditor } from "./hero/HeroEditor";
import { CtaEditor } from "./cta/CtaEditor";
import { EmbedEditor } from "./embed/EmbedEditor";
import { ProductEditor } from "./product/ProductEditor";
import { FooterEditor } from "./footer/FooterEditor";
import { SeparatorEditor } from "./separator/SeparatorEditor";
import { TestimonialEditor } from "./testimonial/TestimonialEditor";
import { GlobalEditor } from "./global/GlobalEditor";

export type UpdatePayload<T extends BlockType = BlockType> = {
	id: string;
	props: BlockPropsMap[T];
};

export function Editor() {
	const { item, onPropsChange } = useEditor();
	const { page } = usePage();
	// Resolving style tokens changes values, never the block type or property shape.
	const view = item
		? ({
				...item,
				props: resolveEditorProps(item.props, page.activeTheme),
			} as DroppedItem)
		: undefined;

	if (!item || !view) return <GlobalEditor />;
	return (
		<div key={item.id} className="w-full">
			<EditorContext.Provider
				value={{
					item: view,
					onPropsChange: (update) =>
						onPropsChange({
							...update,
							props: preserveThemeBindings(
								item.props,
								view.props,
								update.props,
							) as DroppedItem["props"],
						}),
				}}
			>
				{renderEditorContent(view)}
			</EditorContext.Provider>
		</div>
	);
}

function renderEditorContent(item: DroppedItem) {
	const { type, props } = item;
	switch (type) {
		case "header":
			return <HeaderEditor props={props} />;
		case "hero":
			return <HeroEditor props={props} />;
		case "product":
			return <ProductEditor props={props} />;
		case "cta":
			return <CtaEditor props={props} />;
		case "embed":
			return <EmbedEditor props={props} />;
		case "footer":
			return <FooterEditor props={props} />;
		case "separator":
			return <SeparatorEditor props={props} />;
		case "testimonial":
			return <TestimonialEditor props={props} />;
		default:
			return null;
	}
}
