import { BlockPropsMap, BlockType, DroppedItem } from "@/app/page";
import { useEditor } from "@/context/EditorContext";
import { AnimatePresence, motion } from "motion/react";
import { HeroBlockProps } from "../blocks/HeroBlock";
import { HeaderEditor } from "./header/HeaderEditor";
import { HeroEditor } from "./hero/HeroEditor";
import { ProductEditor } from "./product/ProductEditor";
import { ProductBlockProps } from "../blocks/ProductBlock";
import { HeaderBlockProps } from "../blocks/HeaderBlock";

export type UpdatePayload<T extends BlockType = BlockType> = {
	id: string;
	props: BlockPropsMap[T];
};

export function Editor() {
	const { item } = useEditor();

	return (
		<AnimatePresence mode="wait">
			{item ? (
				<motion.div
					key={item.id || item.type}
					initial={{ opacity: 0, y: 20, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 10, scale: 0.95 }}
					transition={{
						duration: 0.15,
						ease: [0.16, 1, 0.3, 1],
					}}
					className="w-full"
				>
					{renderEditorContent(item)}
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}

function renderEditorContent(item: DroppedItem) {
	const { type, props } = item;
	switch (type) {
		case "header":
			return <HeaderEditor props={props as HeaderBlockProps} />;
		case "hero":
			return <HeroEditor props={props as HeroBlockProps} />;
		case "product":
			return <ProductEditor props={props as ProductBlockProps} />;
		default:
			return null;
	}
}
